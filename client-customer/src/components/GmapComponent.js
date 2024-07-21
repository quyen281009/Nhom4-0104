import React, { Component } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Heading = styled.h2`
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
`;

const MapIframe = styled.iframe`
  border: 0;
  width: 100%;
  max-width: 800px;
  height: 600px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

class Gmap extends Component {
  render() {
    return (
      <Container>
        <Heading>Van Lang University - Campus 3</Heading>
        <MapIframe
          title="gmap"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7878741521376!2d106.69744041158101!3d10.827539189279799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f4a62fce9b%3A0xc99902aa1e26ef02!2sVan%20Lang%20University%20-%20Campus%203!5e0!3m2!1sen!2s!4v1699933485961!5m2!1sen!2s"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Container>
    );
  }
}

export default Gmap;
