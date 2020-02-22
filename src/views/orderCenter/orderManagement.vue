<template>
	<section>
		<!--工具条-->
		<el-col :span="24" style="padding:10px 10px 0;">
			<el-form :inline="true">
				<el-form-item>
					<el-input v-model="queryMap.SYSTYPE" placeholder="请输入来源渠道"></el-input>
				</el-form-item>
                <el-form-item>
					<el-input v-model="queryMap.TYPEID" placeholder="请输入房型类型"></el-input>
				</el-form-item>
                <el-form-item>
					<el-input v-model="queryMap.STATE" placeholder="请输入订单状态"></el-input>
				</el-form-item>
                <el-form-item>
					<el-date-picker
                        v-model="timeValue"
                        type="daterange"
                        align="right"
                        unlink-panels
                        @change = "changeDate"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getData">查询</el-button>
				</el-form-item>
				<!-- <el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="orders" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55" align='center'>
			</el-table-column> -->
			<!-- <el-table-column type="index" width="60"  align='center'>
			</el-table-column> -->
			<el-table-column prop="TID" label="订单号" width="180"  align='center'>
			</el-table-column>
            <el-table-column prop="SYSTYPE" label="来源渠道" width="100"  align='center'>
			</el-table-column>
			<el-table-column prop="TYPEID" label="房型" width="120"   align='center'>
			</el-table-column>
			<el-table-column prop="ROOMNUM" label="间数" width="80"   align='center'>
			</el-table-column>
			<el-table-column prop="BOSDAY" label="入住时间" width="110"   align='center'>
			</el-table-column>
            <el-table-column prop="BOEDAY" label="离店时间" width="110"   align='center'>
			</el-table-column>
			<el-table-column prop="ARRIVETIME" label="预订时间" min-width="110"   align='center'>
			</el-table-column>
            <el-table-column prop="MEMBERID" label="用户账号" min-width="180"   align='center'>
			</el-table-column>
            <el-table-column prop="TOTALPRICE" label="总价" min-width="80"  align='center'>
			</el-table-column>
            <el-table-column prop="CNStatus" label="状态" min-width="140"  align='center'>
			</el-table-column>
			<el-table-column label="操作" width="150"  align='center' > 
				<template slot-scope="scope">
                    <el-button size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" style="padding:20px 10px;">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination> -->
            <el-pagination background layout="total,sizes,prev, pager, next,jumper" 
                :current-page="pageInfo.page" :page-size="pageInfo.pageSize" 
                :total="pageInfo.total" :page-sizes="[1,5, 10, 20, 50]"
                 @size-change="handleSizeChange" 
                 @current-change="handleCurrentChange"
                 style="float:right;"
                 >
            </el-pagination>
		</el-col>

	</section>
</template>

<script>

export default {
    name:'orderManagement',
    data() {
        return {
            //时间选择器
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            //时间选择器时间
            timeValue: '', 

            orders: [],
            type:[],
            pageInfo:{
                total: 2,
                page: 1,
                pageSize:10,
            },
            
            listLoading: false,
           
            sels: [],//列表选中列

            //测试url
            testURL:'./static/json/order000.json',
            // testURL:'http://129.204.146.161:8080/zhjq_hotel_mng/txCtrl',
            // testURL:'/room000',
            //转化中文
            orderCNStatus:{
                "-1":"等待商家确认",
                "0":"订单提交成功：不可用",
                "1":"订单交易成功：可用",
                "2":"订单已关闭",
            },
          
            queryMap :{	//查询条件
                "SYSTYPE":"",	//来源渠道：1、网上售票 2、手机(21:微信、22：微信小程序、23：支付宝、24：H5、26：龙支付app) 3、代售  4、预定  5、期票销售  6、电商
                "TYPEID":""	,//预定房型
                "BOSDAY":""	,//预定开始时间
                "BOEDAY":""	,//预定结束时间
                "PSTATE":""	,//支付状态：0：未支付   1：用户已点击进行支付按钮      2：等待银行确认     100：已支付
                "RSTATE":""	,//退款状态：0：申请中  1：已进行退款 2：审核不通过(不退款)   3：审核通过 4、第三方待退款  5:退款失败  -10:等待处理
                "STATE":""	//订单状态：-1：  等待商家确认0：订单提交成功：不可用 1： 订单交易成功：可用  2：订单已关闭
            }
                
            
        }
    },
    methods: {
        //状态转化
        tranfromCNStatus(list){
            for(var i =0;i<list.length;i++){
                for(var key in this.orderCNStatus){
                    if(list[i].STATE == key){
                        list[i].CNStatus = this.orderCNStatus[key]
                    }
                }
            }
        },
        //分页大小切换
        handleSizeChange(val) {
            console.log(val)
            this.pageInfo.pageSize = val;
            this.getData();
        },
        //分页切换
        handleCurrentChange(val) {
            console.log(val)
            this.pageInfo.page = val;
            this.getData();
        },

        //重设取消
        resetForm(formName) {
            this.addFormVisible = false;
            this.$refs[formName].resetFields();
        },

        //获取入住时间
        changeDate(){
            var start = new Date(this.timeValue[0]); 
            var sm = start.getMonth() + 1;  
            sm = sm < 10 ? '0' + sm : sm;  
            var sd = start.getDate();  
            sd = sd < 10 ? ('0' + sd) : sd;
            this.queryMap.BOSDAY = start.getFullYear() + '-' + sm + '-' + sd;
            console.log(this.queryMap.BOSDAY)

            var end = new Date(this.timeValue[1]); 
            var em = end.getMonth() + 1;  
            em = em < 10 ? '0' + em : em;  
            var ed = end.getDate();  
            ed = ed < 10 ? ('0' + ed) : ed;
            this.queryMap.BOEDAY = start.getFullYear() + '-' + em + '-' + ed;
            console.log(this.queryMap.BOEDAY)
        },

        //获取酒店房间信息
        getData(){
            console.log(this.queryMap)
            this.listLoading = true;
            var data = {"hotelId":"575346343687","pageSize":this.pageInfo.pageSize,"pageNum":this.pageInfo.page,"queryMap":this.queryMap}
            var params = {"txcode":"order000","data":data};
            this.ajax("get",params,(res) => {
                console.log(res.data)
                if(res.data.ret_code == "200"){
                    this.orders = res.data.data.list;
                    this.tranfromCNStatus(this.orders);
                    this.pageInfo.total = Number(res.data.data.totalNum);
                    this.listLoading = false;
                }else{
                    this.$message({
                        type: 'info',
                        message: '请求失败!'
                    });   
                }
            },(err) => {console.log(err,"错误提示")},this.testURL);
        },
        //删除
        handleDel(index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                console.log("删除")
                console.log(index)
                console.log(row)
                // this.listLoading = true;
                // this.listLoading = false;
            
            }).catch(() => {

            });
        },

        
        //查看详情
        handleDetail(index, row){
            this.$router.push({name:"OrderDetails",params:{'order':row}});
        },


        selsChange: function (sels) {
            console.log(sels)
            this.sels = sels;
        },
       
    },
    mounted() {
        this.getData();
       
    }
}

</script>


<style scoped>

</style>