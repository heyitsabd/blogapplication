import React, { useEffect, useState } from "react";
import { Form, Button, ListGroup, Container, Row, Col } from "react-bootstrap";
import io from "socket.io-client";
import { FaComment } from "react-icons/fa";

const socket = io("http://localhost:5000");

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    socket.emit("getComments", postId, (fetchedComments) => {
      setComments(fetchedComments);
    });

    socket.on("commentAdded", (commentData) => {
      if (commentData.postId === postId) {
        setComments((prevComments) => [...prevComments, { comment: commentData.comment }]);
      }
    });

    return () => {
      socket.off("commentAdded");
    };
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    const commentData = { postId, comment };
    socket.emit("addComment", commentData);
    setComment(""); 
  };

  return (
    <Container className="mt-4">
      <h4><FaComment /> Comments:{comments.length}</h4>
      <ListGroup className="mb-3">
        {comments.map((c, index) => (
          <ListGroup.Item key={index} className="border-0">
            {c.comment}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={9}>
            <Form.Group controlId="formComment">
              <Form.Control
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                style={{ borderRadius: "25px" }}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              style={{ borderRadius: "25px" }} 
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CommentSection;
