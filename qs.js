'use strict';

var w;
var h;
var timestep = 40;

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function shuffle(array, start, end) {
    for (var i = end; i > start; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function bubblesort(array, target, width, draw) {
    var done = [];
    var progress = [];
    var arrlen = array.length / 4;
    for (var i = 0; i < arrlen; i++) {
        progress[i] = i % width;
    }
    for (var i = 0; i < arrlen; i += width) {
        done.push(false);
        shuffle(progress, i, i + width);
    }


    var ret = setInterval(function () {
        var flag = true;
        for (var j = 0; j < arrlen / width; j++) {
            flag &= done[j];
        }
        if (flag) {
            clearInterval(ret);
            return;
        }
        for (var j = 0; j < arrlen; j += width) {
            for (var i = 0; i < width; i++) {
                if (!done[j]) {
                    done[j] = true;
                    for (var i = 1; i < width; i++) {
                        if (array[j + i - 1] > array[j + i]) {
                            done[j] = false;
                            [array[j + i - 1], array[j + i]] = [array[j + i], array[j + i - 1]];
                        }
                    }
                }
            }
        }
        for (var j = 0; j < arrlen; j += width) {
            for (var i = 0; i < width; i++) {
                var iter = progress[j + i] * 4;
                var iter2 = i * 4;
                target[j + iter2 + 0] = array[j + iter2 + 0];
                target[j + iter2 + 1] = array[j + iter2 + 1];
                target[j + iter2 + 2] = array[j + iter2 + 2];
                target[j + iter2 + 3] = array[j + iter2 + 3];
            }
        }
        draw();
    }, timestep);
    return this;
}


var img = new Image();
img.onload = function () {
    var c = document.getElementById('canv');
    var c2 = document.getElementById('canv2');
    var ctx = c.getContext('2d');
    var ctx2 = c2.getContext('2d');
    var dp = window.devicePixelRatio;
    var w = img.width;
    var h = img.height;
    var ww = 500;
    img.width = ww;
    img.height = ww * h / w;

    c.width = img.width * dp;
    c.height = img.height * dp;

    c2.width = img.width * dp;
    c2.height = img.height * dp;

    c.style.width = img.width;
    c.style.height = img.height;
    c2.style.width = img.width;
    c2.style.height = img.height;

    ctx.scale(dp, dp);
    ctx2.scale(dp, dp);

    ctx.drawImage(img, 0, 0, img.width, img.height);

    var p = ctx.getImageData(0, 0, c.width, c.height);
    var p2 = ctx2.createImageData(p);
    var pixels = p.data;
    var pixels2 = p2.data;
    var w = p.width;
    bubblesort(pixels, pixels2, w, function () {
        ctx2.putImageData(p2, 0, 0);
    });
};
img.src = 'baby2.jpg';
