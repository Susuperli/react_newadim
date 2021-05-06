import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'

import './index.css'
import logo from '../../assets/img/logo.png'
const { SubMenu } = Menu;

class NavLeft extends Component {

    // 根据menu生成对应的标签数组
    // 使用map()+递归调用
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname;
        return menuList.map((item) => {
            if (!item.children) {
                return (
                    <Menu.Item
                        key={item.key}
                        icon={item.icon}
                    >
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            } else {
                //有二级菜单的需要判断被默认选中的时候需要展开，不然到时候观察不到默认选中的位置
                //查找一个与当前路径匹配的自item
                const cItem = item.children.find(cItem => path.startsWith(cItem.key))  //如果是以path开头的路径，包括product/detail
                if (cItem) {//如果存在就说明，当前item所对应的子列表需要展开
                    this.openKey = item.key  //把当前的key存入一个变量中
                }
                return (<SubMenu key={item.key} title={item.title} icon={item.icon}>
                    {this.getMenuNodes(item.children)}   {/*在这里使用递归，继续调用该方法*/}
                </SubMenu>)
            }
        })
    }

    // 根据menu生成对应的标签数组
    // reduce()+递归调用
    // getMenuNodes=(menuList) => {
    //     return menuList.reduce((pre,item) => {
    //         //判读是否有children
    //         if(!item.children){
    //             pre.push((<Menu.Item key={item.key} icon={item.icon}>
    //                 <Link to={item.key}>
    //                     {item.title}
    //             </Link>
    //             </Menu.Item>)) 
    //         }else{
    //             (<SubMenu key={item.key}  title={item.title} icon={item.icon }>  
    //                 {this.getMenuNodes(item.children)}   {/*在这里使用递归，继续调用该方法*/}
    //         </SubMenu>)
    //         }
    //     },[])
    // }

    //为第一次render之前执行一次，为第一个render准备数据（必须是同步的）
    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }
    //如何在初选时就默认被选中selectedKeys,同时也需要将该组件变成路由组件Withrouter
    render() {
        let path = this.props.location.pathname;  //在render的一开始去捕捉path的状态，这也是将navLeft转化为路由组件的原因，进而根据path的状态来判断给谁增添新的激活状态
        if(path.startsWith('/product')){  //判断是否是在product的子路由界面中，如果是，将path的改为product
            path='/product'
        }
        //得到需要打开菜单项的key
        const openKey = this.openKey
        return (
            <header to='./' className='nav-left'>
                <div className='nav-left-header'>
                    <img src={logo} alt='加载出错了' />
                    <h1>朗科后台</h1>
                </div>
                <div>
                    <Menu
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        selectedKeys={[path]}
                        defaultOpenKeys={[openKey]}
                    >
                        {this.menuNodes}
                    </Menu>
                </div>
            </header>
        )
    }
}

/*
  使用withRouter高阶组件：
  包装非路由组件，返回一个新的组件
  新的组件能够继承三个属性，分别是：history/location/match
*/
export default withRouter(NavLeft)