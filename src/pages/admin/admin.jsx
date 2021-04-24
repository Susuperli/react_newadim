import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import memoryUtils from '../../utils/memoryUtils';

// 管理路由组件
export default class Admin extends Component {
    render() {
        const user=memoryUtils.user;
        //如果没有user ==> 即没有登录
        if(!user || !user._id){
            //自动跳转到登陆（在render()中）
            return <Redirect to='/login' /> //使用路由的重定向，指向登陆界面
        }
        return (
            <div>
                Hello {user.username}
            </div>
        )
    }
}
