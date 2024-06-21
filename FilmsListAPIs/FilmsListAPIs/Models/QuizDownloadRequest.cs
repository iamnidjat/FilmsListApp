using System.ComponentModel.DataAnnotations;

namespace FilmsListAPIs.Models
{
    public record QuizDownloadRequest([Required] string QuizContent, [Required] string FileName);
}
