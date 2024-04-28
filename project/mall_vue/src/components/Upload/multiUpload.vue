 <template> 
  <div>
    <el-upload
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="1"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>  
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageBase64" alt="">
    </el-dialog>
  </div>
</template>
<script>
  //魔改版
  export default {
    name: 'multiUpload',
    props: { value: Array, },

    data() {
      return {
        dialogVisible: false,
        dialogImageBase64: null,
      };
    },
    computed: {
      fileList() {
        //console.log(this.value); // 打印日志查看传入的图片数据
        return this.value.map(imgBase64 => ({ url: imgBase64 }));
      },
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
        this.dialogImageBase64 = file.url;
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
      handleExceed(files, fileList) {
        this.$message({
          message: 'You can only submit one image',
          type: 'warning',
          duration:1000
        });
      },
    }
  }
</script>
<style>

</style>


