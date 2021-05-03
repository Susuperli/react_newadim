import React, { Component } from 'react'
import { Card, Button, Table, Space, message, Modal, } from 'antd';
import { PlusOutlined, SwapRightOutlined } from '@ant-design/icons'
import UpdateCategory from './addCategory'
import AddCategory from './updateCategory'
 
import { reqCategorys } from '../../api'

export default class Category extends Component {
    state = {
        loading: false,//是否正在获取数据
        categorys: [], //一级分类列表
        subCategorys: [], //字分类列表
        parentId: '0',//当前需要显示的父id
        parentName: '', //分类名称
        showStatus: '0' //标识添加/更新的确认框是否显示，0：都不显示，1：显示添加，2：显示更新
    }

    //获取一级或是二级分类列表显示
    getCategorys = async () => {
        // console.log('我要请求了')
        //请求前用loading
        // console.log('显示前')
        this.setState({ loading: true })  // 显示loading
        // console.log('显示后')
        const { parentId } = this.state
        const result = await reqCategorys(parentId);  //请求分类状态
        // console.log('隐藏前')
        this.setState({ loading: false })   //隐藏loading
        // console.log('隐藏后')
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
        })
    }
    //返回显示一级列表
    showCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
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
                        <a href='#!' onClick={() => this.showUpdate(category)}>修改分类</a>
                        {this.state.parentId === '0' ? <a href='#!' onClick={() => { this.showSubCategorys(category) }}>查看子分类</a> : null}
                    </Space >
                }
            },
        ];
    }
    //点击取消，隐藏确认框
    handleCancel = () => {
        this.setState({
            showStatus: '0'
        })
    }
    //显示添加的确认框
    showAdd = () => {
        this.setState({
            showStatus: '1'
        })
    }
    //添加分类
    addCategory = () => {
        console.log('add')
    }
    //展示更新
    showUpdate = (category) => {
        this.categoryName = category.name;
        this.setState({
            showStatus: '2'
        })
    }
    //更新分类
    updateCategory = () => {
        console.log('update')
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getCategorys(); //获取一级分类列表
    }

    render() {
        // console.log('我渲染了')
        const { categorys, parentId, subCategorys, loading, parentName, showStatus } = this.state  //读取状态值
        const categoryName = this.categoryName || {}; //初始化，如果开始没有传入东西默认为{}，防止未定义而导致的报错。
        const title = parentId === '0' ? '一级列表' : <span> <a href="#!" onClick={this.showCategorys}>一级列表</a><SwapRightOutlined style={{ marginRight: 10, marginLeft: 10 }} />{parentName} </span>;
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
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
                <Modal title="添加分类"
                    visible={showStatus === '1'}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}>
                    <AddCategory></AddCategory>
                </Modal>
                <Modal title="更新分类"
                    visible={showStatus === '2'}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}>
                    <UpdateCategory categoryName={categoryName}  />
                </Modal>
            </Card>
        )
    }
}
