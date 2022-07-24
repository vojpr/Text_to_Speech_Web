$('.upload-btn').click(function(){
	document.querySelector('.file-input').click();
});

    $(document).on('change', '.file-input', function() {


  var filesCount = $(this)[0].files.length;

  var textbox = $(this).prev();

  if (filesCount === 1) {
    var fileName = $(this).val().split('\\').pop();
    textbox.text(fileName);
  } else {
    textbox.text('no file selected');
  }
});

