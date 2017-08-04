import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom';
import NProgress from 'nprogress';
import Home from '../Home/Home';
import List from '../List/List';
import Artcle from '../Artcle/Artcle';
import Guide from '../Guide/Guide';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import  '../../../css/index.css';
import {getUserInfo} from '../../reducers/index';


// const routes = [
//   { path: '/list',
//     component: List
//   },
//   { path: '/home',
//     component: Home,
//     routes: [
//       { path: '/list',
//         component: List
//       },
//     ]
//   }
// ]
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //this.props.getUserInfo();
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <Router>
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionEnterTimeout={800}
                    transitionLeaveTimeout={300}
                >
                    <div key={location.pathname}>
                    <Switch>
                      <Route  exact path="/home" component={Home}/>
                      <Route  exact path="/list" component={List}/> 
                      <Route  exact path="/guide" component={Guide}/>           
                      <Route  exact path="/artcle/:number" component={Artcle}/>
                      <Redirect from="/" to="/home"/>
                    </Switch>
                    </div>
                </ReactCSSTransitionGroup>
            

 
      </Router>
    );
  }
};

const mapStateToProps =(state)=> {
  const userInfo = state.userInfo;
  return {userInfo};
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => {
      dispatch(getUserInfo());
    }
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(App);