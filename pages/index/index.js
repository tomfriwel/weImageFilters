// pages/index/index.js
const ImageFilters = require('../../utils/weImageFilters/weImageFilters.js')

const canvasId = 'hehe'
const canvasW = 300
const canvasH = 300

let originalData = null

const filters = {
    original: function(data) {
        return data
    },
    GaussianBlur: function(data) {
        // GaussianBlur (srcImageData, strength)
        // strength 1 <= n <= 4
        return ImageFilters.GaussianBlur(data, 4)
    },
    Binarize: function(data) {
        // Binarize (srcImageData, threshold)
        // threshold 0.0 <= n <= 1.0
        return ImageFilters.Binarize(data, 0.5)
    },
    BoxBlur: function(data) {
        // BoxBlur (srcImageData, hRadius, vRadius, quality)

        return ImageFilters.BoxBlur(data, 3, 3, 2)
    },
    StackBlur: function(data) {
        // StackBlur (srcImageData, radius)

        return ImageFilters.StackBlur(data, 6)
    },
    Brightness: function(data) {
        // Brightness (srcImageData, brightness)
        // brightness - 100 <= n <= 100
        return ImageFilters.Brightness(data, 100)
    },
    BrightnessContrastGimp: function(data) {
        // BrightnessContrastGimp (srcImageData, brightness, contrast)
        // brightness - 100 <= n <= 100
        // contrast - 100 <= n <= 100
        return ImageFilters.BrightnessContrastGimp(data, 26, 13)
    },
    BrightnessContrastPhotoshop: function(data) {
        // ImageFilters.BrightnessContrastPhotoshop (srcImageData, brightness, contrast)
        // brightness - 100 <= n <= 100
        // contrast - 100 <= n <= 100
        return ImageFilters.BrightnessContrastPhotoshop(data, 26, 13)
    },
    Channels: function(data) {
        // ImageFilters.Channels (srcImageData, channel)
        // channel: default is red, 2 green, 3 blue

        return ImageFilters.Channels(data, 3)
    },
    ColorTransformFilter: function(data) {
        // ImageFilters.ColorTransformFilter (srcImageData, redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset)
        // redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier: 0~5
        // redOffset, greenOffset, blueOffset, alphaOffset: 0~255

        return ImageFilters.ColorTransformFilter(data, 2, 1, 1, 1, 38, 0, 0, 0)
    },
    Desaturate: function(data) {
        // ImageFilters.Desaturate (srcImageData)
        return ImageFilters.Desaturate(data)
    },
    Dither: function(data) {
        // ImageFilters.Dither (srcImageData, levels)
        // levels 2 <= n <= 255
        return ImageFilters.Dither(data, 2)
    },
    Edge: function(data) {
        // ImageFilters.Edge (srcImageData)
        return ImageFilters.Edge(data)
    },
    Emboss: function(data) {
        // ImageFilters.Emboss (srcImageData)
        return ImageFilters.Emboss(data)
    },
    Enrich: function(data) {
        // ImageFilters.Enrich (srcImageData)
        return ImageFilters.Enrich(data)
    },
    Flip: function(data) {
        // ImageFilters.Flip (srcImageData, vertical)
        // vertical{Boolean}
        return ImageFilters.Flip(data, 0)
    },
    Gamma: function(data) {
        // ImageFilters.Gamma (srcImageData, gamma)
        // gamma: 0~5
        return ImageFilters.Gamma(data, 5)
    },
    GrayScale: function(data) {
        // ImageFilters.GrayScale (srcImageData)
        return ImageFilters.GrayScale(data)
    },
    HSLAdjustment: function(data) {
        // ImageFilters.HSLAdjustment (srcImageData, hueDelta, satDelta, lightness)
        // hueDelta: 0~180
        // satDelta, lightness: 0~100
        return ImageFilters.HSLAdjustment(data, -23, 54, 19)
    },
    Invert: function(data) {
        // ImageFilters.Invert (srcImageData)
        return ImageFilters.Invert(data)
    },
    Mosaic: function(data) {
        // ImageFilters.Mosaic (srcImageData, blockSize)
        // blockSize > 0
        return ImageFilters.Mosaic(data, 10)
    },
    Oil: function(data) {
        // ImageFilters.Oil (srcImageData, range, levels)
        // range: 1~5
        // levels: 1~256
        return ImageFilters.Oil(data, 5, 62)
    },
    OpacityFilter: function(data) {
        // ImageFilters.OpacityFilter (srcImageData, opacity)
        // opacity: 0~255
        return ImageFilters.OpacityFilter(data, 123)
    },
    Posterize: function(data) {
        // ImageFilters.Posterize (srcImageData, levels)
        // levels: 2~32
        return ImageFilters.Posterize(data, 6)
    },
    Rescale: function(data) {
        // ImageFilters.Rescale (srcImageData, scale)
        // scale: 0~5
        return ImageFilters.Rescale(data, 3.2)
    },
    // ResizeNearestNeighbor: function (data) {
    //     // ImageFilters.ResizeNearestNeighbor (srcImageData, width, height)
    //     return ImageFilters.ResizeNearestNeighbor(data, 500, 500)
    // },
    Sepia: function(data) {
        // ImageFilters.Sepia(srcImageData)
        return ImageFilters.Sepia(data)
    },
    Sharpen: function(data) {
        // ImageFilters.Sharpen (srcImageData, factor)
        // factor: 1~10
        return ImageFilters.Sharpen(data, 9)
    },
    Solarize: function(data) {
        // ImageFilters.Solarize (srcImageData)
        return ImageFilters.Solarize(data)
    },
    Transpose: function(data) {
        // ImageFilters.Transpose (srcImageData)
        // factor: 1~10
        return ImageFilters.Transpose(data)
    },
    Twril: function(data) {
        // ImageFilters.Twril (srcImageData, centerX, centerY, radius, angle, edge, smooth)
        // centerX 0.0 <= n <= 1.0
        // centerY 0.0 <= n <= 1.0
        // radius
        // angle(degree)
        // smooth{Boolean}
        return ImageFilters.Twril(data, 0.5, 0.5, 40, 360, 0, true)
    },
}

const keys = Object.keys(filters)

Page({
    data: {
        selected: 0,
        array: [],
        index: 0,
        gap: 0
    },
    onLoad: function(options) {
        this.setData({
            array: keys
        })
    },
    bindPickerChange(e) {
        const z = this
        let index = e.detail.value
        this.setData({
            index
        })
        wx.showLoading({
            title: '正在加载...',
        })
        let startTime = (new Date()).getTime()
        let imageData = ImageFilters.utils.createImageDataFromData(originalData, canvasW, canvasH)

        let filtered = filters[keys[index]](imageData)

        wx.canvasPutImageData({
            canvasId: canvasId,
            data: filtered.data,
            x: 0,
            y: 0,
            width: canvasW,
            height: canvasH,
            complete: res => {
                console.log(res)
                wx.hideLoading()
                let endTime = (new Date()).getTime()
                let gap = (endTime - startTime)
                console.log(gap + 'ms')
                z.setData({
                    gap
                })
            }
        })
    },
    choose() {
        const z = this
        const ctx = wx.createCanvasContext(canvasId)
        wx.chooseImage({
            count: 1,
            success: function(res) {
                if (res.tempFilePaths.length) {
                    let path = res.tempFilePaths[0]

                    ctx.drawImage(path, 0, 0, canvasW, canvasH)
                    ctx.draw(false, () => {
                        console.log('draw done')
                        z.getCavasImageData()
                    })
                }
            },
        })
    },
    getCavasImageData() {
        const z = this
        wx.canvasGetImageData({
            canvasId: canvasId,
            x: 0,
            y: 0,
            width: canvasW,
            height: canvasH,
            success: res => {
                console.log(res)
                let {
                    data
                } = res

                originalData = data
                z.setData({
                    selected: 1
                })
            }
        })
    },
    save() {
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: canvasW,
            height: canvasH,
            destWidth: canvasW,
            destHeight: canvasH,
            canvasId: canvasId,
            success: function(res) {
                console.log(res.tempFilePath)
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: res => {
                        wx.showToast({
                            title: '保存成功',
                        })
                    }
                })
            }
        })
    }
})