/**
 * Created by Administrator on 2016/11/16 0016.
 * 侧边栏动作
 */
import * as actionTypes from '../constants/actionTypes';
export function toggleSidebar(value)
{
    return{
      type:actionTypes.TOGGLE_SIDEBAR,
        value:value
    };
}