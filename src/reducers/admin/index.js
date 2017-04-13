import * as types from '../../constants/actionTypes';
const initialState = {
    isFetching: true
};
export default function userInfo(state=initialState,action)
{
    /*eslint-disable no-case-declarations*/ 
    switch(action.type)
    {
        case types.POST_USER_INFO:
            let data= {};
            if(action.value !== undefined)
            {
                data = action.value;
            }
            return Object.assign(...state,{isUserInfo:data});
        case types.FETCH_USER_INFO:
            let userdata = [];
            if(action.value)
            {
               userdata = action.value.map((i,j)=>{
                   return{
                        key:j,
                        name:i.name,
                        age:i.age,
                        sex:i.sex,
                        hobby:i.hobby,
                        specialty:i.specialty,
                        occupation:i.occupation,
                        id:i._id
                   };
               });
            }
            return Object.assign(...state,{data:userdata,isFetching:false});
        case types.EDIT_USER_INFO:
            let msg = {};
            if(action.value)
            {
                msg = action.value;
            }
            return Object.assign(...state,{msg:msg});
        case types.INIT_LOAD_DATA:
            return Object.assign(...state,{initdata:action.value});
        case types.DELETE_USER_INFO:
            return Object.assign(...state,{msg:action.value});
        case types.USER_INFO_ERROR:
            let error = {};
            if(action.value)
            {
                error = action.value;
            }
            return Object.assign(...state,{error:error});
        default:
            return state;
    }
}