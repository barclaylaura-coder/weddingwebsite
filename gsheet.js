// Google sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbwAwP-g9Rql1PBzX1_wII1pzNq-3a-2wb5D3eEu7amxGLIpM0MmBjRfmFgFBA5F4p7h/exec';
const form = document.forms['rsvp-form'];

const guestDropdown = document.getElementById('guests');
const guestNameSection = document.getElementById('guest-name-section');
const guestNameInput = document.querySelector('input[name="guess-name"]');

const submitButton = document.getElementById('submit');

guestDropdown.addEventListener('change', function() {
    if (this.value === '0') {
        guestNameSection.style.display = 'none';
        guestNameInput.value = ''; // Clear value so it doesn't submit hidden data
    } else {
        guestNameSection.style.display = 'block';
    }
});

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Disable button to prevent double-clicks
    submitButton.disabled = true;
    submitButton.value = "Submitting... / 提交中...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        alert("Thank you! Form is submitted/ 多謝！表格已提交");
        
        // ⭐ NEW: Set a flag in session storage before reloading ⭐
        sessionStorage.setItem('introCompleted', 'true');
        
        // Reload the page
        window.location.reload();
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert("Something went wrong. Please try again. / 出錯了，請再試一次。");
        // Re-enable button so they can try again
        submitButton.disabled = false;
        submitButton.value = "Submit RSVP / 提交";
    });
});