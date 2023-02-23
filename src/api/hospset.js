import request from '@/utils/request'

export default{
  // 社区设置的
  getHospSetList(current, limit, searchObj) {
    return request({
      url: `/admin/hosp/hospitalSet/findPage/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  //根据id删除医院设置
  removeHospitalById(id){
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: 'delete',
    })
  },

    //批量删除
  batchRemove(idlist){
      return request({
        url: `/admin/hosp/hospitalSet/batchRemove`,
        method: 'delete',
        data:idlist
      })
    },

      //锁定和取消锁定
  lockHospitalSet(id,status){
    return request({
      url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
      method: 'put'
    })
  },

  //添加医院设置新信息
  saveHospSet(hospitalSet){
    return request({
      url: `/admin/hosp/hospitalSet/saveHospSet`,
      method: 'post',
      data :hospitalSet
    })
  },

  //医院设置id查询
  getHospSetByid(id){
    return request({
      url: `/admin/hosp/hospitalSet/getHospSet/${id}`,
      method: 'get',
    })
  },

  //修改医院设置
  UpdateHospSet(hospitalSet){
    return request({
      url: `/admin/hosp/hospitalSet/UpdateHospSet`,
      method: 'post',
      data :hospitalSet
    })
  }
  
}
