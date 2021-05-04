import React, { Component } from 'react'
import { Card, Button, Table, Space, message, Modal, } from 'antd';
import { PlusOutlined, SwapRightOutlined } from '@ant-design/icons'
import UpdateCategory from './updateCategory'
import AddCategory from './addCategory'

import { reqCategorys, reqUpdateCategorys , reqAddCategorys } from '../../api'

export default class Category extends Component {
    state = {
        loading: false,//是否正在获取数据
        categorys: [], //一级分类列表
        subCategorys: [], //子分类列表
        parentId: '0',//当前需要显示的父id，判断显示一级还是二级列表。
        parentName: '', //分类名称
        showStatus: '0' //标识添加/更新的确认框是否显示，0：都不显示，1：显示添加，2：显示更新
    }

    //获取一级或是二级分类列表显示
    getCategorys = async () => {
        this.setState({ loading: true })  // 显示loading
        const { parentId } = this.state
        const result = await reqCategorys(parentId);  //请求分类状态
        this.setState({ loading: false })   //隐藏loading
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
            parentId: category._id,  //更改parentId来改变列表的获取
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
    addCategory = async () => {
        //隐藏确认框
        this.setState({
            showStatus: 0
        })
        //收集数据，提交请求
        const categoryName=this.AddCategoryName;  //获取需要添加的name 
        const AddCategoryId=this.AddCategoryId;  //默认的id值
        const AddChangeCategoryId=this.AddChangeCategoryId;  //更改的id值
        if(!AddChangeCategoryId){ //如果没有更改就获取默认的id值。
            const result=await reqAddCategorys(categoryName,AddCategoryId);  //传入默认的id值
            if(result.status===0){
                //重新获取分类列表显示
                this.getCategorys()
            }
        }else if (AddChangeCategoryId){  //如果检测到了id值的变化
            const result=await reqAddCategorys(categoryName,AddChangeCategoryId);  //传入变化后的id值
            if(result.status===0){
                //重新获取分类列表显示
                this.getCategorys()  //刷新
            }
        }
             
    }
    //展示更新
    showUpdate = category => {
        this.category = category;
        this.categoryName=category.name || '';//初始化，如果开始没有传入东西默认为''，防止未定义而导致的报错,以及会出现空对象现象。
        this.setState({
            showStatus: '2'
        })
    }
    //更新分类
    updateCategory = async () => {
        //1、关闭显示框
        this.setState({
            showStatus: '0' //关闭显示框
        })
        // 2、准备数据，请求更新数据
        const categoryName = this.UpdateCategoryName;  //获取有子组件传过来的id
        const categoryId = this.category._id;  //获取id
        // console.log(this.categoryName)
        const result = await reqUpdateCategorys({ categoryName, categoryId })
        if (result.status === 0) {
            //3、重新获取列表
            this.getCategorys()
        }
        console.log('update')
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getCategorys(); //获取一级分类列表
    }

    render() {
        const { categorys, parentId, subCategorys, loading, parentName, showStatus } = this.state  //读取状态值
        const categoryName = this.categoryName; 
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
                />
                <Modal title="添加分类"
                    visible={showStatus === '1'}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}>
                    <AddCategory 
                    categorys={categorys}
                    parentId={parentId}
                    addCategoryName={this.state.parentName}
                    getAddCategoryName={(newCategoryName)=>{this.AddCategoryName=newCategoryName}} 
                    getAddCategoryId={(newCategoryId)=>{this.AddCategoryId=newCategoryId}} 
                    getChangeAddCategoryId={(newCategoryId)=>{this.AddChangeCategoryId=newCategoryId}}
                    />
                </Modal>
                <Modal title="更新分类"
                    visible={showStatus === '2'}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}>
                    <UpdateCategory
                    categoryName={categoryName} 
                    getUpdateCategoryName={(newCategoryName)=>{this.UpdateCategoryName=newCategoryName}} 
                    />
                </Modal>
            </Card>
        )
    }
}
