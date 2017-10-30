
document.getElementById("findContact").addEventListener("click", pickContact);



function pickContact() {
    navigator.contacts.pickContact(function(contact){
        console.log('The following contact has been selected:' + JSON.stringify(contact));
        alert('The following contact has been selected:' + JSON.stringify(contact));
    },function(err){
        console.log('Error: ' + err);
    });
}
