using System.ComponentModel.DataAnnotations;

namespace FilmsListAPIs.Models
{
    public record FeedbackModel([Required] string FirstName, 
        [Required] string LastName, 
        [Required] string Email, 
        [Required] string PhoneNumber, 
        [Required] string Message);
}
