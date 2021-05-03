import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'

export default class AddCategory extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Form.Item >
                        <Select
                            defaultValue={'dem'}
                            defaultActiveFirstOption={false}
                        >
                            <Select.Option value="dem">Demo0</Select.Option>
                            <Select.Option value="demo1">Demo1</Select.Option>
                            <Select.Option value="demo2">Demo2</Select.Option>
                            <Select.Option value="demo3">Demo3</Select.Option>
                            <Select.Option value="demo4">Demo4</Select.Option>
                        </Select>
                    </Form.Item>
                    <Input placeholder='请输入分类名称'></Input>
                </Form>
            </div>
        )
    }
}
