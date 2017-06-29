$(document).ready(function() {
  var current_page, current_trigger;
  if($('#project').css("display")=="block") {
    current_page = $('#project');
    current_trigger = $('.trig_project');
    current_trigger.addClass('activ');
  }


  $('.trig_profile').click(function() {
      current_page.fadeOut(function() {
        $('#people').fadeIn();
        current_page = $('#people');
        current_trigger.removeClass('activ');
        current_trigger = $('.trig_profile');
        current_trigger.addClass('activ');
      });
  });

  $('.trig_project').click(function() {
      current_page.fadeOut(function() {
        $('#project').fadeIn();
        current_page = $('#project');
        current_trigger.removeClass('activ');
        current_trigger = $('.trig_project');
        current_trigger.addClass('activ');
      });
  });

  $('.trig_query').click(function() {
      current_page.fadeOut(function() {
        $('#query').fadeIn();
        current_page = $('#query');
        current_trigger.removeClass('activ');
        current_trigger = $('.trig_query');
        current_trigger.addClass('activ');
      });
  });

});
