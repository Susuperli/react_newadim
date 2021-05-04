import React, { Component } from 'react'
import {Route , Switch , Redirect } from 'react-router-dom'

import ProductHome from './productHome'
import ProductAdd_Update from './productAdd_Update'
import ProductDetail from './productDetail'

export default class Product extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/product' component = {ProductHome} exact/>  {/*精确匹配到home组件*/}
                    <Route path='/product/addupdate' component={ProductAdd_Update} />
                    <Route path='/product/detail' component={ProductDetail} />
                    <Redirect to='/product' />
                </Switch>
            </div>
        )
    }
}
