<template>
  <div style="text-align:left">
    <el-upload
      :show-file-list="true"
      class="upload-demo"
      drag
      :limit='1'
      ref="upload"
      action="#"
      :on-progress="clearFiles"
      :on-change="parseQrcode"
      :on-remove="removeFile"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <span>解析结果：{{ msg }}</span>
  </div>
</template>

<script>
import gzip from "lrz";
import qrcodeParser from "qrcode-parser";
export default {
  name: "qrcodeParse",
  data() {
    return {
      msg: '',
    };
  },

  methods: {
    // 关闭解析弹窗时将清除上传的文件
    clearFiles() {
      this.$refs.upload.clearFiles();
      this.msg ="";
    },
    // 删除图片文件时将解析信息清空
    removeFile() {
      this.msg = '';
    },
    // 将图片转成base64位的png
    image2PngBase64(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL;
    },
    // 加载图片并转为png格式的base64
    loadImage(img) {
      return new Promise((resolve, reject) => {
        img.onload = () => {
          const base64 = this.image2PngBase64(img);
          resolve(base64);
        };
        img.onerror = () => {
          reject();
        };
      });
    },
    // 解析二维码
    async parseQrcode(file) {
      this.clearFiles()
      this.msg = '';
      // 压缩图片
      const gzipImg = await gzip(URL.createObjectURL(file.raw));
      let img = new Image();
      img.src = gzipImg.base64;
      const pngBase64 = await this.loadImage(img);
      this.msg = await qrcodeParser(pngBase64);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
