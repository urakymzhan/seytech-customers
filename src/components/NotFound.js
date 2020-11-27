import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No Page found for <code>{location.pathname}</code> path
      </h3>
    </div>
  );
}
