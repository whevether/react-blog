/**
 * Created by Administrator on 2016/11/16 0016.
 * layout reducers
 * 后台侧边栏
 */

import * as actionTypes from '../../constants/actionTypes';
export default function layout(state={sidebarOpen:false,mode:"inline",active:"signin"},action)
{
    switch (action.type)
    {
        case actionTypes.ADMIN_TOGGLE_LAYOUT:
            return Object.assign(...state,{sidebarOpen:action.value,active:"signin"});
        case actionTypes.CLICK_MENU_ACTIVE:
            return Object.assign(...state,{active:action.value});
        default:
            return state;
    }
}