import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No page found for <code>{location.pathname}</code> url. Please use menu
      </h3>
    </div>
  );
}
