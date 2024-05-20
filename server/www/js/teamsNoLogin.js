document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const welcomeMessage = document.getElementById('welcomeMessage');
  const teamList = document.getElementById('teamList');


    fetch('/api/teams')
      .then(response => response.json())
      .then(teams => {
        teams.forEach(team => {
          const listItem = document.createElement('li');

          const name = document.createElement('p');
          name.appendChild(document.createTextNode(`Team Name: ${team.teamName}`));

          const sector = document.createElement('p');
          sector.appendChild(document.createTextNode(`Sector: ${team.sector}`));

          const teamLeader = document.createElement('p');
          teamLeader.appendChild(document.createTextNode(`Team Leader: ${team.teamLeader}`));

          const members = document.createElement('p');
          members.appendChild(document.createTextNode(`Number of Members: ${team.members}`));

          const description = document.createElement('p');
          description.appendChild(document.createTextNode(`Description: ${team.description}`));

          const creationDate = document.createElement('p');
          creationDate.appendChild(document.createTextNode(`Creation Date: ${team.creationDate}`));

          listItem.appendChild(name);
          listItem.appendChild(sector);
          listItem.appendChild(teamLeader);
          listItem.appendChild(members);
          listItem.appendChild(description);
          listItem.appendChild(creationDate);

          teamList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error:', error));
  }
);