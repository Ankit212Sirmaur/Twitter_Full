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
    // event.preventDefault();

    var button = $(event.target);
    var textbox = $('#PostTextarea');

    var data = {
        content: textbox.val()
    };

    $.ajax({
        type: 'POST',
        url: '/api/posts',
        data: data,
        success: function(postData, status, xhr) {
            alert(postData);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error, 'Status:', status);
        }
    });
});
