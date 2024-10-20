import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import blogPosts from "../data.json";
import { useNavigate } from "react-router-dom";

function CardBox() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  const totalItems = blogPosts.blogPosts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const navigatetoPage = (id) => {
    console.log(id);
    navigate(`./posts/${id}`);
  };

  const currentItems = blogPosts.blogPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      
      <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
        {currentItems.map((val, id) => (
          <Card
            key={id}
            style={{
              width: "18rem",
              height: "20rem",
              backgroundColor: "#5865db",
              padding: "10px",
              margin: "46px",
            }}
          >
            <Card.Img
              variant="top"
              style={{ width: "100%", height: "100px" }}
              src={val.image}
            />
            <Card.Body>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-${id}`}>{val.title}</Tooltip>} 
              >
                <Card.Title
                  className="cardTitle"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {val.title}
                </Card.Title>
              </OverlayTrigger>
              <Card.Text
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: "hidden",
                  WebkitLineClamp: 3,
                }}
              >
                {val.description}
              </Card.Text>
              <Button variant="primary" onClick={() => navigatetoPage(id)}>Read More</Button>
            </Card.Body>
          </Card>
        ))}
      </div>


      <div style={{ textAlign: 'center', padding: '20px', marginTop: 'auto' }}>
        <Button
          variant="outline-secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ margin: '0 5px' }}
        >
          Prev
        </Button>
        
        {(() => {
          const buttons = [];
          for (let index = 0; index < totalPages; index++) {
            buttons.push(
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? "secondary" : "outline-secondary"}
                onClick={() => handlePageChange(index + 1)}
                style={{ margin: '0 5px' }}
              >
                {index + 1}
              </Button>
            );
          }
          return buttons;
        })()}
        
        <Button
          variant="outline-secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ margin: '0 5px' }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default CardBox;
