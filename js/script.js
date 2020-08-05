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

const drawSquare = (x, y, color = "orange", r = "40px", id) => {
  const square = document.createElement("div");

  square.id = id
  square.style.position = "absolute";
  square.style.width = r;
  square.style.height = r;
  square.style.zIndex = "999998";
  // dot.style.borderRadius = "500px";
  square.style.backgroundColor = color;
  square.style.left = x;
  square.style.top = y;
  console.log('element:', square)
  document.body.appendChild(square);
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
  let score = 0
  let squares = [

  ]

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
      if (data) {
        const parameterx = data.x
        const parmetery = data.y
        squares.map(square => {
          if(data.x > square.x && data.x < (square.x + 40) && data.y > square.y && data.y < (square.y + 40)){
            score += 1
            document.getElementById(square.id).style.display = "none"
            document.getElementById("score").innerText =
            `Score: ${score}`;
            squares = [squares.filter(newSquare => newSquare.id !== square.id)]
          }

        })
        // drawSquare(getRandomCoord(h) + 'px', getRandomCoord(w) + 'px', "yellow")
      }
    })
    .begin()
    .showPredictionPoints(true)

  document.getElementById("makeSquare").onclick = function (e) {
    const x = getRandomCoord(w)
    const y = getRandomCoord(h)
    const id = `square_${incrementor}`
    incrementor += 1
    console.log('make square')
    console.log(`height: ${h} width: ${w}`)
    console.log('random x', x)
    console.log('random y', y)
    drawSquare(x + 'px', y + 'px', "orange", "40px", id)
    squares = [...squares, { id: id, x: x, y: y}]
    console.log('array:', squares)
  }

  document.getElementById("start").onclick = function (e) {
    drawSquare(getRandomCoord(h) + 'px', getRandomCoord(w) + 'px', "yellow", 30)
    start = true;
    document.getElementById("instructions").innerText =
      "Great! Now the blue dots should track where you are looking!";
  };
});

