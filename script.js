let score = 0;
let cross = true;
let gameOverAudio = new Audio('static/gameover.mp3');
let gameMusic = new Audio('static/music.mp3');
document.onkeydown = function (e) {
  console.log(`key code is `, e.keyCode);
  if (e.keyCode == 38) {
    let mario = document.getElementById("mario");
    mario.classList.add("animateMario");
    gameMusic.play();
    setTimeout(() => {
      mario.classList.remove("animateMario");
    }, 1000);
  }
  if (e.keyCode == 39) {
    let mario = document.getElementById("mario");
    let marioX = parseInt(
      window.getComputedStyle(mario, null).getPropertyValue("left")
    );
    mario.style.left = marioX + 112 + "px";
  }
  if (e.keyCode == 37) {
    let mario = document.getElementById("mario");
    let marioX = parseInt(
      window.getComputedStyle(mario, null).getPropertyValue("left")
    );
    mario.style.left = marioX - 112 + "px";
  }
};
setInterval(() => {
  let mario = document.getElementById("mario");
  let gameOver = document.getElementById("gameOver");
  let obst = document.getElementById("obst");

  let mx = parseInt(
    window.getComputedStyle(mario, null).getPropertyValue("left")
  );
  let my = parseInt(
    window.getComputedStyle(mario, null).getPropertyValue("top")
  );

  let ox = parseInt(
    window.getComputedStyle(obst, null).getPropertyValue("left")
  );
  let oy = parseInt(
    window.getComputedStyle(obst, null).getPropertyValue("top")
  );

  offsetX = Math.abs(mx - ox);
  offsetY = Math.abs(my - oy);


  if (offsetX < 113 && offsetY < 161) {
    gameOver.style.visibility = "visible";
    obst.classList.remove('obstAny');
    gameOverAudio.play();
    gameMusic.pause();
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      let aniDur = parseFloat(
        window
          .getComputedStyle(obst, null)
          .getPropertyValue("animation-duration")
      );
      let newDur = aniDur - 0.1;
      obst.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 100);
function updateScore(score) {
  document.getElementById("scoreCount").innerText = "Your Score : " + score;
}
