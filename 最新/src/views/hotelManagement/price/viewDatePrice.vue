<template>
    <div class="MYNewCalendar">
            <el-col :span="24" style="padding:10px 10px 0;">
                <el-form :inline="true" >
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
                        <el-button type="primary" @click="sGetData">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-calendar v-model="value" id="calendar">
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template
            slot="dateCell"
            slot-scope="{date, data}">
                <!--自定义内容-->
                <div>
                    <div class="calendar-day" v-if="data.type=='current-month'">{{ data.day.split('-').slice(2).join('-') }}
                        <span class="curdate">{{ data.day }}</span>
                    </div>
                    <div v-for="(item,index) in calendarData" :key="index" >
                        <!-- 第二种 -->
                        <div v-if="item.date == data.day&&item.date.split('-').slice(1)[0] == data.day.split('-').slice(1)[0]&&data.type=='current-month'">
                            <div class="priceshow" v-if="item.priceshow">{{item.priceshow}}</div>
                            <div class="priceshow" v-else>暂无价格</div>
                        </div>
                    </div>
                    
                </div>
            </template>
        </el-calendar>
    </div>
    <!-- </div>123</div> -->
</template>

<script>

export default {
        name: "viewDatePrice",
        data(){
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
                //查询条件
                queryMap:{	
                    "bdate":"",	//开始时间
                    "edate":""	//结束时间
                },

                //查询标志
                flag:true,

                calendarData:[
                    {
                        "date":"2020-03-18",
                        "price":"200",		//卖价
                        "cost":"150",		//结算价格
                        "priceshow":"200"	//门市价
                    },
                    {
                        "date":"2020-05-31",
                        "price":"200",		//卖价
                        "cost":"150",		//结算价格
                        "priceshow":"200"	//门市价
                    }

                ],
                value: new Date(),
                testURL:'./static/json/price001.json',
            }
        },
        methods:{

            //上个月和这个月和下个月按钮操作
            monBtnHandle(){
                //上个月和这个月和下个月按钮
                var btn = document.getElementsByClassName("el-button el-button--plain el-button--mini");
                btn[1].innerText = '';
                btn[0].onclick = () => {
                    if(this.flag){
                        this.defaultTIME()
                        this.getData(this.$route.params.priceOBJ)
                    }
                }
                btn[1].onclick = () =>{
                    console.log(btn[1].innerText)
                    this.flag =true;
                    this.defaultTIME()
                    this.getData(this.$route.params.priceOBJ)
                }
                btn[2].onclick = () =>{
                    if(this.flag){
                        this.defaultTIME()
                        this.getData(this.$route.params.priceOBJ)
                    }
                }
            },
            //默认选择时间
            defaultTIME(){
                var length = document.getElementsByClassName("curdate").length -1;
                var firstDay = document.getElementsByClassName("curdate")[0].innerText;
                var lastDay = document.getElementsByClassName("curdate")[length].innerText;
                this.timeValue = [firstDay,lastDay];
                this.changeDate();
                this.value = new Date(firstDay);
                // console.log(firstDay,length)
            },

            //获取入住时间
            changeDate(){
                console.log(this.timeValue[0])
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

            //查询
            sGetData(){
                this.flag = false;
                this.getData(this.$route.params.priceOBJ)
            },

            //请求数据
            getData(obj){
                var data = {"hotel_id":obj.HOTEL_ID,"roomtype_id":obj.ROOMTYPE_ID,"bdate":this.queryMap.bdate,"edate":this.queryMap.edate}
                var params = {"txcode":"price001","data":data};
                this.ajax("get",params,(res) => {
                    console.log(res.data)
                    if(res.data.ret_code == "200"){
                       console.log(res.data)
                    }else{
                        this.$message({
                            type: 'info',
                            message: '请求失败!'
                        });   
                    }
                },(err) => {console.log(err,"错误提示")},this.testURL);
            },
        },
        mounted(){
            this.defaultTIME()
            this.getData(this.$route.params.priceOBJ)
            this.monBtnHandle()
        }

    }

</script>


<style lang='scss'>
.MYNewCalendar{
    height: 580px;
    overflow-y: auto;
    .calendar-day{
        text-align: center;
        color: #202535;
        line-height: 30px;
        font-size: 12px;
        >span{
            display: none;
            // width: 0;
            // height: 0;
        }
    }
    .priceshow{
        color: #F8A535;
        font-size: 20px;
        margin-top: 10px;
        text-align: center;
    }
    #calendar .el-button-group>.el-button:not(:first-child):not(:last-child):after{
        content: '当月';
    }
    .el-calendar-table:not(.is-range) td.next, .el-calendar-table:not(.is-range) td.prev , .el-calendar-table:not(.is-range) td.current{
        pointer-events: none;
        color: #000;
    }
    .el-calendar-table:not(.is-range) td.next{
        display: none;
    }
    .el-calendar-table:not(.is-range) td.prev{
        // opacity: 0;
        border-left:1px solid transparent;
        border-right:1px solid transparent; 
    }
     .el-calendar-table:not(.is-range) td.current{
       border: 1px solid #EBEEF5;
    }
}
</style>
