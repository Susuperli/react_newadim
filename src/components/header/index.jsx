import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './index.css'

import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import {reqCity} from '../../api'
import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig'

class Header extends Component {
    state={
        currentTime:formateDate(Date.now()),
        city:'',  //城市
        weather:'', //天气
    }
    getTime=()=>{
        //每隔一秒都更新事件
        setInterval(() => {
            const currentTime = formateDate(Date.now());
            this.setState({currentTime})
        }, 1000);
    }
    getWeather=async () => {
        //调用接口获取即时的地理信息
        const {adcode} = await reqCity()
        //调用接口获取信息
        const {city,weather}=await reqWeather(adcode);
        this.setState({city,weather})
    }
    getTitle=()=>{
        const path= this.props.location.pathname  //获取当前的path
        let title;
        menuList.forEach(item => {
            if(item.key===path){  //如果一级列表中，满足path条件写入即可
                title=item.title
            }else if(item.children){  //二级情况，如果有二级
                const cItem=item.children.find(cItem => cItem.key===path)
                if(cItem){
                    title=cItem.title
                }
            }
        })
        return title  //返回title
    }
    componentDidMount(){
        this.getTime()  //获取当前时间
        this.getWeather()  //获取当前时间
    }
    render() {
        const {currentTime,city,weather}=this.state;
        const {username}=memoryUtils.user
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎您，{username}</span>
                    <a href="#！">退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='hearder-bottom-left'>{title}</div>
                    <div className='hearder-bottom-right'>
                        <span>{currentTime}</span>
                        <span>{city}</span>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
