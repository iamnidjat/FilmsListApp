using FilmsListAPIs.Models;

namespace FilmsListAPIs.Services.Interfaces
{
    public interface IFilmsListCRUDOpers
    {
        Task AddFilmAsync(Film film);
        Task DeleteFilmAsync(int filmId);
        Task UpdateFilmAsync(int filmId, Film film);
        Task<Film> GetFilmAsync(int filmId);
        Task<IEnumerable<Film>> GetFilmsAsync(int userId);
        Task<IEnumerable<Film>> GetWatchListFilmsAsync(int userId);
    }
}
