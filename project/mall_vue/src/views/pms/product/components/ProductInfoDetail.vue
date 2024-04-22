<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" class="form-inner-container" size="small">
      <!-- <el-form-item label="Product Category:" prop="productCategoryId">
        <el-cascader
          v-model="selectProductCateValue"
          :options="productCateOptions">
        </el-cascader>
      </el-form-item> -->
      <el-form-item label="Product ID:" prop="id">
        <el-input v-model="value.id"></el-input>
      </el-form-item>
      <el-form-item label="Product Name:" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="Subtitle:" prop="subTitle">
        <el-input v-model="value.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="Brand:" prop="brandId">
        <el-select
          v-model="value.brandId"
          @change="handleBrandChange"
          placeholder="Select Brand">
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="Product Description:">
        <el-input
          :autoSize="true"
          v-model="value.description"
          type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Price(¥):" prop="price">
        <el-input v-model="value.price"></el-input>
      </el-form-item>
      <!-- <el-form-item label="Market Price:">
        <el-input v-model="value.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="Inventory:">
        <el-input v-model="value.stock"></el-input>
      </el-form-item>
      <el-form-item label="Measurement Unit:">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="Product Weight:">
        <el-input v-model="value.weight" style="width: 300px"></el-input>
        <span style="margin-left: 20px">g</span>
      </el-form-item>
      <el-form-item label="Sorting">
        <el-input v-model="value.sort"></el-input>
      </el-form-item> -->
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">Next Step, upload product images</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchListWithChildren} from '@/api/productCate'
  import {fetchList as fetchBrandList} from '@/api/brand'
  import {getProduct} from '@/api/product';

  export default {
    name: "ProductInfoDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        hasEditCreated:false,
        selectProductCateValue: [],
        productCateOptions: [],
        brandOptions: [],
        rules: {
          name: [
            {required: true, message: 'Please enter the product name', trigger: 'blur'},
            {min: 2, max: 140, message: 'Length between 2 and 140 characters', trigger: 'blur'}
          ],
          subTitle: [{required: true, message: 'Please enter the product subtitle', trigger: 'blur'}],
          productCategoryId: [{required: true, message: 'Please select product category', trigger: 'blur'}],
          brandId: [{required: true, message: 'Please select product brand', trigger: 'blur'}],
          description: [{required: true, message: 'Please enter product description', trigger: 'blur'}],
          requiredProp: [{required: true, message: 'This field is required', trigger: 'blur'}],
          id: [{required: true, message: 'Please enter the product id', trigger: 'blur'}],
          price: [
            {required: true, message: 'Please enter the product price', trigger: 'blur'},
            {validator: this.checkPositiveInteger, trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.getProductCateList();
      this.getBrandList();
    },
    computed:{
      productId(){
        return this.value.id;
      }
    },
    watch: {
      productId:function(newValue){
        if(!this.isEdit)return;
        if(this.hasEditCreated)return;
        if(newValue===undefined||newValue==null||newValue===0)return;
        this.handleEditCreated();
      },
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length === 2) {
          this.value.productCategoryId = newValue[1];
          this.value.productCategoryName= this.getCateNameById(this.value.productCategoryId);
        } else {
          this.value.productCategoryId = null;
          this.value.productCategoryName=null;
        }
      }
    },
    methods: {
      handleEditCreated(){
        if(this.value.productCategoryId!=null){
          this.selectProductCateValue.push(this.value.cateParentId);
          this.selectProductCateValue.push(this.value.productCategoryId);
        }
        this.hasEditCreated=true;
      },
      getProductCateList() {
        fetchListWithChildren().then(response => {
          let list = response.data;
          this.productCateOptions = [];
          for (let i = 0; i < list.length; i++) {
            let children = [];
            if (list[i].children != null && list[i].children.length > 0) {
              for (let j = 0; j < list[i].children.length; j++) {
                children.push({label: list[i].children[j].name, value: list[i].children[j].id});
              }
            }
            this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
          }
        });
      },
      getBrandList() {
        fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
          this.brandOptions = [];
          let brandList = response.data.list;
          for (let i = 0; i < brandList.length; i++) {
            this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
          }
        });
      },
      getCateNameById(id){
        let name=null;
        for(let i=0;i<this.productCateOptions.length;i++){
          for(let j=0;j<this.productCateOptions[i].children.length;j++){
            if(this.productCateOptions[i].children[j].value===id){
              name=this.productCateOptions[i].children[j].label;
              return name;
            }
          }
        }
        return name;
      },
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('nextStep');
          } else {
            this.$message({
              message: 'Validation failed',
              type: 'error',
              duration:1000
            });
            return false

;
          }
        });
      },
      handleBrandChange(val) {
        let brandName = '';
        for (let i = 0; i < this.brandOptions.length; i++) {
          if (this.brandOptions[i].value === val) {
            brandName = this.brandOptions[i].label;
            break;
          }
        }
        this.value.brandName = brandName;
      },
      checkPositiveInteger(rule, value, callback) {
        if (!/^[1-9]\d*$/.test(value)) {
          callback(new Error('Price must be an positive integer'));
        } else {
          callback();
        }
      }
    }
  }
</script>

<style scoped>
</style>