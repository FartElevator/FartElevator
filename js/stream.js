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
  // playV2();
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
        calculateBlowTime();
        start_microphone(stream);
      })
      .catch((err) => {
        console.error(`you got an error: ${err}`);
      });
  }, 200);
}

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

// 計時吹氣時間
function calculateBlowTime() {
  console.log("getMatrixTransform() Y" + getMatrixTransform());
  setTimeout(() => {
    // 切換成 nerves
    volume25 = volume;
    console.log(volume);
    if (volume > 180) {
      controlGIFSize("blow", positionMap[1], "high", 2, 1);
      gif.src = "../gif/blow.gif";
      nowPosNum = 1;
    } else {
      console.log("positionMap.nowPosNum :" + nowPosNum);
      controlGIFSize("blow", positionMap[3], "low", 2, 3);
      gif.src = "../gif/blow.gif";
      nowPosNum = 3;
    }
  }, 1500);
  setTimeout(() => {
    // 切換成 nerves
    volume30 = volume;
    let nextPosition;
    if (volume30 > volume25) {
      if (nowPosNum == 1) {
        nextPosition = 2;
      } else {
        nextPosition = nowPosNum - 1;
      }
      console.log("now position number : " + nowPosNum);
      console.log("next position number : " + nextPosition);
      controlGIFSize(
        "nerves",
        positionMap[nextPosition],
        "high",
        nowPosNum,
        nextPosition
      );
      gif.src = "../gif/nerves.gif";
      nowPosNum = nextPosition;
    } else {
      if (nowPosNum == 1) {
        nextPosition = 2;
      } else {
        nextPosition = nowPosNum - 1;
      }
      console.log("now position number : " + nowPosNum);
      console.log("next position number : " + nextPosition);
      controlGIFSize(
        "nerves",
        positionMap[nextPosition],
        "low",
        nowPosNum,
        nextPosition
      );
      gif.src = "../gif/nerves.gif";
      nowPosNum = nextPosition;
    }
  }, 3000);
  setTimeout(() => {
    volume50 = volume;
    // 偵測成功or失敗
    console.log("2.5秒 之前聲量大小: " + volume25);
    console.log("4.5秒 現在聲量大小: " + volume);
    let nextPosition;
    if (volume > 100 && volume50 > volume30) {
      if (nowPosNum == 1) {
        nextPosition = 2;
      } else {
        nextPosition = nowPosNum - 1;
      }
      console.log("now position number : " + nowPosNum);
      console.log("next position number : " + nextPosition);
      controlGIFSize(
        "sweating",
        positionMap[nextPosition],
        "high",
        nowPosNum,
        nextPosition
      );
      gif.src = "../gif/sweating.gif";
      nowPosNum = nextPosition;
    } else {
      blowPNG.src = "../images/blow2.png";
      failureFlag = true;

      // 屁股人衝進電梯的控制
      if (nowPosNum == 1) {
        nextPosition = 2;
      } else {
        nextPosition = nowPosNum - 1;
      }
      console.log("now position number : " + nowPosNum);
      console.log("next position number : " + nextPosition);
      controlGIFSize(
        "evil",
        positionMap[nextPosition],
        "low",
        nowPosNum,
        nextPosition
      );
      gif.src = "../gif/evil.gif";
      nowPosNum = nextPosition;
    }
  }, 5000);
  setTimeout(() => {
    //  偵測成功

    if (nowPosNum == 1) {
      nextPosition = 2;
    } else {
      nextPosition = nowPosNum - 1;
    }
    console.log("now position number : " + nowPosNum);
    console.log("next position number : " + nextPosition);
    controlGIFSize(
      "dead",
      positionMap[nextPosition],
      "high",
      nowPosNum,
      nextPosition
    );
    gif.src = "../gif/dead.gif";
    nowPosNum = nextPosition;
  }, 7000);
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

// control DOM - v2

function controlGIFSize(event, nextPosition, size, lastYPosNum, nextTPosNum) {
  let originalSize = getMatrixWidth;
  switch (event) {
    case "blow":
      console.log("controlGIFSize(blow)");
      if (size === "high" && lastYPosNum != nextPosition) {
        smoothlyTranslation(getMatrixWidth(), -nextPosition.Y, nextPosition.W);
      } else {
        smoothlyTranslation(getMatrixWidth(), nextPosition.Y, nextPosition.W);
      }
      break;
    case "nerves":
      console.log("controlGIFSize(nerves)");
      if (size === "high" && lastYPosNum != nextPosition) {
        smoothlyTranslation(getMatrixWidth(), -nextPosition.Y, nextPosition.W);
      } else {
        smoothlyTranslation(getMatrixWidth(), nextPosition.Y, nextPosition.W);
      }
      break;
    case "sweating":
      console.log("controlGIFSize(流汗)");
      if (size === "high" && lastYPosNum != nextPosition) {
        smoothlyTranslation(getMatrixWidth(), -nextPosition.Y, nextPosition.W);
      } else {
        smoothlyTranslation(getMatrixWidth(), nextPosition.Y, nextPosition.W);
      }
      break;
    case "evil":
      console.log("controlGIFSize(失敗)");
      if (size === "high" && lastYPosNum != nextPosition) {
        smoothlyTranslation(getMatrixWidth(), -nextPosition.Y, nextPosition.W);
      } else {
        smoothlyTranslation(getMatrixWidth(), nextPosition.Y, nextPosition.W);
      }
      break;
    case "dead":
      console.log("controlGIFSize(使用者成功 屁屁死亡)");
      if (failureFlag == true) {
        gif.src = "../gif/evil.gif";
        // 衝進電梯
        if (size === "high" && lastYPosNum != nextPosition) {
          smoothlyTranslation(
            getMatrixWidth(),
            -nextPosition.Y,
            nextPosition.W
          );
        } else {
          smoothlyTranslation(getMatrixWidth(), nextPosition.Y, nextPosition.W);
        }
        setTimeout(() => {
          failVideo();
        }, 1000);
      } else {
        if (size === "high" && lastYPosNum != nextPosition) {
          smoothlyTranslation(
            getMatrixWidth(),
            -nextPosition.Y,
            nextPosition.W
          );
        } else {
          smoothlyTranslation(getMatrixWidth(), nextPosition.Y, nextPosition.W);
        }
        console.log("成功!");
        //
        setTimeout(() => {
          successVideo();
        }, 1000);
        // for (let i = 1; i >= 0; ) {
        //   i -= 0.001;
        //   gif.style.opacity = `${i}`;
        // }
      }

      break;
    default:
      console.log("controlGIFSize(dafault)");
  }
}
// 取得dom 原始數值
function getMatrixTransform() {
  //let matrix = new WebKitCSSMatrix();
  let transformValue = window.getComputedStyle(figure).transform;
  let w = window.getComputedStyle(figure).width;
  var matrix = new WebKitCSSMatrix(transformValue);
  let originalTransform = (matrix.m42 / parseInt(w)) * 100;
  return originalTransform;
}
function getMatrixWidth() {
  //let matrix = new WebKitCSSMatrix();
  let w = window.getComputedStyle(figure).width;
  let returnW = parseInt(w.replace("px", ""));
  return returnW;
}
// smoothly移動gif
function translateOld(elem, x, y) {
  var left = parseInt(css(elem, "left"), 10),
    top = parseInt(css(elem, "top"), 10),
    dx = left - x,
    dy = top - y,
    i = 1,
    count = 20,
    delay = 20;

  function loop() {
    if (i >= count) {
      return;
    }
    i += 1;
    /*         elem.style.left = ( left - ( dx * i / count ) ).toFixed( 0 ) + 'px'; */
    elem.style.top = (top - (dy * i) / count).toFixed(0) + "px";
    setTimeout(loop, delay);
  }

  loop();
}

let lastY = null;
function smoothlyTranslation(originalW, newY, newW) {
  if (lastY == null) {
    lastY = 1;
  } else {
    lastY = lastY + newY;
  }
  console.log("smoothlyTranslation : " + newY);
  let delay = 30;
  let moveTimesY = Math.abs(newY);
  let moveTimesW = Math.abs(newW - originalW);
  let y = 1;
  let w = 1;
  function loopY() {
    if (y >= 10) {
      return;
    }
    y += 1;
    // 移動

    if (newY < 0) {
      console.log("originalY - y  : " + `${-y + lastY}`);
      figure.style.transform = `translate(-50%, ${-y + lastY}%)`;
    } else {
      console.log("originalY - y  : " + `${y}`);
      figure.style.transform = `translate(-50%, ${y + lastY}%)`;
    }
    setTimeout(loopY, delay);
  }

  function loopW() {
    if (w >= moveTimesW) {
      return;
    }
    w += 1;
    if (originalW > newW) {
      console.log("originalW - w  : " + `${originalW - w}`);
      gif.style.width = `${originalW - w}px`;
    } else {
      console.log("originalW + w  : " + `${originalW + w}`);
      gif.style.width = `${originalW + w}px`;
    }
    // 放大縮小
    setTimeout(loopW, delay);
  }
  // loopW();
  loopY();
}

function mapFn(value, in_min, in_max, out_min, out_max) {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
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
