using FilmsListAPIs.Models;
using FilmsListAPIs.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FilmsListAPIs.Controllers.Version1
{
    [Route("api/v1/Feedback/")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IContactManager _manager;

        public FeedbackController(IContactManager manager)
        {
            _manager = manager;
        }

        [HttpPost("SendFeedback")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SendFeedbackAsync([FromBody] FeedbackModel feedback)
        {
            return await _manager.SendFeedbackAsync(feedback.FirstName, feedback.LastName, feedback.Email, feedback.PhoneNumber, feedback.Message);
        }
    }
}
