<template>
    <div>
        <div style="width:100%;">
            <h2  style="width:100%;margin-left:1%">设置日历价格</h2>
        </div>
        <div style="width:100%;height:10px;background:#f2f2f2;">
        </div>
        <div class="addNewFrom">
             <el-col :span="24" style="padding:10px 20% 0px;padding-left:15%;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <!-- 选择框：房间类型 -->
                    <el-form-item label="房间类型" prop="roomtype_id">
                        <el-select v-model="ruleForm.roomtype_id" placeholder="请选择内容" auto-complete="off">
                            <el-option label="标准间" value="标准间"></el-option>
                            <el-option label="豪华间" value="豪华间"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 输入框：价格策略名称 -->
                    <el-form-item label="价格策略名称" prop="tname">
                        <el-input v-model="ruleForm.tname" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：卖价 -->
                    <el-form-item label="卖价" prop="price">
                        <el-input v-model="ruleForm.price" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：结算价格 -->
                    <el-form-item label="结算价格" prop="cost">
                        <el-input v-model="ruleForm.cost" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：门市价 -->
                    <el-form-item label="门市价" prop="priceshow">
                        <el-input v-model="ruleForm.priceshow" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                     <!-- 输入框：开始时间 -->
                    <el-form-item label="开始时间" prop="bdate">
                        <el-date-picker
                            v-model="ruleForm.bdate"
                            type="date"
                            :picker-options="pickerOptions"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <!-- 输入框：结束时间 -->
                    <el-form-item label="结束时间" prop="edate">
                        <el-date-picker
                            v-model="ruleForm.edate"
                            type="date"
                            :picker-options="pickerOptions1"
                            placeholder="选择日期">
                        </el-date-picker>
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
    name:'priCalendarSet',
    data() {
      return {
        
        startTime: '',//开始日期
        endTime: '',//结束日期
        pickerOptions: {
            disabledDate:(time) =>{
                if(this.ruleForm.edate){
                    return time.getTime() > new Date(this.ruleForm.edate).getTime() || time.getTime() < Date.now() - 8.64e7
                }else{
                    return time.getTime() < Date.now() - 8.64e7
                }
               
            }
        },
        pickerOptions1: {
            disabledDate:(time) =>{
                if(this.ruleForm.bdate){
                    return time.getTime() < new Date(this.ruleForm.bdate).getTime() 
                }else{
                    return time.getTime() < Date.now() - 8.64e7
                }
               
            }
        },


        ruleForm: {
            "hotel_id": "",//酒店id
            "roomtype_id": "",//房型id
            "tname": "",//价格策略名称
            "price": "",//卖价
            "cost": "",//结算价格
            "priceshow": "",//门市价
            "bdate": "",//开始时间
            "edate": "",//结束时间

        },
        rules: {
            roomtype_id: [
                { required: true, message: '请选择房型类型', trigger: 'change' }
            ],
            tname:[
                { required: true, message: '请输入价格策略名称', trigger: 'blur' }
            ],
            price:[
                { required: true, message: '请输入卖价', trigger: 'blur' }
            ],
            cost:[
                { required: true, message: '请输入结算价格', trigger: 'blur' }
            ],
            priceshow:[
                { required: true, message: '请输入门市价', trigger: 'blur' }
            ],
            bdate:[
                { required: true, message: '请选择开始时间', trigger: 'change' }
            ],
            edate:[
                { required: true, message: '请选择结束时间', trigger: 'change' }
            ]
        },
        //测试url
        testURL:'./static/json/room002.json',
      };
    },
    methods: {

        //提交
        submitForm(formName) {
            // this.changeDate(this.ruleForm)
            // console.log(this.ruleForm)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    this.$confirm('此操作设置房间类型, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.changeDate(this.ruleForm)
                        this.getData(this.ruleForm);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消!'
                        });          
                    });
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

        //转化yy-mm-dd
        changeDate(obj){
            var start = new Date(obj.bdate); 
            var sm = start.getMonth() + 1;  
            sm = sm < 10 ? '0' + sm : sm;  
            var sd = start.getDate();  
            sd = sd < 10 ? ('0' + sd) : sd;
            obj.bdate = start.getFullYear() + '-' + sm + '-' + sd;

            var end = new Date(obj.edate); 
            var em = end.getMonth() + 1;  
            em = em < 10 ? '0' + em : em;  
            var ed = end.getDate();  
            ed = ed < 10 ? ('0' + ed) : ed;
            obj.edate = end.getFullYear() + '-' + em + '-' + ed;
        },

        //设置请求
        getData(data){
            var params = {"txcode":"price002","data":data};
            this.ajax("get",params,(res) => {
                console.log(res.data)
                if(res.data.ret_code == "200"){
                    console.log(this.ruleForm)
                    this.$message({
                        type: 'success',
                        message: '设置成功!'
                    });     
                }else{
                    this.$message({
                        type: 'info',
                        message: '设置失败!'
                    });   
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