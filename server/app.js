const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 1234;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'www'))); 

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  fs.readFile('data/users.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read users data' });
    }

    const users = JSON.parse(data);
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

app.get('/api/teams', (req, res) => {
  fs.readFile('data/teams.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read teams data' });
    }

    const teams = JSON.parse(data);
    res.json(teams);
  });
});

app.get('/api/teams/:id', (req, res) => {
  const teamId = parseInt(req.params.id);
  fs.readFile('data/teams.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read teams data' });
    }

    const teams = JSON.parse(data);
    const team = teams.find(t => t.id === teamId);

    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  });
});

app.get('/api/users', (req, res) => {
  fs.readFile('data/users.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read users data' });
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

app.post('/api/teams', (req, res) => {
  const { teamName, sector, teamLeader, members, description } = req.body;
  const newTeam = {
    id: Date.now(), 
    teamName,
    sector,
    teamLeader,
    members: parseInt(members),
    description,
    creationDate: new Date().toISOString().split('T')[0],
    projects: [] 
  };

  fs.readFile('data/teams.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read teams data' });
    }

    const teams = JSON.parse(data);
    teams.push(newTeam);

    fs.writeFile('data/teams.json', JSON.stringify(teams, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save new team' });
      }

      res.status(201).json(newTeam);
    });
  });
});

app.get('/api/teams/:id/projects', (req, res) => {
  const teamId = parseInt(req.params.id);
  fs.readFile('data/teams.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read teams data' });
    }

    const teams = JSON.parse(data);
    const team = teams.find(t => t.id === teamId);

    if (team) {
      res.json(team.projects || []);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  });
});

app.post('/api/teams/:id/projects', (req, res) => {
  const teamId = parseInt(req.params.id);
  const { name, description, endDate } = req.body;
  const newProject = {
    id: Date.now(),
    name,
    description,
    endDate
  };

  fs.readFile('data/teams.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read teams data' });
    }

    const teams = JSON.parse(data);
    const teamIndex = teams.findIndex(t => t.id === teamId);

    if (teamIndex !== -1) {
      teams[teamIndex].projects = teams[teamIndex].projects || [];
      teams[teamIndex].projects.push(newProject);

      fs.writeFile('data/teams.json', JSON.stringify(teams, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to save new project' });
        }

        res.status(201).json(newProject);
      });
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  });
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'www', 'login.html')); 
});

app.get('/teams', (req, res) => {
  res.sendFile(path.join(__dirname, 'www', 'teams.html')); 
});

app.get('/teamProjects', (req, res) => {
  res.sendFile(path.join(__dirname, 'www', 'teamProjects.html'));
});

app.use((req, res, next) => {
  res.status(404).send({ msg: 'No resource or page found.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
