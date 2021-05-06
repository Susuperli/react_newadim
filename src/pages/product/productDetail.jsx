import React, { Component } from 'react'
import { Card, List, } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import './product.css'

import { BASE_IMG_URL } from '../../utils/constants'
import {reqCategory} from '../../api'
const Item = List.Item

export default class ProductDetail extends Component {

    state={
        pcname1:'', //一级分类名称
        pcname2:'',  //二级分类名称
    }

    async componentDidMount(){
        const {pCategoryId,categoryId} = this.props.location.state;  //得到当前的ID
        if(pCategoryId === '0'){  //如果只有一级存在
            const result= await reqCategory(pCategoryId);
        }else{
            const result= await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)]);  //并发请求
            //其实并没有数据
            // const pcname1 = result[0].data.name;
            // const pcname2 = result[1].data.name;
        }
        reqCategory()
    }

    render() {
        //读取携带过来的状态属性
        const { name, desc, price, detail, imgs } = this.props.location.state;
        const title = (
            <span>
                <a href='!#' onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{ color: 'blue', marginRight: 20, fontSize: 20 }} />
                </a>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title}>
                <List>
                    <Item>
                        <span className='product-detail-left'>商品名称：</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className='product-detail-left'>商品描述：</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className='product-detail-left'>商品价格：</span>
                        <span>{price} 元</span>
                    </Item>
                    <Item>
                        <span className='product-detail-left'>所属分类：</span>
                        <span></span>
                    </Item>
                    <Item>
                        <span className='product-detail-left'>商品图片：</span>
                        <span>
                            {
                                imgs.map(img => {
                                    if (img) {
                                        return (
                                            <img
                                                className='product-detail-img'
                                                key={img}
                                                src={BASE_IMG_URL + img}
                                                alt='img'
                                            />)
                                    }
                                })
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className='product-detail-left'>商品详情：</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}></span>  {/*插入HTML代码 */}
                    </Item>
                </List>
            </Card>
        )
    }
}
