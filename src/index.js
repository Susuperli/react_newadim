import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import stroageUtils from './utils/stroageUtils'
import memoryUtils from './utils/memoryUtils'

// 获取来自local值，判断是否登录
const user=stroageUtils.getUser();
memoryUtils.user=user;

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
