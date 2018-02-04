import * as classNames from 'classnames';
import * as React from 'react';
import * as styles from '../css/main.css';
import Footer from './Footer';
import Header from './Header';

const cx = classNames.bind(styles);

const App = (props: React.Props<any>) => {
  return (
    <div className={cx('app')}>
      <Header />
      <div className={cx('body')}>{props.children}</div>
      <Footer />
    </div>
  );
};

export default App;
