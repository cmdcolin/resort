'use strict';

var w;
var h;
var timestep = 100;

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function shuffle(array) {
    for(var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
document.addEventListener('DOMContentLoaded', function () {
    var img = new Image();
    img.onload = function() {
        var c = document.getElementById('canv');
        var c2 = document.getElementById('canv2');
        var ctx = c.getContext('2d');
        var ctx2 = c2.getContext('2d');
        var w = img.width;
        var h = img.height;
        var ww = 1000;
        img.width = ww;
        img.height = ww * h/w;
        console.log(img);

        c.width = img.width;
        c.height = img.height;

        c2.width = img.width;
        c2.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);
        var p = ctx.getImageData(0, 0, c.width, c.height);
        var shuffled_pixels = [];
        var p2 = ctx2.createImageData(p);
        var pixels = p.data;
        for(var i = 0; i < pixels.length/4; i++) {
            shuffled_pixels.push(i);
        }
        shuffle(shuffled_pixels);
        ctx2.putImageData(p2, 0, 0)
        var arr_arr = [];
        var x = 0;

        shuffled_pixels = shuffled_pixels.sort(function(a,b) {
            if((x++ % 100000) == 0) {
                arr_arr.push(shuffled_pixels.slice(0));
            }
            return a - b;
        });
        arr_arr.push(shuffled_pixels);
        var pixels2 = p2.data;
        var curr = 0;
        console.log(arr_arr);
        console.log(shuffled_pixels);

        var ret = setInterval(function() {
            if(curr >= arr_arr.length) {
                clearInterval(ret);
                console.log('done');
                return;
            }
            var pixels2 = p2.data;
            var sort_progress = arr_arr[curr];
            for(var i = 0; i < pixels.length/4; i++) {
                var iter = sort_progress[i]*4;
                var iter2 = i*4;
                pixels2[iter] = pixels[iter2];
                pixels2[iter+1] = pixels[iter2+1];
                pixels2[iter+2] = pixels[iter2+2];
                pixels2[iter+3] = pixels[iter2+3];
            }
            ctx2.putImageData(p2, 0, 0);
            curr++;
        }, timestep);
    }
    img.src = 'baby.jpg';
});
