import React from 'react';
import { Card, Button } from 'react-bootstrap';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="text-center">About iNotebook</h1>
        <p className="text-center">
          Welcome to the iNotebook app! The best place to manage your notes
          efficiently.
        </p>
      </div>

      <div className="about-card-container">
        <Card className="about-card">
          <Card.Body>
            <Card.Title>What is iNotebook?</Card.Title>
            <Card.Text>
              iNotebook is a simple yet powerful application to keep your notes
              organized. You can easily create, update, and delete notes, all
              while staying secure and efficient.
            </Card.Text>
            <Button variant="primary" href="/" className="d-block mx-auto">
              Go to Home
            </Button>
          </Card.Body>
        </Card>
      </div>

      <div className="about-footer text-center">
        <p>Created with ❤️ by Nirmal Chandra Sahoo</p>
        <p>&copy; 2024 iNotebook, All rights reserved.</p>
      </div>
    </div>
  );
};

export default About;
