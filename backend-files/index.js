const express = require('express');
const multer = require('multer');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'befreepareddb',
});
// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
  const { user_id } = req.body;
  const filePath = req.file.path;
  const fileName = req.file.filename;

  await pool.query(
    'INSERT INTO images (user_id, file_name, file_path) VALUES (?, ?, ?)',
    [user_id, fileName, filePath]
  );

  res.json({ success: true, fileName, filePath });
});

// Gallery endpoint
app.get('/gallery/:userId', async (req, res) => {
  const userId = req.params.userId;
  const [rows] = await pool.query(
    'SELECT id, file_name, file_path FROM images WHERE user_id = ?',
    [userId]
  );

  // Return file URLs
  const baseUrl = req.protocol + '://' + req.get('host');
  const gallery = rows.map(img => ({
    id: img.id,
    fileName: img.file_name,
    url: `${baseUrl}/${img.file_path}`,
  }));

  res.json(gallery);
});

// Start server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
