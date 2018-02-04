import * as classNames from 'classnames';
import * as React from 'react';
import * as styles from '../css/components/footer.css';

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx('footer')}>
      <p className={cx('written-by-note')}>Written By</p>
      <div className={cx('portrait')}>
        <img src="https://secure.gravatar.com/avatar/ed442a2cfbe84d5bf40e09c58ba80b5f?size=200" />
      </div>
      <div className={cx('info')}>
        <p className={cx('name')}>Brennan Moore</p>
        <p className={cx('subheading')}>
          I'm a product engineer based in NYC. I'm passionate about building innovative digital
          products people love.
        </p>
        <p className={cx('call-to-action')}>
          Follow me on Twitter <a href="https://twitter.com/zamiang">here</a>.
        </p>
      </div>
    </div>
  );
};

export default Footer;
