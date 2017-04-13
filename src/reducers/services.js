/**
 * Created by Administrator on 2016/12/6 0006.
 */
import * as types from '../constants/actionTypes';
export default function fetchInfo(state={data:[],loadAll:false,details:null},action)
{
    switch(action.type)
    {
        case types.REQUEST_ARTICLE_DATA:
            return Object.assign(...state,{loadAll:true});
        case types.GET_ARTICLE_SUCCESS:
            let data = [];
            if(action.res.data.article)
            {
                data = action.res.data.article.map((i,j)=>{
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
            return Object.assign(...state,{data:data,loadAll:false,count:action.res.data.count});
        case types.GET_ARTICLE_DETAILS:
            return Object.assign(...state,{details:action.value,loadAll:false});
        case types.GET_ARTICLE_FAILURE:
            return Object.assign(...state,{error:action.value,loadAll:false});
        default:
            return state;
    }
}