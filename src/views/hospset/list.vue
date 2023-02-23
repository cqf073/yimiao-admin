<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
        <el-input  v-model="searchobj.hosname" placeholder="社区名称"/>
    </el-form-item>
    <el-form-item>
        <el-input v-model="searchobj.hoscode" placeholder="社区编号"/>
    </el-form-item>
   <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
</el-form>

    <!-- 工具条 -->
<div>
   <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
</div>


   <!-- banner列表 -->
<el-table 
  :data="list" stripe style="width: 100%"  @selection-change="handleSelectionChange">
  <el-table-column type="selection" width="55"/>
  <el-table-column type="index" width="50" label="序号"/>
  <el-table-column prop="hosname" label="社区名称"/>
  <el-table-column prop="hoscode" label="社区编号"/>
  <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
  <el-table-column prop="contactsName" label="联系人姓名"/>
  <el-table-column prop="contactsPhone" label="联系人手机"/>
    <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
    </el-table-column>

    <el-table-column label="操作" width="280" align="center">
      <template slot-scope="scope">
          <el-button type="danger" size="mini" 
            icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除 </el-button>
          <el-button v-if="scope.row.status==1" type="primary" size="mini" 
            icon="el-icon-delete" @click="lockHospitalSet(scope.row.id,0)">锁定 </el-button>
          <el-button v-if="scope.row.status==0" type="danger" size="mini" 
            icon="el-icon-delete" @click="lockHospitalSet(scope.row.id,1)">取消锁定 </el-button>

            <router-link :to="'/hospSet/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
            </router-link>

      </template>
    </el-table-column>



  </el-table>
  <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>
import hospset from '@/api/hospset'

export default{
  // 定义变量和初始值
  data() {
    return {
      current: 1,
      limit: 6,
      searchobj: {},
      list: [],
      total : 0,
      multipleSelection: []
    }
  },
  // 页面渲染之前  调用methd 得到数据
  created() {
    this.getList()
  },
  // 调用接口
  methods: {
    lockHospitalSet(id,status){
        hospset.lockHospitalSet(id,status)
        .then(respons =>{
            this. getList(this.current)
        }).catch(error =>{
          alert(失败)
        })
    },

    getList(page=1) {
      this.current = page
      hospset.getHospSetList(this.current, this.limit, this.searchobj)
        .then(response => {
        // 成功的数据返回
        this.list=response.data.records
        this.total = response.data.total
          // console.log(response)
        })
        .catch(error => {
        // 失败的数据
          console.log(this.current, this.limit, this.searchobj)
          console.log(error)
        })
    },

  removeDataById(id) {
   this.$confirm('此操作将永久删除社区是设置信息, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
   }).then(() => { //确定执行then方法
      //调用接口
      hospset.removeHospitalById(id)
         .then(response => {
            //提示
            this.$message({
               type: 'success',
               message: '删除成功!'
            })
            //刷新页面
            this.getList(this.current)
         })
   }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          }); 
      }) 
      },
      
// 移除所有的数据
  removeRows(){
   this.$confirm('此操作将永久删除社区是设置信息, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
   }).then(() => { //确定执行then方法
       var idlist= []
       for (let index = 0; index <  this.multipleSelection .length; index++) {
        var obj = this.multipleSelection[index]
        var id =obj.id
        idlist.push(id)
       }
      
      //调用接口
      hospset.batchRemove(idlist)
         .then(response => {
            //提示
            this.$message({
               type: 'success',
               message: '删除成功!'
            })
            //刷新页面
            this.getList(this.current)
         })
   }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          }); 
      }) 



  },

  //出发复选框后天剑list
  handleSelectionChange(selecting){
      // console.log(selecting)
      this.multipleSelection = selecting
  }
  }
}
</script>