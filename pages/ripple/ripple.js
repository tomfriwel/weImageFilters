// pages/ripple/ripple.js
const ImageFilters = require('../../utils/weImageFilters/weImageFilters.js')

const canvasId = 'hehe'
const canvasW = 300
const canvasH = 300

let originalData = null


/**
 * this code is based on the flash version linked bellow
 * http://www.derschmale.com/2008/08/03/water-ripples-revisited-as3-only-version/
 */
function Rippler(source, strength, scale) {
    this._source = source;
    this._strength = strength;
    this._scaleInv = 1 / scale;

    // create the (downscaled) buffers and final (upscaled) image data, sizes depend on scale
    this._buffer1 = {
        canvas:{}
    }//document.createElement('canvas').getContext('2d');
    this._buffer1.canvas.width = source.width * this._scaleInv;
    this._buffer1.canvas.height = source.height * this._scaleInv;
    this._buffer1.fillStyle = '#000000';
    // this._buffer1.fillRect(0, 0, this._buffer1.canvas.width, this._buffer1.canvas.height);

    this._buffer2 = document.createElement('canvas').getContext('2d');
    this._buffer2.canvas.width = source.width * this._scaleInv;
    this._buffer2.canvas.height = source.height * this._scaleInv;

    this._defData = {
        canvas: {}
    }//document.createElement('canvas').getContext('2d');
    this._defData.canvas.width = source.width;
    this._defData.canvas.height = source.height;
    this._defData.fillStyle = '#7f7f7f';
    // this._defData.fillRect(0, 0, source.width, source.height);

    // Recalculate scale between the buffers and the final upscaled image to prevent roundoff errors.
    var correctedScaleX = this._defData.canvas.width / this._buffer1.canvas.width;
    var correctedScaleY = this._defData.canvas.height / this._buffer1.canvas.height;
    // this._defData.scale(correctedScaleX, correctedScaleY);

    // Create a frame-based loop to update the ripples
    var self = this;
    this._interval = setInterval(function () {
        self._handleEnterFrame();
    }, 30);
}
Rippler.prototype.drawRipple = function (x, y, size, alpha) {
    var half = size >> 1; // We need half the size of the ripple
    var intensity = (alpha * 0xff & 0xff) * alpha; // The colour which will be drawn in the currently active buffer

    // calculate and draw the rectangle, having (x, y) in its centre
    var dx = (-half + x) * this._scaleInv;
    var dy = (-half + y) * this._scaleInv;
    var dw = size * this._scaleInv;
    var dh = dw;

    this._buffer1.fillStyle = 'rgb(0, 0, ' + intensity + ')';
    this._buffer1.fillRect(dx, dy, dw, dh);
};
Rippler.prototype.destroy = function () {
    clearInterval(this._interval);
    this._buffer1 = null;
    this._buffer2 = null;
    this._defData = null;
};
Rippler.prototype.onUpdate = function () { };
Rippler.prototype._handleEnterFrame = function () {
    // a temporary clone of buffer 2
    var buffer2Clone = this._buffer2.getImageData(0, 0, this._buffer1.canvas.width, this._buffer1.canvas.height);

    // buffer2 will contain an expanded version of buffer1
    var buffer1Image = this._buffer1.getImageData(0, 0, this._buffer1.canvas.width, this._buffer1.canvas.height);
    var buffer2Image = ImageFilters.ConvolutionFilter(buffer1Image, 3, 3, [0.5, 1, 0.5, 1, 0, 1, 0.5, 1, 0.5], 3, 0, false);

    // by substracting buffer2's old image, buffer2 will now be a ring
    buffer2Image = ImageFilters.BlendSubtract(buffer2Image, buffer2Clone, 0, 0);
    this._buffer2.putImageData(buffer2Image, 0, 0);

    // scale up and draw to the final displacement map, and apply it to the filter
    this._defData.drawImage(this._buffer2.canvas, 0, 0);

    var defImage = this._defData.getImageData(0, 0, this._defData.canvas.width, this._defData.canvas.height);
    defImage = ImageFilters.ColorTransformFilter(defImage, 1, 1, 1, 1, 128, 128, 128, 0);
    var result = ImageFilters.DisplacementMapFilter(this._source, defImage, 0, 0, 2, 2, this._strength, this._strength, 2);

    // switch buffers 1 and 2
    this._switchBuffers();

    this.onUpdate(result);
};
Rippler.prototype._switchBuffers = function () {
    var temp = this._buffer1;
    this._buffer1 = this._buffer2;
    this._buffer2 = temp;
};


function main(img) {
    var $canvas = $('#c');
    $canvas[0].width = img.width;
    $canvas[0].height = img.height;

    var context = $canvas[0].getContext('2d');
    context.drawImage(img, 0, 0);

    var target = context.getImageData(0, 0, img.width, img.height);
    var rippler = new Rippler(target, 60, 8);

    rippler.onUpdate = function (target) {
        context.putImageData(target, 0, 0);
    };

    // mousemove
    $canvas.bind('mousemove touchmove', function (e) {
        var mouseX = e.pageX - $canvas.offset().left;
        var mouseY = e.pageY - $canvas.offset().top;
        rippler.drawRipple(mouseX, mouseY, 8, 1);
        return false;
    });
}

Page({
    data: {

    },
    onLoad: function(options) {

    }, choose() {
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
                z.setData({
                    selected: 1
                })
            }
        })
    },
    moveHandler(e) {

    }
})