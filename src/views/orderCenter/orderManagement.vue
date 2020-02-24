<template>
	<section>
		<!--工具条-->
		<el-col :span="24" style="padding:10px 10px 0;">
			<el-form :inline="true">
				<el-form-item>
					<el-select v-model="queryMap.systype" placeholder="请选择来源渠道" auto-complete="off">
                        <el-option v-for="(item,index) in qSYSTYPE"  :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
				</el-form-item>
                <el-form-item>
					<el-select v-model="queryMap.pstate" placeholder="请选择支付状态" auto-complete="off">
                        <el-option v-for="(item,index) in qPSTATE"  :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
				</el-form-item>
                <el-form-item>
					<el-select v-model="queryMap.rstate" placeholder="请选择退款状态" auto-complete="off">
                        <el-option v-for="(item,index) in qRSTATE"  :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
				</el-form-item>
                 <el-form-item>
					<el-select v-model="queryMap.state" placeholder="请选择订单状态" auto-complete="off">
                        <el-option v-for="(item,index) in qSTATE"  :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
				</el-form-item>
                <el-form-item>
					<el-input v-model="queryMap.typename" placeholder="请输入房型类型"></el-input>
				</el-form-item>
                <el-form-item>
					<el-date-picker
                        v-model="timeValue"
                        type="daterange"
                        align="right"
                        unlink-panels
                        @change = "changeDate"
                        range-separator="至"
                        placeholder="请输入日期"
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
			<el-table-column prop="TID" label="订单ID" width="180"  align='center'>
			</el-table-column>
            <el-table-column prop="SYSTYPE" label="来源渠道" width="100"  align='center'>
			</el-table-column>
			<el-table-column prop="TYPENAME" label="房型" width="120"   align='center'>
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
			<el-table-column label="操作" width="200"  align='center' > 
				<template slot-scope="scope">
                    <el-button size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <el-button type="primary" size="small" v-if="scope.row.state =='-1'" @click="handleSubmit(scope.$index, scope.row)">确认</el-button>
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
            ruleForm:{},
            orders: [],
            // type:[],
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

            //来源渠道选择
            qSYSTYPE:[
                {"value":"1","label":"网上售票"},
                {"value":"21","label":"微信"},
                {"value":"22","label":"微信小程序"},
                {"value":"23","label":"支付宝"},
                {"value":"24","label":"H5"},
                {"value":"26","label":"龙支付app"},
                {"value":"3","label":"代售"},
                {"value":"4","label":"预定"},
                {"value":"5","label":"期票销售"},
                {"value":"6","label":"电商"}
            ],
            //支付状态选择
            qPSTATE:[
                {"value":"0","label":"未支付"},
                {"value":"1","label":"用户已点击进行支付按钮"},
                {"value":"2","label":"等待银行确认"},
                {"value":"100","label":"已支付"}
            ],
            //退款状态选择
            qRSTATE:[
                {"value":"0","label":"申请中"},
                {"value":"1","label":"已进行退款"},
                {"value":"2","label":"审核不通过(不退款)"},
                {"value":"3","label":"审核通过"},
                {"value":"4","label":"第三方待退款"},
                {"value":"5","label":"退款失败"},
                {"value":"-10","label":"等待处理"}
            ],
            //订单状态选择
            qSTATE:[
                {"value":"-1","label":"等待商家确认"},
                {"value":"0","label":"订单提交成功：不可用"},
                {"value":"1","label":"订单交易成功：可用"},
                {"value":"2","label":"订单已关闭"},
               
            ],


            queryMap :{	//查询条件
                "systype":"",	//来源渠道：1、网上售票 2、手机(21:微信、22：微信小程序、23：支付宝、24：H5、26：龙支付app) 3、代售  4、预定  5、期票销售  6、电商
                "typename":""	,//预定房型
                "bosday":""	,//预定开始时间
                "boeday":""	,//预定结束时间
                "pstate":""	,//支付状态：0：未支付   1：用户已点击进行支付按钮      2：等待银行确认     100：已支付
                "rstate":""	,//退款状态：0：申请中  1：已进行退款 2：审核不通过(不退款)   3：审核通过 4、第三方待退款  5:退款失败  -10:等待处理
                "state":""	//订单状态：-1：  等待商家确认0：订单提交成功：不可用 1： 订单交易成功：可用  2：订单已关闭
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
            this.queryMap.bosday = start.getFullYear() + '-' + sm + '-' + sd;
            console.log(this.queryMap.bosday)

            var end = new Date(this.timeValue[1]); 
            var em = end.getMonth() + 1;  
            em = em < 10 ? '0' + em : em;  
            var ed = end.getDate();  
            ed = ed < 10 ? ('0' + ed) : ed;
            this.queryMap.boeday = start.getFullYear() + '-' + em + '-' + ed;
            console.log(this.queryMap.boeday)
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


        //确认按钮
        handleSubmit(index, row) {
            this.ruleForm = row;
            this.$confirm('此操作确定订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var curtime = this.datetime()
                console.log(curtime)
                var data = {
                    "tid":this.ruleForm.TID,
                    "pstate": this.ruleForm.PSTATE,
                    "rmoney":this.ruleForm.RMONEY,
                    "free":this.ruleForm.FREE,
                    "rstate":this.ruleForm.RSTATE,
                    "state":this.ruleForm.STATE,
                    "cftime":curtime,
                }
                // console.log(data)
                var params = {"txcode":"order003","data":data};
                this.ajax("get",params,(res) => {
                    console.log(res.data)
                    if(res.data.ret_code == "200"){
                        this.$message({
                            type: 'success',
                            message: '确认成功!'
                        });
                        this.getData()     
                    }else{
                        this.$message({
                            type: 'info',
                            message: '确认失败!'
                        });   
                    }
                },(err) => {console.log(err,"错误提示")},this.testURL);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消!'
                });          
            });
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