namespace FilmsListAPIs.Services.Interfaces
{
    public interface IFilmManager
    {
        Task ToWatchList(int filmId);
        Task ToUnWatchList(int filmId);
        Task<bool> IsFilmNameUsed(string filmName);
    }
}
