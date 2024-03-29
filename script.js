var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');


ctx.translate(0.5, 0.5)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var blocks = (document.getElementsByClassName("touchable"));

var dots = [],
    FPS = 60,
    dotsNum = 60,
    dotSpeed = 50
    mouse = {
        x: 0,
        y: 0
    };

for (var i = 0; i < dotsNum; i++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        color: "#" + Math.floor(Math.random()*16777215).toString(16),
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

        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, 2 * Math.PI)
        ctx.fill();
        ctx.stroke();
    }

    ctx.beginPath();
    for (var i = 0; i < dots.length; i++) {
        var dotI = dots[i];
        ctx.moveTo(dotI.x, dotI.y);
        if (distance(mouse, dotI) < 150) {
            ctx.lineTo(mouse.x, mouse.y)
            ctx.moveTo(dotI.x, dotI.y)
        };
        for (var j = 0; j < dots.length; j++) {
            var dotII = dots[j];
            if (distance(dotI, dotII) < 150 && distance(dotI, dotII) != 0) {
                ctx.lineTo(dotII.x, dotII.y);
                ctx.moveTo(dotI.x, dotI.y)
            }
        }
    }

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#404";
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

        for (var block of blocks) {
            block = block.getBoundingClientRect()
            if ((d.y < block.bottom && d.y > block.top) && (d.x > block.left - d.radius && d.x < block.right + d.radius) || (d.x > block.right - d.radius && d.x < block.left + d.radius)) d.vx = -d.vx;
            if ((d.x < block.right && d.x > block.left) && (d.y > block.top - d.radius && d.y < block.bottom + d.radius) || (d.y > block.bottom - d.radius && d.y < block.top + d.radius)) d.vy = -d.vy;
        };
    }
}

function isInBlock() {
    for (let block of blocks) {
        block = block.getBoundingClientRect();

        console.log(dots, block)
        dots = dots.filter(d => !(d.x > block.left && d.x < block.right && d.y > block.top && d.y < block.bottom))

        // for (d of dots) {
        //     console.log(d)

        //     if (d.x > block.left && d.x < block.right && d.y > block.top && d.y < block.bottom) {
        //         console.log(`x = ${d.x}, y = ${d.y}, left = ${block.left}, right = ${block.right}`);
        //         delete dots[dots.indexOf(d)];
        //     }

        // }

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

isInBlock()
tick()
console.log(dots)
