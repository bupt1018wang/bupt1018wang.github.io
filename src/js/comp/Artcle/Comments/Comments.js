import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import {BrowserRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import {getComments,postComments} from '../../../reducers/comments';
import styles from './Comments.css';
import marked from 'marked';
import getTime from "../../../common/getTime"


class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsArr:this.props.commentsArr||[]
    }
  }
	componentWillMount(){
	 this.props.getComments(this.props.number);	
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.theComment!=undefined){
      let commentsArr = this.state.commentsArr;
      commentsArr.unshift(nextProps.theComment);
      this.setState({commentsArr});
    }else{
      let commentsArr = nextProps.commentsArr.reverse();
      this.setState({
        commentsArr:commentsArr
      }); 
    }

    this.refs.comment.value = "";

  } 
  componentDidMount() {
    let text = this.refs.comment;
    this.autoTextarea(text);

  }

  autoTextarea(elem, extra, maxHeight) {
          extra = extra || 0;
          var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
          isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                  addEvent = function (type, callback) {
                          elem.addEventListener ?
                                  elem.addEventListener(type, callback, false) :
                                  elem.attachEvent('on' + type, callback);
                  },
                  getStyle = elem.currentStyle ? function (name) {
                          var val = elem.currentStyle[name];
   
                          if (name === 'height' && val.search(/px/i) !== 1) {
                                  var rect = elem.getBoundingClientRect();
                                  return rect.bottom - rect.top -
                                          parseFloat(getStyle('paddingTop')) -
                                          parseFloat(getStyle('paddingBottom')) + 'px';        
                          };
   
                          return val;
                  } : function (name) {
                                  return getComputedStyle(elem, null)[name];
                  },
                  minHeight = parseFloat(getStyle('height'));
   
          elem.style.resize = 'none';
   
          var change = function () {
                  var scrollTop, height,
                          padding = 0,
                          style = elem.style;
   
                  if (elem._length === elem.value.length) return;
                  elem._length = elem.value.length;
   
                  if (!isFirefox && !isOpera) {
                          padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
                  };
                  scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
   
                  elem.style.height = minHeight + 'px';
                  if (elem.scrollHeight > minHeight) {
                          if (maxHeight && elem.scrollHeight > maxHeight) {
                                  height = maxHeight - padding;
                                  style.overflowY = 'auto';
                          } else {
                                  height = elem.scrollHeight - padding;
                                  style.overflowY = 'hidden';
                          };
                          style.height = height + extra + 'px';
                          scrollTop += parseInt(style.height) - elem.currHeight;
                          document.body.scrollTop = scrollTop;
                          document.documentElement.scrollTop = scrollTop;
                          elem.currHeight = parseInt(style.height);
                  };
          };
   
          addEvent('propertychange', change);
          addEvent('input', change);
          addEvent('focus', change);
          change();
  }

  comment(e){
    let content = this.refs.comment.value;
  
    if(content=="") return;
    this.props.postComments(this.props.number,content);
  }
  buildContent() {

    return this.state.commentsArr.map((item,index)=>{
        let user =JSON.parse(item.body).user;
        let content = JSON.parse(item.body).content;

        return (
            <div key={index} styleName='comment'>
              <div styleName='top'>
                <div styleName='img'><img src={item.user.avatar_url} /></div>
                <div styleName="info">
                  <span styleName="user">{user}</span>
                  <span styleName="time">{getTime(item.created_at)}</span>
                </div>
              </div>
              <div styleName="content" dangerouslySetInnerHTML={{__html: marked(content)}}></div>

            </div>
          );
    });
  }

  render() {

    return (
      <div>
        <div styleName="write">
            <textarea ref="comment" styleName="comment"></textarea>
            <span onClick={this.comment.bind(this)}>评论</span>
          </div>
        <div styleName="title">全部评论({this.state.commentsArr.length})</div>
          {this.buildContent()}
      </div>
    );
  }
};


const mapStateToProps =(state)=> {
  const commentsArr = state.comments.commentsArr;
  const theComment = state.comments.theComment;
  return {commentsArr,theComment};
}
const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (num) => {
      dispatch(getComments(num));
    },
    postComments: (id,content) => {
      dispatch(postComments(id,content));
    }
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Comments, styles));