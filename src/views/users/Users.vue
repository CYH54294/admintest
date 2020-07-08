<template>
 <div>
     <!-- 导航 -->
    <BreadcrumdNav :items="['首页','用户管理','用户列表']"></BreadcrumdNav>
    <!-- 卡片 -->
    <el-card>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入内容" @clear="clearSearch" clearable class="input-with-select" v-model="usersParms.query">
                  <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="addUser">添加用户</el-button>
            </el-col>
        </el-row>
            <!-- 用户列表 -->
        <el-table :data="usersData" style="width: 100%" border>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="role_name" label="角色"></el-table-column>
            <el-table-column prop="mg_state" label="状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" @change="stateChange(scope.row)" active-color="#13ce66">
                    </el-switch>      
                </template>
            </el-table-column>
            <el-table-column prop="date" label="操作" width="200">
                 <template slot-scope="scope">
                     <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
                        <el-button type="primary" size="mini" @click="editClick(scope.row)" icon="el-icon-edit"></el-button>                                                 
                     </el-tooltip>
                     <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
                         <el-button type="danger" size="mini" icon="el-icon-delete" @click="delUser(scope.row.id)"></el-button>
                     </el-tooltip>
                     <el-tooltip class="item" effect="dark" :enterable="false" content="分配角色" placement="top-start">
                         <el-button type="primary" size="mini" @click="allotRights(scope.row)" icon="el-icon-setting"></el-button>
                     </el-tooltip>
                </template>               
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="usersParms.pagenum"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>

    <!-- 添加用户弹窗 -->
    <UserAddEdit ref="addOrEditDialog" @updateUserList="updateUserList" :userinfo="userinfo"></UserAddEdit>
    <!-- 分配角色弹窗 -->
    <UserAllotRights ref="allotRights" :allotUser="allotUser" :roleList="roleList" @updateUserList="updateUserList"></UserAllotRights>
 </div>
</template>

<script>
import BreadcrumdNav from "components/BreadcrumdNav.vue"
import {reqUserList,reqUpdatestate,reqdelUser,reqRoleList} from "network/api.js"
import UserAddEdit from "./childComp/UserAddEdit"
import UserAllotRights from "./childComp/UserAllotRights"
 export default {
  name: 'Users',
  components:{
      BreadcrumdNav,UserAddEdit,UserAllotRights
  },
  data () {
   return {
          usersData: [],//表格的数据
          usersParms:{
              query:'',//搜索用户关键字
              pagenum:1,
              pagesize:2
          },//用户列表请求参数
          total:0,//总条数
          userinfo:{},
          allotUser:{},//分配角色信息
          roleList:[],//角色列表数组
    }
  },
  created(){
      this.getUserList()
  },
  methods:{
      async getUserList(){
          const result = await reqUserList(this.usersParms)
          if(result.meta.status !==200) return this.$message.error('获取用户信息失败')
          const {users,total} = result.data
          this.usersData = users
          this.total = total          
      },
      //页面数据条数改变
      handleSizeChange(size){
          this.usersParms.pagesize = size
          this.getUserList()
        
        
      },
      //页面页码改变
      handleCurrentChange(page){
          this.usersParms.pagenum = page
          this.getUserList()
          
      },
      //搜索用户
      searchUser(){
          this.usersParms.pagenum = 1
          this.getUserList()
      },
      //清空搜索
      clearSearch(){
          this.getUserList()
      },
      //改变用户列表状态
      async stateChange(userInfo){
          const {id,mg_state} = userInfo
          const result = await reqUpdatestate(id,mg_state)          
          if(result.meta.status !== 200) return this.$message.error('修改状态失败')
          this.$message.success('修改状态成功')       
      },
      //添加用户
      addUser(){
          this.userinfo = {}
          this.$refs.addOrEditDialog.dialogVisible = true
      },
      //编辑用户
      editClick(userinfo){     
          //console.log(userinfo);
          
          this.userinfo = userinfo
          this.$refs.addOrEditDialog.dialogVisible = true
      },
      //更新用户信息
      updateUserList(){
          this.getUserList()
      },
      //删除用户信息
      delUser(id){

         

         this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            const result = await reqdelUser(id)
            if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
            this.$message.success('删除成功')
            this.getUserList() 
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消删除'
          });      
        });
          
      },
      //点击分配权限
      async allotRights(userinfo){
          this.allotUser = userinfo
          this.$refs.allotRights.dialogVisible = true
          const result = await reqRoleList()
          if(result.meta.status !== 200) return this.$message.error('获取角色列表失败')
          this.roleList = result.data
          
      }
  }
 }
</script>

<style scoped>

 
</style>
