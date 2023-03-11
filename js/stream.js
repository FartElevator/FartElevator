let vid2 = document.getElementById("myVideo2");
let vid3 = document.getElementById("myVideo3");
let startBtn = document.getElementsByClassName("button");
let playBtn = document.getElementById("playBtn");
let video2 = document.getElementsByClassName("video21");
let video3 = document.getElementsByClassName("video3");
let gifClass = document.getElementsByClassName("gifClass");
// gif
let gif = document.getElementById("gif");
let blowPNG = document.getElementById("blowPNG");
let figure = document.getElementById("myFigure");
let userMedia;
let volume25 = 0;
let volume = 0;
let failureFlag = false;

function getMedia() {
  console.log("click getMedia()");
  userMedia = navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true,
  });
}

// 開始播放V2
function playV2() {
  playBtn.style.display = "none";
  vid2.muted = false;
  console.log(vid2);
  vid2.play();
  console.log("開始播放V2");
}

// 播放完V2 顯示 start Btn
function showStartBtn() {
  console.log("第二支影片播完");
  startBtn[0].style.display = "block";
}

function playV3() {
  // V2 startBtn 拿掉
  video2[0].remove();
  video3[0].style.display = "block";
  vid3.muted = false;
  vid3.play();
}

function showBlowDiv() {
  video3[0].remove();
  gifClass[0].style.display = "block";
}
function startBlow() {
  playV3();
  showBlowDiv();
  setTimeout(() => {
    userMedia
      .then((stream) => {
        console.log("開始計算");
        controlTime();
        start_microphone(stream);
      })
      .catch((err) => {
        console.error(`you got an error: ${err}`);
      });
  }, 200);
}

// gif表情Object
const GIF_OBJECT = {
  blow: "../gif/commonFace/blow.gif",
  sweating: "../gif/successFace/sweating_cut.gif",
  dead: "../gif/successFace/dead_test.gif",
  evil_1: "../gif/failFace/evil_1_cut.gif",
  evil_2: "../gif/failFace/evil_2_cut.gif",
};
// Blow 文字匡Object
const BLOW_OBJECT = {
  blow_text_1: "../images/blow1.png",
  blow_text_2: "../images/blow2.png",
  blow_text_3: "../images/blow3.png",
};

let positionMap = {
  1: { Y: 10, W: 180 },
  2: { Y: 10, W: 220 },
  3: { Y: 10, W: 250 },
  4: { Y: 10, W: 270 },
  5: { Y: 10, W: 300 },
};

let nowPosNum = 2;
let volume30;
let volume50;

// true = success , false = fail
let gameFlag = null;
// time interval for 每秒判斷聲量
let countSec = 0;
function countSecond() {
  if (countSec < 7) {
    // 判斷聲量 呼叫調整遠近、大小function
    measureVolume();
    countSec = countSec + 1;
    setTimeout("countSecond()", 1000);
  }
}

// 判斷上一秒和下一秒聲量差距
// 大於180就要往後變小
// 小於180就要往前放大
let moveNum = 10;
let sizeNum = 10;
function measureVolume() {
  if (volume > 100) {
    console.log("volume大於100: " + volume);
    // call smoothly transform Y function
    moveY(-moveNum);
    // call smoothly change width function
    changeSize(-sizeNum);
  } else {
    console.log("volume小於100: " + volume);
    // call smoothly transform Y function
    moveY(moveNum);
    // call smoothly change width function
    changeSize(sizeNum);
  }
}
// 初始位置
let lastY = -80;
function moveY(newY) {
  let delay = 20;
  let y = 1;
  function loopY() {
    if (y > moveNum) {
      return;
    }
    // 移動
    if (newY < 0) {
      figure.style.transform = `translate(-50%, ${lastY - y}%)`;
    } else {
      figure.style.transform = `translate(-50%, ${lastY + y}%)`;
    }
    y += 1;
    setTimeout(loopY, delay);
  }
  loopY();
  lastY = newY + lastY;
}
let lastSize = 220;
function changeSize(nextSize) {
  let delay = 20;
  let w = 1;
  function loopW() {
    if (w >= sizeNum) {
      return;
    }
    if (nextSize < 0) {
      gif.style.width = `${lastSize - w}px`;
    } else {
      gif.style.width = `${lastSize + w}px`;
    }
    w += 1;
    // 放大縮小
    setTimeout(loopW, delay);
  }
  loopW();
  lastSize = lastSize + nextSize;
}

// 用時間控制:(1)遠近大小變化(2)表情變化
function controlTime() {
  // 偵測聲量大小
  // 遠近大小變化
  countSecond();
  // 表情變化
  setTimeout(() => {
    gif.src = GIF_OBJECT.blow;
    blowPNG.src = BLOW_OBJECT.blow_text_2;
  }, 2700);
  setTimeout(() => {
    console.log("volume : " + volume);
    if (volume >= 140) {
      gameFlag = true;
    } else {
      gameFlag = false;
    }
    if (gameFlag == true) {
      sizeNum = 15;
      moveNum = 15;
      gif.src = GIF_OBJECT.sweating;
    } else {
      gif.src = GIF_OBJECT.evil_1;
    }
  }, 4700);
  setTimeout(() => {
    if (gameFlag == true) {
      sizeNum = 10;
      moveNum = 18;
      gif.src = GIF_OBJECT.dead;
    } else {
      gif.src = GIF_OBJECT.evil_2;
      blowPNG.src = BLOW_OBJECT.blow_text_3;
    }
  }, 6700); // 6700
  setTimeout(() => {
    if (gameFlag == true) {
      // 最後成功 跑到最遠
      moveY(-10);
      changeSize(-10);
      // figure.style.transform = `translate(-50%, ${lastY-10}%)`;
      // gif.style.width = "180px";
    } else {
      // 最後失敗 衝進電梯
      let lastValue = -lastY;

      moveY(lastValue);
      changeSize(lastValue);
      // figure.style.transform = `translate(-50%, ${-5}%)`;
      // gif.style.width = "300px";
    }
  }, 7200); //7200
  setTimeout(() => {
    if (gameFlag == true) {
      // 最後成功 跑到最遠
      successVideo();
    } else {
      // 最後失敗 衝進電梯
      failVideo();
    }
  }, 8000);
}

function show_some_data(given_typed_array, num_row_to_display, label) {
  var size_buffer = given_typed_array.length;
  var index = 0;

  //   console.log("__________ " + label);

  if (label === "time") {
    // for (; index < num_row_to_display && index < size_buffer; index += 1) {
    //   var curr_value_time = given_typed_array[index] / 128 - 1.0;
    //   console.log(curr_value_time);
    // }
  } else if (label === "frequency") {
    for (; index < num_row_to_display && index < size_buffer; index += 1) {
      volume = given_typed_array[index];
      if (given_typed_array[index] > 100) {
        // frequencyTrans2Percent(given_typed_array[index]);
        // console.log(given_typed_array[index]);
      }
    }
  } else {
    throw new Error("ERROR - must pass time or frequency");
  }
}

function process_microphone_buffer(event) {
  var i, N, inp, microphone_output_buffer;

  microphone_output_buffer = event.inputBuffer.getChannelData(0); // just mono - 1 channel for now
}

function start_microphone(stream) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContext();

  var BUFF_SIZE_RENDERER = 16384;

  var audioInput = null,
    microphone_stream = null,
    gain_node = null,
    script_processor_node = null,
    script_processor_analysis_node = null,
    analyser_node = null;
  gain_node = audioContext.createGain();
  gain_node.gain.value = 0;
  gain_node.connect(audioContext.destination);

  microphone_stream = audioContext.createMediaStreamSource(stream);
  microphone_stream.connect(gain_node);

  script_processor_node = audioContext.createScriptProcessor(
    BUFF_SIZE_RENDERER,
    1,
    1
  );
  script_processor_node.onaudioprocess = process_microphone_buffer;

  microphone_stream.connect(script_processor_node);

  // --- enable volume control for output speakers

  //   document.getElementById("volume").addEventListener("change", function () {
  //     var curr_volume = this.value;
  //     gain_node.gain.value = curr_volume;

  //     console.log("curr_volume ", curr_volume);
  //   });

  // --- setup FFT

  script_processor_analysis_node = audioContext.createScriptProcessor(
    2048,
    1,
    1
  );
  script_processor_analysis_node.connect(gain_node);

  analyser_node = audioContext.createAnalyser();
  analyser_node.smoothingTimeConstant = 0;
  analyser_node.fftSize = 2048;

  microphone_stream.connect(analyser_node);

  analyser_node.connect(script_processor_analysis_node);

  var buffer_length = analyser_node.frequencyBinCount;

  var array_freq_domain = new Uint8Array(buffer_length); // dataArray
  var array_time_domain = new Uint8Array(buffer_length);
  //   console.log("buffer_length " + buffer_length);

  script_processor_analysis_node.onaudioprocess = function () {
    // get the average for the first channel
    analyser_node.getByteFrequencyData(array_freq_domain);
    analyser_node.getByteTimeDomainData(array_time_domain);

    // draw the spectrogram
    if (microphone_stream.playbackState == microphone_stream.PLAYING_STATE) {
      show_some_data(array_freq_domain, 5, "frequency");
      show_some_data(array_time_domain, 5, "time"); // store this to record to aggregate buffer/file
    }
  };
}

// 網址跳轉
function toFinalFailPage() {
  window.location.href =
    "https://fartelevator.github.io/FartElevator/pages/finalfailure.html";
}
function toFinalSuccessPage() {
  window.location.href =
    "https://fartelevator.github.io/FartElevator/pages/finalsuccess.html";
}

function successVideo() {
  window.location.href =
    "https://fartelevator.github.io/FartElevator/pages/successPage.html";
}
function showSuccessResult() {
  let successVideo = document.getElementById("successVideo");
  let playBtn = document.getElementById("playBtn");
  playBtn.style.display = "none";
  successVideo.muted = false;
  successVideo.play();
}

// 加上失敗影片
function failVideo() {
  window.location.href =
    "https://fartelevator.github.io/FartElevator/pages/failPage.html";
}
function showFailResult() {
  let playBtn = document.getElementById("playBtn");
  playBtn.style.display = "none";
  let failureVideo = document.getElementById("failureVideo");
  failureVideo.muted = false;
  failureVideo.play();
}
