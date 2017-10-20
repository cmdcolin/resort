'use strict';

var hue = 0;
var timestep = 40;

var img = new Image();
img.onload = function() {
    var c = document.getElementById('canv');
    var c2 = document.getElementById('canv2');
    var ctx = c.getContext('2d');
    var ctx2 = c2.getContext('2d');
    var dp = window.devicePixelRatio;
    var w = img.width;
    var h = img.height;
    var ww = 400;
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
    var q = ctx2.createImageData(p);
    var pixels = p.data;


    

    setInterval(function() {
        var pixels2 = q.data;
        hue += 0.05;
        var h1 = Math.cos(hue);
        var h2 = Math.sin(hue);
        for(var i = 0; i < pixels.length/4; i++) {
            var iter = i*4;
            var p1 = pixels[iter+0]
            var p2 = pixels[iter+1]
            var p3 = pixels[iter+2]
            var r1 = p1*0.299+p2*0.587+p3*0.114;
            var r2 = p1*0.596+p2*-0.274+p3*-0.321;
            var r3 = p1*0.211+p2*0.523+p3*0.311;
            var b1 = p1;
            var b2 = p2*h1+p3*h2;
            var b3 = p2*h2+p3*h1;
            var k1 = b1+0.956*b2+0.621*b3;
            var k2 = b1+-0.272*b2+-0.647*b3;
            var k3 = b1+-1.107*b2+1.705*b3;

            pixels2[iter+0] = k1;
            pixels2[iter+1] = k2;
            pixels2[iter+2] = k3;
            pixels2[iter+3] = pixels[iter+3];
        }
        ctx2.putImageData(q, 0, 0);
    }, timestep);
}
img.src = 'baby3.jpg';
