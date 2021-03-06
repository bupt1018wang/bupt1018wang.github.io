import fetch from 'isomorphic-fetch';
import { CONFIG } from '../config/git_config';
let initialState = {
  artcleInfo:{}
};

export function getArtcleInfo (number){
  var headers = new Headers();
  headers.append('Authorization', CONFIG.Authorization); 
	return dispatch=>{
		return fetch(`https://api.github.com/repos/bupt1018wang/bupt1018wang.github.io/issues/${number}`)
		      .then(
              response => response.json()).then(res=>{

              dispatch({
                type:"GET_ARTCLE_INFO",
                artcleInfo:res
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
    case "GET_ARTCLE_INFO":
      // 获取issues
      return Object.assign({}, initialState, {
        artcleInfo:action.artcleInfo
      });

    default:
      return initialState;
  }	
}

