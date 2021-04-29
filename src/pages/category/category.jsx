import React, { Component } from 'react'
import { Card, Button, Table, Space, message } from 'antd';
import { PlusOutlined,SwapRightOutlined } from '@ant-design/icons'

import { reqCategorys } from '../../api'

export default class Category extends Component {
    state = {
        loading: false,//是否正在获取数据
        categorys: [], //一级分类列表
        subCategorys: [], //字分类列表
        parentId: '0',//当前需要显示的父id
        parentName: '', //分类名称
    }

    //获取一级或是二级分类列表显示
    getCategorys = async () => {
        //请求前用loading
        this.setState({ loading: true })
        const { parentId } = this.state
        const result = await reqCategorys(parentId);
        this.setState({ loading: false })
        if (result.status === 0) {
            //取出分类列表可能是一级的也可能是二级的
            const categorys = result.data;
            if (parentId === '0') {
                this.setState({ categorys }); //更新一级分类状态
            } else {
                this.setState({ subCategorys: categorys }); //更新二级分类状态
            }
        } else {
            message.error('获取分类列表失败')
        }
    }
    //显示指定二级列表
    showSubCategorys = category => {
        // 更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name,
        }, () => {  //在状态更新且render之后执行
            //获取二级列表显示
            this.getCategorys()
            console.log(this.state.subCategorys)
        })
    }
    //返回显示一级列表
    showCategorys = ()=>{
        this.setState({
            parentId:'0',
            parentName:'',
            subCategorys:[]
        })
    }
    initColumns = () => {
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                key: 'name',
                width: 300,
                render: (category) => {  //传入当前事件的数组
                    return <Space size="middle">
                        <a href='#!'>修改分类</a>
                        {this.state.parentId==='0'?<a href='#!' onClick={() => { this.showSubCategorys(category) }}>查看子分类</a>:null}
                    </Space >
                }
            },
        ];
    }
    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getCategorys(); //获取一级分类列表
    }
    render() {
        const { categorys, parentId, subCategorys, loading ,parentName} = this.state  //读取状态值
        const title =  parentId==='0'? '一级列表' :<span> <a href="#!" onClick={this.showCategorys}>一级列表</a><SwapRightOutlined style={{marginRight : 10,marginLeft : 10}} />{parentName} </span> ;
        const extra = (
            <Button type='primary'>
                <PlusOutlined /> 添加
            </Button>
        )
        return (
            <Card title={title} extra={extra} >
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={parentId === '0' ? categorys : subCategorys}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true, }}
                />;
            </Card>
        )
    }
}
