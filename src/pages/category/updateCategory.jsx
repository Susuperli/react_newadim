import React, { Component } from 'react'
import { Form, Input } from 'antd'

export default class UpdateCategory extends Component {
    state = {
        value: ''
    }
    changeInput = (e) => {
        this.setState({ value: e.target.value });
        this.props.getUpdateCategoryName(e.target.value);  //将form对象传递给父组件
    }
    changedata = () => {
        console.log(this.updateForm)
        this.props.getUpdateCategoryName(this.updateForm);  //将form对象传递给父组件
        this.setState({ value: this.updateForm.getFieldValue().update })   //将改变的输入值来改变状态
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps !== this.state.value) {
            this.setState({
                value: newProps.categoryName,
            })
        }
    }
    UNSAFE_componentWillMount() {
        this.setState({
            value: this.props.categoryName
        })
    }
    render() {
        return (
            <div>
                <Form 
                onValuesChange={this.changedata}
                ref = {form => this.updateForm = form}
                >
                    <Form.Item
                        // name='update'
                        rules={[
                            {
                                required: true,
                                message: '请输入必要的更新值',
                            }
                        ]}
                    >
                        <Input placeholder='请输入分类名称' value={this.state.value} onChange={this.changeInput} />
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

