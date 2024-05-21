document.addEventListener("DOMContentLoaded", () => {
  const userList = document.getElementById('userList');

  fetch('/api/users')
    .then(response => response.json())
    .then(usersData => {
      usersData.forEach(user => {
        const listItem = document.createElement('li');

        const name = document.createElement('p');
        name.appendChild(document.createTextNode(`User Name: ${user.name}`));

        const email = document.createElement('p');
        email.appendChild(document.createTextNode(`Email: ${user.email}`));

        const jobTitle = document.createElement('p');
        jobTitle.appendChild(document.createTextNode(`Job Title: ${user.jobTitle}`));

        const teamId = document.createElement('p');
        teamId.appendChild(document.createTextNode(`Team ID: ${user.teamId}`));

        listItem.appendChild(name);
        listItem.appendChild(email);
        listItem.appendChild(jobTitle);
        listItem.appendChild(teamId);

        userList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error:', error));
});