const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 1234;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'www'))); // Serve static files from 'www' directory

// Redirect to login if not logged in
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Login endpoint
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

// Get all teams
app.get('/api/teams', (req, res) => {
  fs.readFile('data/teams.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read teams data' });
    }

    const teams = JSON.parse(data);
    res.json(teams);
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


// Create a new team
app.post('/api/teams', (req, res) => {
  const { teamName, sector, teamLeader, members, description } = req.body;
  const newTeam = {
    id: Date.now(), // simple unique id generation
    teamName,
    sector,
    teamLeader,
    members: parseInt(members),
    description,
    creationDate: new Date().toISOString().split('T')[0]
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

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'www', 'login.html')); // Ensure this path is correct
});

// Serve teams page
app.get('/teams', (req, res) => {
  res.sendFile(path.join(__dirname, 'www', 'teams.html')); // Ensure this path is correct
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send({ msg: 'No resource or page found.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
