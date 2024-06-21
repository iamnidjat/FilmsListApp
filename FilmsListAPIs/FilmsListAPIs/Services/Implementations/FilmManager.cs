using FilmsListAPIs.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FilmsListAPIs.Services.Implementations
{
    public class FilmManager: IFilmManager
    {
        private readonly FilmsListDbContext _context;
        private readonly ILogger<FilmManager> _logger;

        public FilmManager(FilmsListDbContext context, ILogger<FilmManager> logger)
        {
            _context = context;
            _logger = logger;

        }

        public async Task ToWatchList(int filmId)
        {
            var cinema = await _context.Films.FirstOrDefaultAsync(f => f.Id == filmId);

            if (cinema != null)
            {
                try
                {
                    cinema.WathcList = true;

                    await _context.SaveChangesAsync();
                }
                catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException or ArgumentNullException)
                {
                    _logger.LogError(ex, "An error occurred in the ToWatchList method.");
                }
            }
        }

        public async Task ToUnWatchList(int filmId)
        {
            var cinema = await _context.Films.FirstOrDefaultAsync(f => f.Id == filmId);

            if (cinema != null)
            {
                try
                {
                    cinema.WathcList = false;

                    await _context.SaveChangesAsync();
                }
                catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
                {
                    _logger.LogError(ex, "An error occurred in the ToUnWatchList method.");
                }
            }
        }

        public async Task<bool> IsFilmNameUsed(string filmName)
        {
            try
            {
                bool filmNameExists = await _context.Films.AnyAsync(u => u.Title == filmName);

                return filmNameExists;
            }
            catch (Exception ex) when (ex is ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the IsFilmNameUsed method.");
                return false;
            }
        }
    }
}
