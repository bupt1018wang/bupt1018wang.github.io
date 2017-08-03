import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './Home.css';
import {getUserList} from '../../reducers/home';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:new Date()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    this.timeID = null;
  }
  tick(){
    this.setState({
      date:new Date()
    });
  }

  render() {
    return (
      <div className="wrapper" styleName="wrapper">
      <div styleName="time">
        <div styleName="time_icon"></div>
        <div styleName="time_info">{this.state.date.toLocaleString()}</div>
      </div>
        <div styleName="mine">
          <div styleName="introduce">
              <div styleName="icons">
                <Link to="/blog/guide"><span styleName="me"></span></Link>
                <Link to="/blog/list"><span styleName="list"></span></Link>
                <Link to="/blog/list"><span styleName="photo"></span></Link>
              </div>
              <div styleName="user">{"bear's blog here"}</div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps =(state)=> {
  const userInfo = state.home.userInfo;
  return {userInfo};
}
const mapDispatchToProps = (dispatch) => {
  return {
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Home, styles));