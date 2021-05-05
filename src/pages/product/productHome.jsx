import React, { Component } from 'react'
import { Card, Select, Input, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reqProducts, reqSearchProducts } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
const Option = Select.Option

export default class ProductHome extends Component {
    state = {
        total: 0,  //商品总数量
        products: [], //商品的数组
        loading: false, //loading动画
        searchType: 'productName', //默认为按名称搜索
        searchInput: ''
    }
    getProducts = async (pageNum) => {
        const { searchType, searchInput } = this.state;
        this.setState({ loading: true })  //显示loading
        let result;  //定义结果变量
        if (searchInput) {  //如果有关键词，采用搜索分页
            result = await reqSearchProducts( pageNum, PAGE_SIZE, searchType, searchInput )
        } else {   //如果没有关键词，采用一般分页
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        this.setState({ loading: false })  //隐藏loading
        if (result.status === 0) {
            const { total, list } = result.data;
            this.setState({
                total,
                products: list
            })
        }
    }

    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const { searchType } = this.state;
        const title = (
            <span>
                <Select value={searchType} style={{ width: 150 }} onChange={value => this.setState({ searchType: value })}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} onChange={e => this.setState({ searchInput: e.target.value })} />
                <Button type='primary' onClick={() => this.getProducts(1)} >搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary'>
                <PlusOutlined />
                添加商品
            </Button>
        )
        const { products, total, loading } = this.state

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
                width: 150,
                dataIndex: 'price',
                render: (price) => '￥' + price  //当前dataindex指定了对应的属性，传入对应的属性值；不指定就会是当前对象
            },
            {
                title: '状态',
                width: 150,
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <span>
                            <Button type='primary'> 下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            <a href='#!'>详情</a>
                            <a href='#!'>修改</a>
                        </span>
                    )
                }
            },
        ];
        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={products}
                    loading={loading}
                    columns={columns} bordered
                    rowKey='_id'
                    pagination={{ total, defaultPageSize: PAGE_SIZE, showQuickJumper: true, onChange: this.getProducts }}
                />
            </Card>
        )
    }
}
