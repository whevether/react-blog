/**
 * Created by Administrator on 2017/1/22 0022.
 */
import * as types from '../../constants/actionTypes';
export function adminToggleSidebar(value)
{
    return{
        type:types.ADMIN_TOGGLE_LAYOUT,
        value:value
    };
}
export function adminClickMenu(value)
{
    return{
        type:types.CLICK_MENU_ACTIVE,
        value:value
    };
}
