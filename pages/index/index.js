// pages/index/index.js
const ImageFilters = require('../../utils/weImageFilters/weImageFilters.js')

const canvasId = 'hehe'
const canvasW = 300
const canvasH = 300

let originalData = null

const filters = {
    original: function (data) {
        return data
    },
    black: function (data) { },
    gray: function (data) { }
}

const keys = Object.keys(filters)

Page({
    data: {
    },
    onLoad: function (options) {
    },
    filterTap() {
        wx.showLoading({
            title: '正在加载...',
        })

        let imageData = ImageFilters.utils.createImageDataFromData(originalData, canvasW, canvasH)
        // new ImageData(originalData, canvasW, canvasH)

        // let filtered = ImageFilters.GrayScale(imageData)
        // let filtered = ImageFilters.Mosaic(imageData, 10)
        let filtered = ImageFilters.GaussianBlur(imageData, 4)

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
            }
        })
        return
        const z = this
        wx.showActionSheet({
            itemList: keys,
            success: res => {
                let {
                    tapIndex
                } = res

                let data = new Uint8ClampedArray(originalData)
                data = filters[keys[tapIndex]](data)

                wx.canvasPutImageData({
                    canvasId: canvasId,
                    data: data,
                    x: 0,
                    y: 0,
                    width: canvasW,
                    height: canvasH,
                    complete: res => {
                        console.log(res)
                    }
                })
            }
        })
    },
    choose() {
        const z = this
        const ctx = wx.createCanvasContext(canvasId)
        wx.chooseImage({
            count: 1,
            success: function (res) {
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
            }
        })
    }
})