import { combineReducers } from 'redux';
import {CONFIG} from '../config/git_config';
import home from "./home";
import list from "./list";
import artcle from "./artcle";
import comments from "./comments";
import guide from "./guide";
let initialState = {
  userInfo:{
    user:"王叔叔"
  }
};


export function getArtcleList (){
  var headers = new Headers();
  headers.append('Authorization', CONFIG.Authorization); 
  return dispatch=>{
    return fetch(`https://api.github.com/repos/bupt1018wang/blog/issues`)
          .then(response => response.json()).then(res=>{
              dispatch({
                type:"GET_ARTCLE_LIST",
                artcleList:res
              });
            }
            );
      };
}

function reducers(state=initialState,action){
  switch (action.type) {
    case "GET_ARTCLE_LIST":

      console.log(action.artcleList);
      // 获取issues
      return Object.assign({}, initialState, {
        artcleList:action.artcleList
      });

    case "RECEIVE_ISSUES":
      // 接收issues
      return Object.assign({}, initialState, {
        isFetching: false,
        items: action.posts
      });

    default:
      return initialState;
  }	
}

export default combineReducers({
  index:reducers,
  home:home,
  list:list,
  artcle:artcle,
  comments:comments,
  guide:guide
});