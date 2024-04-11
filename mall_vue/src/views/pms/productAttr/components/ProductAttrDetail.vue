<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productAttr" :rules="rules" ref="productAttrFrom" label-width="150px">
      <el-form-item label="Attribute Name:" prop="name">
        <el-input v-model="productAttr.name"></el-input>
      </el-form-item>
      <el-form-item label="Product Type:">
        <el-select v-model="productAttr.productAttributeCategoryId" placeholder="Please select">
          <el-option
            v-for="item in productAttrCateList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Category Filter Style:">
        <el-radio-group v-model="productAttr.filterType">
          <el-radio :label="0">Normal</el-radio>
          <el-radio :label="1">Color</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Can be Searched:">
        <el-radio-group v-model="productAttr.searchType">
          <el-radio :label="0">No Need</el-radio>
          <el-radio :label="1">Keyword Search</el-radio>
          <el-radio :label="2">Range Search</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Product Attribute Association:">
        <el-radio-group v-model="productAttr.relatedStatus">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="0">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Is Attribute Optional:">
        <el-radio-group v-model="productAttr.selectType">
          <el-radio :label="0">Unique</el-radio>
          <el-radio :label="1">Single Selection</el-radio>
          <el-radio :label="2">Multiple Selection</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Attribute Value Input Method:">
        <el-radio-group v-model="productAttr.inputType">
          <el-radio :label="0">Manual Input</el-radio>
          <el-radio :label="1">Select from List Below</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Attribute Value Options List:">
        <el-input :autosize="true" type="textarea" v-model="inputListFormat"></el-input>
      </el-form-item>
      <el-form-item label="Support Manual Addition:">
        <el-radio-group v-model="productAttr.handAddStatus">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="0">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Sort Attribute:">
        <el-input v-model="productAttr.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productAttrFrom')">Submit</el-button>
        <el-button  v-if="!isEdit" @click="resetForm('productAttrFrom')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList} from '@/api/productAttrCate'
  import {createProductAttr,getProductAttr,updateProductAttr} from '@/api/productAttr'

  const defaultProductAttr = {
    filterType: 0,
    handAddStatus: 0,
    inputList: '',
    inputType: 0,
    name: '',
    productAttributeCategoryId: 0,
    relatedStatus: 0,
    searchType: 0,
    selectType: 0,
    sort: 0,
    type: 0
  };
  export default {
    name: "ProductAttrDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        productAttr: Object.assign({}, defaultProductAttr),
        rules: {
          name: [
            {required: true, message: 'Please enter attribute name', trigger: 'blur'},
            {min: 2, max: 140, message: 'Length between 2 and 140 characters', trigger: 'blur'}
          ]
        },
        productAttrCateList: null,
        inputListFormat:null
      }
    },
    created() {
      if(this.isEdit){
        getProductAttr(this.$route.query.id).then(response => {
          this.productAttr = response.data;
          this.inputListFormat = this.productAttr.inputList.replace(/,/g,'\n');
        });
      }else{
        this.resetProductAttr();
      }
      this.getCateList();
    },
    watch:{
      inputListFormat: function (newValue, oldValue) {
        newValue = newValue.replace(/\n/g,',');
        this.productAttr.inputList = newValue;
      }
    },
    methods: {
      getCateList() {
        let listQuery = {pageNum: 1, pageSize: 100};
        fetchList(listQuery).then(response => {
          this.productAttrCateList = response.data.list;
        });
      },
      resetProductAttr() {
        this.productAttr = Object.assign({}, defaultProductAttr);
        this.productAttr.productAttributeCategoryId = Number(this.$route.query.cid);
        this.productAttr.type = Number(this.$route.query.type);
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('Submit data?', 'Warning', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              if(this.isEdit){
                updateProductAttr(this.$route.query.id,this.productAttr).then(response=>{
                  this.$message({
                    message: 'Updated successfully',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              }else{
                createProductAttr(this.productAttr).then(response=>{
                  this.$message({
                    message: 'Submitted successfully',
                    type: 'success',
                    duration: 1000
                  });
                  this.resetForm('productAttrFrom');
                });
              }
            });

          } else {
            this.$message({
              message: 'Validation failed',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.resetProductAttr();
      }
    },
  }
</script>

<style scoped>

</style>
