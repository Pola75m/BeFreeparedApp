const express = require('express');
const multer = require('multer');
const mysql = require('mysql2/promise');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200', credentials: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
    cb(null, Date.now() + '_' + file.originalname),
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  const { user_id } = req.body;
  const fileName = req.file.filename;

  await pool.query(
    'INSERT INTO files (userId, file_name) VALUES (?, ?)',
    [user_id, fileName]
  );

  res.json({ success: true, fileName });
});

// Gallery endpoint
app.get('/gallery/:userId', async (req, res) => {
  const userId = req.params.userId;
  const [rows] = await pool.query(
    'SELECT fileId, file_name FROM files WHERE userId = ?',
    [userId]
  );

  const baseUrl = req.protocol + '://' + req.get('host');
  const gallery = rows.map(img => ({
    id: img.fileId,
    fileName: img.file_name,
    url: `${baseUrl}/uploads/${img.file_name}`,
  }));

  res.json(gallery);
});
app.delete('/gallery/:userId/:fileId', async (req, res) => {
  const userId = req.params.userId;
  const fileId = req.params.fileId;

  try {
    await pool.query(
      'DELETE FROM files WHERE fileId = ? AND userId = ? ',
      [fileId, userId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('SQL delete error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/gallery', async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * , users.login AS username FROM files 
      JOIN users ON files.userId = users.Uid 
      ORDER BY uploaded_at DESC`
    );

    const baseUrl = req.protocol + '://' + req.get('host');

    
    const gallery = result.map(img => ({
      id: img.fileId,
      userId: img.userId,
      fileName: img.file_name,
      url: `${baseUrl}/uploads/${img.file_name}`,
      uploaded_at: img.uploaded_at,
      username: img.username
    }));

    res.json(gallery);
  } catch (err) {
    console.error('Error fetching community gallery:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
