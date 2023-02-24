<template>
  <div class="app-container">
   社区设置添加
      <el-form label-width="120px">
         <el-form-item label="社区名称">
            <el-input v-model="hospitalSet.hosname"/>
         </el-form-item>
         <el-form-item label="社区编号">
            <el-input v-model="hospitalSet.hoscode"/>
         </el-form-item>
         <el-form-item label="api基础路径">
            <el-input v-model="hospitalSet.apiUrl"/>
         </el-form-item>
         <el-form-item label="联系人姓名">
            <el-input v-model="hospitalSet.contactsName"/>
         </el-form-item>
         <el-form-item label="联系人手机">
            <el-input v-model="hospitalSet.contactsPhone"/>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="saveOrUpdate">保存</el-button>
         </el-form-item>
      </el-form>

  </div>
</template>
<script>

import hospset from '@/api/hospset'
export default {
  data() {
    return {
      hospitalSet : {},
    }
  },
  created() {
    //获取路由的id 调用接口id 查
    // alert(this.$route.params.id)

     if(this.$route.params&&this.$route.params.id) {
      // console.log(this.$route.params.id)
      const id = this.$route.params.id
      this.getHospSetByid(id)

    }
    else{
      this.hospitalSet ={}
    }
  },  

  methods: {

    getHospSetByid(id){
      hospset.getHospSetByid(id).then(Response=>{
        this.hospitalSet = Response.data
      })
      .catch(error=>{
        alert("getHospSetByid 失败")
      })
    },


    //天剑
    save(){
    hospset.saveHospSet(this.hospitalSet).then(Response =>{
              this.$message({
              type: 'success',
              message: '添加成功!'
                })
                this.$router.push({path:'/hospSet/list'})
          })
          .catch(() => {
              this.$message({
                type: 'info',
                message: '添加失败'
              })
          }) 
    },

    //修改
    update(){
    hospset.UpdateHospSet(this.hospitalSet).then(Response =>{
              this.$message({
              type: 'success',
              message: '修改成功!'
                })
                this.$router.push({path:'/hospSet/list'})
          })
          .catch(() => {
              this.$message({
                type: 'info',
                message: '修改失败'
              }); 
          }) 
    },
    saveOrUpdate(){
      if(!this.hospitalSet.id){
        this.save()
      }else{
        this.update()
      }
    }
  }
}
</script>
