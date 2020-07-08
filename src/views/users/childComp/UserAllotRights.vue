<template>
 <div>
<el-dialog
  title="分配角色"
  :visible="dialogVisible"
  width="50%"
  :before-close="handleClose">
  <p>当前用户： {{allotUser.username}}</p>
  <br>
  <p>当前角色： {{allotUser.role_name}}</p>
  分配角色：
<el-select v-model="selectValue" placeholder="请选择">
    <el-option
      v-for="item in roleList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>

  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="updateRole">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
 import {reqRoleUser} from 'network/api.js';
 export default {
  name: 'UserAllotRights',
  props:{
      allotUser:{
          type:Object
      },
      roleList:{
          type:Array
      }
  },
  data () {
   return {
       dialogVisible:false,
       selectValue:''
   }
  },
  methods:{
      //点击XX或者取消
      handleClose(){
          this.dialogVisible = false
          this.selectValue = ''
      },
      //点击确定选择角色
      async updateRole(){
          if(this.selectValue === '') return this.dialogVisible = false
          //选中了发请求
          //先拿到用户id和rid
          const userId = this.allotUser.id
          const rId = this.selectValue
          const result = await reqRoleUser(userId,rId)
          if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
          this.$message.success('分配角色成功')
          this.dialogVisible = false
          this.selectValue = ''
          this.$emit('updateUserList')
      }
  },
  components: {

  }
 }
</script>

<style scoped>

 
</style>
