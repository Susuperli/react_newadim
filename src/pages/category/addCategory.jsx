import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'

export default class AddCategory extends Component {
    state = {
        value: '',
        parnetId: ''
    }

    addInput = (e) => {
        this.setState({
            value: e.target.value
        },
            () => {
                this.props.getAddCategoryName(this.state.value)
            })
    }
    clean = () => {
        this.setState({
            value: '',//重置输入框
        })
    }
    getSelectId = (value) => {   //改变之后能得得到的Id值
        this.props.getChangeAddCategoryId(value) //回传此时的Id值
    }

    render() {
        const { categorys, parentId, getAddCategoryId } = this.props; //获取一级数组和parentId通过属性
        getAddCategoryId(parentId) //获得首次默认的id值
        return (
            <div>
                <Form>
                    <Form.Item >
                        <Select
                            defaultValue={parentId}   //通过相同的id数来找到要显示option
                            defaultActiveFirstOption={false}
                            key={parentId}  //添加唯一的key能够保证，在转换的时候不被复用
                            onSelect={this.getSelectId}
                        >
                            <Select.Option value='0' key='0'>一级分类</Select.Option>
                            {
                                categorys.map((item) => {
                                    return <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Input placeholder='请输入分类名称' value={this.state.value} onChange={this.addInput} onBlur={this.clean}></Input>
                </Form>
            </div>
        )
    }
}
