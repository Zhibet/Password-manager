document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const password = this.getAttribute('data-password'); 
        
        navigator.clipboard.writeText(password).then(() => {
            alert('Password copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.copy-btn-2'); 
    button.addEventListener('click', function() {
        const password = this.closest('.card').querySelector('[data-token]').innerText;

        navigator.clipboard.writeText(password).then(() => {
            alert('Token has been copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    });
});
