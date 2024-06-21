using System.ComponentModel.DataAnnotations;

namespace FilmsListAPIs.Models
{
    public class Film
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Title { get; set; }

        [Required]
        public string? Year { get; set; }

        [Required]
        public string? Genre { get; set; }

        public string? MyComment { get; set; }

        [Required]
        public int MyRating { get; set; }

        [Required]
        public bool WathcList { get; set; } = false;

        [Required]
        public int UserId { get; set; }

        public User? User { get; set; }
    }
}
