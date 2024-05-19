document.addEventListener('DOMContentLoaded', () => {
    fetch('data/users.json')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userList');
            data.forEach(user => {
                const listItem = document.createElement('li');

                const name = document.createElement('p');
                const nameStrong = document.createElement('strong');
                nameStrong.textContent = 'Nome: ';
                name.appendChild(nameStrong);
                name.appendChild(document.createTextNode(user.name));

                const email = document.createElement('p');
                const emailStrong = document.createElement('strong');
                emailStrong.textContent = 'Email: ';
                email.appendChild(emailStrong);
                email.appendChild(document.createTextNode(user.email));

                const jobTitle = document.createElement('p');
                const jobTitleStrong = document.createElement('strong');
                jobTitleStrong.textContent = 'Cargo: ';
                jobTitle.appendChild(jobTitleStrong);
                jobTitle.appendChild(document.createTextNode(user.jobTitle));

                const teamId = document.createElement('p');
                const teamIdStrong = document.createElement('strong');
                teamIdStrong.textContent = 'Equipa: ';
                teamId.appendChild(teamIdStrong);
                teamId.appendChild(document.createTextNode(user.teamId !== null ? user.teamId : 'Não atribuído'));

                listItem.appendChild(name);
                listItem.appendChild(email);
                listItem.appendChild(jobTitle);
                listItem.appendChild(teamId);
                userList.appendChild(listItem);
            });
        });
});
