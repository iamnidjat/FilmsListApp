using FilmsListAPIs.Models;
using FilmsListAPIs.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FilmsListAPIs.Services.Implementations
{
    public class FilmsListCRUDOpers: IFilmsListCRUDOpers
    {
        private readonly FilmsListDbContext _context;
        private readonly ILogger<FilmsListCRUDOpers> _logger;

        public FilmsListCRUDOpers(FilmsListDbContext context, ILogger<FilmsListCRUDOpers> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task AddFilmAsync(Film film)
        {
            try
            {
                if (film != null)
                {
                    _context.Films.Add(film);

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the AddFilmAsync method.");
            }
        }

        public async Task DeleteFilmAsync(int filmId)
        {
            try
            {
                var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == filmId);

                if (film != null)
                {
                    _context.Films.Remove(film);

                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogError("There is no film with this title and year!");
                }
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the DeleteFilmAsync method.");
            }
        }

        public async Task<Film> GetFilmAsync(int filmId)
        {
            try
            {
                return await _context.Films.FirstOrDefaultAsync(f => f.Id == filmId);
            }
            catch (Exception ex) when (ex is OperationCanceledException  or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the GetFilmAsync method.");
                return null;
            }
        }

        public async Task<IEnumerable<Film>> GetFilmsAsync(int userId)
        {
            try
            {
                return await _context.Films.Where(f => !f.WathcList && f.UserId == userId).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetFilmsAsync method.");
                return Enumerable.Empty<Film>();
            }
        }

        public async Task<IEnumerable<Film>> GetWatchListFilmsAsync(int userId)
        {
            try
            {
                return await _context.Films.Where(f => f.WathcList && f.UserId == userId).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetWatchListFilmsAsync method.");
                return Enumerable.Empty<Film>();
            }
        }

        public async Task UpdateFilmAsync(int filmId, Film film)
        {
            if (film != null)
            {
                var cinema = await _context.Films.FirstOrDefaultAsync(f => f.Id == filmId);

                if (cinema != null)
                {
                    try
                    {
                        UpdateFilmProperties(cinema, film);

                        await _context.SaveChangesAsync();
                    }
                    catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException or ArgumentNullException)
                    {
                        _logger.LogError(ex, "An error occurred in the UpdateFilmAsync method.");
                    }
                }
                else
                {
                    _logger.LogError("There is no film with this title and year!");
                }
            }
            else
            {
                _logger.LogError("A film itself for updating is empty (or null)");
            }
        }

        private static void UpdateFilmProperties(Film existingFilm, Film updatedFilm)
        {
            existingFilm.Title = updatedFilm.Title;
            existingFilm.Year = updatedFilm.Year;
            existingFilm.Genre = updatedFilm.Genre;
            existingFilm.MyComment = updatedFilm.MyComment;
            existingFilm.MyRating = updatedFilm.MyRating;
        }
    }
}
