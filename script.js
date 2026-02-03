const playArea = document.getElementById("playArea");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");

// Put the No button somewhere reasonable at start
placeNoButton(60, 55);

// Desktop: run away on hover
noBtn.addEventListener("mouseenter", () => moveNoButton());

// Mobile: run away on attempted tap
noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault(); // stops the tap from "clicking" it
  moveNoButton();
}, { passive: false });

// If they click Yes
yesBtn.addEventListener("click", () => {
  message.textContent = "Yessss! 💞 Best decision you’ve ever made.";
  playArea.style.borderColor = "#ff3d7f";
  confettiBurst();
});

// Move No to a random spot inside the play area
function moveNoButton() {
  const areaRect = playArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Keep the button fully inside the play area
  const maxX = areaRect.width - btnRect.width;
  const maxY = areaRect.height - btnRect.height;

  // Random positions (with a little padding so it doesn't hug edges)
  const padding = 10;
  const x = random(padding, maxX - padding);
  const y = random(padding, maxY - padding);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function placeNoButton(leftPercent, topPercent) {
  const areaRect = playArea.getBoundingClientRect();
  // convert percent-ish to pixels once area is known
  const x = (areaRect.width * leftPercent) / 100;
  const y = (areaRect.height * topPercent) / 100;
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Tiny "confetti" without libraries
function confettiBurst() {
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    piece.textContent = Math.random() > 0.5 ? "💖" : "✨";
    piece.style.position = "fixed";
    piece.style.left = random(0, window.innerWidth) + "px";
    piece.style.top = "-20px";
    piece.style.fontSize = random(14, 28) + "px";
    piece.style.transition = "transform 1.2s linear, opacity 1.2s linear";
    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.transform = `translateY(${window.innerHeight + 60}px) rotate(${random(-180, 180)}deg)`;
      piece.style.opacity = "0";
    });

    setTimeout(() => piece.remove(), 1300);
  }
}
