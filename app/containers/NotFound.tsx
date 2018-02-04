import * as React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div>
      <div>This page doesn’t seem to be a thing.</div>
      <div>
        <Link to={'/'}>Take me Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
