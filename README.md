# weImageFilters

微信小程序图片滤镜

#### 声明

> 滤镜处理的代码99.9%来自于[arahaya/ImageFilters.js](https://github.com/arahaya/ImageFilters.js)，我这里只是做了一些小改动，使其能在微信小程序里使用。

#### 版本要求

> 基础库 1.9.0

#### 简介

最近发现一个网页上好用的滤镜库，滤镜效果有几十种，就稍微做了一些更改，使其能在微信小程序使用。

下面的效果图均由微信开发工具模拟器生成，并且在自己手机上也测试过，能正常使用。

有些效果会比较耗时，比如高斯模糊，对于`320*320`的图片有时候会有几秒处理时间。这里毕竟是手机并且相当于是在网页中进行处理，所以并不建议用来处理大图。

滤镜的参数我目前是写死的，可以根据需要修改。

#### 代码 [tomfriwel/weImageFilters](https://github.com/tomfriwel/weImageFilters)

#### 效果图

屏幕截图

![屏幕截图](https://upload-images.jianshu.io/upload_images/2158535-205a7f10a1f41bda.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/375)

原图

![原图](https://upload-images.jianshu.io/upload_images/2158535-d3e9a4579dc42882.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


绘制在`canvas`中的图片（320*320）

![original](https://upload-images.jianshu.io/upload_images/2158535-2717c93f2a3fc028.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


1. `Binarize (srcImageData, threshold)` 二值化, 参数:`(imageData, 0.9)`

![Binarize](https://upload-images.jianshu.io/upload_images/2158535-d78110e8e4999c3c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


2. `BoxBlur (srcImageData, hRadius, vRadius, quality)` 方框模糊, 参数:`(imageData, 3, 3, 2)`

![BoxBlur](https://upload-images.jianshu.io/upload_images/2158535-a24f8c62e7e10513.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. `GaussianBlur (srcImageData, strength)` 高斯模糊, 参数:`(imageData, 4)`

![GaussianBlur](https://upload-images.jianshu.io/upload_images/2158535-ad5dcf3b31202533.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4. `StackBlur (srcImageData, radius)` 高斯模糊和框模糊的折衷方案, 参数:`(imageData, 6)`

![StackBlur](https://upload-images.jianshu.io/upload_images/2158535-1a485e1ed38bfa4f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

5. `Brightness (srcImageData, brightness)` 亮度调节, 参数:`(imageData, 100)`

![Brightness](https://upload-images.jianshu.io/upload_images/2158535-9d8f16b709f51e26.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

6. `BrightnessContrastGimp (srcImageData, brightness, contrast)` 亮度、对比度, 参数:`(imageData, 26, 13)`

![BrightnessContrastGimp](https://upload-images.jianshu.io/upload_images/2158535-ebd612007487886c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

7. `BrightnessContrastPhotoshop (srcImageData, brightness, contrast)` 亮度、对比度, 参数:`(imageData, 26, 13)`

![BrightnessContrastPhotoshop](https://upload-images.jianshu.io/upload_images/2158535-32e8ab6cb7979167.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

8. `Channels (srcImageData, channel)` 单色通道，这里为 blue Channel, 参数:`(imageData, 3)`

![Channels blue](https://upload-images.jianshu.io/upload_images/2158535-d5b198fe6e30e49f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

9. `ColorTransformFilter (srcImageData, redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset)` 颜色变换滤波器, 参数:`(imageData, 2, 1, 1, 1, 38, 0, 0, 0)`

![ColorTransformFilter](https://upload-images.jianshu.io/upload_images/2158535-27d7dd1f983b2c78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

10. `Desaturate (srcImageData)` 冲淡

![Desaturate](https://upload-images.jianshu.io/upload_images/2158535-50a12e81591403b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

11. `Dither (srcImageData, levels)` 高频振动, 参数:`(imageData, 2)`

![Dither](https://upload-images.jianshu.io/upload_images/2158535-e5dc7b7eb240ac5d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

12. `Edge (srcImageData)` 边缘

![Edge](https://upload-images.jianshu.io/upload_images/2158535-a32ebdd7f70eedee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

13. `Emboss (srcImageData)` 浮雕

![Emboss](https://upload-images.jianshu.io/upload_images/2158535-cdbbf140d7f40171.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

14. `Enrich (srcImageData)` 丰富

![Enrich](https://upload-images.jianshu.io/upload_images/2158535-253a0a7f3801b88b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

15. `Flip (srcImageData, vertical)` 翻转, 参数:`(imageData, 0)`

![Flip](https://upload-images.jianshu.io/upload_images/2158535-1638188e1b979022.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

16. `Gamma (srcImageData, gamma)` γ, 参数:`(imageData, 5)`

![Gamma](https://upload-images.jianshu.io/upload_images/2158535-025bd742d11f737d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

17. `GrayScale (srcImageData)` 灰度

![GrayScale](https://upload-images.jianshu.io/upload_images/2158535-c3e7a9b3bda5efff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

18. `HSLAdjustment (srcImageData, hueDelta, satDelta, lightness)` HSL调节, 参数:`(imageData, -23, 54, 19)`

![HSLAdjustment](https://upload-images.jianshu.io/upload_images/2158535-873ed95bff29c74a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

19. `Invert (srcImageData)` 反色

![Invert](https://upload-images.jianshu.io/upload_images/2158535-9bc839b807593f3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

20. `Mosaic (srcImageData, blockSize)` 马赛克，`blockSize`马赛克块的大小, 参数:`(imageData, 10)`

![Mosaic](https://upload-images.jianshu.io/upload_images/2158535-16e8b4eaa1515f3c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

21. `Oil (srcImageData, range, levels)` 油画效果, 参数:`(imageData, 5, 62)`

![Oil](https://upload-images.jianshu.io/upload_images/2158535-fb4bc43ccb44fd08.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

22. `OpacityFilter (srcImageData, opacity)` 不透明度, 参数:`(imageData, 123)`

![OpacityFilter](https://upload-images.jianshu.io/upload_images/2158535-a7a6b98c5a202e9a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

23. `Posterize (srcImageData, levels)` 多色调分色印, 参数:`(imageData, 6)`

![Posterize](https://upload-images.jianshu.io/upload_images/2158535-ccb8539664c4e43c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

24. `Rescale (srcImageData, scale)` 重新调节, 参数:`(imageData, 3.2)`

![Rescale](https://upload-images.jianshu.io/upload_images/2158535-7c41a241572fe4ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

25. `Sepia(srcImageData)` 褐色

![Sepia](https://upload-images.jianshu.io/upload_images/2158535-065d5c00c24c67fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

26. `Sharpen (srcImageData, factor)` 锐化, 参数:`(imageData, 9)`

![Sharpen](https://upload-images.jianshu.io/upload_images/2158535-8bf225c1a68119cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

27. `Solarize (srcImageData)` 曝光

![Solarize](https://upload-images.jianshu.io/upload_images/2158535-c7730bb9349c0c15.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

28. `Transpose (srcImageData)` 调换

![Transpose](https://upload-images.jianshu.io/upload_images/2158535-c4e7f2c9ae898721.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

29. `Twril (srcImageData, centerX, centerY, radius, angle, edge, smooth)` 水波旋转, 参数:`(imageData, 0.5, 0.5, 40, 360, 0, true)`

![Twril](https://upload-images.jianshu.io/upload_images/2158535-7fdb5c97d2ae26b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

将半径和旋转角度调节一下，参数:`(imageData, 0.5, 0.5, 120, 90, 0, true)`

![Twril1](https://upload-images.jianshu.io/upload_images/2158535-8212afb32cf9ef12.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
