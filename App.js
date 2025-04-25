const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const circle = {
  x: canvas.width - 100, // Circle on the right side
  y: canvas.height / 2,
  radius: 50,
  color: getRandomColor()
};

const arrow = {
  x: 100, // Arrow on the left side
  y: canvas.height / 2,
  speed: 4
};

let originalCircleColor = circle.color;
let arrowX = arrow.x;
let animation;

function getRandomColor() {
  const colors = ["#3498db", "#f1c40f", "#e67e22", "#2ecc71", "#9b59b6"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function drawArrow(x, y) {
    ctx.save();
    ctx.translate(x, y);
  
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, 0);              // Arrow head (front)
    ctx.lineTo(-20, -10);          // Top back wing
    ctx.lineTo(-20, -5);           
    ctx.lineTo(-40, -5);           
    ctx.lineTo(-40, 5);            
    ctx.lineTo(-20, 5);            
    ctx.lineTo(-20, 10);           // Bottom back wing
    ctx.closePath();
    ctx.fill();
  
    ctx.restore();
  }

  
  
  
  

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw circle (border + fill)
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.strokeStyle = "black"; // Border color
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.closePath();

  // Draw arrow
  drawArrow(arrowX, arrow.y);
}

function startHit() {
  if (animation) return;
  animation = requestAnimationFrame(moveArrow);
}

function moveArrow() {
    arrowX += arrow.speed;
    draw();
  
    // Check collision using arrow HEAD (front)
    if (arrowX >= circle.x - circle.radius) {
      circle.color = getRandomColor();
      cancelAnimationFrame(animation);
      animation = null;
    } else {
      animation = requestAnimationFrame(moveArrow);
    }
  }
  
function resetCanvas() {
  arrowX = arrow.x;
  circle.color = originalCircleColor = getRandomColor();
  draw();
  if (animation) {
    cancelAnimationFrame(animation);
    animation = null;
  }
}

// Initial draw
draw();
