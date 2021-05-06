import React, { Component } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
const Option = Select.Option

export default class ProductHome extends Component {
    state = {
        total: 0,  //商品总数量
        products: [], //商品的数组
        loading: false, //loading动画
        searchType: 'productName', //默认为按名称搜索
        searchInput: '',
    }
    getProducts = async (pageNum) => {
        this.pageNum = pageNum; //保存pageNum，让其他人看到
        const { searchType, searchInput } = this.state;
        this.setState({ loading: true })  //显示loading
        let result;  //定义结果变量
        if (searchInput) {  //如果有关键词，采用搜索分页
            result = await reqSearchProducts(pageNum, PAGE_SIZE, searchType, searchInput)
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
    updateStatus = async (_id, newStatus) => {
        const result = await reqUpdateStatus(_id, newStatus);
        if (result.status === 0) {
            message.success('更新商品成功');
            this.getProducts(this.pageNum)
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
            <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')} >
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
                // dataIndex: 'status',
                render: (product) => {
                    const { status, _id } = product
                    return (
                        <span>
                            <Button
                                type='primary'
                                onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
                            >
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <span> {status === 1 ? '在售' : '已下架'} </span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            <button style={{ outline: 'none', border: 'none', cursor: 'pointer', background: 'transparent', color: '#1890ff' }} onClick={() => this.props.history.push('/product/detail', product)} >详情</button>  {/*push方法的第二个参数，可以将product通过location传到目标组件 */}
                            <br></br>
                            <button style={{ outline: 'none', border: 'none', cursor: 'pointer', background: 'transparent', color: '#1890ff' }} onClick={() => this.props.history.push('/product/addupdate', product)}>修改</button>
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
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts  //页面的监听 (pageNum) => this.getProducts(pageNum)
                    }}
                />
            </Card>
        )
    }
}

/*
1)分页显示
   界面：<Card> / <Table> / <Select> / <Icon> / <Input> / <Button>
   状态：product / total
   接口请求函数需要的数据：pageNum，pageSize
       异步获取第一页的数据的显示
       调用分页接口请求函数，获取到当前页的product和总记录数total
        更新状态：produts / total
    翻页：
        绑定翻页的监听，监听回调需要得到pageNum
        异步获取指定页码的数据显示
2)搜索分页
  接口函数所需要的数据
       pageSize, pageNum  , productType等
    异步更新搜索显示分页
       如果searchName有值，调用搜索函数的函数获取数据并更新状态
3)更新商品的状态
    初始显示：根据product的status属性来显示  status = 1/2
    点击切换：
        绑定点击监听
        异步请求更新状态
4)进入详情界面
    history.push('/product/detail', {product})
5)进入添加分页
    history.push('/product/detail',{product})

productDetail组件
   Promise.all([promise1,promise2])
   返回值是一个promise对象，异步得到的是promise的结果的函数
   特点是： 一次发送多个请求，只有全部请求成功，才成功，并且能得到成功数据，一旦有失败
*/
