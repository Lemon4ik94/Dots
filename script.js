var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');

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

for (var i = 0; i < dotsNum; i++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        // radius: Math.random() * 1 + 1,
        radius: 2,
        vx: Math.floor(Math.random() * dotSpeed) - dotSpeed/2,
        vy: Math.floor(Math.random() * dotSpeed) - dotSpeed/2
    });
}


function draw() {
    // Clearing circles
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.globalCompositeOperation = "lighter";


    // Drawing circles
    for (var i = 0; i < dots.length; i++) {
        var d = dots[i]; // Taking dots from the list

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, 2 * Math.PI)
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();
    }

    ctx.beginPath();
    for (var i = 0; i < dots.length; i++) {
        var dotI = dots[i];
        ctx.moveTo(dotI.x, dotI.y);
        if (distance(mouse, dotI) < 150) ctx.lineTo(mouse.x, mouse.y);
        for (var j = 0; j < dots.length; j++) {
            var dotII = dots[j];
            if (distance(dotI, dotII) < 150) {
                ctx.lineTo(dotII.x, dotII.y);
            }
        }
    }

    ctx.lineWidth = 0.1;
    ctx.strokeStyle = "white";
    ctx.stroke();
}

function distance( point1, point2 ) {
    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;
    
    return Math.sqrt(xs + ys)
}

// Move dots
function update() {
    for (var i = 0; i < dots.length; i++) {
        var d = dots[i];

        d.x += d.vx / FPS;
        d.y += d.vy / FPS;

        if (d.x < 0 || d.x > canvas.width) d.vx = -d.vx;
        if (d.y < 0 || d.y > canvas.height) d.vy = -d.vy;
    }
}

canvas.addEventListener('mousemove', function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

function tick() {
    draw();
    update();
    requestAnimationFrame(tick);
}

tick()
// console.log(dots)