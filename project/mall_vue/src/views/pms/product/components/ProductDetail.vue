<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="Fill in Product Information"></el-step>
      <el-step title="Upload Product Images"></el-step>
    </el-steps>
    <product-info-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep">
    </product-info-detail>
    <product-attr-detail
      v-show="showStatus[1]"
      v-model="productParam"
      :is-edit="isEdit"
      @finishCommit="finishCommit"
      @prevStep="prevStep">
    </product-attr-detail>
  </el-card>
</template>
<script>
  import ProductInfoDetail from './ProductInfoDetail';
  //import ProductSaleDetail from './ProductSaleDetail';
  import ProductAttrDetail from './ProductAttrDetail';
  import {createProduct,getProduct,updateProduct} from '@/api/product';

  const defaultProductParam = {
    albumPics: '',
    brandId: null,
    brandName: '',
    deleteStatus: 0,
    description: '',
    detailDesc: '',
    detailHtml: '',
    detailMobileHtml: '',
    detailTitle: '',
    feightTemplateId: 0,
    flashPromotionCount: 0,
    flashPromotionId: 0,
    flashPromotionPrice: 0,
    flashPromotionSort: 0,
    giftPoint: 0,
    giftGrowth: 0,
    keywords: '',
    lowStock: 0,
    name: '',
    newStatus: 0,
    note: '',
    originalPrice: 0,
    pic: '',
    memberPriceList: [],
    productFullReductionList: [{fullPrice: 0, reducePrice: 0}],
    productLadderList: [{count: 0,discount: 0,price: 0}],
    previewStatus: 0,
    price: '',
    productAttributeCategoryId: null,
    productAttributeValueList: [],
    skuStockList: [],
    subjectProductRelationList: [],
    prefrenceAreaProductRelationList: [],
    productCategoryId: null,
    productCategoryName: '',
    productSn: '',
    promotionEndTime: '',
    promotionPerLimit: 0,
    promotionPrice: null,
    promotionStartTime: '',
    promotionType: 0,
    publishStatus: 0,
    recommandStatus: 0,
    sale: 0,
    serviceIds: '',
    sort: 0,
    stock: 0,
    subTitle: '',
    unit: '',
    usePointLimit: 0,
    verifyStatus: 0,
    weight: 0
  };
  export default {
    name: 'ProductDetail',
    components: {ProductInfoDetail, ProductAttrDetail},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: 0,
        productParam: Object.assign({}, defaultProductParam),
        showStatus: [true, false]
      }
    },
    created(){  // 进行修改时预留的数据
      if(this.isEdit)
      {
        getProduct(this.$route.query.id).then(response=>{
          //数据库
          this.productParam=response.data;
          fetch(this.$store.state.user.globalURL+'/interface29', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                UserName: this.$store.state.user.name == "admin" ? 
                              this.$store.state.user.editUser : this.$store.state.user.name
              })
            }).then(response => {
              debugger
              return response.json();  // 解析 JSON 数据
            }).then(data => {
              this.productParam = this.mapInputData(data.ItemData, parseInt(this.$route.query.id))
              //console.log(data)
              //console.log(data.ItemData)
              //console.log(this.productParam) //问题：productParam里pic没有值！！！
              //this.productParam.pic="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAiCAYAAADcbsCGAAAFkUlEQVRYhYVYS2skVRQ+XXWrH+lH+pFKejRxEEWUOJERfI2zGgRRURmYWY5L/QFuBH+Fa3+AKxeCKAiCCzGgiKAwREbFGHCTmZhJZpKYfnnPnf4qX52umEsXVXXr3HPP4zuP26VHV3sTP4RHqVQSnRuPx+Gul3MuvOs30Jz1Dh5RFGW8R6NReLfrMKfPOnRthAe+DwaD8KzEcRwHwfRdn5U5BFaGygxKYOg8aCAAhvKAsKwQ6LGvDjccDrONsACb4l0Z6rvSshXAGMzBFHRQiC3KhuBn/o55B3NiooiRWssKUPSsa1UYvZifHfjGdBjwUjCYLtbNT7MCY4FxYgWDxdVq7EZ8g5AWf4AE4AKYBFpgwOIJWmAxtMRGeGasMC5ZAQjFVrSBg3eGU2Q1g2ugBWNQ71CAmcIaHAAc7RjAn9JzxDLWeN7lzDgFMUcQ5tiFNjItrtiKeAcf0LPVWTmGh7M44EV2jt1hUwmAzO6E5WDxIldy2sGzprJgXZtfLMDZsmyVZq0iN648K4vzjZnNlb7TqMr1y2tSLbsZeNgEXxTRU6NFM64CsW7IQkFrvZY6Lbl66YJcffmCB+4JnkD3ysUn/Lc16bYaOWspHXInZwSGBzzpOEWgtMC8bEmLn+W0La1GXV5/YVX+ur0n+weHUq9W5Oh4KMceL2+8+LSk7Zb0uy35+/buDPgZMhhQEPOOpWdQsiAsOOaX047EHmftZkPev3blQTpS92olGY2l7NQjkax4up9ubeUEQq1GJeFMwEI7KxDcijldgKzPWj2c9qQUJV4g1TiRcVZyYkmcJlDdVJXoZtHHKQTKMuY5osN3W2awGMICG1zCKh7kS722fpT1XzZlY3NbIpdIKXZeKCd7hwP5an1D9o+Gsry0MIMxi3GbsPEtEw6WQTnDIryzltWkLGmnIx7e8sW3N+WHm1vexUkQMPbftu8eyidf/ih37h5Jf6HrI7s6E6EciFCe819wq80zRWWHa6tezXpN2q2muHJFPnj3LXFesX+HInd278t8syaPnX9IPvrwhjTqVdnevRfod+/dz9XuXJky7s3meYKtxibmyFVGPS/YXH3OY85J0wdEba4Wnste2Mjjz7mytH2kxv7e8t/7CgHjMpusbVMRggZgzfw8jR6kDmYI4Rb8xpVKNWfhStVJWqt5Iv1NBfBXtRbLOR88Ir/leFi+wCU6FKVxVhBuAJhZtZzIc6tPyq+bW9Jtz3vrVEQk34tlAKdnJxrZ6UzrZF1oM0YQzkYOPug892bvXX9TEh+JP9/6Q9JeJ0Tl5BTh8oJ64fqLmcIsINdxPkskSfLAeiBioXKgnIL10sU1+eyb7+SfvX1Z7PVC2lCcnXl5unOLaQ5j6B8ZSuxi4N4VZWbbNoVFXo/nn1mVnb0979a239TntcnZllPbpb1uzpX/V8qYJldbLfB57uNPP5d33n5NXr38kqz0l4JVpnufPqb7NpvzOSsBMujCbX8I48xgzjaCWPD1+vey8fuf8vgjKx5Dqa8QPWn4FFL2+IhdrC4I+PIVS0YTX18HQzkaHMvBwZFs7+xkluHKY9s17J+dBM8/1ZlwEuY6aIltvuN3a21b6It45Iw8OTl/ZFa0+LIndHYtA7ooo9szgwW8pS+6I1iCobhXK9KI8cg5CoysINx+M/Ax2J0Y3NxydxxxC10klGXMwtiEzZtxLsOdlWc3W+PQCW32/w4LVAYrnwH4rIHBzUPhQWZ8cjDiM4X9O0SHY4mt6W054bYH6yxzthgHCwfRaDgKzagNArZySCUsBDPjUzu6YXvgLoLAafUTDYFtyXCsBD0rGFmrFYGdW3QIzYdjHkV1Oty9pUr+mIYrWG+auhAIEAz8ndWY+3vWnnFkq0pRrrPgz/DsMafCqbD8RyJDBfP/AWRTa4wu53OnAAAAAElFTkSuQmCC"
              //console.log(this.productParam.pic)
              debugger
            }).catch(error => {
              this.$message.error('Server error');
            });
          debugger
        });
      }
    },
    methods: {
      mapInputData(items, num)
      {
        const item = items.find(item => item.ItemId === num);
        if (item) {
          return {
            id: item.ItemId,
            name: item.ItemName,
            price: item.ItemPrice,
            description: item.ItemDescription,
            pic: item.ItemImage
          };
        }
        return null;
      },
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      nextStep() {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      mapOutputData(item) {
        return {
          UserName: this.$store.state.user.name == "admin" ? 
                        this.$store.state.user.editUser : this.$store.state.user.name,
          ItemId: item.id,
          ItemName: item.name,
          ItemPrice: item.price,
          ItemDescription: item.description,
          ItemImage: item.pic 
        };
      },
      finishCommit(isEdit) {
        this.$confirm('Do you want to submit this product?', 'Tip', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // if(isEdit){
          //   debugger
          //   updateProduct(this.$route.query.id,this.productParam).then(response=>{
          //     this.$message({
          //       type: 'success',
          //       message: 'Submitted successfully',
          //       duration:1000
          //     });
          //     this.$router.back();
          //   });
          // }
          // else
          {
            debugger
            //数据库
            fetch(this.$store.state.user.globalURL+'/interface30', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(
                this.mapOutputData(this.productParam)
              )
            }).then(response => {
              debugger
              return response.json();  // 解析 JSON 数据
            }).then(data => {
              this.$message({
                message: 'Submitted successfully',
                type: 'success',
                duration: 1000
              });
            }).catch(error => {
              console.error('Error during updating:', error);
              this.$message.error('Server error');
            });
            this.$router.push({path:'/pms/product'});
            // Convert productParam to JSON and download it
            // const blob = new Blob([JSON.stringify(this.mapOutputData(this.productParam))],
            //                       {type: 'application/json'});
            // window.open(URL.createObjectURL(blob));
            // const a = document.createElement('a');
            // a.href = URL.createObjectURL(blob);
            // a.download = 'output.json';
            // a.click();
            // URL.revokeObjectURL(a.href);
            // this.$message({
            //   message: 'Submitted successfully',
            //   type: 'success',
            //   duration: 1000
            // });
            // createProduct().then(response=>{
            //   this.$message({
            //     type: 'success',
            //     message: 'Submitted successfully',
            //     duration:1000
            //   });
            //   location.reload();
            // });
          }
        })
      }
    }
  }
</script>
<style>
  .form-container {
    width: 960px;
  }
  .form-inner-container {
    width: 800px;
  }
</style>
