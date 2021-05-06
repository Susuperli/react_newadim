import React, { Component } from 'react'
import { Card, Form, Button, Input, Upload, Cascader } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqCategorys } from '../../api'

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
        //更新状态
        this.setState({
            options: [...this.state.options]
        })
    }

    innitOptions = (categorys) => {
        //根据categorys生成options数组并且
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, //我不是叶子
        }))
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
    submitForm = (values) => {
        console.log(values)
    }

    componentDidMount() {
        this.getCategorys('0')
    }
    render() {
        const title = (
            <span>
                <a href='!#' onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{ color: 'blue', marginRight: 20, fontSize: 20 }} />
                </a>
                <span>添加商品</span>
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

        const { options } = this.state
        return (
            <Card title={title}>
                <Form
                    {...layout}
                    onFinish={this.submitForm}
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
                        name='description'
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
                        name='class'
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
                        <Upload
                            listType="picture-card"
                            showUploadList={false}
                        >
                        </Upload>
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
