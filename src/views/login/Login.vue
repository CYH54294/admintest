<template>
 <div class="login">
     <div class="login_box">
         <div class="logo"><img src="~assets/img/logo.png"></div>
         <el-form class="login_input" :model="login_form" :rules="rules" ref="loginForm">
             <el-form-item prop="username">
             <el-input v-model="login_form.username">
                 <i class="iconfont icon-user" slot="prefix"></i>
             </el-input>
            </el-form-item>
            <el-form-item prop="password">
             <el-input v-model="login_form.password" type="password">
                 <i class="iconfont icon-3702mima" slot="prefix"></i>
             </el-input>
            </el-form-item>
            <el-form-item class="login_btns">
                <el-button type="primary" @click="loginClick">登录</el-button>
                <el-button type="info" @click="resetClick">重置</el-button>
            </el-form-item>
         </el-form>
     </div>
 </div>
</template>

<script>
import {reqLogin} from "network/api"
 export default {
  name: 'Login',
  data () {
   return {
       //表单失去焦点验证规则
       rules:{
           username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ]
       },
       //表单数据绑定
       login_form:{
           username:'',
           password:''
       }
   }
  },
  methods: {
      loginClick(){
        this.$refs.loginForm.validate(async valid =>{
            if(!valid){
                return
            }
            //发登录请求
            const result = await reqLogin(this.login_form)
            const {status,msg} = result.meta
            if(status !== 200){
                //登陆失败
                return this.$message.error({
                    message:msg,
                    duration:1000
                })
            }
            //登录成功
            //保存token
            const {token} = result.data
            sessionStorage.setItem('token',token) 
            //跳转页面
            this.$router.replace('/home')       
        })
     },
     resetClick(){
       this.$refs.loginForm.resetFields()  
     }
  }
 }
</script>

<style scoped lang="less">
.login{
    height: 100%;
    background: #2b4b6b;
    display: flex;
    justify-content: center;
    align-items : center;
    .login_box{
        background: white;
        width: 450px;
        height: 300px;
        border-radius: 7px;
        position: relative;
        .logo{
            height: 130px;
            width: 130px;
            background-color: white;
            box-shadow: 0 0 10px #fff;
            border-radius: 50%;
            padding: 10px;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
        .login_input{
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            padding: 0 20px 0px 20px;
            // padding: 20px;
            .login_btns{
                text-align: right;
            }
        }
    }
}
 
</style>
