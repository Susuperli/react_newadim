/*
存储本地数据来实现登录状态的维护，即登陆之后，刷新界面并不会返回登录界面。
这里引入插件store
*/
import store from 'store'

const USER_KEY='user_key';
export default  {
// 添加
saveUser(user){
   store.set(USER_KEY,user)
},
// 读取
getUser(){
    return store.get(USER_KEY) || {}
},
// 删除
removeUser(){
    store.remove(USER_KEY)
}
}
