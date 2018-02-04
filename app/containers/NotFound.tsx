import * as React from 'react';
import { Link } from 'react-router';

const classNames = require('classnames/bind');
const styles = require('../css/components/error.css');
const cx = classNames.bind(styles);

const NotFound = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('body')}>This page doesn’t seem to be a thing.</div>
      <div>
        <Link to={'/'} className={cx('link')}>
          Take me Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
