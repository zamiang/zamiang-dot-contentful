import * as React from 'react';
import { Link } from 'react-router';
import * as styles from '../css/components/page-navigation.css';
import { PAGE_SIZE } from '../types';

interface IPageProps extends React.Props<any> {
  currentPage: number;
  totalPosts: number;
}

class PageNavigation extends React.Component<IPageProps, any> {
  public render() {
    const { currentPage, totalPosts } = this.props;
    const maxPages = Math.ceil(totalPosts / PAGE_SIZE);
    const prevPageLink = `/posts/${Number(currentPage) - 1}`;
    const nextPageLink = `/posts/${Number(currentPage) + 1}`;
    const leftArrowClass = ['previous'];
    const rightArrowClass = ['next'];

    if (Number(currentPage) === 1) {
      leftArrowClass.push('hidden');
    } else if (Number(currentPage) === maxPages) {
      rightArrowClass.push('hidden');
    }
    return (
      <div className={styles.pagination}>
        <Link to={prevPageLink} className={styles.previous}>
          Previous
        </Link>
        <span>
          {currentPage} of {maxPages}
        </span>
        <Link to={nextPageLink} className={styles.next}>
          Next
        </Link>
      </div>
    );
  }
}

export default PageNavigation;
