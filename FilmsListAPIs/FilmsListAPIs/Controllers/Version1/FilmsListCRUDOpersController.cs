using FilmsListAPIs.Models;
using FilmsListAPIs.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace FilmsListAPIs.Controllers.Version1
{
    [Route("api/v1/FilmsListCRUDOpers/")]
    [ApiController]
    public class FilmsListCRUDOpersController : ControllerBase
    {
        private readonly IFilmsListCRUDOpers _filmsListCRUDOpers;

        public FilmsListCRUDOpersController(IFilmsListCRUDOpers filmsListCRUDOpers)
        {
            _filmsListCRUDOpers = filmsListCRUDOpers;
        }

        [HttpPost("AddFilm")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddFilmAsync([FromBody] Film film)
        {          
            await _filmsListCRUDOpers.AddFilmAsync(film);
            return Ok("Succes");           
        }

        [HttpDelete("DeleteFilm")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteFilmAsync([FromQuery] int filmId)
        {                     
            await _filmsListCRUDOpers.DeleteFilmAsync(filmId);
            return Ok("Succes");           
        }

        [HttpPatch("UpdateFilm")]
        [HttpPut("UpdateFilm")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateFilmAsync([FromQuery] int filmId, [FromBody] Film film)
        {          
            await _filmsListCRUDOpers.UpdateFilmAsync(filmId, film);
            return Ok("Success");            
        }

        [HttpGet("GetFilm")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Film>> GetFilmAsync([FromQuery] int filmId)
        {          
            var film = await _filmsListCRUDOpers.GetFilmAsync(filmId);

            if (film == null)
            {
                return BadRequest(new { Message = "Invalid request. Film does not exist." });
            }

            return Ok(film);           
        }

        [HttpGet("GetFilms")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)] 
        public async Task<ActionResult<IEnumerable<Film>>> GetFilmsAsync([FromQuery] int userId)
        {                    
            var films = await _filmsListCRUDOpers.GetFilmsAsync(userId);
            return Ok(films);            
        }

        [HttpGet("GetWatchListFilms")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<Film>>> GetWatchListFilmsAsync([FromQuery] int userId)
        {
            var films = await _filmsListCRUDOpers.GetWatchListFilmsAsync(userId);
            return Ok(films);           
        }
    }
}
