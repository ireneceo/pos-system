// Handle login form submission
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/auth.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      // Store the user token or session data
      // Redirect to the dashboard
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid username or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please try again later.');
  }
});