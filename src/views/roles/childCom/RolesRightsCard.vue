<template>
 <div>
            <el-row v-for="item in rights" :key="item.id" class="outRow">
              <el-col :span="6">
                <el-tag closable @close="delRights(item.id)">{{item.authName}}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="18">
                  <el-row v-for="cItem in item.children" :key="cItem.id" class="outRow">
                    <el-col :span="8">
                      <el-tag type="success" closable @close="delRights(cItem.id)">{{cItem.authName}}
                      </el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="16">
                      <el-tag v-for="ccItem in cItem.children" :key="ccItem.id" type="warning"
                       closable @close="delRights(ccItem.id)">
                        {{ccItem.authName}}
                      </el-tag>
                    </el-col>
                  </el-row>
              </el-col>
            </el-row>
 </div>
</template>

<script>
import {reqDelRights} from "network/api.js"
 export default {
  name: 'RolesRightsCard',
  props:{
      rowInfo:{
          type:Object
      }
  },
  data () {
   return {
      rights:[]
   }
  },
  created(){
      this.rights = this.rowInfo.children
  },
  methods: {
      //点击删除权限
     async delRights(id){
         const rightId = id
         const roleId = this.rowInfo.id
         const result =await reqDelRights(roleId,rightId)
         if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
         this.$message.success('删除权限成功')
         this.rights = result.data
     }
  },
  components: {

  }
 }
</script>

<style scoped>
.el-tag{
  margin: 5px;
}
.outRow{
  display: flex;
  align-items: center;
  border-bottom: 1px solid #EBEEF5;
}
 
</style>
