import React, { Component } from 'react'
import {Card , List , } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import './product.css'

const Item = List.Item

export default class ProductDetail extends Component {
    render() {
        const title = (
            <span>
                <ArrowLeftOutlined />
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title}>
                <List>
                    <Item>
                        <span className='product-detail-left'></span>
                        <span></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
