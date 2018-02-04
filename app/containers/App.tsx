import * as React from 'react';
import Footer from './Footer';
import Header from './Header';

const App = (props: React.Props<any>) => {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default App;
