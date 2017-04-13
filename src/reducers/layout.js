/**
 * Created by Administrator on 2016/11/16 0016.
 * layout reducers
 */
import * as actionTypes from '../constants/actionTypes';
export default function layout(state={sidebarOpen:false},action)
{
    switch (action.type)
    {
        case actionTypes.TOGGLE_SIDEBAR:
            return Object.assign(...state,{sidebarOpen:action.value});
        default:
            return state;
    }
}