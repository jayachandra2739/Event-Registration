document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!name || !email || !phone) {
        alert('All fields are required.');
        return;
    }

    const registrationData = { name, email, phone };

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
        });

        if (response.ok) {
            alert('Registration successful!');
            event.target.reset();
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to save data.');
    }
    document.getElementById('cancelButton').addEventListener('click', () => {
        // Attempt to close the current tab
        const userConfirmed = confirm('Are you sure you want to cancel and close the tab?');
        if (userConfirmed) {
            window.close();
        }
    });
    
});
