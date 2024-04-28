<template>
  <div class="app-container">
  <div>
    <h1>Welcome, {{this.$store.state.user.name }}!</h1>
  </div>
  <div v-if="this.$store.state.user.globalVariable === 0">
    <el-row gutter="20" type="flex" align="stretch">
      <el-col :span="20">
          <div class="name-layout">
            <div class="layout-title">Store Info</div>
            <div class="content-box">
              <el-row :gutter="24">
                <el-col :span="12">
                  <div style="display: flex; align-items: center;">
                  <label for="storeName" style="margin-right: 8px;">Name</label>
                  <el-input v-model="storeName" placeholder="Enter store name"></el-input>
                  </div>
                </el-col>
                <el-col :span="9">
                  <div style="display: flex; align-items: center;">
                  <label for="storeName" style="margin-right: 8px;"> Location </label>
                  <el-input v-model="storeLocation" placeholder="Enter location"></el-input>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-button class="edit-link" type="primary" @click="edit">Edit</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
      </el-col>
      <el-col :span="4">
          <div class="name-layout">
            <div class="layout-title">Avg Rate</div>
            <div class="content-box center-content">
              {{ this.avgRate }}
            </div>
          </div>
      </el-col>
    </el-row>
  </div>
  <div v-if="this.$store.state.user.globalVariable === 0">
    <!-- Feedbacks Section -->
    <div class="advice-layout">
      <div class="layout-title">Feedbacks</div>
        <el-table
          :data="feedback"
          style="width: 100%"
          border>
          <el-table-column
            prop="Comment"
            label="Comment"
            :width="commentWidth"
            >
          </el-table-column>
          <el-table-column
            prop="Rating"
            label="Rating"
            :width="ratingWidth"
            >
          </el-table-column>
        </el-table>
    </div>
  </div>
  <div v-if="this.$store.state.user.globalVariable === 1">
    <!-- Selected Comments Section -->
    <div class="advice-layout">
      <div class="layout-title">Selected Comments</div>
      <el-table
          :data="selectedComments"
          style="width: 100%"
          border>
          <el-table-column
            prop="Comment"
            label="Comment"
            :width="commentWidth"
            >
          </el-table-column>
          <el-table-column
            prop="Rating"
            label="Rating"
            :width="ratingWidth"
            >
          </el-table-column>
        </el-table>
    </div>
  </div>
  <div v-if = "this.$store.state.user.globalVariable === 1"> 
    <!-- Overall Advice Section -->
    <div class="advice-layout">
      <div class="layout-title">Overall Advices</div>
      <div class="content-box">
        <div class="content-item" v-for="item in this.overallAdvices" :key="item">
            "{{ item }}"
        </div>
      </div>
    </div>
  </div>
    <!-- <div class="overview-layout">
    </div>
    <div class="statistics-layout">
      <div class="layout-title">Order Statistics</div>
      <el-row>
      </el-row>
    </div> -->
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import {str2Date} from '@/utils/date';
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  
  
  
  
  const DATA_FROM_BACKEND = {
    columns: ['date', 'orderCount','orderAmount'],
    rows: [
      {date: '2018-11-01', orderCount: 10, orderAmount: 1093},
    ]
  };
  export default {
    name: 'home',
    data() {
      debugger
      return {
        commentWidth: 0,
        ratingWidth: 0,
        storeName: '', // 商店名称
        storeLocation: '', // 商店位置
        avgRate: 0, // 平均评分
        feedback: [], // 反馈信息数组
        selectedComments: [], // 被选中的评论
        overallAdvices: [], // 总体建议
        nameid:state => state.user.name,
        pickerOptions: {
          shortcuts: [{
            text: 'Last 7 Days',
            onClick(picker) {
              let start = new Date(2018,10,1);
              const end = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last 30 Days',
            onClick(picker) {
              let start = new Date(2018,10,1);
              const end = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    created(){
      this.initOrderCountDate();
      this.getData();
    },
    mounted() { // 用于动态调节Feedback和SelectedComments表列宽度
      this.calculateColumnWidths();
      window.addEventListener('resize', this.calculateColumnWidths); // 确保响应式
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.calculateColumnWidths); // 清理事件监听
    },
    methods:{
      calculateColumnWidths() {
        const containerWidth = this.$el.querySelector('.advice-layout').clientWidth; // 或其他容器
        this.commentWidth = containerWidth * 0.9; // 90% 宽
        this.ratingWidth = containerWidth * 0.1; // 10% 宽
      },
      handleDateChange(){
        this.getData();
      },
      initOrderCountDate(){
        let start = new Date(2018,10,1);
        const end = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 7);
        this.orderCountDate=[start,end];
      },
      getData(){
        //数据库
        if(this.$store.state.user.globalVariable === 0) {
          const blob = new Blob([JSON.stringify({"UserName": this.$store.state.user.name})],
                                {type: 'application/json'});
          //window.open(URL.createObjectURL(blob));
          //let res = require('@/public/1/store.json')
          debugger
          fetch(this.$store.state.user.globalURL+'/Interface27', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              UserName: this.$store.state.user.name
            })
          }).then(response => {
            debugger
            return response.json();  // 解析 JSON 数据
          }).then(data => {
            this.storeName = data["StoreName"];
            this.storeLocation = data["StoreLocation"];
            this.avgRate = data["AvgRate"];
            this.feedback = data["Feedback"];
          }).catch(error => {
            console.error('Error during fetching data:', error);
            this.$message.error('Server error');
          });
          debugger
          //this.storeName = res["StoreName"];
          //this.storeLocation = res["StoreLocation"];
          //this.avgRate = res["AvgRate"];
          //this.feedback = res["Feedback"];
        } else {
          // let res = require('@/public/1/analytics.json')
          // this.selectedComments = res["SelectedComments"];
          // this.overallAdvices = res["OverallAdvices"];
          fetch(this.$store.state.user.globalURL+'/Interface26', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
          }).then(response => {
            debugger
            return response.json();  // 解析 JSON 数据
          }).then(data => {
            this.selectedComments = data["SelectedComments"];
            this.overallAdvices = data["OverallAdvices"];
          }).catch(error => {
            console.error('Error during fetching data:', error);
            this.$message.error('Server error');
          });
          debugger
        }
        // setTimeout(() => {
        //   this.chartData = {
        //     columns: ['date', 'orderCount','orderAmount'],
        //     rows: []
        //   };
        //   for(let i=0;i<DATA_FROM_BACKEND.rows.length;i++){
        //     let item=DATA_FROM_BACKEND.rows[i];
        //     let currDate=str2Date(item.date);
        //     let start=this.orderCountDate[0];
        //     let end=this.orderCountDate[1];
        //     if(currDate.getTime()>=start.getTime()&&currDate.getTime()<=end.getTime()){
        //       this.chartData.rows.push(item);
        //     }
        //   }
        //   this.dataEmpty = false;
        //   this.loading = false
        // }, 1000)
      },
      edit() {
        this.$confirm('Do you want to update your store info?', 'Tip', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          const blob = new Blob([JSON.stringify({"UserName":this.$store.state.user.name,
                                                "StoreName":this.storeName,
                                                "StoreLocation":this.storeLocation})],
                                {type: 'application/json'});
          //window.open(URL.createObjectURL(blob));
          fetch(this.$store.state.user.globalURL+'/Interface28', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              UserName: this.$store.state.user.name,
              StoreName: this.storeName,
              StoreLocation: this.storeLocation
            })
          }).then(() => {
            this.$message({
              message: 'Updated successfully',
              type: 'success',
              duration: 1000
            });
          }).catch(error => {
            console.error('Error during updating:', error);
            this.$message.error('Server error');
          });
        });
      },
    }
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }

  .address-layout {
  }

  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }
  .address-content{
    padding: 20px;


    font-size: 18px
  }
  .comments-layout, .advice-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .name-layout {
    min-height: 130px;
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .content-box {
    padding: 20px;
    border-top: 1px solid #DCDFE6;
  }

  .center-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-item {
    padding: 10px;
    border-bottom: 1px solid #EBEEF5;
  }
</style>