using BCrypt.Net;
using FilmsListAPIs.Models;
using FilmsListAPIs.Services;
using FilmsListAPIs.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BC = BCrypt.Net.BCrypt;

namespace FilmsListAPIs.Controllers.Version1
{
    [Route("api/v1/Authentication/")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILogger<AuthenticationController> _logger;
        private readonly FilmsListDbContext _context;

        public AuthenticationController(ILogger<AuthenticationController> logger,
            FilmsListDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
        {
            User? user;

            try
            {
                user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.UserName);

                if (user != null && BC.EnhancedVerify(model.Password, user!.Password, HashType.SHA512))
                {
                    await AuthenticateAsync(model.UserName!);
                }
                else
                {
                    return BadRequest(new { Message = "Invalid request. User does not exist." });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the Login method.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(new
            {
                user.Id,
                user.Username,
                user.Email
            });
        }

        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
        {
            User? newUser;
            try
            {
                User? user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.UserName);

                if (user == null && Validators.IsEmailValid(model.Email!))
                {
                    _context.Users.Add(new User
                    {
                        Username = model.UserName,
                        Password = BC.EnhancedHashPassword(model.Password, 13, HashType.SHA512),
                        Email = model.Email,
                    });
                    await _context.SaveChangesAsync();

                    await AuthenticateAsync(model.UserName!);

                    newUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.UserName);
                }
                else
                {
                    return BadRequest(new { Message = "Invalid request. User already exists." });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the Register method.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(new
            {
                newUser!.Id,
                newUser!.Username,
                newUser!.Email
            });
        }

        [HttpGet("Logout")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task LogoutAsync()
        {
            try
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the Logout method.");
            }
        }

        private async Task AuthenticateAsync(string userName)
        {
            try
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
                };

                ClaimsIdentity id = new(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during authentication.");
                Response.StatusCode = StatusCodes.Status500InternalServerError;
            }
        }
    }
}
