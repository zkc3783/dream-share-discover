<template>
  <el-card class="form-container" shadow="never">
    <el-tree
      :data="menuTreeList"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps">
    </el-tree>
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">Save</el-button>
      <el-button @click="handleClear()">Clear</el-button>
    </div>

  </el-card>
</template>

<script>
  import {fetchTreeList} from '@/api/menu';
  import {listMenuByRole,allocMenu} from '@/api/role';

  export default {
    name: "allocMenu",
    data() {
      return {
        menuTreeList: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        roleId:null
      };
    },
    created() {
      this.roleId = this.$route.query.roleId;
      this.treeList();
      this.getRoleMenu(this.roleId);
    },
    methods: {
      treeList() {
        fetchTreeList().then(response => {
          this.menuTreeList = response.data;
        });
      },
      getRoleMenu(roleId){
        listMenuByRole(roleId).then(response=>{
          let menuList = response.data;
          let checkedMenuIds=[];
          if(menuList!=null&&menuList.length>0){
            for(let i=0;i<menuList.length;i++){
              let menu = menuList[i];
              if(menu.parentId!==0){
                checkedMenuIds.push(menu.id);
              }
            }
          }
          this.$refs.tree.setCheckedKeys(checkedMenuIds);
        });
      },
      handleSave() {
        let checkedNodes = this.$refs.tree.getCheckedNodes();
        let checkedMenuIds=new Set();
        if(checkedNodes!=null&&checkedNodes.length>0){
          for(let i=0;i<checkedNodes.length;i++){
            let checkedNode = checkedNodes[i];
            checkedMenuIds.add(checkedNode.id);
            if(checkedNode.parentId!==0){
              checkedMenuIds.add(checkedNode.parentId);
            }
          }
        }
        this.$confirm('Are you sure you want to allocate menus?', 'Confirmation', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(()=>{
          let params = new URLSearchParams();
          params.append("roleId",this.roleId);
          params.append("menuIds",Array.from(checkedMenuIds));
          allocMenu(params).then(response => {
            this.$message({
              message: 'Allocation successful',
              type: 'success',
              duration: 1000
            });
            this.$router.back();
          })
        })
      },
      handleClear() {
        this.$refs.tree.setCheckedKeys([]);
      }
    }
  }
</script>

<style scoped>

</style>