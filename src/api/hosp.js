import request from '@/utils/request'

export default{
  //医院列表
  getHospList(page,limit,searobj) {
  return request({
    url: `/admin/hosp/hospital/list/${page}/${limit}`,
    method: 'get',
    params:searobj
    })
  },
   //查询dictCode查询下级数据字典
   findByDictCode(dictCode) {
    return request({
        url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
        method: 'get'
      })
    },

    //根据id查询下级数据字典
  findChildId(dictCode) {
    return request({
        url: `/admin/cmn/dict/findChildData/${dictCode}`,
        method: 'get'
      })
  },
  // 更新医院信息
  updataHospitalStatus(id,status){
    return request({
      url: `/admin/hosp/hospital/updataHospitalStatus/${id}/${status}`,
      method: 'get'
    })
  },
  // 查看医院的详情
  getHospitalDetialById(id){
    return request({
      url: `/admin/hosp/hospital/showHospitalDetial/${id}`,
      method: 'get'
    })
  },
  // 查看医院的种类
  getDeptByHospCode(hoscode){
  return request({
    url: `/admin/hosp/department/getDeptList/${hoscode}`,
    method: 'get'
  })
},

   // 查询预约规则
   getScheduleRule(page,limit,hoscode,depcode){
    return request({
      url: `/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
      method: 'get'
    })
  },

   // 查询预约详情
   getScheduledetial(hoscode,depcode,workDate){
    return request({
      url: `/admin/hosp/schedule/getscheduleDetial/${hoscode}/${depcode}/${workDate}`,
      method: 'get'
    })
  },



  
}
