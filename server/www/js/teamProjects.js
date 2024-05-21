document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get("teamId");
    const teamNameElement = document.getElementById("teamName");
    const teamLeaderElement = document.getElementById("teamLeader");
    const sectorElement = document.getElementById("sector");
    const descriptionElement = document.getElementById("description");
    const creationDateElement = document.getElementById("creationDate");
    const projectList = document.getElementById("projectList");
    const createProjectForm = document.getElementById("createProjectForm");
  
    // Set list-style-type to none for projectList
    projectList.style.listStyleType = "none";

    if (!teamId) {
      console.error("No team ID provided");
      return;
    }
  
    // Fetch team details
    fetch(`/api/teams/${teamId}`)
      .then((response) => response.json())
      .then((team) => {
        teamNameElement.textContent = team.teamName;
        teamLeaderElement.textContent = team.teamLeader;
        sectorElement.textContent = team.sector;
        descriptionElement.textContent = team.description;
        creationDateElement.textContent = team.creationDate;
  
        // Safely access projects
        if (team.projects && Array.isArray(team.projects)) {
          team.projects.forEach((project) => {
            const listItem = document.createElement("li");
  
            const name = document.createElement("p");
            name.textContent = `Project Name: ${project.name}`;
  
            const description = document.createElement("p");
            description.textContent = `Description: ${project.description}`;
  
            const endDate = document.createElement("p");
            endDate.textContent = `End Date: ${project.endDate}`;
  
            listItem.appendChild(name);
            listItem.appendChild(description);
            listItem.appendChild(endDate);
  
            projectList.appendChild(listItem);
          });
        }
      })
      .catch((error) => console.error("Error fetching team details:", error));
  
    // Handle create project form submission
    createProjectForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("projectName").value;
      const description = document.getElementById("projectDescription").value;
      const endDate = document.getElementById("projectEndDate").value;
  
      fetch(`/api/teams/${teamId}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, endDate }),
      })
        .then((response) => response.json())
        .then((newProject) => {
          const listItem = document.createElement("li");
  
          const projectName = document.createElement("p");
          projectName.textContent = `Project Name: ${newProject.name}`;
  
          const projectDescription = document.createElement("p");
          projectDescription.textContent = `Description: ${newProject.description}`;
  
          const projectEndDate = document.createElement("p");
          projectEndDate.textContent = `End Date: ${newProject.endDate}`;
  
          listItem.appendChild(projectName);
          listItem.appendChild(projectDescription);
          listItem.appendChild(projectEndDate);
  
          projectList.appendChild(listItem);
        })
        .catch((error) => console.error("Error creating project:", error));
    });
});
