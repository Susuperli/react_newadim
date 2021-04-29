import React, { Component } from 'react';
import { Redirect,Switch} from 'react-router-dom';
import { Layout } from 'antd';
import NavLeft from '../../components/nav-left'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


import memoryUtils from '../../utils/memoryUtils';
const { Footer, Sider, Content } = Layout;

// 管理路由组件
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        //如果没有user ==> 即没有登录
        if (!user || !user._id) {
            //自动跳转到登陆（在render()中）
            return <Redirect to='/login' /> //使用路由的重定向，指向登陆界面
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <NavLeft/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{margin:20,background:'#fff'}}> 
                        <Switch>
                            <Home path='/home' component={Home}/>
                            <Category path='/category' component={Category}/>
                            <Product path='/product' component={Product}/>
                            <Role path='/role' component={Role}/>
                            <User path='/user' component={User}/>
                            <Bar path='/bar' component={Bar}/>
                            <Line path='/line' component={Line}/>
                            <Pie path='/pie' component={Pie}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center', color:'#ccc', borderTop:'2px solid white'}}>
                        推荐使用Edge浏览器，可以获得更佳页面操作的浏览体验
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
