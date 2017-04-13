import * as types from '../../constants/actionTypes';
const initState = {
    isFetching: true
};
// 文章reducers
export default function(state=initState,action)
{
    switch(action.type)
    {
        /*eslint-disable no-case-declarations*/ 
        case types.ARTICLE_CREATE:
            return Object.assign(...state,{msg:action.value});
        case types.ARTICLE_ERROR:
            return Object.assign(...state,{error:action.value});
        case types.FETCH_ARTICLE:
            let table = [];
            if(action.value)
            {
                table = action.value.map((i,j)=>{
                    return {
                        key:j,
                        title:i.title,
                        author:i.author,
                        desc:i.desc,
                        content:i.content,
                        category:i.category,
                        createdate:i.createdate,
                        id:i._id
                    };
                });
            }
            return Object.assign(...state,{table:table,isFetching:false});
        case types.ARTICLE_EDIT:
            let editmsg = {};
            if(action.value)
            {
                editmsg = action.value;
            }
            return Object.assign(...state,{msg:editmsg});
        case types.DELETE_ARTICLE:
            let delmsg = {};
            if(action.value)
            {
                delmsg = action.value;
            }
            return Object.assign(...state,{msg:delmsg});
        default:
            return state; 
    }
}