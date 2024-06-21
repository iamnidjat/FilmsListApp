using FilmsListAPIs.Models;
using FilmsListAPIs.Services.Implementations;
using FilmsListAPIs.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FilmsListAPIs.Controllers.Version1
{
    [Route("api/v1/FilmManager")]
    [ApiController]
    public class FilmManagerController : ControllerBase
    {
        private readonly IFilmManager _filmManager;

        public FilmManagerController(IFilmManager filmManager)
        {
            _filmManager = filmManager;
        }

        [HttpPost("ToWatchList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Film>> ToWatchListAsync([FromQuery] int filmId)
        {
            await _filmManager.ToWatchList(filmId);
            return Ok();
        }

        [HttpPost("ToUnWatchList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Film>> ToUnWatchListAsync([FromQuery] int filmId)
        {
            await _filmManager.ToUnWatchList(filmId);
            return Ok();
        }

        [HttpGet("IsFilmNameUsed")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> IsCategoryNameUsed([FromQuery] string filmName)
        {
            return await _filmManager.IsFilmNameUsed(filmName);
        }
    }
}
