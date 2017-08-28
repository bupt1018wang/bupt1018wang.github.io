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
   (function(d, s) {
       var j, e = d.getElementsByTagName(s)[0];

       if (typeof LivereTower === 'function') { return; }

       j = d.createElement(s);
       j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
       j.async = true;

       e.parentNode.insertBefore(j, e);
   })(document, 'script');
    // let text = this.refs.comment;
    // this.autoTextarea(text);

  }




  render() {

    return (
      <div id="lv-container" data-id="city" data-uid="MTAyMC8zMDUwMC83MDU0">

      </div>
    );
  }
};



export default connect()(CSSModules(Comments, styles));