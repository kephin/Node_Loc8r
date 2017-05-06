$('#addReview').submit(function() {
  $('.alert.alert-danger').hide();
  if (!$('#name').val() || !$('#rating').val() || !$('#review').val()) {
    if ($('.alert.alert-danger').length) {
      $('.alert.alert-danger').show();
    } else {
      $(this).prepend('<div class="alert alert-danger">All fields are required. Please try again.</div>');
    }
    return false;
  }
});
