$(document).ready(function() {
    $('#PostTextarea').on('input', function() {
      let value = $(this).val().trim();
      let submitButton = $("#submitPostButton");

      if (submitButton.length === 0) {
        return alert("No submit button found");
      }

      if (value === "") {
        submitButton.prop('disabled', true);
        return;
      }
      submitButton.prop('disabled', false);
    });
  });


$('#submitPostButton').click((event) => {
    event.preventDefault();

    var button = $(event.target);
    var textbox = $('#PostTextarea');

    var data = {
        content: textbox.val()
    };

    $.ajax({
        type: 'POST',
        url: '/api/posts',
        data: data,
        success: function(postData) {
            console.log(postData);
            let html = createPostHtml(postData);
            $('.postsContainer').prepend(html);
            textbox.val("");
            button.prop("disabled", true);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error, 'Status:', status);
        }
    });
});

function createPostHtml(postData){

    let postedBy = postData.postedBy;
    const displayName = postedBy.firstName + " " + postedBy.lastName;
    let timestamp = postData.createdAt;
    
    return `<div class='post'>
                <div class = "mainContentContainer">
                    <div class = "userImageContainer">
                        <img src = '${postedBy.profilePic}' > 
                    </div>
                    <div class = "postContentContainer">
                        <div class = "header">
                        <a href = '/profile${postedBy.userName}' class = "displayName">${displayName} </a>
                        <span class = "username"> @${postedBy.userName}</span>
                        <div class = "date"> ${timestamp}</div>
                        </div>
                        <div class = "postedBody">
                        <span> ${postData.content}</span>
                        </div>
                        <div class = "postFooter">
                            <div class = "postButtonContainer">
                                <button>
                                <i class = "far fa-heart"></i>
                                </button>
                            </div>
                            <div class = "postButtonContainer">
                                <button>
                                <i class = "far fa-comment"></i>
                                </button>
                            </div>
                            <div class = "postButtonContainer">
                                <button>
                                <i class = "fasb fa-retweet"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}