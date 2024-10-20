import React from 'react';
import { useParams } from 'react-router-dom';
import blogPosts from './data.json';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Header from './Header';

const BlogPage = () => {
  const { id } = useParams();
  const blogPost = blogPosts.blogPosts[id];

  return (
    <div>
    <Header/>
    <Container className="my-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="text-center shadow-lg border-0">
            <Card.Header as="h5" className="text-white" style={{backgroundColor:'#5865DB'}}>{blogPost.title}</Card.Header>
            <Card.Body>
              <Card.Img variant="top" src={blogPost.image} alt="Blog Post" className="mb-4 rounded" />
              <Card.Text className="text-muted">
                {blogPost.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default BlogPage;
