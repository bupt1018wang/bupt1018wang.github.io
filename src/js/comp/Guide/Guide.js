import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './Guide.css';
import {getUserList} from '../../reducers/guide';

class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:new Date()
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
 
  }


  render() {
    return (
      <div className="wrapper" styleName="wrapper">
          这个页面儿还在捣弄
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
    getUserList: () => {
      dispatch(getUserList());
    }
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Guide, styles));