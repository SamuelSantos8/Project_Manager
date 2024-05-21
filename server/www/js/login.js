    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          document.getElementById('loginMessage').textContent = data.error;
        } else {
          localStorage.setItem('loggedInUser', JSON.stringify(data));
          window.location.href = '/teams';
        }
      })
      .catch(error => console.error('Error:', error));
    });