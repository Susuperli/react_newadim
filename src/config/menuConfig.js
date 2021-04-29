import {
    HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    ToolOutlined,
    UserOutlined,
    SafetyOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons';

const menuList = [{
    title: '首页', // 菜单标题名称 
    key: '/home', // 对应的 path 
    icon: <HomeOutlined/>, // 图标名称 
}, {
    title: '商品',
    key: '/products',
    icon: <AppstoreOutlined/>,
    children: [ // 子菜单列表 
        {
            title: '品类管理',
            key: '/category',
            icon: <BarsOutlined/>
        }, {
            title: '商品管理',
            key: '/product',
            icon: <ToolOutlined/>
        },
    ]
}, {
    title: '用户管理',
    key: '/user',
    icon: <UserOutlined/>
}, {
    title: '角色管理',
    key: '/role',
    icon: <SafetyOutlined/>
},{
    title: '图形图表',
    key: 'charts',
    icon: <AreaChartOutlined/>,
    children: [{
        title: '柱形图',
        key: '/bar',
        icon: <BarChartOutlined/>
    }, {
        title: '折线图',
        key: '/line',
        icon: <LineChartOutlined/>
    }, {
        title: '饼图',
        key: '/pie',
        icon: <PieChartOutlined/>
    }, ]
}, ]

export default menuList