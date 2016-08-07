$(document).ready(function() {
  $('.dimmer').dimmer({
    closable: false
  });
  $('#submit').click(function(){
    var name = $('#inputName').val();
    var email = $('#inputEmail').val();
    var department = $('#inputDepartment').dropdown('get value');
    var year = $('#inputYear').dropdown('get value');
    if (name != '' && checkEmail(email) && department != '' && year != '') {
      $.get("https://script.google.com/macros/s/AKfycbxbrHm2tXJutgBA5vkjopTmc3qJ9AoV2B6qhOZK75GkqaZFsf0/exec", {
        "name": name,
        "email": email,
        "department": department,
        "year": year
      });
      $('body').off();
      $('.dimmer').dimmer('show');
      $('#checkBox').show();
    }
    else {
      $('.message').fadeIn(100);
      console.log('表單不完整');
      setTimeout(function(){
        $('.message').fadeOut();
      }, 2500);
    }
  })
  $('.dropdown').dropdown();

  function checkEmail(email) {
    var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if(email.search(emailRule) != -1) {
      return true;
    }
    else {
      return false;
    }
  }
});
