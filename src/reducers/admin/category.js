import * as types from '../../constants/actionTypes';
const initState = {
    isFetching: true
};
// 文章类型
export default function(state=initState,action)
{
    switch(action.type)
    {
        /*eslint-disable no-case-declarations*/ 
        case types.CATEGORY_CREATE:
            let msg = {};
            if(action.value)
            {
                msg = action.value;
            }
            return Object.assign(...state,{msg:msg});
        case types.FETCH_CATEGORY:
            let data = [];
            if(action.value)
            {
                data = action.value.map((i,j)=>{
                    return {
                        key:j,
                        name:i.name,
                        path:i.path,
                        desc:i.desc,
                        id:i._id
                    };
                });
            }
            return Object.assign(...state,{data:data,isFetching:false});
        case types.EDIT_CATEGORY:
            let editmsg = {};
            if(action.value)
            {
                editmsg = action.value;
            }
            return Object.assign(...state,{msg:editmsg});
        case types.INIT_LOAD_DATA:
            return Object.assign(...state,{initdata:action.value});
        case types.DELETE_CATEGOEY:
            let delmsg = {};
            if(action.value)
            {
                delmsg = action.value;
            }
            return Object.assign(...state,{msg:delmsg});
        case types.CATEGORY_ERROR:
            return Object.assign(...state,{error:action.value});
        default:
            return state;
    }
}