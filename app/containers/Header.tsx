import * as classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router';
import * as styles from '../css/components/header.css';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx('header')}>
      <Link className={cx('link')} to={'/'}>
        Brennan Moore
      </Link>
    </div>
  );
};

export default Header;
