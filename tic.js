function equals(a,b,c){
  return (a == b && b == c && c == a)

}
function checkWinner(draw){
  let winner = null;
  for (let i = 0;i < 3;i++){
    if (board[0][i] == "X" || board[0][i] == "O"){
      if (equals(board[2][i],board[1][i],board[0][i]) ){

      winner = board[0][i]
      }

    }
  }
  for (let i = 0;i < 3;i++){
    if (board[i][0] == "X" || board[i][0] == "O"){
      if (equals(board[i][2],board[i][1],board[i][0]) ){

      winner = board[i][0]
      if (draw){
        strokeWeight(4);
        line((i*h)-(h/2),0,(i*h)-(h/2),width);
      //(0.5);
      }

      }

    }
  }
  if (board[0][0] == "O" || board[0][0] == "X"){
    if( equals(board[0][0],board[1][1],board[2][2])){
      winner = board[0][0];
      if (draw){
        strokeWeight(4);
        line(0,0,width,height);
      //(0.5);
      }

    }

  }
  if (board[2][0] == "O" || board[2][0] == "X"){
    if (equals(board[2][0],board[1][1],board[0][2])){
      winner = board[2][0];
      if (draw){
        strokeWeight(4);
        line(width,0,0,height);
      //(0.5);
      }
    }

  }
  if (winner != null){
    return [true,winner]
  }
  x = position()
  if (x.length == 0){
    return [false,'tie']
  }


}
function position(){
  let available = []
  for (let i = 0;i < 3; i ++){
    for (let j = 0;j < 3; j ++){
      if (board[i][j] == ''){
        available.push([i,j]);
        ////.log("ya man yamna");
      }
    }



  }

  return available;
}
function nextTurn(who){
  let available = [];
  let bestScore = -Infinity;
  let bestMove;
  let moves = [];
  for (let i = 0; i < 3; i ++){
    for (let j = 0;j < 3; j++){
      if (board[i][j] == '' || board[i][j] == ""){
        board[i][j] = computer;
        ////.log("yaman");
        let score = minimax(board,0,who);
        //.log('score'+score);
        if (score > bestScore){
          bestScore = score;

          bestMove = [i,j];
        }
        board[i][j] = '';
      }
    }
  }
  return bestMove;

}
let scores = {
  'X': 1,
  'O':-1,
  'tie':0,
}
function minimax(board,depth,isMaximizing){
  //console.log("yahoo")
  let result = checkWinner(false);

  if (result != null){
    let score = scores[result[1]];
    ////.log(depth);
    return score;
  }
  if (isMaximizing){
    let bestScore = -Infinity;
    for (let i = 0;i < 3;i ++){
      for (let j = 0;j < 3;j ++){
        //is it available?
        if (board[i][j] == ''){//board[i][j] != "O" && board[i][j] != "X"){
          board[i][j] = computer;
          let score = minimax(board,depth+1,false);
          bestScore = max(score,bestScore);

          board[i][j] = "";

        }

      }
    }
    return bestScore;


  }else{
    let bestScore = Infinity;
    for (let i = 0;i < 3;i ++){
      for (let j = 0;j < 3;j ++){
        //is it available?
        if (board[i][j] == '' ){//!= "O" && board[i][j] != "X"){
          board[i][j] = human;
          let score = minimax(board,depth+1,true);
          bestScore = min(score,bestScore);

          board[i][j] = "";

        }

      }
    }
    return bestScore;
  }
}
