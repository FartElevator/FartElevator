// // dom id class
// let vid2 = document.getElementById("myVideo2");
// let vid3 = document.getElementById("myVideo3");
// let startBtn = document.getElementsByClassName("button");
// let playBtn = document.getElementById("playBtn");
// let video2 = document.getElementsByClassName("video21");
// let video3 = document.getElementsByClassName("video3");
// let gifClass = document.getElementsByClassName("gifClass");
// // gif
// let gif = document.getElementById("gif");
// let blowPNG = document.getElementById("blowPNG");
// let figure = document.getElementById("myFigure");
// // code
// let userMedia;
// let volume25 = 0;
// let volume = 0;
// let failureFlag = false;

// // 計時吹氣時間
// function calculateBlowTime() {
//   console.log("getMatrixTransform() Y" + getMatrixTransform());
//   setTimeout(() => {
//     // 切換成 nerves
//     volume25 = volume;
//     console.log(volume);
//     if (volume > 180) {
//       controlGIFSize("blow", positionMap[1], "high", 2, 1);
//       gif.src = "../gif/blow.gif";
//       nowPosNum = 1;
//     } else {
//       console.log("positionMap.nowPosNum :" + nowPosNum);
//       controlGIFSize("blow", positionMap[3], "low", 2, 3);
//       gif.src = "../gif/blow.gif";
//       nowPosNum = 3;
//     }
//   }, 1500);
//   setTimeout(() => {
//     // 切換成 nerves
//     volume30 = volume;
//     let nextPosition;
//     if (volume30 > volume25) {
//       if (nowPosNum == 1) {
//         nextPosition = 2;
//       } else {
//         nextPosition = nowPosNum - 1;
//       }
//       console.log("now position number : " + nowPosNum);
//       console.log("next position number : " + nextPosition);
//       controlGIFSize(
//         "nerves",
//         positionMap[nextPosition],
//         "high",
//         nowPosNum,
//         nextPosition
//       );
//       gif.src = "../gif/nerves.gif";
//       nowPosNum = nextPosition;
//     } else {
//       if (nowPosNum == 1) {
//         nextPosition = 2;
//       } else {
//         nextPosition = nowPosNum - 1;
//       }
//       console.log("now position number : " + nowPosNum);
//       console.log("next position number : " + nextPosition);
//       controlGIFSize(
//         "nerves",
//         positionMap[nextPosition],
//         "low",
//         nowPosNum,
//         nextPosition
//       );
//       gif.src = "../gif/nerves.gif";
//       nowPosNum = nextPosition;
//     }
//   }, 3000);
//   setTimeout(() => {
//     volume50 = volume;
//     // 偵測成功or失敗
//     console.log("2.5秒 之前聲量大小: " + volume25);
//     console.log("4.5秒 現在聲量大小: " + volume);
//     let nextPosition;
//     if (volume > 100 && volume50 > volume30) {
//       if (nowPosNum == 1) {
//         nextPosition = 2;
//       } else {
//         nextPosition = nowPosNum - 1;
//       }
//       console.log("now position number : " + nowPosNum);
//       console.log("next position number : " + nextPosition);
//       controlGIFSize(
//         "sweating",
//         positionMap[nextPosition],
//         "high",
//         nowPosNum,
//         nextPosition
//       );
//       gif.src = "../gif/sweating.gif";
//       nowPosNum = nextPosition;
//     } else {
//       blowPNG.src = "../images/blow2.png";
//       failureFlag = true;

//       // 屁股人衝進電梯的控制
//       if (nowPosNum == 1) {
//         nextPosition = 2;
//       } else {
//         nextPosition = nowPosNum - 1;
//       }
//       console.log("now position number : " + nowPosNum);
//       console.log("next position number : " + nextPosition);
//       controlGIFSize(
//         "evil",
//         positionMap[nextPosition],
//         "low",
//         nowPosNum,
//         nextPosition
//       );
//       gif.src = "../gif/evil.gif";
//       nowPosNum = nextPosition;
//     }
//   }, 5000);
//   setTimeout(() => {
//     //  偵測成功

//     if (nowPosNum == 1) {
//       nextPosition = 2;
//     } else {
//       nextPosition = nowPosNum - 1;
//     }
//     console.log("now position number : " + nowPosNum);
//     console.log("next position number : " + nextPosition);
//     controlGIFSize(
//       "dead",
//       positionMap[nextPosition],
//       "high",
//       nowPosNum,
//       nextPosition
//     );
//     gif.src = "../gif/dead.gif";
//     nowPosNum = nextPosition;
//   }, 7000);
// }

// // control DOM - v2

// function controlGIFSize(event, nextPosition, size, lastYPosNum, nextTPosNum) {
//   let originalSize = getMatrixWidth;
//   switch (event) {
//     case "blow":
//       console.log("controlGIFSize(blow)");
//       if (size === "high" && lastYPosNum != nextPosition) {
//         smoothlyTranslation(getMatrixWidth(), -nextPosition.Y, nextPosition.W);
//       } else {
//         smoothlyTranslation(getMatrixWidth(), nextPosition.Y, nextPosition.W);
//       }
//       break;
//     case "nerves":
//       console.log("controlGIFSize(nerves)");
//       if (size === "high" && lastYPosNum != nextPosition) {
//         smoothlyTranslation(getMatrixWidth(), -nextPosition.Y, nextPosition.W);
//       } else {
//         smoothlyTranslation(getMatrixWidth(), nextPosition.Y, nextPosition.W);
//       }
//       break;
//     case "sweating":
//       console.log("controlGIFSize(流汗)");
//       if (size === "high" && lastYPosNum != nextPosition) {
//         smoothlyTranslation(getMatrixWidth(), -nextPosition.Y, nextPosition.W);
//       } else {
//         smoothlyTranslation(getMatrixWidth(), nextPosition.Y, nextPosition.W);
//       }
//       break;
//     case "evil":
//       console.log("controlGIFSize(失敗)");
//       if (size === "high" && lastYPosNum != nextPosition) {
//         smoothlyTranslation(getMatrixWidth(), -nextPosition.Y, nextPosition.W);
//       } else {
//         smoothlyTranslation(getMatrixWidth(), nextPosition.Y, nextPosition.W);
//       }
//       break;
//     case "dead":
//       console.log("controlGIFSize(使用者成功 屁屁死亡)");
//       if (failureFlag == true) {
//         gif.src = "../gif/evil.gif";
//         // 衝進電梯
//         if (size === "high" && lastYPosNum != nextPosition) {
//           smoothlyTranslation(
//             getMatrixWidth(),
//             -nextPosition.Y,
//             nextPosition.W
//           );
//         } else {
//           smoothlyTranslation(getMatrixWidth(), nextPosition.Y, nextPosition.W);
//         }
//         setTimeout(() => {
//           failVideo();
//         }, 1000);
//       } else {
//         if (size === "high" && lastYPosNum != nextPosition) {
//           smoothlyTranslation(
//             getMatrixWidth(),
//             -nextPosition.Y,
//             nextPosition.W
//           );
//         } else {
//           smoothlyTranslation(getMatrixWidth(), nextPosition.Y, nextPosition.W);
//         }
//         console.log("成功!");
//         //
//         setTimeout(() => {
//           successVideo();
//         }, 1000);
//         // for (let i = 1; i >= 0; ) {
//         //   i -= 0.001;
//         //   gif.style.opacity = `${i}`;
//         // }
//       }

//       break;
//     default:
//       console.log("controlGIFSize(dafault)");
//   }
// }
// // 取得dom 原始數值
// function getMatrixTransform() {
//   //let matrix = new WebKitCSSMatrix();
//   let transformValue = window.getComputedStyle(figure).transform;
//   let w = window.getComputedStyle(figure).width;
//   var matrix = new WebKitCSSMatrix(transformValue);
//   let originalTransform = (matrix.m42 / parseInt(w)) * 100;
//   return originalTransform;
// }
// function getMatrixWidth() {
//   //let matrix = new WebKitCSSMatrix();
//   let w = window.getComputedStyle(figure).width;
//   let returnW = parseInt(w.replace("px", ""));
//   return returnW;
// }
// // smoothly移動gif
// function translateOld(elem, x, y) {
//   var left = parseInt(css(elem, "left"), 10),
//     top = parseInt(css(elem, "top"), 10),
//     dx = left - x,
//     dy = top - y,
//     i = 1,
//     count = 20,
//     delay = 20;

//   function loop() {
//     if (i >= count) {
//       return;
//     }
//     i += 1;
//     /*         elem.style.left = ( left - ( dx * i / count ) ).toFixed( 0 ) + 'px'; */
//     elem.style.top = (top - (dy * i) / count).toFixed(0) + "px";
//     setTimeout(loop, delay);
//   }

//   loop();
// }

// function smoothlyTranslation(originalW, newY, newW) {
//   if (lastY == null) {
//     lastY = 0;
//   } else if (newY < 0) {
//     lastY = lastY - newY;
//   } else {
//     lastY = lastY + newY;
//   }
//   console.log("smoothlyTranslation : " + newY);
//   let delay = 30;
//   let moveTimesY = Math.abs(newY);
//   let moveTimesW = Math.abs(newW - originalW);
//   let y = 1;
//   let w = 1;
//   function loopY() {
//     if (y > 10) {
//       return;
//     }
//     y += 1;
//     // 移動

//     if (newY < 0) {
//       console.log("originalY - y  : " + `${-y + lastY}`);
//       figure.style.transform = `translate(-50%, ${-y + lastY}%)`;
//     } else {
//       console.log("originalY - y  : " + `${y}`);
//       figure.style.transform = `translate(-50%, ${y + lastY}%)`;
//     }
//     setTimeout(loopY, delay);
//   }

//   function loopW() {
//     if (w >= moveTimesW) {
//       return;
//     }
//     w += 1;
//     if (originalW > newW) {
//       console.log("originalW - w  : " + `${originalW - w}`);
//       gif.style.width = `${originalW - w}px`;
//     } else {
//       console.log("originalW + w  : " + `${originalW + w}`);
//       gif.style.width = `${originalW + w}px`;
//     }
//     // 放大縮小
//     setTimeout(loopW, delay);
//   }
//   // loopW();
//   loopY();
// }

// function mapFn(value, in_min, in_max, out_min, out_max) {
//   return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
// }
