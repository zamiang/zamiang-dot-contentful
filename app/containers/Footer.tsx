import * as React from 'react';
import * as styles from '../css/components/footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
        <p className={styles.writtenByNote}>Written By</p>
        <div className={styles.portrait}>
          <img src="https://secure.gravatar.com/avatar/ed442a2cfbe84d5bf40e09c58ba80b5f?size=200" />
        </div>
        <div>
          <p className={styles.name}>Brennan Moore</p>
          <p className={styles.subheading}>
            I'm a product engineer based in NYC. I'm passionate about building innovative digital
            products people love.
          </p>
          <p>
            Follow me on Twitter <a href="https://twitter.com/zamiang">here</a>.
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
