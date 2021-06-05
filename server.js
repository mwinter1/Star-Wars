// dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
const characters = [
  {
    routeName: 'yoda',
    name: 'Yoda',
    role: 'Jedi Master',
    age: 900,
    forcePoints: 2000,
  },
  {
    routeName: 'darthmaul',
    name: 'Darth Maul',
    role: 'Sith Lord',
    age: 200,
    forcePoints: 1200,
  },
  {
    routeName: 'obiwankenobi',
    name: 'Obi Wan Kenobi',
    role: 'Jedi Knight',
    age: 60,
    forcePoints: 1350,
  },
];

// GET Routes
// homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view.html'));
});

// get our entire database
app.get('/api/characters', (req, res) => {
  return res.json(characters);
});

// gets a specific character from our database
app.get('/api/characters/:character', (req, res) => {
  // assign route parameter to variable
  const chosen = req.params.character;
  // find character in our array of characters
  const chosenCharacter = characters.find(character => character.routeName === chosen) || false;
  // return the found object in the array
  return res.json(chosenCharacter);
});

// POST Routes
// create a new character
app.post('/api/characters', (req, res) => {
  const newCharacter = req.body;
  characters.push(newCharacter);
  res.json(newCharacter);
});

// start the server
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));