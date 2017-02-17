import * as React from "react";
import { Link } from "react-router";

const classNames = require("classnames/bind");
const styles = require("../css/components/header.css");
const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx("header")}>
      <Link className={cx("link")} to={"/"}>Brennan Moore</Link>
    </div>
  );
};

export default Header;
