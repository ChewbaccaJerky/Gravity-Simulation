// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 1;
const friction = 0.85;
canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

addEventListener('click', ()=>{
  init();
});

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;

    this.update = () => {
        // checks when ball reaches bottom of the screen
        if(this.y + this.radius + this.dy > canvas.height) {
          this.dy = -this.dy * friction;
          this.dx = this.dx * friction;
        }
        else {
          this.dy += gravity;
        }

        // checks if ball hits the sides
        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius - this.dx < 0) {
             this.dx = -this.dx;
        }


        this.y += this.dy;
        this.x += this.dx;
        this.draw();
    }

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
}

// Implementation
let ball;
let ballArray = [];
function init() {
    ballArray = [];
    for(let i = 0; i < 200; i++){
      let radius = randomIntFromRange(10, 50);
      let dy = randomIntFromRange(1, 3);
      let dx = randomIntFromRange(-2, 2);
      let x = randomIntFromRange(0 + radius * 1.5, canvas.width - radius);
      let y = randomIntFromRange(0, canvas.height/2);
      ballArray.push(
        new Ball(x, y, dx, dy, radius, randomColor(colors))
      );
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < ballArray.length; i++) {
      ballArray[i].update();
    }
}


init();
animate();
