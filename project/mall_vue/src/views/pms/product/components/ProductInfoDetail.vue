<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" class="form-inner-container" size="small">

      <el-form-item label="Product ID:" prop="id">
        <el-input v-model="value.id" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="Product Name:" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
  
      <el-form-item label="Price(¥):" prop="price">
        <el-input v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="Product Description:">
        <el-input
          :autoSize="true"
          v-model="value.description"
          type="textarea"></el-input>
      </el-form-item>
     
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">Next Step, upload product images</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

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
   
    methods: {
      
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
            return false;
          }
        });
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