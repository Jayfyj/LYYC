<template>
	<section>
		<!--工具条-->
		<el-col :span="24" style="padding:10px 10px 0;">
			<el-form :inline="true">
                <el-form-item>
					<el-input v-model="queryMap.tname" placeholder="请输入价格策略名称"></el-input>
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
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="orders" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55" align='center'>
			</el-table-column> -->
			<!-- <el-table-column type="index" width="60"  align='center'>
			</el-table-column> -->
			<!-- <el-table-column prop="TID" label="唯一标识" width="150"  align='center'>
			</el-table-column> -->
            <!-- <el-table-column prop="HOTEL_ID" label="酒店id" width="150"  align='center'>
			</el-table-column>
            <el-table-column prop="ROOMTYPE_ID" label="房型id" width="150"  align='center'>
			</el-table-column> -->
            <el-table-column prop="TNAME" label="价格策略名称" width="150"  align='center'>
			</el-table-column>
			<el-table-column prop="PRICE" label="卖价" width="150"   align='center'>
			</el-table-column>
			<el-table-column prop="COST" label="结算价格" width="150"   align='center'>
			</el-table-column>
            <el-table-column prop="PRICESHOW" label="门市价" width="150"   align='center'>
			</el-table-column>
            <el-table-column prop="BDATE" label="开始时间" width="150"  align='center'>
			</el-table-column>
			<el-table-column prop="EDATE" label="结束时间" width="150"   align='center'>
			</el-table-column>
			<el-table-column prop="STOCK" label="库存" min-width="150"   align='center'>
			</el-table-column>
			<el-table-column label="操作" width="300"  align='center' > 
				<template slot-scope="scope">
                    <el-button size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <el-button size="small" @click="handleStart(scope.$index, scope.row)">启用</el-button>
                    <el-button size="small" @click="handleForbid(scope.$index, scope.row)">禁用</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
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
    name:'priCalManagement',
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
            // type:[],
            pageInfo:{
                total: 2,
                page: 1,
                pageSize:10,
            },
            
            listLoading: false,
           
            sels: [],//列表选中列

            //测试url
            testURL:'./static/json/price000.json',
            // testURL:'http://129.204.146.161:8080/zhjq_hotel_mng/txCtrl',
            // testURL:'/room000',
            //转化中文
            // orderCNStatus:{
            //     "-1":"等待商家确认",
            //     "0":"订单提交成功：不可用",
            //     "1":"订单交易成功：可用",
            //     "2":"订单已关闭",
            // },

            
            queryMap :{	//查询条件
                "tname":"",	//价格策略名称
                "bdate":"",	//开始时间
                "edate":""	//结束时间
            }
                
            
        }
    },
    methods: {
        // //状态转化
        // tranfromCNStatus(list){
        //     for(var i =0;i<list.length;i++){
        //         for(var key in this.orderCNStatus){
        //             if(list[i].STATE == key){
        //                 list[i].CNStatus = this.orderCNStatus[key]
        //             }
        //         }
        //     }
        // },

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
            this.queryMap.bdate = start.getFullYear() + '-' + sm + '-' + sd;
            console.log(this.queryMap.bdate)

            var end = new Date(this.timeValue[1]); 
            var em = end.getMonth() + 1;  
            em = em < 10 ? '0' + em : em;  
            var ed = end.getDate();  
            ed = ed < 10 ? ('0' + ed) : ed;
            this.queryMap.edate = end.getFullYear() + '-' + em + '-' + ed;
            console.log(this.queryMap.edate)
        },

        //获取酒店房间信息
        getData(){
            console.log(this.queryMap)
            this.listLoading = true;
            var data = {"hotel_id":"575346343687","roomtype_id":"","pageSize":this.pageInfo.pageSize,"pageNum":this.pageInfo.page,"queryMap":this.queryMap}
            var params = {"txcode":"price000","data":data};
            this.ajax("get",params,(res) => {
                console.log(res.data)
                if(res.data.ret_code == "200"){
                    this.orders = res.data.data.list;
                    // this.tranfromCNStatus(this.orders);
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

        
        //查看价格
        handleDetail(index, row){
            this.$router.push({name:"ViewDatePrice",params:{'priceOBJ':row}});
        },

        //显示新增界面
        handleAdd: function () {
            this.$router.push({path:"/priCalendarSet"});
        },

        //启用按钮
        handleStart(index,row){

        },

        //禁用按钮
        handleForbid(index,row){

        },

        //编辑按钮
        handleEdit(index,row){
            this.$router.push({name:"PriCalendarEdit",params:{'priceOBJ':row}});
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