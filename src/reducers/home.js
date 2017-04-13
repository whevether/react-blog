/**
 * Created by Administrator on 2016/11/17 0017.
 */
import * as actionTypes from '../constants/actionTypes';
//home reducer
export default function requestImg(state={ photos:[],loadeAll:false},action)
{

    /*eslint-disable*/
    switch (action.type)
    {
        case actionTypes.REQUEST_IMAGE_REQUEST:
           return Object.assign(...state,{loadeAll:true});
        case actionTypes.REQUEST_IMAGE_SUCCESS:
            let data = [];
            if(action.res && action.res.data)
            {
                data = action.res.data.images.map((img)=>{
                    let aspectRatio = parseFloat(500 / 500);
                    let reg = /^[p][u][b][l][i][c]\\/;
                    let path = img.path.replace(reg,'')
                    return{
                        src: path,
                        width: parseInt(500),
                        height: parseInt(500),
                        aspectRatio: aspectRatio,
                        lightboxImage:{src: path, caption: img.desc}
                    };
                });
            }
            return Object.assign(...state,{photos:data,loadeAll:false,count:action.res.data.count});
        case actionTypes.REQUEST_IMAGE_FAILURE:
            return Object.assign(...state,{error:action.value,loadAll:false});
        default:
            return state;
    }

}
