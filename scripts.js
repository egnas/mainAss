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


const myForm = document.getElementById("myForm");
if(myForm){
    const myFormSubmit = e => {
        e.preventDefault();
        const contact = {
            "name": e.target.customer_name.value,
            "email": e.target.email_address.value,
            "number": e.target.customer_number.value,
            "choice": e.target.radioChoice.value,
        };

        fetch("https://cteth.com", {mode: "no-cors", method: "POST", body: contact})
            .then(response => {
                console.log('hello response!', response);
            }).catch(() => {
                let allContacts = [];

                const existingContacts = localStorage.getItem('contact');
                if(existingContacts){
                    allContacts = JSON.parse(existingContacts);
                }

                allContacts.push(contact);
                localStorage.setItem('contact', JSON.stringify(allContacts));
                console.log(allContacts);
            });
    };
    myForm.addEventListener('submit', myFormSubmit, false);
}
