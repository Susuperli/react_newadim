import React, { Component } from 'react'
import { Form, Input } from 'antd'

export default class UpdateCategory extends Component {
    state={
        value:''
    }
    changeInput=(e) =>{
        this.setState({value: e.target.value},()=>{this.props.getUpdateCategoryName(this.state.value)}) 
    }
    // static getDerivedStateFromProps(nextProps, prevState){
    //     if(nextProps.categoryName !== prevState.value){
    //         return {
    //             value:nextProps.categoryName
    //         }
    //     }
    //     return null;
    // }

    UNSAFE_componentWillReceiveProps(newProps){
        if(newProps!==this.state.value){
            this.setState({
                value:newProps.categoryName,
            })
        }
    }
    UNSAFE_componentWillMount(){
        this.setState({
            value:this.props.categoryName
        })
    }
    render() {
        return (
            <div>
                <Form>
                    <Form.Item>
                        <Input placeholder='请输入分类名称' value={this.state.value} onChange={this.changeInput}></Input>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

