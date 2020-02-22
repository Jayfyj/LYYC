<template>
    <div>
        <div style="width:100%;" class="title">
            <h2  style="width:100%;margin-left:1%">订单详情</h2>
            <div>
                <el-button @click="goback()" style="float:right">返回</el-button>
			    <el-button type="primary" @click="submit()" style="float:right">确认</el-button>
			</div>
        </div>
        <div style="width:100%;height:10px;background:#f2f2f2;">
        </div>
        <div class="orderNewFrom">
            <el-col :span="24" style="display:flex;flex-warp:warp;flex-wrap: wrap">
                <div class="ruleItemWrap">
                    <!-- 酒店 -->
                    <div class="ruleItem" v-if="ruleForm.TID">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>订单ID：</span>
                        </div>
                         <div>
                           <span>{{ruleForm.TID}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.SYSTYPE">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>来源渠道：</span>
                        </div>
                        <div>
                           <span>{{ruleForm.CNSYSTYPE}}</span>
                        </div>
                    </div>
                </div>
                <!-- 景区 -->
                <div class="ruleItemWrap">
                    <div class="ruleItem" v-if="ruleForm.HOTELID">
                        <div>
                           <i class="el-icon-setting"></i>
                           <span>酒店ID：</span>
                        </div>
                         <div>
                            <span>{{ruleForm.HOTELID}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.JINGQUID">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>景区ID：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.JINGQUID}}</span>
                        </div>
                    </div>
                </div>
                <!-- 房型 -->
                <div class="ruleItemWrap">
                    <div class="ruleItem" v-if="ruleForm.TYPEID">
                        <div>
                           <i class="el-icon-setting"></i>
                            <span>预定房型ID：</span>
                        </div>
                         <div>
                            <span>{{ruleForm.TYPEID}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.ROOMNUM">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>预定房间数：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.ROOMNUM}}</span>
                        </div>
                    </div>
                </div>
                <!-- 时间 -->
                <div class="ruleItemWrap">
                    <div class="ruleItem" v-if="ruleForm.BOSDAY">
                        <div>
                            <i class="el-icon-setting"></i>
                           <span>预定开始时间：</span>
                        </div>
                         <div>
                            <span>{{ruleForm.BOSDAY}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.BOEDAY">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>预定结束时间：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.BOEDAY}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.ARRIVETIME">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>预计到店时间：</span>
                        </div>
                        <div>
                           <span>{{ruleForm.ARRIVETIME}}</span>
                        </div>
                    </div>
                </div>
                <!-- 支付类型 -->
                <div class="ruleItemWrap">
                    <div class="ruleItem" v-if="ruleForm.PSTATE">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>支付状态：</span>
                        </div>
                         <div>
                            <span>{{ruleForm.CNPSTATE}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.PTYPE">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>支付类型：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.CNPTYPE}}</span>
                        </div>
                    </div>
                </div>
                <!-- 价格 -->
                <div class="ruleItemWrap">
                    <div class="ruleItem" v-if="ruleForm.TOTALCOST">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>总结算金额：</span>
                        </div>
                         <div>
                            <span>{{ruleForm.TOTALCOST}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.TOTALPRICE">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>总价：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.TOTALPRICE}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.DISCOUNT">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>折扣减除金额：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.DISCOUNT}}</span>
                        </div>
                    </div>
                </div>
                <!-- 退款 -->
                <div class="ruleItemWrap">
                    <div class="ruleItem" v-if="ruleForm.RMONEY">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>退款金额：</span>
                        </div>
                         <div>
                            <span>{{ruleForm.RMONEY}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.RFEE">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>退款手续费：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.RFEE}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.RSTATE">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>退款状态：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.CNRSTATE}}</span>
                        </div>
                    </div>
                </div>
                <!-- 个人信息1 -->
                <div class="ruleItemWrap">
                    <div class="ruleItem" v-if="ruleForm.MEMBERID">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>用户账号：</span>
                        </div>
                         <div>
                            <span>{{ruleForm.MEMBERID}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.CTPHONE">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>联系电话：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.CTPHONE}}</span>
                        </div>
                    </div>
                </div>
                <!-- 个人信息2 -->
                <div class="ruleItemWrap">
                    <div class="ruleItem" v-if="ruleForm.IDNO">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>身份证号码：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.IDNO}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.EMAIL">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>邮箱地址：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.EMAIL}}</span>
                        </div>
                    </div>
                </div>
                 <!-- 订单 -->
                <div class="ruleItemWrap">
                    <div class="ruleItem" v-if="ruleForm.STATE">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>订单状态：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.CNSTATE}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.CFUSER">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>确认人员：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.CFUSER}}</span>
                        </div>
                    </div>
                    <div class="ruleItem" v-if="ruleForm.CFTIME">
                        <div>
                            <i class="el-icon-setting"></i>
                            <span>确认时间：</span>
                        </div>
                        <div>
                            <span>{{ruleForm.CFTIME}}</span>
                        </div>
                    </div>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
  export default {
    name:'orderDetails',
    data() {
      return {
        ruleForm: {
            "TID": "",//订单ID
            "SYSTYPE": "",//来源渠道：1、网上售票 2、手机(21:微信、22：微信小程序、23：支付宝、24：H5、26：龙支付app) 3、代售  4、预定  5、期票销售  6、电商
            "HOTELID": "",//酒店id
            "JINGQUID": "",//景区id
            "MEMBERID": "",//用户账号
            "CTPHONE": "",//联系电话
            "IDNO": "",//身份证号码
            "EMAIL": "",//邮箱地址
            "TYPEID": "",//预定房型ID
            "ROOMNUM": "",//预定房间数
            "BOSDAY": "",//预定开始时间
            "BOEDAY": "",//预定结束时间
            "ARRIVETIME": "",//预计到店时间
            "PSTATE": "",//支付状态：0：未支付   1：用户已点击进行支付按钮      2：等待银行确认     100：已支付
            "PTYPE": "",//支付类型：1：微信支付 2：支付宝 3：龙支付 4：聚合支付 10：线下支付
            "TOTALCOST": "",//总结算金额
            "TOTALPRICE": "",//总价
            "DISCOUNT": "",//折扣减除金额
            "RMONEY": "",//退款金额
            "RFEE": "",//退款手续费
            "RSTATE": "",//退款状态：0：申请中  1：已进行退款 2：审核不通过(不退款)   3：审核通过 4、第三方待退款  5:退款失败  -10:等待处理
            "STATE": "",//订单状态：-1：  等待商家确认0：订单提交成功：不可用 1： 订单交易成功：可用  2：订单已关闭
            "CFUSER": "",//确认人员
            "CFTIME": "",//确认时间
        },
        //测试url
        testURL:'./static/json/order001.json',
        //渠道转换
        SYSTYPECNStatus:{
            "1":"网上售票",
            "21":"微信",
            "22":"微信小程序",
            "23":"支付宝",
            "24":"H5",
            "26":"龙支付app", 
            "3":"代售",
            "4":"预定", 
            "5":"期票销售",  
            "6":"电商",
        },
        //支付状态转化
        PSTATECNStatus:{
            "0":"未支付",
            "1":"用户已点击进行支付按钮",
            "2":"等待银行确认",
            "100":"已支付",
        },
        //支付类型转化
        PTYPECNStatus:{
            "1":"微信支付",
            "2":"支付宝",
            "3":"龙支付",
            "4":"聚合支付",
            "10":"线下支付"
        },
        //退款状态转化
        RSTATECNStatus:{
            "0":"申请中",  
            "1":"已进行退款", 
            "2":"审核不通过(不退款)", 
            "3":"审核通过", 
            "4":"第三方待退款",  
            "5":"退款失败",  
            "-10":"等待处理",
        },
        //订单状态转化
        STATECNStatus:{
            "-1":"等待商家确认",
            "0":"订单提交成功：不可用",  
            "1":"订单交易成功：可用", 
            "2":"订单已关闭", 
        },
        //删除添加的属性
        delAttr:{}
      };
    },
    methods: {

        //渠道转换
        orderSYSTYPECNStatus(obj){
            for(var key in this.SYSTYPECNStatus){
                if(obj.SYSTYPE == key){
                    obj.CNSYSTYPE = this.SYSTYPECNStatus[key];
                    this.delAttr.CNSYSTYPE = '';
                }
            }
        },

        //支付状态转化
        orderPSTATECNStatus(obj){
            for(var key in this.PSTATECNStatus){
                if(obj.PSTATE == key){
                    console.log(1)
                    obj.CNPSTATE = this.PSTATECNStatus[key];
                    this.delAttr.CNPSTATE = '';
                }
            }
        },

        //支付类型转化
        orderPTYPECNStatus(obj){
            for(var key in this.PTYPECNStatus){
                if(obj.PTYPE == key){
                    obj.CNPTYPE = this.PTYPECNStatus[key];
                    this.delAttr.CNPTYPE = '';
                }
            }
        },

        //退款状态转化
        orderRSTATECNStatus(obj){
            for(var key in this.RSTATECNStatus){
                if(obj.RSTATE == key){
                    obj.CNRSTATE = this.RSTATECNStatus[key];
                    this.delAttr.CNRSTATE = '';
                }
            }
        },

        //订单状态转化
        orderSTATECNStatus(obj){
            for(var key in this.STATECNStatus){
                if(obj.STATE == key){
                    obj.CNSTATE = this.STATECNStatus[key];
                    this.delAttr.CNSTATE = '';
                }
            }
        },

        //提交
        submit() {
            for(var delKey in this.delAttr){
               delete this.ruleForm[delKey];
            }
            this.$confirm('此操作确定订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var params = {"txcode":"order003","data":this.ruleForm};
                this.ajax("get",params,(res) => {
                    console.log(res.data)
                    if(res.data.ret_code == "200"){
                        this.$message({
                            type: 'success',
                            message: '确认成功!'
                        });     
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
        //返回
        goback(){
            this.$router.go(-1);
        },


        //获取酒店房间信息
        getData(data){
            var params = {"txcode":"order001","data":{"orderId":data.TID}};
            this.ajax("get",params,(res) => {
                console.log(res.data)
                if(res.data.ret_code == "200"){
                    var oldParams = this.ruleForm;
                    var ajaxParams = res.data.data;
                    var newParams = {};
                    //合并
                    console.log(12)
                    Object.assign(newParams,oldParams,ajaxParams);
                    this.ruleForm = newParams;
                    this.orderSYSTYPECNStatus(this.ruleForm);
                    this.orderPSTATECNStatus(this.ruleForm);
                    this.orderPTYPECNStatus(this.ruleForm);
                    this.orderRSTATECNStatus(this.ruleForm);
                    this.orderSTATECNStatus(this.ruleForm);
                    // console.log(this.ruleForm)
                }
            },(err) => {console.log(err,"错误提示")},this.testURL);
        },
        
    },
    mounted(){
        console.log(this.$route.params.order)
        this.getData(this.$route.params.order)
    }
  }
</script>
<style scoped lang="scss">

.title{
    width: 100%;
    // height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1%;
    box-sizing: border-box;
    div{
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
}

.orderNewFrom{
    width:100%;
    height:500px;
    overflow: auto;
    .ruleItemWrap{
        display:flex;
        justify-content: flex-start;
        align-items: center;
        width:100%;
        height:50px;
        .ruleItem{
            flex: 1;
            height:50px;
            display:flex;
            justify-content: flex-start;
            align-items: center;
            >div{
                padding:1%;
                box-sizing: border-box; 
                flex: 1;
                height: 100%;
                border: 1px solid silver;
                display:flex;
                justify-content: flex-start;
                align-items: center;
                i{
                    color: #20a0ff;
                }
                span{
                    margin-left: 10px;
                }
            }
        }
    }
}

</style>