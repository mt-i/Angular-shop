$( document ).ready(function() {
    new WOW().init();
  });

window.onloadend(function(){
    $.get("url", function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
    });
  });