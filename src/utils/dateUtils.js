//输出时间，良好的格式

export function formateDate(time){
    if(!time) return '' ;//如果没有传值直接就返回一个空字符串
    let data=new Date(time)
    return data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate()+' '+data.getHours()+':'+data.getMinutes()+':'+data.getSeconds();
}