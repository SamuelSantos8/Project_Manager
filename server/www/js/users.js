// Dados dos usuários
const usersData = [
  {
      name: "Alice Silva",
      email: "alice@example.com",
      jobTitle: "Desenvolvedora",
      creationDate: "01/05/2024"
  },
  {
      name: "Bruno Costa",
      email: "bruno@example.com",
      jobTitle: "Designer",
      creationDate: "02/05/2024"
  },
  {
      name: "Carla Souza",
      email: "carla@example.com",
      jobTitle: "Gestora de Projetos",
      creationDate: "03/05/2024"
  },
  {
      name: "Daniel Oliveira",
      email: "daniel@example.com",
      jobTitle: "Tester",
      creationDate: "04/05/2024"
  }
];

// Função para exibir os usuários na página
function displayUsers() {
  const userList = document.getElementById('userList');
  
  usersData.forEach(user => {
      const userBox = document.createElement('div');
      userBox.classList.add('user-box');

      const userName = document.createElement('p');
      userName.classList.add('user-name');
      userName.textContent = `User Name: ${user.name}`;

      const userEmail = document.createElement('p');
      userEmail.textContent = `Email: ${user.email}`;

      const userJobTitle = document.createElement('p');
      userJobTitle.textContent = `Job Title: ${user.jobTitle}`;

      const userCreationDate = document.createElement('p');
      userCreationDate.textContent = `Creation Date: ${user.creationDate}`;

      userBox.appendChild(userName);
      userBox.appendChild(userEmail);
      userBox.appendChild(userJobTitle);
      userBox.appendChild(userCreationDate);

      userList.appendChild(userBox);
  });
}

// Chamar a função para exibir os usuários na página
displayUsers();
