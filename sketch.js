//some nonsense


//document.write("<h1>Tic Tac Toe!</h1>");
//board
let board = [
  ['','',''],
  ['','',''],
  ['','','']
];
let width = 500;
let players = ['X','O'];
let height = 500;
let w = width/3;
let h = height/3;
let currentPlayer;
let computer = 'X';
let human = "O";
function setup(){
  canvas = createCanvas(width,height);
  currentPlayer = random(players);

  canvas.position(450,130);



}

function draw(){
  frameRate(60);

  background(220);
  x = 0;
  strokeWeight(4);
  for (let i = 0; i < 2; i ++){
    x += w;
    line(x,0,x,height);
  }
  y = 0;
  for (let i = 0; i < 2; i ++){
    y += h;
    line(0,y,width,y);
  }
  for (let i = 0; i < 3; i ++){
    for (let j = 0; j < 3; j ++){
      spot = board[i][j];
      let x = (j * w) + (w/2);
      let y = (i * h) + (h/2);

      if (spot == 'O'){
        noFill();
        stroke(4);
        //ellipseMode(CORNER);
        ellipse(x,y,w/2,h/2);
        }
      if (spot == "X"){
        strokeWeight(4);
        let xr = w/4;
        let yr = h/4;

        line(x-xr,y-yr,x+xr,y+yr);
        line(x + xr,y - yr,x - xr,y + yr)

      }


    }
  }
  if (mouseIsPressed){
    //console.log("pressed");
    let i = floor(mouseY/w);
    let j = floor(mouseX/h);
    if (board[i][j] == '' && currentPlayer == human){
      board[i][j] = currentPlayer;
      if (currentPlayer == "O"){
        currentPlayer = "X";
      }else{
        currentPlayer = "O";
      }
    }

    return null;
  }
  let pos = position();
  if (currentPlayer == computer && pos.length > 0){
    move = nextTurn(false);
    board[move[0]][move[1]] = computer;
    currentPlayer = human;
  }

  winner = checkWinner(true);
  if (winner != null){


    board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    if (winner[0] == true){
      frameRate(0.5);
      textSize(32);
      background(220);
      strokeWeight(1);
      text(winner[1]+' Won!',100,100);

    }else{
      frameRate(0.5);
      textSize(32);
      background(220);
      strokeWeight(1);
      text('Tie!',100,100);

    }




  }




  //end
}
