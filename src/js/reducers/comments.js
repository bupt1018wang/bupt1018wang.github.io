import fetch from 'isomorphic-fetch';
import {CONFIG} from '../config/git_config';
let initialState = {
  commentsArr:[]
};

export function getComments (number){

	return dispatch=>{
		return fetch(`https://api.github.com/repos/bupt1018wang/blog/issues/${number}/comments?`)
		      .then(response => response.json()).then(res=>{
		      		dispatch({
		      			type:"GET_COMMENTS",
                commentsArr:res
		      		});
		      	}
		      );
			};
}

export function postComments (id,content){
  var cont =JSON.stringify({
    "user":"游客",
    "content":content
  });
  var headers = new Headers();
  headers.append('Accept', 'application/vnd.github.squirrel-girl-preview'); 

  // headers.append('Content-Type','application/x-www-form-urlencoded;charset=utf-8'); 
  var request = new Request(`https://api.github.com/repos/bupt1018wang/blog/issues/${id}/comments?client_id=d3a5c10f9a2618727eb0&client_secret=97b17c7e6dbd6e33a39890f7e338e06c337d1104`, {
      headers: headers,
      method:"POST",
      body:JSON.stringify({
        body:cont
      })
  });
  return dispatch=>{
    return fetch(request)
          .then(response => response.json()).then(res=>{
              dispatch({
                type:"GET_COMMENTS_RESPONSE",
                theComment:res
              });              
            }
          );
      };
}

// export function getReactions(){
//   var headers = new Headers();
//   headers.append('Accept', 'application/vnd.github.squirrel-girl-preview'); 
//   var request = new Request(`https://api.github.com/repos/bupt1018wang/blog/issues/1/reactions`, {
//       headers: headers,
//       method:"GET"
//   });
//   return dispatch=>{
//     return fetch(request)
//           .then(response => response.json()).then(res=>{
//               dispatch({
//                 type:"GET_ARTCLE_LIST",
//                 artcleList:res
//               });
//             }
//             );
//     };
      
// }
export default function reducers(state=initialState,action){
  switch (action.type) {
    case "GET_COMMENTS":
      return Object.assign({}, initialState, {
        commentsArr:action.commentsArr
      });
    case "GET_COMMENTS_RESPONSE":
      return Object.assign({}, initialState, {
        theComment:action.theComment
      });
    default:
      return initialState;
  }	
}

