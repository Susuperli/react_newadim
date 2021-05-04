import React, { Component } from 'react'
import { Card, Select, Input, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import {reqProducts} from '../../api'
const Option = Select.Option

export default class ProductHome extends Component {

    getProducts = async (pageNum) => {
        const result = await reqProducts(pageNum , 5)
        if(result.status === 0){
            console.log(result.data)
        }
    }

    componentDidMount(){
        this.getProducts(1)
    }
    render() {
        const title = (
            <span>
                <Select value='1' style={{ width: 150 }}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} />
                <Button type='primary'>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary'>
                <PlusOutlined />
                添加商品
            </Button>
        )
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];

        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render :(price) => '￥' + price  //当前dataindex指定了对应的属性，传入对应的属性值；不指定就会是当前对象
            },
            {
                title: '状态',
                dataIndex: 'status',
                // render
            },
            {
                title: '操作',
            },
        ];
        return (
            <Card title={title} extra={extra}>
                <Table dataSource={dataSource} columns={columns} />
            </Card>
        )
    }
}
