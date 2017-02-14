import * as React from 'react';
import { Link } from 'react-router';
import { PAGE_SIZE } from '../types';

const classNames = require('classnames/bind');
const styles = require('../css/components/page-navigation');
const cx = classNames.bind(styles);

interface PageProps extends React.Props<any> {
  currentPage: number;
  totalPosts: number;
}

class PageNavigation extends React.Component<PageProps, any> {

  render() {
    const { currentPage, totalPosts } = this.props;
    const maxPages = Math.ceil(totalPosts / PAGE_SIZE);
    const prevPageLink = `/posts/${currentPage - 1}`;
    const nextPageLink = `/posts/${currentPage + 1}`;
    const leftArrowClass = ['arrow', 'arrow-left'];
    const rightArrowClass = ['arrow', 'arrow-right'];
    if (currentPage === 1) {
      leftArrowClass.push('arrow-hidden');
    } else if (currentPage === maxPages) {
      rightArrowClass.push('arrow-hidden');
    }
    return (
      <div className={cx('page-navigation')}>
        <div className={cx('arrow-container')}>
          <Link to={prevPageLink} className={cx(leftArrowClass)}>Prev</Link>
        </div>
        <div className={cx('arrow-container')}>
          <Link to={nextPageLink} className={cx(rightArrowClass)}>Next</Link>
        </div>
      </div>
    );
  }
}

export default PageNavigation;
