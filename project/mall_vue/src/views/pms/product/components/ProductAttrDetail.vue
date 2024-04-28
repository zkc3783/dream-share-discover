<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productAttrForm" label-width="120px" class="form-inner-container" size="small">
      
      <el-form-item label="Product Gallery:">
        <multi-upload v-model="selectProductPics"></multi-upload>
      </el-form-item>
      
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">Previous, fill in Product information</el-button>
        <el-button type="primary" size="medium" @click="handleNext">Finished, submit</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  
  import MultiUpload from '@/components/Upload/multiUpload'

  export default { 
    name: "ProductAttrDetail",
    components: { MultiUpload },
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        //选中的商品属性
        selectProductAttr: [],
        //选中的商品参数
        selectProductParam: [],
        //选中的商品属性图片
        selectProductAttrPics: [],
      }
    },
    computed: {

      hasAttrPic() { //是否有商品属性图片
        
        if (this.selectProductAttrPics.length < 1) return false;
        return true;
      },

      selectProductPics: {
        get: function() {
          let pics = [];
          if (this.value.pic) pics.push(this.value.pic);
          return pics;
        },
        set: function(newValue) {
          if (newValue == null || newValue.length === 0) this.value.pic = '';
          else this.value.pic = newValue[0];
        }
      
      }
    },
    watch: {
      'value.pic': function(newVal) {
        if (newVal) {
          this.selectProductPics = [newVal]; // 确保这里的数据结构和 multiUpload 组件的期望结构一致
        }
      }
    },
    methods: {
      //合并商品属性
      mergeProductAttrValue() {
        
        //debugger
        this.value.productAttributeValueList = [];
        for (let i = 0; i < this.selectProductAttr.length; i++) {
          let attr = this.selectProductAttr[i];
          if (attr.handAddStatus === 1 && attr.options != null && attr.options.length > 0) {
            this.value.productAttributeValueList.push({
              productAttributeId: attr.id,
              value: this.getOptionStr(attr.options)
            });
          }
        }
        for (let i = 0; i < this.selectProductParam.length; i++) {
          let param = this.selectProductParam[i];
          this.value.productAttributeValueList.push({
            productAttributeId: param.id,
            value: param.value
          });
        }
      },
      //合并商品属性图片
      mergeProductAttrPics() {
        
        //debugger
        for (let i = 0; i < this.selectProductAttrPics.length; i++)
        {
          for (let j = 0; j < this.value.skuStockList.length; j++)
          {
            let spData = JSON.parse(this.value.skuStockList[j].spData);
            if (spData[0].value === this.selectProductAttrPics[i].name)
            {
              this.value.skuStockList[j].pic = this.selectProductAttrPics[i].pic;

            }
          }
        }

      },
      getOptionStr(arr) {
        debugger
        let str = '';
        for (let i = 0; i < arr.length; i++) {
          str += arr[i];
          if (i != arr.length - 1) {
            str += ',';
          }
        }
        return str;
      },
      //处理点击perv按钮
      handlePrev() {
        this.$emit('prevStep')
      },
      //点击next按钮
      handleNext() {
        this.mergeProductAttrValue();
        this.mergeProductAttrPics();
        this.$emit('finishCommit', this.isEdit);
      }
    }
  }
</script>

<style scoped>
  .littleMarginLeft { margin-left: 10px; }
  .littleMarginTop { margin-top: 10px; }
  .paramInput { width: 250px; }
  .paramInputLabel {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px
  }
  .cardBg { background: #F8F9FC; }
</style>
