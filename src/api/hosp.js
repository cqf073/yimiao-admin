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
  }


 





  
}
