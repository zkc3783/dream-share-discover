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
    
    
        if(item.pic=="")
        {
          item.pic="data:image/png;base64,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";
        }
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
