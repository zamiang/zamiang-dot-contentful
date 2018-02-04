import * as React from 'react';
import { Link } from 'react-router';
import * as styles from '../css/components/header.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <Link className={styles.link} to={'/'}>
        Brennan Moore
      </Link>
    </div>
  );
};

export default Header;
