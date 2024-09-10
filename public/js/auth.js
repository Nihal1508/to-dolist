document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
  
    // Function to handle user login
    loginButton.addEventListener('click', async () => {
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value.trim();
  
      if (username && password) {
        try {
          const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });
          const data = await response.json();
          if (data.token) {
            localStorage.setItem('token', data.token); // Save JWT token
            alert('Login successful!');
            window.location.href = 'index.html'; // Redirect to the todo manager page
          } else {
            alert(data.message || 'Login failed');
          }
        } catch (error) {
          alert('An error occurred during login');
        }
      } else {
        alert('Please enter both username and password');
      }
    });
  
    // Function to handle user registration
registerButton.addEventListener('click', async () => {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
  
    if (username && password) {
        try {
          const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });
          console.log(username,password)
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (data.success) {
              alert('Registration successful! You can now log in.');
            } else {
              alert(data.message || 'Registration failed');
            }
          } else {
            // Handle HTTP errors
            alert('Error: ' + response.statusText);
          }
        } catch (error) {
          alert('An error occurred during registration');
          console.log(error);
        }
      } else {
        alert('Please enter both username and password');
      }
    });
  })  
  