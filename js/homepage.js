let startBtn = document.getElementsByClassName("button");
let videoClass = document.getElementsByClassName("videoClass");
let vid = document.getElementById("myVideo");

function startV1() {
  videoClass[0].removeAttribute("hidden");
  playBtn.setAttribute("hidden", "");
  vid.muted = false;
  vid.play();
}

// 跳轉到第二頁
function hrefToP2() {
  window.location.href =
    "https://fartelevator.github.io/FartElevator/pages/inhale.html";
}
