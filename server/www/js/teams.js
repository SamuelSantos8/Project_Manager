document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const welcomeMessage = document.getElementById('welcomeMessage');
    const createTeamForm = document.getElementById('createTeamForm');
    const teamList = document.getElementById('teamList');

    if (!loggedInUser) {
        window.location.href = 'login.html';
    } else {
        welcomeMessage.textContent = `Bem-vindo, ${loggedInUser.name}`;

        fetch('data/teams.json')
            .then(response => response.json())
            .then(teams => {
                teams.forEach(team => {
                    const listItem = document.createElement('li');

                    const name = document.createElement('p');
                    name.innerHTML = `<strong>Nome da Equipa:</strong> ${team.teamName}`;

                    const sectorElement = document.createElement('p');
                    sectorElement.innerHTML = `<strong>Setor:</strong> ${team.sector}`;

                    const teamLeaderElement = document.createElement('p');
                    teamLeaderElement.innerHTML = `<strong>Líder da Equipa:</strong> ${team.teamLeader}`;

                    const membersElement = document.createElement('p');
                    membersElement.innerHTML = `<strong>Número de Membros:</strong> ${team.members}`;

                    const descriptionElement = document.createElement('p');
                    descriptionElement.innerHTML = `<strong>Descrição:</strong> ${team.description}`;

                    const creationDateElement = document.createElement('p');
                    creationDateElement.innerHTML = `<strong>Data de Criação:</strong> ${team.creationDate}`;

                    listItem.appendChild(name);
                    listItem.appendChild(sectorElement);
                    listItem.appendChild(teamLeaderElement);
                    listItem.appendChild(membersElement);
                    listItem.appendChild(descriptionElement);
                    listItem.appendChild(creationDateElement);

                    teamList.appendChild(listItem);
                });
            });

        createTeamForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const teamName = document.getElementById('teamName').value;
            const sector = document.getElementById('sector').value;
            const teamLeader = document.getElementById('teamLeader').value;
            const members = document.getElementById('members').value;
            const description = document.getElementById('description').value;
            const creationDate = new Date().toISOString().split('T')[0];

            fetch('/api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    teamName,
                    sector,
                    teamLeader,
                    members,
                    description
                })
            })
            .then(response => response.json())
            .then(newTeam => {
                const listItem = document.createElement('li');

                const name = document.createElement('p');
                name.innerHTML = `<strong>Nome da Equipa:</strong> ${newTeam.teamName}`;

                const sectorElement = document.createElement('p');
                sectorElement.innerHTML = `<strong>Setor:</strong> ${newTeam.sector}`;

                const teamLeaderElement = document.createElement('p');
                teamLeaderElement.innerHTML = `<strong>Líder da Equipa:</strong> ${newTeam.teamLeader}`;

                const membersElement = document.createElement('p');
                membersElement.innerHTML = `<strong>Número de Membros:</strong> ${newTeam.members}`;

                const descriptionElement = document.createElement('p');
                descriptionElement.innerHTML = `<strong>Descrição:</strong> ${newTeam.description}`;

                const creationDateElement = document.createElement('p');
                creationDateElement.innerHTML = `<strong>Data de Criação:</strong> ${newTeam.creationDate}`;

                listItem.appendChild(name);
                listItem.appendChild(sectorElement);
                listItem.appendChild(teamLeaderElement);
                listItem.appendChild(membersElement);
                listItem.appendChild(descriptionElement);
                listItem.appendChild(creationDateElement);

                teamList.appendChild(listItem);
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
