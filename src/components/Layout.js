import React from 'react';
import Container from 'reactstrap/lib/Container';

export default function Layout({ children }) {
  return (
    <Container fluid="xl" style={{ minHeight: '100vh', padding: '10px' }}>
      {children}
    </Container>
  );
}
