//登录页面
import Login from './views/Login.vue'
//错误页面
import NotFound from './views/404.vue'
//首页
import Home from './views/Home.vue'
//主页面
import Main from './views/Main.vue'
//酒店管理
import HousingManagement from './views/hotelManagement/house/housingManagement.vue'       //房型管理
import AddHouse from './views/hotelManagement/house/addHouse.vue'                         //添加房型
import EditHouse from './views/hotelManagement/house/editHouse.vue'                       //修改房型
// import HouseDetails from './views/hotelManagement/house/houseDetails.vue'              //查询房型
import PriCalManagement from './views/hotelManagement/price/priCalManagement.vue'         //价格日历管理
import ViewDatePrice from './views/hotelManagement/price/viewDatePrice.vue'               //价格日历
import PriCalendarSet from './views/hotelManagement/price/priCalendarSet.vue'               //价格日历


import HotelInfo from './views/hotelManagement/hotel/hotelInfo.vue'                       //酒店信息
//订单中心
import OrderManagement from './views/orderCenter/orderManagement.vue'               //订单管理
import OrderDetails from './views/orderCenter/orderDetails.vue'               //订单详情
//审批管理
import ScenicApplication from './views/approvalManagement/scenicApplication.vue'    //景区销售申请
//销售报表
import SalesReport from './views/reportStatistics/salesReport.vue'                  //销售报表

// import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        redirect:'/main',
        name: '酒店管理',
        iconCls: 'el-icon-setting',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/housingManagement', component: HousingManagement, name: '房型管理' },
            { path: '/addHouse', component: AddHouse, name: '新增房型',hidden: true },
            { path: '/editHouse', component: EditHouse, name: 'EditHouse',hidden: true },
            // { path: '/houseDetails', component: HouseDetails, name: 'HouseDetails',hidden: true },
            { path: '/priCalManagement', component:PriCalManagement, name: '价格日历管理' },
            { path: '/viewDatePrice', component:ViewDatePrice, name: 'ViewDatePrice',hidden: true },
            { path: '/priCalendarSet', component:PriCalendarSet, name: 'PriCalendarSet',hidden: true },
            
            { path: '/hotelInfo', component: HotelInfo, name: '酒店信息' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单中心',
        iconCls: 'el-icon-setting',
        children: [
            { path: '/orderManagement', component: OrderManagement, name: '订单管理' },
            { path: '/orderDetails', component: OrderDetails, name: 'OrderDetails' ,hidden: true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '审批管理',
        iconCls: 'el-icon-setting',
        // leaf: true,//只有一个节点
        children: [
            { path: '/scenicApplication', component: ScenicApplication, name: '景区销售申请' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '报表统计',
        iconCls: 'el-icon-setting',
        // leaf: true,//只有一个节点
        children: [
            { path: '/salesReport', component: SalesReport, name: '销售报表' }
        ]
    },
    
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;