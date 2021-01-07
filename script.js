const button = document.getElementById('select-button')
const mode = document.getElementById('mode');
const language = document.getElementById('language');
button.addEventListener('click', (event) => {
    localStorage.setItem("language", language.value);
    localStorage.setItem("mode", mode.value);
    location.replace('./learn.html')
})
$(function() {
    $("#dialog").dialog({
      autoOpen : false, modal : true, show : "fold", hide : "fold",
    });
    $("#author-button").click(function() {
      $("#dialog").dialog("open");
      return false;
    });
  });
