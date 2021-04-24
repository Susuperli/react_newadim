// 能发送异步ajax请求的函数模块
// 封装axios库
// 函数返回值是一个promise对象
/*
1、优化：统一处理请求异常
   在外层包一个自己创建的promise对象
   在请求出错时，不去reject（error），而是现实错误提示。
2、优化2：异步得到不是response而是response.data
   在请求成功resolve时，resolve(response.data)
*/

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},method='GET') {

    return new Promise((resolve,reject)=>{
        let promise;
        //1、异步ajax请求
        if(method==='GET') {  //发送GET请求
            promise=axios.get(url,{  //配置对象
                params: data //指定请求参数
            })
        } else {  //POST请求
            promise=axios.post(url,data)
        }
        //2、成功，调用resolve(value)
        promise.then(response => {
            resolve(response.data)
        //3、失败了，不调用reject(reason)，而是提示异常信息
        }).catch(error => {
            //reject(error)
            message.error('请求出错了'+ error.message)
        })
    })
}
