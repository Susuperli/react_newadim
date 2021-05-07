import React, { Component } from 'react'
import { Card, Form, Button, Input,  Cascader, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqCategorys,reqAddAndUpdateProduct } from '../../api'

// import PictureWall from './pictureWall'

const { Item } = Form;
const { TextArea } = Input;

export default class ProductAdd_Update extends Component {
    state = {
        options: []
    }

    onChange = (value) => {
        console.log(value);
    }
    //用于加载下一级列表的回调函数
    loadData = async (selectedOptions) => {
        //得到选择的option对象
        const targetOption = selectedOptions[0];
        //显示loading
        targetOption.loading = true;
        //根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
        //隐藏loading
        targetOption.loading = false;
        if (subCategorys && subCategorys.length > 0) {  //有二级分类
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true, //我是叶子
            }))
            targetOption.children = childOptions;
        } else {  //当前选择的没有二级分类
            targetOption.isLeaf = true;  //把叶子变没
        }
        //更新状态，为什么上面的动作可以更新状态里面的数据呢？
        //这里是因为在JavaScript中，函数参数的传递都是值传递（这里的值传递就是指栈传递），传过来的当前对象只是一个地址，通过地址改变的是对象本身，故而能够在这里改变state的值。
        this.setState({
            options: [...this.state.options]
        })
    }

    innitOptions = async (categorys) => {
        //根据categorys生成options数组并且
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, //我不是叶子
        }))

        //当修改指令到来时,且是一个二级分类列表
        const {isUpdate , product} = this;
        const {pCategoryId } = product;
        if( isUpdate && pCategoryId !== '0'){  //判断是不是一个二级列表
            const subCategorys = await this.getCategorys(pCategoryId);//获取这个二级列表
            const clidrenOptions=subCategorys.map(c => ({  //遍历二级列表返回一个子对象
                value: c._id,
                label: c.name,
                isLeaf: true, //我是叶子
            }))
            //将子对象挂载在一级列表上
            const targetOptions=options.find(option => option.value === pCategoryId)  //找到要挂载的一级列表，根据两个id值相等来找
            targetOptions.children=clidrenOptions; //将生成的子对象挂载在一级列表的children属性上
        }

        //更新状态
        this.setState({
            options
        })
    }
    //async函数的返回值是一个新的promise对象，promise对象的结果和值有async的结果决定
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId);
        if (result.status === 0) {
            const categorys = result.data
            //如果是一级分类
            if (parentId === '0') {
                this.innitOptions(categorys)
            } else {
                return categorys; //返回二级列表，当前async函数返回的promise就会成功且value为categorys
            }
        }
    }
    submitForm = async (values) => {
        console.log(values)
        const {name , desc , price , class1} = values;
        let pCategoryId,categoryId;
        if(class1.length === 1){
            pCategoryId = '0';
            categoryId =class1[0];
        }else{
            pCategoryId = class1[0];
            categoryId =class1[1];
        }

        const product = {name, desc , price ,pCategoryId , categoryId}

        //如果更新需要添加_id
        if(this.isUpdate){
            product._id = this.product._id
        }

        //请求接口
        const result = await reqAddAndUpdateProduct(product)
        if(result.status === 0){
            message.success(`${this.isUpdate ? '更新' : '添加'}商品成功！`)
            this.props.history.goBack()
        }else{
            message.error(`${this.isUpdate ? '更新' : '添加'}商品失败！`)
        }
    }

    UNSAFE_componentWillMount(){ //我要判断来来的是添加还是修改的请求
        const product=this.props.location.state; //看看有没有传过来东西就是判断的标准
        this.isUpdate = !!product;   //将product强行的转化为布尔值
        this.product = product || {};  //储存商品信息，或者{}是为了防止报错，同时如果是添加也就啥也不显示了
    }
    componentDidMount() {
        this.getCategorys('0')
    }
    render() {
        const { options } = this.state;
        const {isUpdate , product} = this;
        const {pCategoryId , categoryId} = product;
        const categorysId = [];  //用来承接级联列表的id的数组
        //当修改指令到来时
        if (isUpdate) {
            //如果是一级列表
            if(pCategoryId === '0'){
                categorysId.push(categoryId)
            } else{
                categorysId.push(pCategoryId)
                categorysId.push(categoryId)
            }
        }
        

        const title = (
            <span>
                <a href='!#' onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{ color: 'blue', marginRight: 20, fontSize: 20 }} />
                </a>
                {isUpdate? <span>修改商品</span> :<span>添加商品</span>}
            </span>
        );
        const layout = {
            labelCol: {    //指定左侧label的宽度
                span: 3,
            },
            wrapperCol: {   //指定右侧输入框的宽度
                span: 8,
            },
        };

        return (
            <Card title={title}>
                <Form
                    {...layout}
                    onFinish={this.submitForm}
                    initialValues={{
                        'name':product.name,
                        'desc':product.desc,
                        'price':product.price,
                        'class1':categorysId,
                    }}
                >
                    <Item
                        label='商品名称'
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: '请输入必要的商品名称',
                            }
                        ]}
                    >
                        <Input placeholder='请输入商品名称' />
                    </Item>
                    <Item
                        label='商品描述'
                        name='desc'
                        rules={[
                            {
                                required: true,
                                message: '请输入必要的商品描述',
                            }
                        ]}
                    >
                        <TextArea autoSize={{ minRows: 2 }} bordered allowClear />
                    </Item>
                    <Item
                        label='商品价格'
                        name='price'
                        rules={[
                            {
                                required: true,
                                message: '请输入必要的商品价格',
                            }
                        ]}
                    >
                        <Input addonAfter="元" type='number' />
                    </Item>
                    <Item
                        label='商品分类'
                        name='class1'
                        rules={[
                            {
                                required: true,
                                message: '请输入必要的商品分类',
                            }
                        ]}
                    >
                        <Cascader
                            options={options}
                            loadData={this.loadData}
                            changeOnSelect
                        />
                    </Item>
                    <Item
                        label='商品图片'
                    >
                        {/* <PictureWall /> */}
                    </Item>
                    <Item>
                        <Button 
                        type='primary'
                        htmlType='submit'
                        >
                            提交
                        </Button>
                    </Item>
                </Form>
            </Card >
        )
    }
}

/*
 1、子组件调用父组件的方法：将父组件的方法以函数属性的形式传递给子组件，子组件就可以调用
 2、父组件调用子组件的方法：在父组件中通过ref得到子组件标签对象（也就是说组件对象），调用其方法。
 */
