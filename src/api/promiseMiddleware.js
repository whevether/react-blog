/**
 * Created by Administrator on 2016/11/16 0016.
 * 中间件
 */
export default function promiseMiddleware()
{
    return next=>action=>{
        const {promise,type,...rest} = action;
        if(!promise)return next(action);
        const SUCCESS = `${type}_SUCCESS`;
        const FAILURE = `${type}_FAILURE`;
        return promise.then((res)=>{
            next({...rest,res,type:SUCCESS});
            return true;
        }).catch((err)=>{
            next({...rest,err,type:FAILURE});
           /*eslint-disable no-console*/
            Promise.reject(new Error(err));
            console.log(err);
            return false;
        });

    };
}
