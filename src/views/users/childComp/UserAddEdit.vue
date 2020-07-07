<template>
 <div>
        <el-dialog
        :title="isAddUser ? '添加用户' : '修改用户'"
        :visible="dialogVisible"
        width="50%"
        :before-close="handleClose">
            <el-form ref="userform" :model="userform" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userform.username" :disabled="!isAddUser"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="isAddUser">
                    <el-input v-model="userform.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userform.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="userform.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submitClick">确 定</el-button>
            </span>
        </el-dialog>
 </div>
</template>

<script>
import {regMobile} from 'tools/regxTools.js';
import {reqAddUser,reqUpdateUser} from 'network/api.js';
 export default {
  name: 'UserAddEdit',
  props:{
      userinfo:{
          type:Object,
          default(){
              return {}
          }
      }
  },
  data () {
   return {
    dialogVisible:false,//控制显示隐藏
    userform:{
        username:'',
        password:'',
        email:'',
        mobile:''
    },
    rules:{
         username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          mobile: [
            { required: true, message: '请输入电话', trigger: 'blur' },
            { validator:regMobile, trigger: 'blur' },
          ]
    },
    userId:''
   }
  },
  components: {
    
  },
  methods:{
      //点击确定添加用户
      submitClick(){
          this.$refs.userform.validate(async boo =>{
              if (!boo) return
              if(this.isAddUser){
              //添加用户
                 const result =await reqAddUser(this.userform)
                 if(result.meta.status !== 201) return this.$message.error(result.meta.msg)
                 this.dialogVisible = false
                 this.$refs.userform.resetFields()
                 this.$emit('updateUserList')
                 return this.$message.success('添加用户成功')
                 
                 
              }else{
                 const {email,mobile} = this.userform
                 const result =await reqUpdateUser(this.userId,email,mobile)
                 if(result.meta.status !==200) return this.$message.error('更新用户失败')
                 this.$refs.userform.resetFields()
                 this.$emit('updateUserList')
                 this.dialogVisible = false
                 return this.$message.success('更新用户成功')
          }
          })      
      },
      //点击XX或取消
      handleClose(){
         this.$refs.userform.resetFields()
         this.dialogVisible = false         
      }
  },
  computed:{
      isAddUser(){
          return !this.userinfo.id || !this.userinfo.username 
      }
  },
  watch: {
      userinfo(newvalue){
         // console.log(newvalue);
          
          const {id,username,email,mobile} = newvalue
          this.userId = id
          this.userform = {username,email,mobile,password:''}
          
      }
  }
 }
</script>

<style scoped>

 
</style>
