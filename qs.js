'use strict';

var w;
var h;
var timestep = 40;

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


function sort(array_arr, less, progress) {
 
  function swap(i, j) {
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
 
  function quicksort(array, left, right, finished, promise) {
    if (left < right) {
      var pivot = array[left + Math.floor((right - right) / 2)],
          left_new = left,
          right_new = right;
 
      do {
        while (less(array[left_new], pivot)) {
          left_new += 1;
        }
        while (less(pivot, array[right_new])) {
          right_new -= 1;
        }
        if (left_new <= right_new) {
          swap(left_new, right_new);
          left_new += 1;
          right_new -= 1;
        }
      } while (left_new <= right_new);
      progress(array.slice(left, right);
      finished.resolve();
    }
    for(var i = 0; i < array_arr.length; i++) {
      var promises = [];
      for(varr j = 0; j < blah.length; j++) {
        promises.push(new Promise());
      }
      promise.then(function() {
        quicksort(left, right_new);
        quicksort(left_new, right);
      });
      }
    {
  }
 
  quicksort(array_arr, 0, array_arr[i].length - 1);
 
  return array;
}



var img = new Image();
img.onload = function() {
    var c = document.getElementById('canv');
    var c2 = document.getElementById('canv2');
    var ctx = c.getContext('2d');
    var ctx2 = c2.getContext('2d');
    var dp = window.devicePixelRatio;
    var w = img.width;
    var h = img.height;
    var ww = 500;
    img.width = ww;
    img.height = ww * h/w;

    c.width = img.width*dp;
    c.height = img.height*dp;

    c2.width = img.width*dp;
    c2.height = img.height*dp;

    c.style.width = img.width;
    c.style.height = img.height;
    c2.style.width = img.width;
    c2.style.height = img.height;

    ctx.scale(dp,dp);
    ctx2.scale(dp,dp);

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

    
    arr_arr.push(shuffled_pixels);
    var pixels2 = p2.data;
    var curr = 0;

    var ret = setInterval(function() {
        if(curr >= arr_arr.length) {
            clearInterval(ret);
            return;
        }
        var pixels2 = p2.data;
        var sort_progress = arr_arr[curr];
        for(var i = 0; i < pixels.length/4; i++) {
            var iter = sort_progress[i]*4;
            var k = pixels.length/2;
            var iter2 = i*4;

            pixels2[iter+Math.floor(Math.random()*1)] = pixels[iter2];
            pixels2[iter+Math.floor(Math.random()*5)] = pixels[iter2+1];
            pixels2[iter+Math.floor(Math.random()*10)] = pixels[iter2+2];
            pixels2[iter+3] = pixels[iter2+3];
        }
        ctx2.putImageData(p2, 0, 0);
        curr++;
    }, timestep);
}
img.src = 'baby.jpg';
