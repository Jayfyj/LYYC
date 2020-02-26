<template>
    <div>
        <div style="width:100%;">
            <h2  style="width:100%;margin-left:1%">酒店信息（可修改）</h2>
        </div>
        <div style="width:100%;height:10px;background:#f2f2f2;">
        </div>
        <div class="editNewFrom">
            <el-col :span="24" style="padding:10px 20% 0px;padding-left:15%;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                    <!-- 输入框：酒店名称 -->
                    <el-form-item label="酒店名称" prop="TNAME">
                        <el-input v-model="ruleForm.TNAME" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 选择框：酒店类型 -->
                    <el-form-item label="酒店类型" prop="HOTEL_TYPE">
                        <el-select v-model="ruleForm.HOTEL_TYPE" placeholder="请选择内容" auto-complete="off">
                            <el-option label="酒店" value="酒店"></el-option>
                            <el-option label="度假村" value="度假村"></el-option>
                            <el-option label="民宿" value="民宿"></el-option>
                            <el-option label="客栈" value="客栈"></el-option>
                            <el-option label="县级酒店" value="县级酒店"></el-option>
                            <el-option label="青年旅舍" value="青年旅舍"></el-option>
                            <el-option label="主题酒店" value="主题酒店"></el-option>
                            <el-option label="温泉酒店" value="温泉酒店"></el-option>
                            <el-option label="无" value="无"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 选择框：酒店风格 -->
                    <el-form-item label="酒店风格" prop="HOTEL_STYLE">
                        <el-select v-model="ruleForm.HOTEL_STYLE" placeholder="请选择内容" auto-complete="off">
                            <el-option label="复古" value="复古"></el-option>
                            <el-option label="现代" value="现代"></el-option>
                            <el-option label="无" value="无"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 二级联动：地区 -->
                    <el-form-item label="地区" prop="AREA">
                         <el-select size="small" style="width: 100px" v-model="selectProv" placeholder="请选择省份" v-on:change="getProv($event)"> 
                            <el-option v-for="(item,index) in provs" :label="item.label" :value="item.value" :key="index"> </el-option> 
                        </el-select>
                        <el-select size="small" style="width: 100px"  v-model="ruleForm.AREA" placeholder="请选择城市" v-on:change="getCity($event)"> 
                            <el-option v-for="(item,index) in citys" :label="item.label" :value="item.value" :key="index"></el-option> 
                        </el-select>
                    </el-form-item>

                    
                    <!-- 输入框：详细地址 -->
                    <el-form-item label="详细地址" prop="ADDR">
                        <el-input v-model="ruleForm.ADDR" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 单选框：星级 -->
                    <el-form-item label="星级" prop="STARS">
                        <el-radio-group v-model="ruleForm.STARS" auto-complete="off">
                            <el-radio class="radio" label="1星"></el-radio>
                            <el-radio class="radio" label="2星"></el-radio>
                            <el-radio class="radio" label="3星"></el-radio>
                            <el-radio class="radio" label="4星"></el-radio>
                            <el-radio class="radio" label="5星"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 输入框：总机 -->
                    <el-form-item label="总机" prop="SWITCHBOARD">
                        <el-input v-model="ruleForm.SWITCHBOARD" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：所属集团 -->
                    <el-form-item label="所属集团" prop="CORP_GROUP">
                        <el-input v-model="ruleForm.CORP_GROUP" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：品牌 -->
                    <el-form-item label="所属品牌" prop="CORP_BRAND">
                        <el-input v-model="ruleForm.CORP_BRAND" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：开业时间 -->
                    <el-form-item label="开业时间" prop="OPENING_DATE">
                        <el-input v-model="ruleForm.OPENING_DATE" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：最近装修时间 -->
                    <el-form-item label="最近装修时间" prop="LATEST_RENOVATION">
                        <el-input v-model="ruleForm.LATEST_RENOVATION" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                     <!-- 单选框：付款类型 -->
                    <el-form-item label="付款类型" prop="PRICE_TYPE">
                        <el-radio-group v-model="ruleForm.PRICE_TYPE" auto-complete="off">
                            <el-radio class="radio" label="到付"></el-radio>
                            <el-radio class="radio" label="预付"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 输入框：联系人姓名 -->
                    <el-form-item label="联系人姓名" prop="CONTACT_NAME">
                        <el-input v-model="ruleForm.CONTACT_NAME" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：联系人座机-->
                    <el-form-item label="联系人座机" prop="LANDLINE">
                        <el-input v-model="ruleForm.LANDLINE" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：联系人手机号 -->
                    <el-form-item label="联系人手机号" prop="MOBILE_PHONE">
                        <el-input v-model="ruleForm.MOBILE_PHONE" auto-complete="off" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- 输入框：联系人邮箱-->
                    <el-form-item label="联系人邮箱" prop="EMAIL">
                        <el-input v-model="ruleForm.EMAIL" auto-complete="off" placeholder="请输入内容"></el-input>
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
    name:'hotelInfo',
    data() {
      return {
        //请求的全国地址json
        areaJson:{},
        //省数组
        provs:[],
        //城市数组
        citys:[],
        //选中的省
        selectProv:"",
        //选中的城市
        selectCity:"",
        //请求全国地址测试url
        areaURL:'./static/json/area.json',
        ruleForm: {
            "TID": "",//酒店id
            "TNAME": "",//酒店名称
            "HOTEL_TYPE": "",//酒店类型：酒店，度假村，民宿，客栈，县级酒店，青年旅舍，主题酒店，温泉酒店等
            "HOTEL_STYLE": "",//酒店风格
            "AREA": "",//地区
            "ADDR": "",//详细地址
            "STARS": "",//星级
            "LONGITUDE": "",//经度
            "LATITUDE": "",//纬度
            "SWITCHBOARD": "",//总机
            "CORP_GROUP": "",//所属集团
            "CORP_BRAND": "",//所属品牌
            "OPENING_DATE": "",//开业时间
            "LATEST_RENOVATION": "",//最近装修时间
            "PRICE_TYPE": "",//付款类型：到付 预付
            "CONTACT_NAME": "",//联系人名字
            "LANDLINE": "",//联系座机
            "MOBILE_PHONE": "",//联系人手机号
            "EMAIL": ""//邮箱地址
        },

        rules: {
            TNAME: [
                { required: true, message: '请输入酒店名称', trigger: 'blur' }
            ],
            HOTEL_TYPE: [
                { required: true, message: '请选择酒店类型', trigger: 'change' }
            ],
            HOTEL_STYLE:[
                { required: true, message: '请选择酒店风格', trigger: 'change' }
            ],
            AREA:[
                { required: true, message: '请选择地区', trigger: 'change' }
            ],
            ADDR:[
                { required: true, message: '请输入详细地址', trigger: 'blur' }
            ],
            STARS:[
                { required: true, message: '请选择星级', trigger: 'change' }
            ],
            SWITCHBOARD:[
                { required: true, message: '请输入总机', trigger: 'blur' }
            ],
            CORP_GROUP:[
                { required: true, message: '请输入所属集团', trigger: 'blur' }
            ],
            CORP_BRAND:[
                { required: true, message: '请输入所属品牌', trigger: 'blur' }
            ],
            OPENING_DATE:[
                { required: true, message: '请输入开业时间', trigger: 'blur' }
            ],
            LATEST_RENOVATION:[
                { required: true, message: '请输入最近装修时间', trigger: 'blur' }
            ],
            PRICE_TYPE:[
                { required: true, message: '请选择付款类型', trigger: 'change' }
            ],
            CONTACT_NAME:[
                { required: true, message: '请输入联系人名字', trigger: 'blur' }
            ],
            LANDLINE:[
                { required: false, message: '请输入联系人座机', trigger: 'blur' }
            ],
            MOBILE_PHONE:[
                { required: true, message: '请输入联系人手机号', trigger: 'blur' }
            ],
            EMAIL:[
                { required: true, message: '请输入联系人邮箱', trigger: 'blur' }
            ]
        },
        //测试url
        testURL:'./static/json/hotel001.json',
      };
    },
    methods: {
        //大写转化小写
        UpperToLower(obj){
            var newobj = {};
            for(var key in obj){
                newobj[key.toLowerCase()] = obj[key]
            }
            return newobj
        },


        //提交
        submitForm(formName) {
            // console.log(this.ruleForm)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('此操作将修改酒店信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var data = "";
                        data = this.UpperToLower(this.ruleForm);
                        var params = {"txcode":"hotel002","data":data};
                        this.ajax("get",params,(res) => {
                            if(res.data.ret_code == "200"){
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });       
                            }else{
                                this.$message({
                                    ype: 'info',
                                    message: '修改失败!'
                                });    
                            }
                        },(err) => {console.log(err,"错误提示")},this.testURL);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消!'
                        });          
                    });
                }else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },


        //取消
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        //获取酒店信息
        getData(){
            var params = {"txcode":"hotel001"};
            this.ajax("get",params,(res) => {
                console.log(res.data)
                if(res.data.ret_code == "200"){
                    var oldParams = this.ruleForm;
                    var ajaxParams = res.data.data;
                    var newParams = {};
                    //合并
                    Object.assign(newParams,oldParams,ajaxParams);
                    this.ruleForm = newParams;
                    // console.log(this.ruleForm)
                    this.tranfromCNArea()
                }else{
                    this.$message({
                        ype: 'info',
                        message: '  请求失败!'
                    });    
                }
            },(err) => {console.log(err,"错误提示")},this.testURL);
        },

        //请求全国地址
        getAreaData(){
            this.ajax("get",{},(res) => {
                // console.log(res.data)
                this.areaJson = res.data;
                var arr = [];
                for(var key in res.data["100000"]){
                    var provs ={}
                    provs["value"] = key;
                    provs["label"] =  res.data["100000"][key];
                    arr.push(provs)
                }
                this.provs = arr;
                this.getData();
            },(err) => {console.log(err,"错误提示")},this.areaURL);
        },

        //选择省
        getProv(event){
            console.log(this.selectProv)
            var arr = [];
            for(var key in this.areaJson[this.selectProv]){
                var provs ={}
                provs["value"] = key;
                provs["label"] =  this.areaJson[this.selectProv][key];
                arr.push(provs)
            }
            // this.selectCity = arr[0].value;
            if(this.selectCity){
                for(var i= 0;i<arr.length;i++){
                    if(arr[i].value == this.selectCity){
                        var a = arr[i]
                        arr.splice(i,1);
                        arr.unshift(a)
                        this.selectCity =''
                    }
                }
            }
            this.citys = arr;
            this.ruleForm.AREA = arr[0].value;  
            // console.log(arr)
        },

        //选择城市
        getCity(event){

        },

        //获取中文显示地址
        tranfromCNArea(){
            var areaKey = this.ruleForm.AREA
            this.selectCity = areaKey
            for(var i = 0;i<this.provs.length;i++){
                for(var key in this.areaJson[this.provs[i]['value']]){
                    // console.log(key=="440700")
                    if(key== areaKey ){
                        // console.log(this.provs[i])
                        this.selectProv = this.provs[i].value;
                    }
                }
            }
        }
        
    },
    mounted(){
        this.getAreaData();
    }
  }
</script>
<style scoped lang="scss">
.editNewFrom{
  width:100%;
  height:500px;
  overflow: auto;
 
}
.editNewFrom>.title{
    width: 100%;
    height: 50px;
}

.editNewFrom .el-form-item .el-radio+.el-radio{
    margin-left: 0;
}

.editNewFrom .el-form-item .el-radio{
    margin-right:15px; 
    margin-bottom:5px; 

}
.editNewFrom .el-form-item{
    padding:1% 10%;

}

.editNewFrom .el-form-item .el-input, .editNewFrom .el-form-item .el-select{
    padding:0 1%;
    width:80%
}

.editNewFrom .el-form-item .el-checkbox+.el-checkbox {
    margin-left: 0;
}

.editNewFrom .el-form-item .el-checkbox {
    margin-bottom:5px; 
    margin-right:15px; 
}

.editNewFrom .el-form-item .el-checkbox .el-input{
     width:20% ;
}

</style>