import fetch from 'isomorphic-fetch';
import { CONFIG } from '../config/git_config';
let initialState = {
  artcleList:[]
};


export function getArtcleList (){
  
	return dispatch=>{
		return fetch(`https://api.github.com/repos/bupt1018wang/bupt1018wang.github.io/issues`)
		      .then(response => response.json()).then(res=>{
		      		dispatch({
		      			type:"GET_ARTCLE_LIST",
                artcleList:res
		      		});
		      	}
		      	);
			};
}


export default function reducers(state=initialState,action){
  switch (action.type) {
    // case "GET_ARTCLE_LIST":
    //   // 获取issues
    //   return Object.assign({}, initialState, {
    //     artcleList:action.artcleList
    //   });
    default:
      return initialState;
  }	
}

