import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import {BrowserRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import getTime from "../../common/getTime"
import {getArtcleInfo} from '../../reducers/artcle';
import styles from './Artcle.css';
import marked from 'marked';
import Comments from './Comments/Comments';

class Artcle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artcleInfo:this.props.artcleInfo||{},
      number:0
    }
  }
	componentWillMount(){
	 this.props.getArtcleInfo(this.props.match.params.number);	
  }
  componentWillReceiveProps(nextProps) {
      if(JSON.stringify(nextProps.artcleInfo)!="{}"){
        this.setState({
          artcleInfo:nextProps.artcleInfo,
          number:this.props.match.params.number
        });
      }
  } 
  componentDidMount() {
  }
  buildLabel(){
    if(this.state.artcleInfo.labels.length!=0){
      return <span styleName="label">{this.state.artcleInfo.labels[0].name}</span>;
    }
  }


  render() {
  	if(JSON.stringify(this.state.artcleInfo)=="{}") return (<div></div>);
  	let artcleInfo = this.state.artcleInfo;
  	let created_at  = getTime(artcleInfo.created_at);
  	let user = artcleInfo.user.login;
    return (
      <div styleName="box">
      <Link to="/">
      <div className="home">
        <div className="home_icon_g"></div>
        <div className="home_info_g">bear blog</div>
      </div>
      </Link>
        <div styleName="dialog">
          <div styleName="wrapper">
            <div styleName="top">
              <div styleName="title">{artcleInfo.title}</div>
              <div styleName="remark">
                {this.buildLabel()}
                <span>{created_at}</span>
              </div>
            </div>
            <div styleName="content" dangerouslySetInnerHTML={{__html: marked(artcleInfo.body)}}></div>
            <div styleName="comments" ref="comments">
              <Comments number={this.state.number}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


const mapStateToProps =(state)=> {
  const artcleInfo = state.artcle.artcleInfo;
  return {artcleInfo};
}
const mapDispatchToProps = (dispatch) => {
  return {
    getArtcleInfo: (num) => {
      dispatch(getArtcleInfo(num));
    }
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Artcle, styles));