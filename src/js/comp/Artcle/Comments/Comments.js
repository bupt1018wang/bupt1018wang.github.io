import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import {BrowserRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Comments.css';
import marked from 'marked';
import getTime from "../../../common/getTime"


class Comments extends Component {
  constructor(props) {
    super(props);
  }
	componentWillMount(){

  }
  componentWillReceiveProps(nextProps) {


  } 
  componentDidMount() {

    // let text = this.refs.comment;
    // this.autoTextarea(text);

  }




  render() {

    return (
      <div>
        <div styleName="notice">tips:移动端微信登陆貌似有些问题,请见谅TAT</div>
        <div id="uyan_frame">

        </div>
      </div>
    );
  }
};



export default connect()(CSSModules(Comments, styles));