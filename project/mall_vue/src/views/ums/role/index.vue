<template> 
  <div class="app-container">
    <!-- <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>Filter and Search</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          Search
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          Reset
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="Input Search:">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="Username" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card> -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>Store Owners</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">Add</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="roleTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="ID" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="Username" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="Store Name" align="center">
          <template slot-scope="scope">{{scope.row.storename}}</template>
        </el-table-column>
        <el-table-column label="Location" width="160" align="center">
          <template slot-scope="scope">{{scope.row.location}}</template>
        </el-table-column>
        <el-table-column label="Avg Rate"  width="100" align="center">
          <template slot-scope="scope">{{scope.row.avgrate}}</template>
        </el-table-column>
        <!-- <el-table-column label="Enabled" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="Action" width="160" align="center">
          <template slot-scope="scope">
            <el-row>
              <!-- <el-button size="mini"
                         type="text"
                         @click="handleSelectMenu(scope.$index, scope.row)">Assign Menu
              </el-button>
              <el-button size="mini"
                         type="text"
                         @click="handleSelectResource(scope.$index, scope.row)">Assign Resource
              </el-button> -->
              <el-button size="mini"
                         type="text"
                         @click="handleSelectMenu(scope.$index, scope.row)">Edit Items
              </el-button>
            </el-row>
            <el-row>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              Edit
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">Delete
            </el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit?'Edit Store':'Add Store'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="role"
               ref="roleForm"
               label-width="150px" size="small">
        <el-form-item label="ID:">
          <el-input v-model="role.id" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="Username:">
          <el-input v-model="role.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="Store Name:">
          <el-input v-model="role.storename" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="Password:">
          <el-input v-model="role.password" type="password" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="Location:">
          <el-input v-model="role.location" style="width: 250px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Description:">
          <el-input v-model="role.description"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="Enabled:">
          <el-radio-group v-model="role.status">
            <el-radio :label="1">Yes</el-radio>
            <el-radio :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">Cancel</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchList,createRole,updateRole,updateStatus,deleteRole} from '@/api/role';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    keyword: null
  };
  const defaultRole = {
    id: null,
    name: null,
    description: null,
    adminCount: 0,
    status: 1
  };
  export default {
    name: 'roleList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        role: Object.assign({}, defaultRole),
        isEdit: false
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum =

 val;
        this.getList();
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.role = Object.assign({},defaultRole);
      },
      handleStatusChange(index, row) {
        this.$confirm('Are you sure you want to change this status?', 'Prompt', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          updateStatus(row.id, {status: row.status}).then(response => {
            this.$message({
              type: 'success',
              message: 'Modified successfully!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Canceled modification'
          });
          this.getList();
        });
      },
      handleDelete(index, row) {
        this.$confirm('Are you sure you want to delete this store?', 'Prompt', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          //数据库
          debugger
          const blob = new Blob([JSON.stringify({"ItemId": row.id})],
                                {type: 'application/json'});
          window.open(URL.createObjectURL(blob));
          // const a = document.createElement('a');
          // a.href = URL.createObjectURL(blob);
          // a.download = 'output.json';
          // a.click();
          // URL.revokeObjectURL(a.href);
          this.$message({
            message: 'Deleted successfully',
            type: 'success',
            duration: 1000
          });
        });
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.role = Object.assign({},row, { password: '' });
      },
      mapOutputData(item) {
        return {
          UserId: item.id,
          UserName: item.name,
          UserPassword: item.password,
          StoreName: item.storename,
          StoreLocation: item.location,
        };
      },
      handleDialogConfirm() {
        this.$confirm('Are you sure you want to confirm?', 'Prompt', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // if (this.isEdit) {
          //   updateRole(this.role.id,this.role).then(response => {
          //     this.$message({
          //       message: 'Modified successfully!',
          //       type: 'success'
          //     });
          //     this.dialogVisible =false;
          //     this.getList();
          //   })
          // }
          // else
          {
            //数据库  
            debugger
            const blob = new Blob([JSON.stringify(this.mapOutputData(this.role))],
                                  {type: 'application/json'});
            window.open(URL.createObjectURL(blob));
            // const a = document.createElement('a');
            // a.href = URL.createObjectURL(blob);
            // a.download = 'output.json';
            // a.click();
            // URL.revokeObjectURL(a.href);
            this.$message({
              message: 'Submitted successfully',
              type: 'success',
              duration: 1000
            });
            // createRole(this.role).then(response => {
            //   this.$message({
            //     message: 'Added successfully!',
            //     type: 'success'
            //   });
            //   this.dialogVisible =false;
            //   this.getList();
            // })
          }
        })
      },
      handleSelectMenu(index,row){
        this.$store.commit('SET_EDIT_USER',row.name)
        let test = this.$store.state.user.editUser
        debugger
        this.$router.push({path:'/pms/product',query:{roleId:row.id}})
      },
      handleSelectResource(index,row){
        this.$router.push({path:'/ums/allocResource',query:{roleId:row.id}})
      },
      mapInputData(items) {
        return items.map(item => ({
          id: item.UserId,
          name: item.UserName,
          password: item.UserPassword,
          storename: item.StoreName,
          location: item.StoreLocation,
          avgrate: item.AvgRate
        }));
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
          //数据库
          this.list = this.mapInputData(require('@/public/1/storeowner.json'));
          this.total = this.list.length;
          debugger
        });
      }
    }
  }
</script>
<style></style>