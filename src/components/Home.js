import { Button } from 'reactstrap';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/login">
        <Button color="primary">Login</Button>
      </Link>
    </div>
  );
}
