document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const welcomeMessage = document.getElementById("welcomeMessage");
  const createTeamForm = document.getElementById("createTeamForm");
  const teamList = document.getElementById("teamList");

  if (!loggedInUser) {
    window.location.href = "/login.html";
  } else {
    welcomeMessage.textContent = `Welcome, ${loggedInUser.name}`;

    // Fetch and display teams the logged-in user belongs to
    fetch("/api/teams")
      .then((response) => response.json())
      .then((teams) => {
        teams.forEach((team) => {
          const isUserInTeam = team.id === loggedInUser.teamId;

          if (isUserInTeam) {
            const listItem = document.createElement("li");

            const name = document.createElement("p");
            name.textContent = `Team Name: ${team.teamName}`;

            const sector = document.createElement("p");
            sector.textContent = `Sector: ${team.sector}`;

            const teamLeader = document.createElement("p");
            teamLeader.textContent = `Team Leader: ${team.teamLeader}`;

            const description = document.createElement("p");
            description.textContent = `Description: ${team.description}`;

            const creationDate = document.createElement("p");
            creationDate.textContent = `Creation Date: ${team.creationDate}`;

            listItem.appendChild(name);
            listItem.appendChild(sector);
            listItem.appendChild(teamLeader);
            listItem.appendChild(description);
            listItem.appendChild(creationDate);

            const enterButton = document.createElement("button");
            enterButton.textContent = "Enter Team";
            enterButton.addEventListener("click", () => {
              window.location.href = `/team.html?teamId=${team.id}`;
            });
            listItem.appendChild(enterButton);

            teamList.appendChild(listItem);
          }
        });
      })
      .catch((error) => console.error("Error fetching teams:", error));

    // Handle team creation form submission
    createTeamForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const teamName = document.getElementById("teamName").value;
      const sector = document.getElementById("sector").value;
      const description = document.getElementById("description").value;
      const teamLeader = loggedInUser.name;

      // Validate form inputs
      if (!teamName || !sector || !description) {
        alert("All fields are required!");
        return;
      }

      fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, sector, teamLeader, description, members: [teamLeader] }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((newTeam) => {
          const listItem = document.createElement("li");

          const name = document.createElement("p");
          name.textContent = `Team Name: ${newTeam.teamName}`;

          const sectorElement = document.createElement("p");
          sectorElement.textContent = `Sector: ${newTeam.sector}`;

          const teamLeaderElement = document.createElement("p");
          teamLeaderElement.textContent = `Team Leader: ${newTeam.teamLeader}`;

          const descriptionElement = document.createElement("p");
          descriptionElement.textContent = `Description: ${newTeam.description}`;

          listItem.appendChild(name);
          listItem.appendChild(sectorElement);
          listItem.appendChild(teamLeaderElement);
          listItem.appendChild(descriptionElement);

          const enterButton = document.createElement("button");
          enterButton.textContent = "Enter Team";
          enterButton.addEventListener("click", () => {
            window.location.href = `/team.html?teamId=${newTeam.id}`;
          });
          listItem.appendChild(enterButton);

          teamList.appendChild(listItem);

          // Clear form fields
          createTeamForm.reset();
        })
        .catch((error) => console.error("Error creating team:", error));
    });
  }
});
