/*
能够根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise对象
*/

import jsonp from 'jsonp'
import ajax from './ajax'

const BASE_URL='http://120.55.193.14:5000';

//登陆
export const reqLogin = (username, password) => ajax(BASE_URL+'/login', { username, password }, 'POST');

//添加用户
export const reqAdduser = user => ajax('/manage/user/add', user, 'POST');

//请求地理位置
export const reqCity = () => ajax('/api/ipJson.jsp?json=true');

//获取分类列表一级/二级
export const reqCategorys = (parentId) => ajax(BASE_URL + '/manage/category/list', {parentId} )

//添加分类
export const reqAddCategorys = (categoryName,parentId) => ajax(BASE_URL + '/manage/category/add', {categoryName,parentId} ,"POST")

//更新分类
export const reqUpdateCategorys = ({categoryName,categoryId}) => ajax(BASE_URL + '/manage/category/update', {categoryName,categoryId}, 'POST' )

//获取商品的分页列表
export const reqProducts = (pageNum ,pageSize) => ajax(BASE_URL + '/manage/product/list' , {pageNum ,pageSize})


/*
  jsonp请求的接口请求函数
*/
export const reqWeather = cityCode => {
  return new Promise((resolve, reject) => {
    const url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=110ce0078858def8cdee03cacdd91515&city=' + cityCode;
    jsonp(url, {}, (error, data) => {
      if (!error && data.status === '1') {
        const { city, weather } = data.lives[0]
        resolve({ city, weather })
      } else {
        reject('获取天气失败')
      }
    })
  })
}
/*
   jsonp的复习
   能够解决ajax跨域问题
   1、jsonp只能解决GET类型的ajax请求跨域问题
   2、jsonp请求不是ajax请求，而是一般的get请求？
   3、基本原理
      浏览器端
        动态生成<script>来请求后台接口(src的接口的url)
        定义好的用于接收响应数据的函数fn，并将函数名通过请求的参数提交给后台，如：callback=fn。
      服务器端
        接收到请求处理产生的结果数据后，返回一个函数的调用的js代码，并将结果数据作为实参传入函数调用
      浏览器端
        收到响应的自动执行函数调用的js代码，也就执行了提前定义好的回调函数，并得到了需要的结果数据。
*/

/*
分页列表
    1、纯前台分页
      请求获取数据：一次获取所有数据，翻页不需要发请求。
      请求接口：
        不需要指定页码pageNum和每页数量pageSize
        响应数据：所有数据的数组
    2、基于后台的分页
      请求获取数据：每次只能获取当前页的数据，翻页必须发请求。
      请求接口：需要指定页码pageNum和每页数量pageSize
      响应数据：当前页数据的数组 + 总记录数total
    3、如何选择
      基于数据的多少来选择
*/

