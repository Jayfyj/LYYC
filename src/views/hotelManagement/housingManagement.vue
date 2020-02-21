<template>
	<section>
		<!--工具条-->
		<el-col :span="24" style="padding:10px 10px 0;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
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
		<el-table :data="rooms" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55" align='center'>
			</el-table-column> -->
			<!-- <el-table-column type="index" width="60"  align='center'>
			</el-table-column> -->
			<el-table-column prop="TNAME" label="类型名称" width="120"  align='center'>
			</el-table-column>
			<el-table-column prop="STANDARD_TYPE" label="标准房型" width="120"   align='center'>
			</el-table-column>
			<el-table-column prop="PRICE" label="门市价" width="100"   align='center'>
			</el-table-column>
			<el-table-column prop="BED_NUM" label="床位数" width="100"   align='center'>
			</el-table-column>
			<el-table-column prop="CAPACITY" label="可住人数" min-width="120"   align='center'>
			</el-table-column>
            <el-table-column prop="BTYPE" label="床型" min-width="120"   align='center'>
			</el-table-column>
            <el-table-column prop="CNStatus" label="状态" min-width="100"  align='center'>
			</el-table-column>
			<el-table-column label="操作" width="280"  align='center' > 
				<template slot-scope="scope">
					<el-button size="small" @click="sellOut(scope.$index, scope.row)">售罄</el-button>
                    <el-button size="small" @click="banSell(scope.$index, scope.row)">禁售</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    name:'housingManagement',
    data() {
        return {
            filters: {
                name: ''
            },
            rooms: [],
            type:[],
            pageInfo:{
                total: 2,
                page: 1,
                pageSize:10,
            },
            
            listLoading: false,
           
            sels: [],//列表选中列

            //测试url
            testURL:'./static/json/room000.json',
            // testURL:'http://129.204.146.161:8080/zhjq_hotel_mng/txCtrl',
            // testURL:'/room000',
            //转化中文
            roomCNStatus:{
                "0":"正常",
                "1":"禁售",
                "2":"售罄",
            }
            
        }
    },
    methods: {
        //状态转化
        tranfromCNStatus(list){
            for(var i =0;i<list.length;i++){
                for(var key in this.roomCNStatus){
                    if(list[i].STATUS == key){
                        list[i].CNStatus = this.roomCNStatus[key]
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

        //获取酒店房间信息
        getData(){
            this.listLoading = true;
            var data = {"hotelId":"575346343687","pageSize":this.pageInfo.pageSize,"pageNum":this.pageInfo.page}
            var params = {"txcode":"room000","data":data};
            this.ajax("get",params,(res) => {
                console.log(res.data)
                if(res.data.ret_code == "200"){
                    this.rooms = res.data.data.list;
                    this.tranfromCNStatus(this.rooms);
                    this.pageInfo.total = Number(res.data.data.totalNum);
                    this.listLoading = false;
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

        //售罄
        sellOut(index, row){
            console.log(row)
            row.STATUS = "2";
            row.CNStatus = "售罄";
        },

        //售罄
        banSell(index, row){
            console.log(row)
            row.STATUS = "1";
            row.CNStatus = "禁售";
        },

        //显示编辑界面
        handleEdit(index, row) {
            this.$router.push({name:"EditHouse",params:{'room':row}});
            console.log(row)
        },
        //显示新增界面
        handleAdd: function () {
            this.$router.push({path:"/addHouse"});
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