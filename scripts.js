if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {

    console.log('Service worker registered successfully');
  }).catch(function(err) {
    console.log('Service worker registration failed: ', err);
  });
}

let button = document.getElementById("burgerId");


button.addEventListener("click", function()
{
  if(button.checked == true)
  {
    document.getElementById("mobile").style.display = "inline-grid";
  }
  else {
    document.getElementById("mobile").style.display = "none";
  }
});
