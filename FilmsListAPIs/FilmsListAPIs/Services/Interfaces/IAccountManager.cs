using FilmsListAPIs.Models;
using Microsoft.AspNetCore.Mvc;

namespace FilmsListAPIs.Services.Interfaces
{
    public interface IAccountManager
    {
        Task DeleteAccAsync(int userId, DeletedAccount deletedAccount);
        string RandomLoginGenerator();
        Task<IActionResult> ResetPasswordAsync(string email);
        Task<IActionResult> ChangePasswordAsync(int userId, string oldPassword, string newPassword);
    }
}
