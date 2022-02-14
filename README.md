# zxc-qrcode
前端实现二维码的解析，能处理各种格式（jpg、png、jpeg)的图片以及大于5M的大图片，兼容性较好
## Installation
``` bash
# install qrcode-parser    // 解码主库
npm i qrcode-parser

# install lrz          // 压缩图片的库
npm i lrz
``` 
## Usage
``` bash
# import package
import gzip from "lrz";
import qrcodeParser from "qrcode-parser";

// 压缩图片
const gzipImg = await gzip(URL.createObjectURL(file.raw));

// 解析二维码
this.msg = await qrcodeParser(pngBase64);
```
