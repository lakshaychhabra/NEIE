function toDo(event){
    
    event.stopPropagation();
    
    var a=document.getElementById("to-do");
    var b=document.getElementById("to-do-btn");
    if(a.style.top!="100%"){
        a.style.transition="all 0.5s";
    a.style.top="100%";
        b.innerHTML="<i class='fa fa-plus to-do-plus' aria-hidden='true'></i>";
    }
    else{
        
        a.style.transition="all 0.5s";
      a.style.top="45%";
        b.innerHTML="<i class='fa fa-minus' aria-hidden='true'</i>";
              
    }
    
    
    
 
}

function stable(event) {
    event.stopPropagation();

}

document.body.addEventListener("click", function(event) {
    if(document.getElementById("to-do").style.top!="100%") {
        document.getElementById("to-do").style.transition="all 0.5s";
        document.getElementById("to-do").style.top="100%";
        document.getElementById("to-do-btn").innerHTML="<i class='fa fa-plus to-do-plus' aria-hidden='true'</i>";

    }

});

/* TO DO LIST */
  $(".tdl-new").bind('keypress', function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) {
      var v = $(this).val();
      var s = v.replace(/ +?/g, '');
      if (s == ""){
        return false;
      }else{
        $(".tdl-content ul").append("<li><label><input type='checkbox'><i></i><span>"+ v +"</span><a href='#'><i class='fa fa-minus' aria-hidden='true'></i></a></label></li>");
        $(this).val("");
      }
    }
  });


  $(".tdl-content a").bind("click", function(){
    var _li = $(this).parent().parent("li");
        _li.addClass("remove").stop().delay(100).slideUp("fast", function(){
          _li.remove();
        });
    return false;
  });

  // for dynamically created a tags
  $(".tdl-content").on('click', "a", function(){
    var _li = $(this).parent().parent("li");
        _li.addClass("remove").stop().delay(100).slideUp("fast", function(){
          _li.remove();
        });
    return false;
  });