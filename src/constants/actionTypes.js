/**
 * Created by Administrator on 2016/11/16 0016.
 * 动作属性
 */
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const REQUEST_IMAGE = 'REQUEST_IMAGE'; //获取数据
export const REQUEST_IMAGE_REQUEST = "REQUEST_IMAGE_REQUEST"; //请求数据
export const REQUEST_IMAGE_SUCCESS = "REQUEST_IMAGE_SUCCESS"; //数据请求成功
export const REQUEST_IMAGE_FAILURE = "REQUEST_IMAGE_FAILURE";//数据请求失败
export const GET_GITHUB_DATA = 'GET_GITHUB_DATA';  //获取github 数据
export const GET_GITHUB_DATA_SUCCESS = 'GET_GITHUB_DATA_SUCCESS'; //获取成功
export const GET_GITHUB_DATA_FAILURE = 'GET_GITHUB_DATA_FAILURE'; //获取失败
//分页文章api
export const GET_ARTICLE = 'GET_ARTICLE';
export const REQUEST_ARTICLE_DATA = 'REQUEST_ARTICLE_DATA';
export const GET_ARTICLE_SUCCESS = 'GET_ARTICLE_SUCCESS';
export const GET_ARTICLE_FAILURE = 'GET_ARTICLE_FAILURE'; 
// 文章内容
export const GET_ARTICLE_DETAILS = 'GET_ARTICLE_DETAILS';
/*验证 action*/
//验证用户
export const AUTH_USER = 'AUTH_USER';
//注销用户
export const UNAUTH_USER = 'UNAUTH_USER';
//验证错误
export const AUTH_ERROR = 'AUTH_ERROR';
//获取后台用户数据
export const FETCH_USER_INFO = 'FETCH_USER_INFO';
/*后台action   type*/
export const ADMIN_TOGGLE_LAYOUT = 'ADMIN_TOGGLE_LAYOUT';
//点击显示当前菜单效果
export const CLICK_MENU_ACTIVE = 'CLICK_MENU_ACTIVE';
// 提交用户信息
export const POST_USER_INFO = 'POST_USER_INFO';
export const USER_INFO_ERROR = 'USER_INFO_ERROR';
// 初始化数据
export const INIT_LOAD_DATA = 'INIT_LOAD_DATA';
// 编辑数据
export const EDIT_USER_INFO = 'EDIT_USER_INFO';
// 删除 获取后台用户数据
export const DELETE_USER_INFO = 'DELETE_USER_INFO';

/*文章类型*/
export const CATEGORY_CREATE = 'CATEGORY_CREATE';
export const CATEGORY_ERROR = 'CATEGORY_ERROR';
export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const DELETE_CATEGOEY = 'DELETE_CATEGOEY';
// 创建文章
export const ARTICLE_CREATE = 'ARTICLE_CREATE';
export const ARTICLE_ERROR = 'ARTICLE_ERROR';
export const FETCH_ARTICLE = 'FETCH_ARTICLE';
export const ARTICLE_EDIT = 'ARTICLE_EDIT';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
// 上传提示信息
export const UPLOAD_SUCCESS_INFO = 'UPLOAD_SUCCESS_INFO';
export const UPLOAD_ERROR_INFO = 'UPLOAD_ERROR_INFO';