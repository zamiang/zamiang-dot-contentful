import * as React from 'react';
import * as styles from '../css/main.css';
import Footer from './Footer';
import Header from './Header';

const App = (props: React.Props<any>) => {
  return (
    <div className={styles.body}>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default App;
