import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const fs= require('fs');

  let data = fs.readFileSync('data.json');
  let blogData= JSON.parse(data);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Image:", image);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setImage(null);
  };

  return (
    <Container className="d-flex" style={{ minHeight: '100vh',justifyContent:'center',alignItems:'center' }}>
      <div style={{ width: '40rem',backgroundColor:"#5865db",padding:'20px',borderRadius:'10px',boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
        <h2>Add Blog Post</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription" style={{marginTop:'10px'}} >
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formImage" style={{marginTop:'10px'}} >
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ margin: '10px' }}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default AddBlog;
