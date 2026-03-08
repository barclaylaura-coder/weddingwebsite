// Google sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbwAwP-g9Rql1PBzX1_wII1pzNq-3a-2wb5D3eEu7amxGLIpM0MmBjRfmFgFBA5F4p7h/exec';

const form = document.forms['rsvp-form'];

//form.addEventListener('submit', e => {
//
//      e.preventDefault();
//
//      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//      .then(response => alert("Thank you! Form is submitted/ 多謝！表格已提交" ))
//      .then(() => { window.location.reload(); })
//      .catch(error => console.error('Error!', error.message));
//});

form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        alert("Thank you! Form is submitted/ 多謝！表格已提交");
        
        // ⭐ NEW: Set a flag in session storage before reloading ⭐
        sessionStorage.setItem('introCompleted', 'true');
        
        // Reload the page
        window.location.reload();
    })
    .catch(error => console.error('Error!', error.message));
});