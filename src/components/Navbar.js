import React from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

export default function Navbar({ logOut }) {
  return (
    <ul className="menu">
      {!isAuthenticated() && (
        <li>
          {' '}
          <Link to="/">Home</Link>{' '}
        </li>
      )}
      {!isAuthenticated() && (
        <li>
          {' '}
          <Link
            style={{
              background: '#007bff',
              color: '#fff',
              padding: '4px 6px',
              borderRadius: '4px',
            }}
            to="/login"
          >
            Login
          </Link>{' '}
        </li>
      )}
      {isAuthenticated() && (
        <li>
          {' '}
          <Link to="/dashboard">Dashboard</Link>{' '}
        </li>
      )}

      {/* todo: only available to super admin  */}
      {isAuthenticated() && (
        <li>
          {' '}
          <Link to="/customers">Customers</Link>{' '}
        </li>
      )}

      {!isAuthenticated() && (
        <li>
          {' '}
          <Link to="/about">About</Link>{' '}
        </li>
      )}
      <li>
        {' '}
        <Link to="/contact">Contact</Link>{' '}
      </li>

      {isAuthenticated() && (
        <li>
          <Link to="/login" onClick={logOut}>
            Logout
          </Link>
        </li>
      )}
    </ul>
  );
}
