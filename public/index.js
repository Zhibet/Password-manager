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