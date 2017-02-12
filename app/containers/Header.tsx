import * as React from 'react';
import { Link } from 'react-router';

const classNames = require('classnames/bind');
const styles = require('../css/components/header.css');
const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx('header')}>
      <div className={cx('left')}>
        left
      </div>
      <div className={cx('center')}>
        center
      </div>
      <div className={cx('right')}>
        right
      </div>
    </div >
  );
};

export default Header;
