import fetch from 'isomorphic-fetch';

let initialState = {
  userInfo:{
    user:"熊饲养员王叔叔"
  }
};

// export function getUserList (){
// 	console.log(123);
// 	return dispatch=>{
// 		return fetch(`/aj/admin`)
// 		      .then(response => response.json()).then(res=>{
// 		      		dispatch({
// 		      			type:"REQUEST_ISSUES"
// 		      		});
// 		      	}
// 		      	);
// 			};
// }

export default function reducers(state=initialState,action){
  switch (action.type) {

    case "REQUEST_ISSUES":
      // 获取issues
      return Object.assign({}, initialState, {
        isFetching: true
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

