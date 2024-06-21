using System.Text;
using FilmsListAPIs.Services.Interfaces;
using Xceed.Words.NET;

namespace FilmsListAPIs.Services.Implementations
{
    public class DownloadQuizService : IDownloadQuizService
    {
        private readonly ILogger<DownloadQuizService> _logger;

        public DownloadQuizService(ILogger<DownloadQuizService> logger)
        {
            _logger = logger;
        }

        public byte[] GenerateFileContentTxt(string quizContent)
        {
            try
            {
                return Encoding.UTF8.GetBytes(quizContent);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GenerateFileContentTxt method.");
                return Array.Empty<byte>();
            }
        }

        public byte[] GenerateFileContentDocx(string quizContent, string fileName)
        {
            try
            {
                using (var doc = DocX.Create($"{fileName}.docx"))
                {
                    doc.InsertParagraph(quizContent);

                    MemoryStream memoryStream = new MemoryStream();
                    doc.SaveAs(memoryStream);

                    return memoryStream.ToArray();
                }
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GenerateFileContentDocx method.");
                return Array.Empty<byte>();
            }
        }

        public byte[] GenerateFileContentJson(string quizContent)
        {
            try
            {
                return Encoding.UTF8.GetBytes(quizContent);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GenerateFileContentJson method.");
                return Array.Empty<byte>();
            }
        }
    }
}
