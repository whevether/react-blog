import { combineReducers } from 'redux';
import {reducer as reduceForm} from 'redux-form';
import layout from  './layout';
import {routerReducer} from 'react-router-redux';
import home from './home';
import protfolio from './protfolio';
import services from './services';
import auth from './auth';
import about from './about';
/*后台reducers*/
import adminIndex from './admin/index';
import adminlayout from './admin/layout';
//文章
import adminArticle from './admin/article';
// 文章类型
import adminCategory from './admin/category';
// 上传图片
import adminUpload from './admin/upload';
const rootReducer = combineReducers({
    layout:layout,
    home:home,
    protfolio:protfolio,
    info:services,
    auth:auth,
    about:about,
    adminIndex:adminIndex,
    adminlayout:adminlayout,
    adminArticle:adminArticle,
    adminCategory:adminCategory,
    adminUpload: adminUpload,
    form:reduceForm, //挂载redux-form   如果不挂载会报一堆的错误
    routing: routerReducer
});
export default rootReducer;
