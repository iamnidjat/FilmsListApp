using Microsoft.AspNetCore.Mvc;

namespace FilmsListAPIs.Services.Interfaces
{
    public interface IContactManager
    {
        Task<IActionResult> SendFeedbackAsync(string firstName, string lastName, string email, string phoneNumber, string message);
    }
}
