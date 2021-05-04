import React, { Component } from 'react'
import { Form, Input } from 'antd'

export default class UpdateCategory extends Component {
    state = {
        value: ''
    }
    changeInput = (e) => {
        this.setState({ value: e.target.value }, () => { this.props.getUpdateCategoryName(this.state.value) })
    }
    changedata = (data) => {
        this.props.getUpdateCategoryName(data.updata)
    }
    // cleanMe = (e) => {
    //     e.target.value=''
    // }

    // static getDerivedStateFromProps(nextProps, prevState){
    //     if(nextProps.categoryName !== prevState.value){
    //         return {
    //             value:nextProps.categoryName
    //         }
    //     }
    //     return null;
    // }
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
        const {categoryName} = this.props
        return (
            <div>
                <Form 
                // onValuesChange={this.changedata}
                >
                    <Form.Item
                        // name='updata'
                        initialvalues={categoryName}
                        rules={[
                            {
                                required: true,
                                message: '请输入必要的更新值',
                                whitespace: true
                            }
                        ]}
                    >
                        <Input placeholder='请输入分类名称'  name='updata' onChange={this.changeInput}  value= {this.state.value} />
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

