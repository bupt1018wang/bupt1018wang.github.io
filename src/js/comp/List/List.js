import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {getArtcleList} from '../../reducers/index';
import getTime from "../../common/getTime"
import styles from './List.css';
import {Link} from 'react-router-dom';
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artcleList:this.props.artcleList||[],
      type:"card",
      artcleType:"全部"
    }
  }
   componentWillMount(){
    this.props.getArtcleList();
   }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        artcleList:nextProps.artcleList
      });
  } 

  jumpPage(type,e){
    this.setState({
      artcleType:type
    });
  }
  hasLabel(name,labels){
    for(let i=0;i<labels.length;i++){
      if(labels[i].name==name){
        return true;
      }
    }
    return false;
  }
  changeType(){
    let type = this.state.type=="card"?"artcle":"card";
    this.setState({type});
  }
  buildArtcleList() {
    let artcleList = this.state.artcleList;
    let type = this.state.type;
    let artcleType = this.state.artcleType;

    return artcleList.map((item,index)=>{
      if(artcleType !='全部'&&!this.hasLabel(artcleType,item.labels)) return;

      if(type=="artcle"){
        return (
          <span styleName="itemArtcle" key={index}>
          <Link to={"artcle/"+item.number}>
            <span styleName="title">{item.title}</span>
            <span styleName="time">{ getTime(item.created_at)}</span>
            </Link>
          </span>
        );
      }else{
        let body = item.body.substring(0,100)+"...";
        let labels = item.labels.map((l_item,l_index)=>{
          return (
            <span key={l_index} onClick={this.jumpPage.bind(this,l_item.name)}>{l_item.name}</span>
          );
        });
        return (
            <div key={index} styleName="card">
                <div styleName="top">
                    <div styleName="img"><img src={item.user.avatar_url} /></div>
                    <div styleName="user">{item.user.login}</div>
                    <div styleName="time">
                      <span style={{marginRight:"5px"}}>来自</span>
                      { getTime(item.created_at)}
                    </div>
                </div>
                <div styleName="artcle">
                  <div styleName="title"><Link to={"artcle/"+item.number}>{item.title}</Link></div>
                  <div styleName="content">{body}</div>
                  <div styleName="meta">
                    <div styleName="labels">
                      {labels}
                    </div>
                    <div styleName="info">
                        <span styleName="comment_icon"></span>
                        <span styleName="comment">{item.comments}</span>
                    </div>
                  </div>
                </div>
            </div>
        );
      }

    });
  }



  render() {
    return (
      <div>
        <div styleName="wrapper">
        <Link to="/">
        <div className="home">
          <div className="home_icon"></div>
          <div className="home_info">bear blog</div>
        </div>
        </Link>
          <div styleName="top_title">
            <div styleName="icon"></div>
            <span styleName="info">{this.state.artcleType}</span>
            <span styleName="choose"></span>
            <span onClick={this.changeType.bind(this)} styleName="change">切换模式</span>
          </div>
           {this.buildArtcleList()}
        </div>
      </div>
    );
  }
};


const mapStateToProps =(state)=> {
  const artcleList = state.index.artcleList;
  return {artcleList};
}
const mapDispatchToProps = (dispatch) => {
  return {
    getArtcleList: () => {
      dispatch(getArtcleList());
    }
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(List, styles));