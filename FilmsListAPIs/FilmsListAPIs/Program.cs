using FilmsListAPIs.Services;
using FilmsListAPIs.Services.Implementations;
using FilmsListAPIs.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddTransient<IFilmsListCRUDOpers, FilmsListCRUDOpers>();
builder.Services.AddTransient<IAccountManager, AccountManager>();
builder.Services.AddTransient<IContactManager, ContactManager>();
builder.Services.AddTransient<IDownloadQuizService, DownloadQuizService>();
builder.Services.AddTransient<IFilmManager, FilmManager>();
builder.Services.AddTransient<ApplicationDatas>();

builder.Services.AddDbContext<FilmsListDbContext>(options => {
    var connectionString = builder.Configuration.GetConnectionString("FilmsListDb");

    options.UseSqlServer(connectionString);
});

var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

var applicationData = new ApplicationDatas(configuration);

var app = builder.Build();
// retrieve the logger
var logger = app.Services.GetService<ILogger<Program>>();

// configure request pipeline
if (!app.Environment.IsDevelopment())
{
    logger.LogInformation("Using production pipeline");
    app.UseExceptionHandler("/Error");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(options =>
{
    options.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

app.UseAuthorization();

app.UseAuthentication();

app.MapControllers();

app.Run();
