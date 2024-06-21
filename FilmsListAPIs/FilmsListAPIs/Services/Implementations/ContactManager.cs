using System.Net;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using FilmsListAPIs.Models;
using FilmsListAPIs.Services.Interfaces;

namespace FilmsListAPIs.Services.Implementations
{
    public class ContactManager : IContactManager
    {
        private readonly ILogger<ContactManager> _logger;
        private readonly ApplicationDatas _appData;

        public ContactManager(ILogger<ContactManager> logger,
            ApplicationDatas appData)
        {
            _logger = logger;
            _appData = appData;
        }

        public async Task<IActionResult> SendFeedbackAsync(string firstName, string lastName, string email, string phoneNumber, string message)
        {
            using var smtpClient = new MailKit.Net.Smtp.SmtpClient();

            if (Validators.IsEmailValid(email))
            {
                try
                {
                    smtpClient.Connect("smtp.gmail.com", 465, MailKit.Security.SecureSocketOptions.Auto);
                    smtpClient.Authenticate(_appData.FirstMail, _appData.Password);

                    var localMessage = new MimeMessage();

                    localMessage.From.Add(new MailboxAddress("MyKahoot", _appData.FirstMail));
                    localMessage.To.Add(new MailboxAddress("Me", "gurbanli.nidjat001@gmail.com"));

                    localMessage.Subject = "Feedback";

                    var part = new TextPart("plain")
                    {
                        Text = $"Feedback from: {firstName} {lastName}\nUser mail: {email}\nUser phone number: {phoneNumber}\nUser feedback: {message}"
                    };

                    localMessage.Body = part;
                    smtpClient.Send(localMessage);
                }
                catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException or InvalidCastException)
                {
                    _logger.LogError(ex, "An error occurred in the SendFeedbackAsync method.");
                    return new StatusCodeResult(400);
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
    }
}
