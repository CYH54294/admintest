<template>
 <div>
    <el-dialog
    title="分配权限"
    :visible="dialogVisible"
    width="50%"
    :before-close="handleClose">
            <el-tree ref="tree"
            :props="props"
            show-checkbox
            :data="rightsList"
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="selectRights"
            >
            </el-tree>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitRights">确 定</el-button>
    </span>
    </el-dialog>
 </div>
</template>

<script>
 import {reqRightsTreeList,reqRoleRights} from "network/api.js"
 export default {
  name: 'RolesRightsAllot',
  props:{
      roleInfo:{
          type:Object
      },
      getRoleList:{
          type:Function
      }
  },
  data () {
   return {
       dialogVisible:false,
       props: {
          label: 'authName',
          children: 'children'
        },  //配置对象
       rightsList:[],   //权限列表  
       selectRights:[]  //默认选中权限列表
   }
  },
  created () {
      this.getRightsTreeList()
  },
  methods: {
    //获取树状权限列表
    async getRightsTreeList(){
        const result = await reqRightsTreeList()
        if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
        this.rightsList = result.data
    },
    //点击XX或取消
    handleClose(){
        this.dialogVisible = false
        this.selectRights = []
        this.$nextTick(() =>{
            this.$refs.tree.setCheckedKeys([])
        })
        this.$emit('updateRolesInfo')
    },
    //递归查询ID
    getRightsId(obj,arr){
        if(!obj.children){
            //没有children就是最后一层数据
            return arr.push(obj.id)
        }
        obj.children.forEach(item => {
            this.getRightsId(item,arr)
        });
    },
    //点击确定提交权限
    async submitRights(){
        const roleId = this.roleInfo.id
        const {getHalfCheckedKeys,getCheckedKeys} = this.$refs.tree
        const ridsa = [...getHalfCheckedKeys(),...getCheckedKeys()].join(',')
        const result =await reqRoleRights(roleId,ridsa)
        if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
        this.$message.success('修改权限成功')
        this.dialogVisible = false
        this.getRoleList()
    }
  },
  watch: {
      roleInfo(newRoleInfo){
          this.getRightsId(newRoleInfo,this.selectRights)
      }
  }
 }
</script>

<style scoped>

 
</style>
