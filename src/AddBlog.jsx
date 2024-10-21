import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';


function AddBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setSuccess(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Blog post submitted successfully:', responseData);
        setSuccess('Blog post submitted successfully!');
        setTitle('');
        setDescription('');
        setImage(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error submitting blog post'); 
        console.log('Error submitting blog post:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setImage(null);
    setError(null); 
    setSuccess(null); 
  };

  return (
    <div>
    <Container className="d-flex" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '40rem', backgroundColor: "#5865db", padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
        <h2>Add Blog Post</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>} 
        
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

          <Form.Group controlId="formDescription" style={{ marginTop: '10px' }}>
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

          <Form.Group controlId="formImage" style={{ marginTop: '10px' }}>
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="Image/*"
              onChange={handleImageChange}
              
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
    
    </div>
  );
}

export default AddBlog;
