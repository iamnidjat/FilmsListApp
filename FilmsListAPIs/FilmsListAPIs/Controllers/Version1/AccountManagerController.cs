using FilmsListAPIs.Models;
using FilmsListAPIs.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FilmsListAPIs.Controllers.Version1
{
    [Route("api/v1/AccountManager/")]
    [ApiController]
    public class AccountManagerController : ControllerBase
    {
        private readonly IAccountManager _accountManager;

        public AccountManagerController(IAccountManager accountManager)
        {
            _accountManager = accountManager;
        }

        [HttpPost("ResetPassword")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ResetPasswordAsync([FromQuery] string email)
        {
            await _accountManager.ResetPasswordAsync(email);
            return Ok("Succes");   
        }

        [HttpGet("GetRandomUsername")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public string GetRandomUsername()
        {
            return _accountManager.RandomLoginGenerator();       
        }

        [HttpPost("DeleteAccount")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task DeleteAccountAsync([FromQuery] int userId, [FromBody] DeletedAccount deletedAccount)
        {
            await _accountManager.DeleteAccAsync(userId, deletedAccount);            
        }


        [HttpPatch("ChangePassword")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ChangePasswordAsync([FromQuery] int userId, [FromQuery] string oldPassword, [FromQuery] string newPassword)
        {
            return await _accountManager.ChangePasswordAsync(userId, oldPassword, newPassword);
        }
    }
}
