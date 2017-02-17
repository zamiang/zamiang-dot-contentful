import * as React from "react";
import { connect } from "react-redux";
import * as Helmet from "react-helmet";
import * as marked from "marked";
import * as moment from "moment";
import { Link } from "react-router";
import { ROOT_URL } from "../types";
import { fetchPosts } from "../actions/posts";
import { IPost } from "../interfaces";
import PageNavigation from "../components/PageNavigation";

const classNames = require("classnames/bind");
const styles = require("../css/components/posts.css");
const cx = classNames.bind(styles);

interface IParams {
  pageNumber: number;
}

interface IPostsProps {
  posts: IPost[];
  totalPosts: number;
  params?: any;
  fetchPosts: any;
};

function mapStateToProps(state: any) {
  return {
    posts: state.posts.posts,
    totalPosts: state.posts.totalPosts,
  };
}

const mapDispatchToProps = { fetchPosts };

class Posts extends React.Component<IPostsProps, any> {

  public static defaultProps = {
    currentPage: 1,
  };

  public static need = [
    fetchPosts,
  ];

  public componentWillReceiveProps(nextProps: IPostsProps) {
    const { params } = this.props;

    // new page
    if (nextProps.params.pageNumber !== params.pageNumber) {
      this.props.fetchPosts(nextProps.params);
    }
  }

  public render() {
    const { posts, totalPosts, params } = this.props;
    const fullTitle = "Brennan Moore | Posts";
    const pageNumber = params.pageNumber || 1;
    const postsHtml = posts.map((post: IPost) => {
      return (
        <div key={post.id} className={cx("post")}>
          <div className={cx("time")}>{moment(post.date).format("Do MMMM YYYY")}</div>
          <div className={cx("title")}><Link to={`/post/${post.slug}`}>{post.title}</Link></div>
          <div className={cx("small-border")} />
          <div className={cx("body")} dangerouslySetInnerHTML={{ __html: marked(post.body) }} />
          <div className={cx("bottom-gradient")}></div>
          <Link className={cx("more-link")} to={`/post/${post.slug}`}>Read More</Link>
        </div>
      );
    });
    return (
      <div className={cx("posts")}>
        <Helmet
          title={fullTitle}
          link={[
            { rel: "canonical", href: `${ROOT_URL}/posts` },
          ]}
          meta={[
            { property: "og:title", content: fullTitle },
          ]} />
        <div className={cx("section")}>
          {postsHtml}
        </div>
        <PageNavigation currentPage={pageNumber} totalPosts={totalPosts} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);
