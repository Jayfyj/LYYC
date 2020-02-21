<template>
    <div>
        <div style="width:100%;">
            <h2  style="width:100%;margin-left:1%">添加房型</h2>
        </div>
        <div style="width:100%;height:10px;background:#f2f2f2;">
        </div>
        <div class="addNewFrom">
             <el-col :span="24" style="padding:10px 20% 0px;padding-left:15%;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <!-- 输入框：类型名称 -->
                    <el-form-item label="类型名称" prop="TNAME">
                        <el-input v-model="ruleForm.TNAME" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 选择框：标准房型 -->
                    <el-form-item label="标准房型" prop="STANDARD_TYPE">
                        <el-select v-model="ruleForm.STANDARD_TYPE" placeholder="请选择内容" auto-complete="off">
                            <el-option label="标准间" value="标准间"></el-option>
                            <el-option label="豪华间" value="豪华间"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 输入框：床位数 -->
                    <el-form-item label="床位数" prop="BED_NUM">
                        <el-input v-model="ruleForm.BED_NUM" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：可住人数 -->
                    <el-form-item label="可住人数" prop="CAPACITY">
                        <el-input v-model="ruleForm.CAPACITY" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：门市价 -->
                    <el-form-item label="门市价" prop="PRICE">
                        <el-input v-model="ruleForm.PRICE" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：房型风格 -->
                    <el-form-item label="房型风格" prop="ROOM_STYLE">
                        <el-input v-model="ruleForm.ROOM_STYLE" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 单选框：窗户 -->
                    <el-form-item label="窗户" prop="HASWINDOW">
                        <el-radio-group v-model="ruleForm.HASWINDOW" auto-complete="off">
                            <el-radio class="radio" label="有窗"></el-radio>
                            <el-radio class="radio" label="无窗"></el-radio>
                            <el-radio class="radio" label="部分有窗"></el-radio>
                            <el-radio class="radio" label="内窗"></el-radio>
                            <el-radio class="radio" label="封闭窗"></el-radio>
                            <el-radio class="radio" label="天窗"></el-radio>
                            <el-radio class="radio" label="飘窗"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 选择框：餐食 -->
                    <el-form-item label="餐食" prop="MEALS">
                        <el-select v-model="ruleForm.MEALS" placeholder="请选择内容" auto-complete="off" >
                            <el-option label="早餐" value="早餐"></el-option>
                            <el-option label="午餐" value="午餐"></el-option>
                            <el-option label="晚餐" value="晚餐"></el-option>
                            <el-option label="无" value="无"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 输入框：楼层 -->
                    <el-form-item label="楼层" prop="FLOOR">
                        <el-input v-model="ruleForm.FLOOR" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：面积 -->
                    <el-form-item label="面积(㎡)" prop="MAXAREA">
                        <el-input v-model="ruleForm.MAXAREA" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>

                    <!-- 床型 -->
                    <el-form-item label="床型" prop="BTYPE" style="width:100%">
                        <el-checkbox-group v-model="ruleForm.BTYPE">
                            <div v-for="(item,index) in  ruleForm.bedType" :key= 'index' > 
                                <el-checkbox :label="item.name"></el-checkbox>
                                <el-select v-model="item.nameType" placeholder="请选择内容" auto-complete="off" style="width:25%">
                                    <el-option label="大床" value="大床"></el-option>
                                    <el-option label="双床" value="双床"></el-option>
                                    <el-option label="圆床" value="圆床"></el-option>
                                </el-select>
                                <el-input v-model="item.many" auto-complete="off" style="width:20%" placeholder="请输入内容">
                                    <label slot="append">张</label>
                                </el-input>
                                <el-input v-model="item.size" auto-complete="off" style="width:20%" placeholder="请输入内容">
                                    <label slot="prepend">宽</label>
                                    <label slot="append">米</label>
                                </el-input>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <!-- 多选框：其他设备 -->
                    <el-form-item label="其他设备" prop="OTHERFACILITIES">
                        <el-checkbox-group v-model="ruleForm.OTHERFACILITIES">
                            <el-checkbox label="wifi" name="type"></el-checkbox>
                            <el-checkbox label="有线宽带" name="type"></el-checkbox>
                            <el-checkbox label="出风机" name="type"></el-checkbox>
                            <el-checkbox label="洗浴用品" name="type"></el-checkbox>
                            <el-checkbox label="电话" name="type"></el-checkbox>
                            <el-checkbox label="液晶电视" name="type"></el-checkbox>
                            <el-checkbox label="220V电压插座" name="type"></el-checkbox>
                            <el-checkbox label="拖鞋" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="resetForm('ruleForm')">取消</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')" style="margin-left:10%">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
    </div>
</template>

<script>
  export default {
    name:'addHouse',
  data() {
      return {
        ruleForm: {
            "TID": "",//房型ID
            "TNAME": "",//房型名称
            "STANDARD_TYPE": "",//房型标准类型
            "BED_NUM":"", //床位数
            "CAPACITY": "",//可住人数
            "PRICE": "",//售卖价格
            "ROOM_STYLE": "",//房间风格
            "HASWINDOW": "",//窗户
            "MEALS": "",//餐食
            "FLOOR": "",//楼层
            "MAXAREA": "",//最大面积
            "MINAREA": "",//最小面积
            "BTYPE": [], //床型
            "OTHERFACILITIES": [],//其他设施
            "HOTEL_TYPE": "",//酒店类型：酒店，度假村，民宿，客栈，县级酒店，青年旅舍，主题酒店，温泉酒店等
            "HOTEL_ID ": "",//酒店ID
            "ISSUITE": "",//是否套房
            "CANADDBED": "",//是否可加床
            "NETWORK": "",//网络
            "NOSMOKE": "",//禁烟
            "FEEDESC": "",//费用说明
            "FOOD": "",//食品饮品
            "BATHROOM": "",//浴室说明
            "CANCELDESC": "",//取消说明
            "VALIDINWEEK": "",//有效星期
            "IFUSE": "",//是否启用
            "IFREMAINING": "",//是否有余量
            "bedType":[{
                "name":"大床",
                "nameType":"大床",
                "many":"1",
                "size":"1.8"
            },
            {
                "name":"双床",
                "nameType":"双床",
                "many":"2",
                "size":"1.2"
            },
            {
                "name":"圆床",
                "nameType":"圆床",
                "many":"1",
                "size":"1.5"
            }
            ],
        },
        rules: {
            TNAME: [
                { required: true, message: '请输入类型名称', trigger: 'blur' }
            ],
            STANDARD_TYPE: [
                { required: true, message: '请输入标准房型', trigger: 'change' }
            ],
            BED_NUM:[
                { required: true, message: '请输入床位数', trigger: 'blur' }
            ],
            CAPACITY:[
                { required: true, message: '请输入可住人数', trigger: 'blur' }
            ],
            PRICE:[
                { required: true, message: '请输入门市价', trigger: 'blur' }
            ],
            ROOM_STYLE:[
                { required: true, message: '请输入房型风格', trigger: 'blur' }
            ],
            HASWINDOW:[
                { required: true, message: '请选择窗户类型', trigger: 'change' }
            ],
            MEALS:[
                { required: true, message: '请选择餐食类型', trigger: 'change' }
            ],
            FLOOR:[
                { required: true, message: '请输入楼层类型', trigger: 'blur' }
            ],
            MAXAREA:[
                { required: true, message: '请输入面积', trigger: 'blur' }
            ],
            OTHERFACILITIES: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            BTYPE: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
        },
        //测试url
        testURL:'./static/json/room002.json',
      };
    },
    methods: {
        //提交
        submitForm(formName) {
          
            var arr  = this.ruleForm.bedType;
            var brr = this.ruleForm.BTYPE;
            var crr = []
            var drr = []

            for(var i =0 ;i<brr.length;i++){
                console.log(0)
                for(var j = 0;j<arr.length;j++){
                    if(arr[j]['name'] == brr[i]){
                        console.log(1)
                        if(arr[j]['nameType']!=''||arr[j]['many']!=''||arr[j]['size']!=''){
                            crr.push(brr[i]);
                            drr.push(arr[i]);
                        }
                    }
                }
            }
            this.ruleForm.BTYPE = crr;
            this.ruleForm.choBTYPE = drr;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
                this.getData(this.ruleForm)
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },

        //取消
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

         //获取酒店房间信息
        getData(data){
            var params = {"txcode":"room002","data":data};
            this.ajax("get",params,(res) => {
                console.log(res.data)
                if(res.data.ret_code == "200"){
                    console.log(this.ruleForm)
                }
            },(err) => {console.log(err,"错误提示")},this.testURL);
        },
        
    },
    mounted(){
        console.log(this.ruleForm)
        // this.getData(this.$route.params.room)
    }
}
</script>
<style scoped lang="scss">
.addNewFrom{
  width:100%;
  height:500px;
  overflow: auto;
//   >.demo-ruleForm{
//     padding: 0 40%;
//     box-sizing: border-box;

//   }
 
}
.addNewFrom>.title{
    width: 100%;
    height: 50px;
}

.addNewFrom .el-form-item .el-radio+.el-radio{
    margin-left: 0;
}

.addNewFrom .el-form-item .el-radio{
    margin-right:15px; 
    margin-bottom:5px; 

}
.addNewFrom .el-form-item{
    padding:1% 10%;

}

.addNewFrom .el-form-item .el-input, .addNewFrom .el-form-item .el-select{
    padding:0 1%;
    width:80%
}

.addNewFrom .el-form-item .el-checkbox+.el-checkbox {
    margin-left: 0;
}

.addNewFrom .el-form-item .el-checkbox {
    margin-bottom:5px; 
    margin-right:15px; 
}

.addNewFrom .el-form-item .el-checkbox .el-input{
     width:20% ;
}
// .el-form-item__error {
//     color: #ff4949;
//     // font-size: 12px;
//     // line-height: 1;
//     // padding-top: 4px;
//     // position: absolute;
//     top: 25%;
//     right: -20%;
// }
</style>