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

$(document).on('click', '.likeButton', (event)=>{
    alert('clicked like button');
    let button = $(event.target);
    let postId = getpostIdFromElement(button);
    
    if(postId === undefined) return;

    $.ajax({
        url: `/api/posts/${postId}/like`,
        type: "PUT",
        success: (postData) =>{
            button.find('span').text(postData.likes.length || "");
            console.log('user info ', userLoggedIn);
            if(postData.likes.includes(userLoggedIn._id)){
                button.addClass('active');
            }else {
                button.removeClass('active');
            }
        }
    })
})
$(document).on('click', '.retweetButton', (event)=>{
    alert('clicked like button');
    let button = $(event.target);
    let postId = getpostIdFromElement(button);
    
    if(postId === undefined) return;

    $.ajax({
        url: `/api/posts/${postId}/retweet`,
        type: "post",
        success: (postData) =>{
            // button.find('span').text(postData.likes.length || "");
            // console.log('user info ', userLoggedIn);
            // if(postData.likes.includes(userLoggedIn._id)){
            //     button.addClass('active');
            // }else {
            //     button.removeClass('active');
            // }
            console.log(postData);
        }   
    })
})
function getpostIdFromElement(element) {
    let isRoot = element.hasClass("post");
    let rootElement = isRoot ? element : element.closest('.post');
    
    let postId = rootElement.data().id;

    if (postId === undefined) {
        alert('post ID is undefined');
        return;
    }

    return postId;
}

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
    console.log(postData);
    let postedBy = postData.postedBy;
    const displayName = postedBy.firstName + " " + postedBy.lastName;
    let timestamp = timeDifference(new Date(), new Date(postData.createdAt));

    let likeButtonActiveClass = postData.likes.includes(userLoggedIn._id) ? 'active' : "";
    console.log(likeButtonActiveClass);
    
    return `<div class="post" data-id='${postData._id}'>
                <div class = "mainContentContainer">
                    <div class = "userImageContainer">
                        <img src = '${postedBy.profilePic}' > 
                    </div>
                    <div class = "postContentContainer">
                        <div class = "header">
                        <a href = '/profile${postedBy.userName}' class = "displayName">${displayName} </a>
                        <span class = "username"> @${postedBy.userName}</span>
                        <span class = "date"> ${timestamp}</span>
                        </div>
                        <div class = "postedBody">
                        <span> ${postData.content}</span>
                        </div>
                        <div class = "postFooter">
                            <div class = "postButtonContainer red " >
                                <button class = 'likeButton ${likeButtonActiveClass} '>
                                <i class = "far fa-heart"></i>
                                <span>${postData.likes.length || ""}</span>
                                </button>
                            </div>
                            <div class = "postButtonContainer">
                                <button>
                                <i class = "far fa-comment"></i>
                                </button>
                            </div>
                            <div class = "postButtonContainer green">
                                <button class = "retweetButton" >
                                <i class = "fas fa-retweet"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if(elapsed/1000 < 30) return 'just now'; 
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}