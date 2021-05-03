import React, { Component } from 'react'
import { Form, Input } from 'antd'

export default class UpdateCategory extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Form.Item>
                        <Input placeholder='请输入分类名称' defaultValue={this.props.categoryName}></Input>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

