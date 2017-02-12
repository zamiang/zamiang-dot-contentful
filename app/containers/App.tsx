import * as React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import { fetchSiteData } from '../actions/site-data';

const classNames = require('classnames/bind');
const styles = require('../css/main.css');
const cx = classNames.bind(styles);

interface AppProps extends React.Props<any> {
  isLoading: boolean;
}

function mapStateToProps(state: any) {
  return {
    isLoading: state.article.isLoading || state.siteData.isLoading,
  };
}

const mapDispatchToProps = { fetchSiteData };

class App extends React.Component<AppProps, any> {

  static defaultProps = {
    isLoading: false,
  };

  static need = [
    fetchSiteData,
  ];

  render() {
    const { isLoading } = this.props;
    const bodyClassName = isLoading ? ['body', 'body-loading'] : 'body';
    return (
      <div className={cx('app')}>
        <Header />
        <div className={cx(bodyClassName)}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
