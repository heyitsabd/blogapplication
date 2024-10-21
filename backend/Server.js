const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));


app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/api/blogs', upload.single('image'), (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !description) {
    return res.status(400).send('Title and description are required');
  }

  const filePath = path.join(__dirname, '../src/data.json');
  let blogData = [];

  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    blogData = JSON.parse(rawData);
  }

  const newBlogPost = {
    id: blogData.length + 1,
    title,
    description,
    image: image ? `/Images/${image}` : null,
    comments: [] 
  };

  blogData.push(newBlogPost);
  fs.writeFileSync(filePath, JSON.stringify(blogData, null, 2));
  res.status(200).json({ message: 'Blog post submitted successfully', blogPost: newBlogPost });
});

app.get('/api/blogs', (req, res) => {
  const filePath = path.join(__dirname, '../src/data.json');

  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    const blogData = JSON.parse(rawData);
    res.status(200).json(blogData);
  } else {
    res.status(404).json({ message: 'No blog posts found' });
  }
});

const commentsFilePath = path.join(__dirname, '../src/comments.json');

const getCommentsForPost = (postId) => {
  if (fs.existsSync(commentsFilePath)) {
    const rawData = fs.readFileSync(commentsFilePath);
    const commentsData = JSON.parse(rawData);
    const postComments = commentsData.find((c) => c.postId === postId);
    return postComments ? postComments.comments : [];
  }
  return [];
};


const addCommentToPost = (postId, comment) => {
  let commentsData = [];

  if (fs.existsSync(commentsFilePath)) {
    const rawData = fs.readFileSync(commentsFilePath);
    commentsData = JSON.parse(rawData);
  }

  const postComments = commentsData.find((c) => c.postId === postId);
  if (postComments) {
    postComments.comments.push({ comment });
  } else {
    commentsData.push({ postId, comments: [{ comment }] });
  }

  fs.writeFileSync(commentsFilePath, JSON.stringify(commentsData, null, 2));
};


io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('addComment', (commentData) => {
    const { postId, comment } = commentData;
    addCommentToPost(postId, comment); 
    io.emit('commentAdded', { postId, comment }); 
  });

  socket.on('getComments', (postId, callback) => {
    const comments = getCommentsForPost(postId); 
    callback(comments);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use('/Images', express.static(path.join(__dirname, 'public/Images')));

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
