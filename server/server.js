// backend/server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const fs = require('fs');
const path = require('path');
const dbFile = path.join(__dirname, 'db.json');



const app = express();
const PORT = 3000;
const SECRET = 'thisismybigsecret';

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//  For file submit
const multer = require('multer');
const uploadDir = path.join(__dirname, 'uploads');

// Ensure the uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

// Utility: Read db.json file
const readDB = () => {
  const data = fs.readFileSync(dbFile, 'utf-8');
  return JSON.parse(data);
};

// Utility: Write to db.json file
const writeDB = (data) => {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
};



// Ping Pong for testing
app.get('/ping', (req, res) => {
  res.json({
    data: 'pong'
  })
});

// Register / SignUp returns a token
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields are required' });

  const db = readDB();
  db.users = db.users || [];

  const existingUser = db.users.find(user => user.email === email);
  if (existingUser)
    return res.status(409).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    token: null
  };

  db.users.push(newUser);
  writeDB(db);

  res.json({ status: 201, success: true, message: 'User registered successfully' });
});


// Login - returns a token
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password)

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  const db = readDB();
  const user = db.users?.find(u => u.email === email);

  if (!user)
    return res.status(401).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, SECRET, { expiresIn: '1h' });

  // Save token to db
  user.token = token;
  writeDB(db);

  res.json({ token });
});


// Middleware to verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) return res.sendStatus(403);
  const token = bearerHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.post('/submit-form', verifyToken, upload.single('file'), (req, res) => {
  const db = readDB();

  const newSubmission = {
    id: Date.now(),
    groups: JSON.parse(req.body.groups),
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    languages: JSON.parse(req.body.languages),
    city: JSON.parse(req.body.city),
    file: req.file
      ? {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        path: `uploads/${req.file.originalname}`,
      }
      : null,
  };

  if (!db.submissions) db.submissions = [];
  db.submissions.push(newSubmission);
  writeDB(db);

  res.json({ success: true, data: newSubmission });
});

app.get('/submissions', verifyToken, (req, res) => {
  const db = readDB();
  res.json({ data: db.submissions || [] });
});


app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
