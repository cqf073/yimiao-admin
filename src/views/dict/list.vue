<template>
      <div class="app-container">
        <el-table
        :data="list"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="getChildrens"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column label="名称" width="230" align="left">
            <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
            </template>
            </el-table-column>

            <el-table-column label="编码" width="220">
            <template slot-scope="{row}">
                    {{ row.dictCode }}
            </template>
            </el-table-column>
            <el-table-column label="值" width="230" align="left">
            <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
            </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
            </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
import dict from '@/api/dict'
export default {
    data() {
        return {
           list:[] 
        }
    },

    created() {
        this.getDictList(1)
    },

    methods: {

        getDictList(id){    
            dict.DictList(id).then(Response =>{
               this.list = Response.data 
            }).catch(error =>{
                this.$message({
                type: 'info',
                message: '添加失败'
              })
            })
        },
         getChildrens(tree, treeNode, resolve) {
            dict.DictList(tree.id).then(response => {
                resolve(response.data)
            })
        }

    }
}
</script>