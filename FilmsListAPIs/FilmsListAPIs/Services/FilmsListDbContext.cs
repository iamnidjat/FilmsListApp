using FilmsListAPIs.Models;
using Microsoft.EntityFrameworkCore;

namespace FilmsListAPIs.Services
{
    public class FilmsListDbContext: DbContext
    {
        public FilmsListDbContext(DbContextOptions<FilmsListDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Film> Films { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<DeletedAccount> DeletedAccounts { get; set; }
    }
}

