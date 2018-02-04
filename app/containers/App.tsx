import * as React from 'react';
import Footer from './Footer';
import Header from './Header';

const classNames = require('classnames/bind');
const styles = require('../css/main.css');
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
