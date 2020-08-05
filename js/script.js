const dots = [];
function drawDot(x, y, color = "blue", r = "10px") {
  const dot = document.createElement("div");
  dot.style.position = "absolute";
  dot.style.width = r;
  dot.style.height = r;
  dot.style.zIndex = "999999";
  dot.style.borderRadius = "500px";
  dot.style.backgroundColor = color;
  dot.style.left = x;
  dot.style.top = y;
  document.body.appendChild(dot);
}

const drawSquare = (x, y, color = "orange", r = "40px") => {
  const square = document.createElement("div");
  square.style.position = "absolute";
  square.style.width = r;
  square.style.height = r;
  square.style.zIndex = "999998";
  // dot.style.borderRadius = "500px";
  square.style.backgroundColor = color;
  square.style.left = x;
  square.style.top = y;
  document.body.appendChild(square);
  console.log(`x: ${x} - ${x+r}`)
  console.log(`y ${y} - ${x + r}`)
}
// drawing calibration dots
const calDot = (x, y) => drawDot(x, y, "red", "20px");

calDot("50%", "0px");
calDot("95%", "0px");
calDot("95%", "50%");
calDot("95%", "95%");
calDot("50%", "95%");
calDot("1%", "95%");
calDot("1%", "50%");
calDot("1%", "0px");
calDot("50%", "50%");

function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(() => {
  let start = false;
  const h = window.innerHeight;
  const w = window.innerWidth;
  let incrementor = 0

  const getRandomCoord = (size) => {
      return Math.floor( Math.random() * size )
  }

  const generateRandomSquare = (h, w, color, r) => {
    return drawSquare(getRandomCoord(h) + 'px', getRandomCoord(w) + 'px', color, r)
  }

  webgazer
    .setRegression('ridge')
    .setGazeListener(function (data, elapsedTime) {


      if (data == null) {
        return;
      }
      if (start) {
        const parameterx = data.x
        const parmetery = data.y
        // drawSquare(getRandomCoord(h) + 'px', getRandomCoord(w) + 'px', "yellow")
      }
    })
    .begin()
    .showPredictionPoints(true)

  document.getElementById("makeSquare").onclick = function (e) {
    const x = getRandomCoord(w)
    const y = getRandomCoord(h)
    console.log('make square')
    console.log(`height: ${h} width: ${w}`)
    console.log('random x', x)
    console.log('random y', y)
    drawSquare(x + 'px', y + 'px', "yellow")
  }

  document.getElementById("start").onclick = function (e) {
    drawSquare(getRandomCoord(h) + 'px', getRandomCoord(w) + 'px', "yellow", 30)
    start = true;
    document.getElementById("instructions").innerText =
      "Great! Now the blue dots should track where you are looking!";
  };
});

