let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

let gravity = 1;
let friction = 0.9;

canvas.addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

canvas.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

class Ball {
  constructor(x, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  };

  update() {
    if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }
    this.y += this.dy;
    this.draw();
  };

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  };
};

let ball = null;

let init = () => {
  ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'red');

};

let animate = () => {
  // requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  ball.update();
  requestAnimationFrame(animate);
};

init();
animate();
