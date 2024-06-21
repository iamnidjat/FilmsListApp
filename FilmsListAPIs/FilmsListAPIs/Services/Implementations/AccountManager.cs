using FilmsListAPIs.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using BCrypt.Net;
using BC = BCrypt.Net.BCrypt;
using FilmsListAPIs.Services.Interfaces;

namespace FilmsListAPIs.Services.Implementations
{
    public class AccountManager : IAccountManager
    {
        private readonly ILogger<AccountManager> _logger;
        private readonly FilmsListDbContext _context;
        private readonly ApplicationDatas _appData;

        public AccountManager(FilmsListDbContext context,
            ApplicationDatas appData, ILogger<AccountManager> logger)
        {
            _context = context;
            _appData = appData;
            _logger = logger;
        }

        public async Task DeleteAccAsync(int userId, DeletedAccount deletedAccount)
        {
            try
            {
                var user = await GetAccByIdAsync(userId);

                if (user != null)
                {
                    _context.Users.Remove(user!);

                    await _context.DeletedAccounts.AddAsync(deletedAccount);

                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogError($"There is no user with the {userId} id!");
                }
            }
            catch (Exception ex) when (ex is DbUpdateConcurrencyException or DbUpdateException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the DeleteAccAsync method.");
            }
        }

        private async Task<User?> GetAccByIdAsync(int? userId)
        {
            if (userId == null)
            {
                return null;
            }

            try
            {
                return await _context.Users.SingleOrDefaultAsync(x => x.Id == userId);
            }
            catch (Exception ex) when (ex is ArgumentException or ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the GetAccByIdAsync method.");
                return null;
            }
        }

        public string RandomLoginGenerator()
        {
            try
            {
                Random rand = new();

                string[] consonants = { "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "l", "n", "p", "q", "r", "s", "t", "v", "w", "x" };
                string[] vowels = { "a", "e", "i", "o", "u", "y" };
                int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };

                string userName = "";
                userName += consonants[rand.Next(consonants.Length)].ToUpper();
                userName += vowels[rand.Next(vowels.Length)];

                int counter = 2;

                if (rand.Next(1, 3) == 1)
                {
                    while (counter < RandomPasswordLength())
                    {
                        userName += consonants[rand.Next(consonants.Length)];
                        counter++;

                        userName += vowels[rand.Next(vowels.Length)];
                        counter++;
                    }
                }
                else
                {
                    while (counter < RandomPasswordLength() - 2)
                    {
                        userName += consonants[rand.Next(consonants.Length)];
                        counter++;

                        userName += vowels[rand.Next(vowels.Length)];
                        counter++;
                    }

                    for (int i = 0; i < 2; i++)
                    {
                        userName += nums[rand.Next(nums.Length)];
                        counter++;
                    }
                }

                return userName;
            }
            catch (ArgumentOutOfRangeException ex)
            {
                _logger.LogError(ex, "An error occurred in the RandomLoginGenerator method.");
                return string.Empty;
            }
        }

        private static int RandomPasswordLength() // No need for try catch here
        {
            var number = new Random().Next(5, 10);

            return number;
        }

        public async Task<IActionResult> ResetPasswordAsync(string email)
        {
            var newPassword = RandomPasswordGenerator(RandomPasswordLength());

            using var smtpClient = new MailKit.Net.Smtp.SmtpClient();

            if (Validators.IsEmailValid(email))
            {
                try
                {
                    smtpClient.Connect("smtp.gmail.com", 465, MailKit.Security.SecureSocketOptions.Auto);
                    smtpClient.Authenticate(_appData.FirstMail, _appData.Password);

                    var message = new MimeMessage();

                    message.From.Add(new MailboxAddress("FilmsList", _appData.FirstMail));
                    message.To.Add(new MailboxAddress("You", email));

                    message.Subject = "Reset Password";

                    var part = new TextPart("plain")
                    {
                        Text = $"Your new password: {newPassword}\nYou can change your password in the website.\nIf the message was sent by mistake, just ignore it."
                    };

                    message.Body = part;

                    smtpClient.Send(message);

                    var user = await _context.Users.Where(x => x.Email == email).FirstOrDefaultAsync();

                    if (user != null)
                    {
                        user.Password = BC.EnhancedHashPassword(newPassword, 13, HashType.SHA512);

                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        _logger.LogError($"There is no user with the {email} email!");
                        return new StatusCodeResult(400);
                    }
                }
                catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException or InvalidCastException)
                {
                    _logger.LogError(ex, "An error occurred in the ResetPasswordAsync method.");
                    return new StatusCodeResult(500);
                }
                finally
                {
                    smtpClient.Disconnect(true);
                }

                return new StatusCodeResult(200);
            }

            _logger.LogError("Mail is not valid.");
            return new StatusCodeResult(400);
        }

        private static string RandomPasswordGenerator(int length)
        {
            byte[] result = new byte[length];

            for (int index = 0; index < length; index++)
            {
                result[index] = (byte)new Random().Next(33, 126);
            }

            return System.Text.Encoding.ASCII.GetString(result);
        }

        public async Task<IActionResult> ChangePasswordAsync(int userId, string oldPassword, string newPassword)
        {
            try
            {
                var password = await _context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();

                if (password != null && BC.EnhancedVerify(oldPassword, password.Password, HashType.SHA512))
                {
                    password.Password = BC.EnhancedHashPassword(newPassword, 13, HashType.SHA512); ;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    return new StatusCodeResult(400);
                }

                return new StatusCodeResult(200);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the ChangePasswordAsync method.");
                return new StatusCodeResult(500);
            }
        }
    }
}