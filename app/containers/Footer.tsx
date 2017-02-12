import * as React from 'react';

const classNames = require('classnames/bind');
const styles = require('../css/components/footer.css');
const cx = classNames.bind(styles);

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={cx('footer')}>
      <div className={cx('footer-grid')}>
        <div className={cx('left')}>
          foo
        </div>
        <div className={cx('center')}>
          bar
        </div>
        <div className={cx('right')}>
          baz
        </div>
      </div>
    </div>
  );
};

export default Footer;
