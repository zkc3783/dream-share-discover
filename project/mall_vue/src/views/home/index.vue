<template>
  <div class="app-container">
  <div>
    <h1>Welcome, {{this.$store.state.user.name }}!</h1>
  </div>
  <div v-if="this.$store.state.user.globalVariable === 0">
    <div class="name-layout">
      <div class="layout-title">Store Info</div>
      <div class="content-box">
        <el-form ref="editForm" :model="$data" :rules="rules" label-position="right">
          <el-row :gutter="24">
            <el-col :span="7">
              <el-form-item label="Name" label-width="60px" prop="storeName">
                <el-input v-model="storeName" placeholder="Enter store name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Location" label-width="75px"  prop="storeLocation" style="margin-left: -10px">
                <el-input v-model="storeLocation" placeholder="Enter location (lat,lng)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Floor" label-width="55px"  prop="storeFloor" style="margin-left: -10px">
                <el-input v-model="storeFloor" placeholder="Enter store floor"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <!-- Optional: Any additional buttons or content can go here -->
              <el-button class="edit-link" type="primary" @click="edit" style="margin-left: 10px">Edit</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- <div v-if="this.$store.state.user.globalVariable === 0"> -->
        <div class="location-query" @click="showLocationPrompt" style="margin-top:-30px; margin-left: 10px">
          Don't know where am I?
        </div>
      <!-- </div> -->
    </div>
  </div>
  
  <el-dialog
    title="Select Location"
    :visible.sync="isMapVisible"
    width="60%">
    <map-container @location-selected="updateLocation"></map-container>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col :span="16">
          <div style="text-align: left;">Click the map to get coordinates: {{ storeLocationTemp }}</div>
        </el-col>
        <el-col :span="8">
          <div style="text-align: right;">
            <el-button @click="isMapVisible = false">Cancel</el-button>
            <el-button type="primary" @click="confirmLocation">Confirm</el-button>
          </div>
        </el-col>
      </el-row>
    </span>
  </el-dialog>
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
            >
          </el-table-column>
          <el-table-column
            prop="Rating"
            :label="`Rating (Avg: ${this.avgRate})`"
            :width="180"
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
            >
          </el-table-column>
          <el-table-column
            prop="Rating"
            label="Rating"
            :width="180"
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
  import MapContainer from "./MapContainer.vue";
  
  
  
  const DATA_FROM_BACKEND = {
    columns: ['date', 'orderCount','orderAmount'],
    rows: [
      {date: '2018-11-01', orderCount: 10, orderAmount: 1093},
    ]
  };
  export default {
    components: {
      MapContainer
    },
    name: 'home',
    data() {
      debugger
      return {
        storeName: '', // 商店名称
        storeLocation: '', // 商店位置
        storeFloor: 1,
        storeLocationTemp: '', // 临时存储，Confirm后存入storeLocation
        avgRate: '/', // 平均评分
        feedback: [], // 反馈信息数组
        selectedComments: [], // 被选中的评论
        overallAdvices: [], // 总体建议
        showInput: false,  // 控制输入框显示
        userAddress: '',   // 存储用户输入的地址
        isMapVisible: false, // 显示地图
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
        rules: {
          storeName: [
            {
              required: true,
              message: 'Please enter the store name',
              trigger: 'blur'
            }
          ],
          storeLocation: [
            { 
              required: true, 
              message: 'Location must be two numbers separated by a comma', 
              pattern: /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/, 
              trigger: 'blur'
            }
          ],
          storeFloor: [
            {
              required: true, 
              message: 'Floor must be an integer', 
              pattern: /^-?\d+$/, 
              trigger: 'blur'
            }
          ],
        },
      }
    },
    created(){
      this.initOrderCountDate();
      this.getData();
    },
    // mounted() { // 用于动态调节Feedback和SelectedComments表列宽度
    //   this.calculateColumnWidths();
    //   window.addEventListener('resize', this.calculateColumnWidths); // 确保响应式
    // },
    // beforeDestroy() {
    //   window.removeEventListener('resize', this.calculateColumnWidths); // 清理事件监听
    // },
    methods:{
      // calculateColumnWidths() {
      //   const containerWidth = this.$el.querySelector('.advice-layout').clientWidth; // 或其他容器
      //   this.commentWidth = containerWidth * 0.8; // 80% 宽
      //   this.ratingWidth = containerWidth * 0.2; // 20% 宽
      // },
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
          fetch(this.$store.state.user.globalURL+'/interface27', {
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
            this.storeFloor = data["StoreFloor"]; // 新加入店铺楼层
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
          fetch(this.$store.state.user.globalURL+'/interface26', {
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
          this.$refs.editForm.validate((valid) => {
          if (valid) {
          const blob = new Blob([JSON.stringify({"UserName":this.$store.state.user.name,
                                                "StoreName":this.storeName,
                                                "StoreLocation":this.storeLocation,
                                                "StoreFloor":this.storeFloor
                                              })],
                                {type: 'application/json'});
          //window.open(URL.createObjectURL(blob));
          fetch(this.$store.state.user.globalURL+'/interface28', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              UserName: this.$store.state.user.name,
              StoreName: this.storeName,
              StoreLocation: this.storeLocation,
              StoreFloor: this.storeFloor
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
        } else {
          this.$message({
              type: 'error',
              message: 'One or more fields have invalid entries, please check the form again'
            });
        }})
        });
      },
      // showLocationPrompt() {
      //   this.$prompt('Please enter a structured address:', 'Location', {
      //     confirmButtonText: 'Confirm',
      //     cancelButtonText: 'Cancel',
      //     inputPlaceholder: 'Address (e.g., China,Jilin,Changchun,Qianjindajie,2699)'
      //   }).then(({ value }) => {
      //     console.log('Entered Address:', value); // 显示输入的地址
      //     this.fetchLocation(value);
      //   }).catch(() => {
      //     // 处理取消操作
      //   });
      // },
      // fetchLocation(address) {
      //   const key = 'ead31bdc09ecdd9f72511bae25e7c54e'; // 使用你的API Key
      //   const url = `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(address)}&output=JSON&key=${key}`;

      //   fetch(url).then(response => {
      //     return response.json();
      //   }).then(data => {
      //     if (data.status === '1' && data.geocodes.length > 0) {
      //       const location = data.geocodes[0].location; // 获取经纬度字符串，格式为"经度,纬度"
      //       const coordinates = location.split(','); // 分割为数组["经度","纬度"]
      //       const reversedCoordinates = `${coordinates[1]},${coordinates[0]}`; // 反转为"纬度,经度"
      //       this.storeLocation = reversedCoordinates; // 将反转后的坐标存入storeLocation
      //       console.log('Reversed Location:', reversedCoordinates); // 输出纬度和经度
      //       this.$message.success('Successfully found your location! Please click on \'Edit\' to save your update.');
      //     } else {
      //       console.error('Geocoding failed:', data.info);
      //       this.$message.error('Geocoding failed: ' + data.info);
      //     }
      //   }).catch(error => {
      //     console.error('API request failed:', error);
      //     this.$message.error('Server error during geocoding');
      //   });
      // }
      showLocationPrompt() {
        this.isMapVisible = true;  // 显示地图
      },
      updateLocation(coordinates) {
        this.storeLocationTemp = coordinates;  // Update the storeLocation with the new latitude and longitude 
      },
      confirmLocation() {
        console.log('Location confirmed:', this.storeLocation);
        this.storeLocation = this.storeLocationTemp;
        this.$message.success('Successfully found your location! Please click on \'Edit\' to save your update.');
        this.isMapVisible = false;
        // You can also perform additional actions here, such as saving the data to a server or further processing
      }
    }
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
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

  .location-query {
    padding: 10px;
    color: #409EFF; /* 蓝色文字 */
    cursor: pointer;
  }

  
</style>