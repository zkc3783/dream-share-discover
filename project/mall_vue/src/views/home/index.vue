<template>
  <div class="app-container">
  <div>
    <h1>Welcome, {{this.$store.state.user.name }}!</h1>
  </div >
  <div v-if="this.$store.state.user.globalVariable === 0">
    <!-- Selected Comments Section -->
    <div class="comments-layout">
      <div class="layout-title">Selected Comments</div>
      <div class="content-box">
        <!-- Example comments -->
        <div class="content-item">"Great service and fast delivery!"</div>
        <div class="content-item">"Product quality has improved significantly."</div>
      </div>
    </div>
  </div>
  <div v-else-if = "this.$store.state.user.globalVariable === 1"> 
    <!-- Overall Advice Section -->
    <div class="advice-layout">
      <div class="layout-title">Overall Advice</div>
      <div class="content-box">
        <!-- Example advice -->
        <div class="content-item">"Focus on customer service to enhance satisfaction."</div>
        <div class="content-item">"Consider expanding the product line."</div>
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
    methods:{
      handleDateChange(){
        this.getData();
      },
      initOrderCountDate(){
        let start = new Date(2018,10,1);
        const end = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 7);
        this.orderCountDate=[start,end];
      },
      getData(){
        setTimeout(() => {
          this.chartData = {
            columns: ['date', 'orderCount','orderAmount'],
            rows: []
          };
          for(let i=0;i<DATA_FROM_BACKEND.rows.length;i++){
            let item=DATA_FROM_BACKEND.rows[i];
            let currDate=str2Date(item.date);
            let start=this.orderCountDate[0];
            let end=this.orderCountDate[1];
            if(currDate.getTime()>=start.getTime()&&currDate.getTime()<=end.getTime()){
              this.chartData.rows.push(item);
            }
          }
          this.dataEmpty = false;
          this.loading = false
        }, 1000)
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

  .content-box {
    padding: 20px;
    border-top: 1px solid #DCDFE6;
  }

  .content-item {
    padding: 10px;
    border-bottom: 1px solid #EBEEF5;
  }
</style>