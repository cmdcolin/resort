'use strict';

var timestep = 4;
var currIter = 0;

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


function bubblesort(array, target, width, draw, curr) {
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
        if (flag || curr != currIter) {
            console.log('done');
            clearInterval(ret);
            return;
        }
        for (var j = 0; j < arrlen; j += width) {
            if (!done[j]) {
                done[j] = true;
                for (var i = 1; i < width; i++) {
                    if (progress[j + i - 1] > progress[j + i]) {
                        done[j] = false;
                        [progress[j + i - 1], progress[j + i]] = [progress[j + i], progress[j + i - 1]];
                    }
                }
            }
        }
        for (var j = 0; j < arrlen; j += width) {
            for (var i = 0; i < width; i++) {
                var iter = (j + progress[j + i]) * 4;
                var iter2 = (j + i) * 4;
                target[iter2 + 0] = array[iter + 0];
                target[iter2 + 1] = array[iter + 1];
                target[iter2 + 2] = array[iter + 2];
                target[iter2 + 3] = array[iter + 3];
            }
        }
        draw();
    }, timestep);
    return this;
}


function cocktail(array, target, width, draw, curr) {
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


    var ret = setInterval(function sort() {
        var flag = true;
        for (var j = 0; j < arrlen / width; j++) {
            flag &= done[j];
        }
        if (flag || curr != currIter) {
            console.log('done');
            clearInterval(ret);
            return;
        }
        for (var j = 0; j < arrlen; j += width) {
            if (!done[j]) {
                done[j] = true;
                for (var i = 1; i < width; i++) {
                    if (progress[j + i - 1] > progress[j + i]) {
                        done[j] = false;
                        progress[j + i - 1] = progress[j + i - 1] ^ progress[j + i];
                        progress[j + i] = progress[j + i] ^ progress[j + i - 1];
                        progress[j + i - 1] = progress[j + i - 1] ^ progress[j + i];
                        // [progress[j + i - 1], progress[j + i]] = [progress[j + i], progress[j + i - 1]];
                    }
                }
                if (done[j]) break;
                done[j] = true;
                for (var i = width - 1; i > 0; i--) {
                    if (progress[j + i - 1] > progress[j + i]) {
                        done[j] = false;
                        progress[j + i - 1] = progress[j + i - 1] ^ progress[j + i];
                        progress[j + i] = progress[j + i] ^ progress[j + i - 1];
                        progress[j + i - 1] = progress[j + i - 1] ^ progress[j + i];
                        // [progress[j + i - 1], progress[j + i]] = [progress[j + i], progress[j + i - 1]];
                    }
                }
            }
        }
        for (var j = 0; j < arrlen; j += width) {
            for (var i = 0; i < width; i++) {
                var iter = (j + progress[j + i]) * 4;
                var iter2 = (j + i) * 4;
                target[iter2 + 0] = array[iter + 0];
                target[iter2 + 1] = array[iter + 1];
                target[iter2 + 2] = array[iter + 2];
                target[iter2 + 3] = array[iter + 3];
            }
        }
        draw();
    }, timestep);
    return this;
}


var img = new Image();
img.onload = function () {
    document.getElementById('myinput').addEventListener('change', function (evt) {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                img.src = fr.result;
            };
            fr.readAsDataURL(files[0]);
        }
        currIter++;
    });
    var c = document.getElementById('canv');
    var c2 = document.getElementById('canv2');
    var ctx = c.getContext('2d');
    var ctx2 = c2.getContext('2d');
    var dp = window.devicePixelRatio;
    var w = img.width;
    var h = img.height;
    var ww = 300;
    img.width = ww;
    img.height = ww * h / w;

    c.width = img.width * dp;
    c.height = img.height * dp;
    c2.width = img.width * dp;
    c2.height = img.height * dp;

    c.style.width = img.width * 1.5;
    c.style.height = img.height * 1.5;
    c2.style.width = img.width * 1.5;
    c2.style.height = img.height * 1.5;

    ctx.scale(dp, dp);
    ctx2.scale(dp, dp);

    ctx.drawImage(img, 0, 0, img.width, img.height);

    var p = ctx.getImageData(0, 0, c.width, c.height);
    var p2 = ctx2.createImageData(p);
    var pixels = p.data;
    var pixels2 = p2.data;
    var w = p.width;
    cocktail(pixels, pixels2, w, function () {
        ctx2.putImageData(p2, 0, 0);
    }, currIter);
};
img.src = 'baby3.jpg';

