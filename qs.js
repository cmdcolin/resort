'use strict';

var timestep = 40;
var currIter = 0;
var img = new Image();

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function bubblesort(array, target, width, draw, curr) {
    var done = [];
    var progress = [];
    var arrlen = array.length / 4;
    for (let i = 0; i < arrlen; i++) {
        progress[i] = i % width;
    }
    for (let i = 0; i < arrlen; i += width) {
        done.push(false);
        var ret = progress.slice(i, i + width);
        var shuf = shuffle(ret);
        for(let j = 0; j < width; j++) {
            progress[i+j]=shuf[j];
        }
    }


    var ret = setInterval(function () {
        var flag = true;
        var sum = 0;
        var which = [];
        for (let j = 0; j < arrlen / width; j++) {
            flag &= done[j];
            sum += done[j];
            if(done[j]) which.push(j);
        }
        if (flag || curr !== currIter) {
            clearInterval(ret);
            return;
        }
        for (let j = 0; j < arrlen/width; j++) {
            let k = j*width;
            if (!done[j]) {
                done[j] = true;
                for (let i = 1; i < width; i++) {
                    if (progress[k + i - 1] > progress[k + i]) {
                        done[j] = false;
                        progress[k + i - 1] = progress[k + i - 1] ^ progress[k + i];
                        progress[k + i] = progress[k + i] ^ progress[k + i - 1];
                        progress[k + i - 1] = progress[k + i - 1] ^ progress[k + i];
                    }
                }
            }
        }
        for (let j = 0; j < arrlen; j += width) {
            for (let i = 0; i < width; i++) {
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
    for (let i = 0; i < arrlen; i++) {
        progress[i] = i % (width+1);
    }
    for (let i = 0; i < arrlen; i += width) {
        done.push(false);
        shuffle(progress, i, i + width);
    }


    var ret = setInterval(function () {
        var flag = true;
        var sum = 0;
        for (let j = 0; j < arrlen / width; j++) {
            flag &= done[j];
            sum+=done[j];
        }
        if (flag || curr !== currIter) {
            clearInterval(ret);
            return;
        }
        for (let j = 0; j < arrlen; j += width) {
            if (!done[j]) {
                done[j] = true;
                for (let i = 1; i < width; i++) {
                    if (progress[j + i - 1] > progress[j + i]) {
                        done[j] = false;
                        progress[j + i - 1] = progress[j + i - 1] ^ progress[j + i];
                        progress[j + i] = progress[j + i] ^ progress[j + i - 1];
                        progress[j + i - 1] = progress[j + i - 1] ^ progress[j + i];
                    }
                }
                if (done[j]) {
                    break;
                }
                done[j] = true;
                for (let i = width - 1; i > 0; i--) {
                    if (progress[j + i - 1] > progress[j + i]) {
                        done[j] = false;
                        progress[j + i - 1] = progress[j + i - 1] ^ progress[j + i];
                        progress[j + i] = progress[j + i] ^ progress[j + i - 1];
                        progress[j + i - 1] = progress[j + i - 1] ^ progress[j + i];
                    }
                }
            }
        }
        for (let j = 0; j < arrlen; j += width) {
            for (let i = 0; i < width; i++) {
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


function processImg() {
    var c = document.getElementById('canv');
    var c2 = document.getElementById('canv2');
    var ctx = c.getContext('2d');
    var ctx2 = c2.getContext('2d');
    var dp = window.devicePixelRatio;
    var w = img.width;
    var h = img.height;
    img.width = 300;
    img.height = 300 * h / w;

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
    bubblesort(pixels, pixels2, p2.width, function () {
        ctx2.putImageData(p2, 0, 0);
    }, currIter);
}


img.onload = processImg;
img.src = 'baby3.jpg';

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('myinput').addEventListener('change', function (event) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        img = new Image();
        img.onload = processImg;

        reader.onload = function (event) {
            img.src = event.target.result;
        };

        reader.readAsDataURL(selectedFile);

        currIter++;
    });
});
