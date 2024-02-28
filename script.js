var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var dots = [],
    FPS = 60,
    dotsNum = 50,
    dotSpeed = 50
    mouse = {
        x: 0,
        y: 0
    };

for (var i = 0; i < x; i++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.floor(Math.random() * dotSpeed) - dotSpeed/2,
        vy: Math.floor(Math.random() * dotSpeed) - dotSpeed/2
    });
}