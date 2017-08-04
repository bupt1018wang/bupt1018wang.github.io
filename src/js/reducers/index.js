import { combineReducers } from 'redux';
import {CONFIG} from '../config/git_config';
import home from "./home";
import list from "./list";
import artcle from "./artcle";
import comments from "./comments";
import guide from "./guide";
let initialState = {
  token:""
};

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
export function getToken (){
  var code = getQueryString("code");

  var headers = new Headers();
 
  return dispatch=>{
    return fetch(`https://github.com/login/oauth/access_token?client_id=d3a5c10f9a2618727eb0&client_secret=97b17c7e6dbd6e33a39890f7e338e06c337d1104&code=${code}`,{
        mode: "cors"
    })
          .then(response => response).then(res=>{
            console.log(res.text);
              // dispatch({
              //   type:"GET_ARTCLE_LIST",
              //   artcleList:res
              // });
            }
            );
      };
}

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