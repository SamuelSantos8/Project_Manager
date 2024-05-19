document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('data/users.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.email === email && user.password === password);
                if (user) {
                    localStorage.setItem('loggedInUser', JSON.stringify(user));
                    window.location.href = 'teams.html';
                } else {
                    loginMessage.textContent = 'Email ou password incorretos.';
                }
            });
    });
});
