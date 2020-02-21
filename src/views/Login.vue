<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title" :style="sysAttr.style">{{sysAttr.name}}</h3>
    <el-form-item prop="account">
        <span class="fromMes">
            <span>{{ruleFormMes.account}}</span>
            <i class="fa fa-times-circle-o" aria-hidden="true" @click="ruleForm.account=''"></i>
        </span> 
      <el-input type="text" v-model="ruleForm.account" auto-complete="off" :placeholder='ruleFormMes.account'></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
        <span class="fromMes">
            <span>{{ruleFormMes.checkPass}}</span>
            <i :class="passwordIsShow?'fa fa-eye':'fa fa-eye-slash'" aria-hidden="true" @click="passwordIsShow=!passwordIsShow"></i>
        </span>
      <el-input :type="passwordIsShow?'test':'password'" v-model="ruleForm.checkPass" auto-complete="off" :placeholder='ruleFormMes.checkPass'></el-input>
    </el-form-item>
    <el-form-item prop="verificationCode">
      <span class="fromMes">
        <span>{{ruleFormMes.verificationCode}}</span>
        <i class="fa fa-times-circle-o" aria-hidden="true" @click="ruleForm.verificationCode=''"></i>
      </span> 
      <span style="display:flex">
        <el-input type="test" auto-complete="off" :placeholder='ruleFormMes.verificationCode' v-model="ruleForm.verificationCode" style="margin-right:50px"></el-input>
        <identify v-on:changeCode ="changeCode"/>
      </span>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
//   import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  import identify from './identify.vue';
  export default {
    name:'Login',
    data() {
      return {
        //系统属性
        sysAttr:{
            name:"智慧景区酒店管理系统",
            style:{
                'color':'#20a0ff',
                'font-size':'30px',
            }
        },
        //是否显示密码
        passwordIsShow:false,
        //加载图形
        logining: false,
        ruleForm: {
          account: 'admin',
          checkPass: '123456',
          verificationCode:''
        },
        //表单提示
        ruleFormMes: {
          account: '用户名',
          checkPass: '密码',
          verificationCode:'验证码'
        },
        //错误提示
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          verificationCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true,
        //测试url
        testURL:'./static/json/room000.json',
      };
    },
    methods: {
        //获取验证码
        changeCode(val){
            this.ruleForm.verificationCode = val;
        },
        //重新设置
        handleReset() {
            this.$refs.ruleForm.resetFields();
        },
        //登录按钮
        handleSubmit(ev) {
            var that = this;
            this.$refs.ruleForm.validate((valid) => {
            if (valid) {
                // console.log(valid)
                // this.logining = true;
                // console.log(this.ruleForm)
                // this.logining = false;
                // console.log(this.ruleForm.account)
                // localStorage.setItem('user',this.ruleForm.account);
                // this.$router.push('/main');
                this.getData(this.ruleForm)
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        //请求数据
        getData(data){
            this.logining = true;
            // var that = this;
            var params = {"txcode":"room000","data":data};
            this.ajax("get",params,(res) => {
                this.logining = false;
                localStorage.setItem('user',this.ruleForm.account);
                this.$router.push('/main')
                // sessionStorage.setItem('user',that.ruleForm.account);
            },(err) => {console.log(err,"错误提示")},this.testURL);
        },
    },
    components: {
        identify
    },
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .fromMes{
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
    }
  }
</style>