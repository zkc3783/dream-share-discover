 <template> 
  <div>
    <el-upload
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
    
      <i class="el-icon-plus"></i>
        
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  //魔改版
  export default {
    name: 'multiUpload',
    props: {
      // 图片Base64数据数组
      value: Array,
      //最大上传图片数量
      maxCount:{
        type:Number,
        default:1
      }
    },
    data() {
      return {
        dialogVisible: false,
        dialogImageUrl:null,
      };
    },
    computed: {
      fileList() {
        return this.value.map(imgBase64 => ({ url: imgBase64 }));
      },
      alreadyUploaded() {
        return this.fileList.length >= 1; // 如果已经上传了至少一张图片，则返回 true
      }
    },
    methods: {
      emitInput(fileList) {
        this.$emit('input', fileList.map(file => file.url));
      },
      handleRemove(file, fileList) {
        this.emitInput(fileList);
      },
      handlePreview(file) {
        this.dialogVisible = true;
        this.dialogImageUrl = file.url;
      },
      beforeUpload(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // 直接使用 Base64 字符串而不是上传
          const base64 = reader.result;
          this.fileList.push({ name: file.name, url: base64 });
          this.emitInput(this.fileList);
        };
        return false; // 阻止文件的默认上传行为
      },
      handleUploadSuccess(res, file) {
        let url = this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name;
        if(!this.useOss){
          url = res.data.url;
        }
        this.fileList.push({name: file.name,url:url});
        this.emitInput(this.fileList);
      },
      handleExceed(files, fileList) {
        this.$message({
          message: '最多只能上传'+this.maxCount+'张图片',
          type: 'warning',
          duration:1000
        });
      },
    }
  }
</script>
<style>

</style>


