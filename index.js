var rs=require("readline-sync");
const jsondata=require("./about-Gujarat.json");
var scorelist=require("./scoreList.json");
const chalk=require("chalk");
const fs=require("fs");

var PlayerName="";
var score=0;
var questionlist=[];
var scoreList=[];

const log=console.log;
const red=chalk.bold.red;
const green=chalk.bold.green;
const blue=chalk.bold.blue;
const blueBright=chalk.bold.blueBright;
const cyan=chalk.bold.cyan;
const yellow=chalk.bold.yellow;

//Check Answer is Correct or not
var checkAns=(ans,correctAnswer)=>{
    if(ans.toLowerCase() === correctAnswer.toLowerCase()) {
        score+=5;
        return true;
    }else{
        score-=2;
        return false;
    }
}

//Print Questions 
var askQuestion=(q,i) => {
    log(yellow(1+parseInt(i),q.question));
    log(yellow(q.optionA));
    log(yellow(q.optionB));
    log(yellow(q.optionC));
    log(yellow(q.optionD));
    var correctAnswer=q.CorrectOption;
    //Get Answer
    var ans=rs.question("Answer: ");
    return checkAns(ans,correctAnswer);
}

var startGame = ()=>{
    PlayerName=rs.question(cyan("\nWhat is Your Name? "));
    log(green(`Hello ${PlayerName}!`));
    log("\nThere will be 10 questions.\nAnswer them with", green("a (for Option A) or b (for Option B) or c (for Option C) or d (for Option D)"), "\n")
    log(cyan(green("+5")+" points for correct answer."+red(" -2")+" for wrong answer.\n"));
    scoreList=scorelist.socreBoard;
    questionlist=jsondata.questionList;
    const randomquestion=questionlist.sort(()=>.5-Math.random()).slice(0,10);
    for(i in randomquestion) {
        const isCorrect=askQuestion(randomquestion[i],i);
        if(isCorrect){
            log(`Your answer is ${green("Correct")}, current score is ${green(score)}\n`);
        }else{
            log(`Your answer is ${red("Wrong")}, current score is ${red(score)}`);
            log(blueBright("The Correct Answer is :"));
            log(green(randomquestion[i].Answer+"\n"));
        }
    } 
    log(`Final score: ${green(score)} / 50`)
    log(green("Thank you for playing!"))
    comparScore();
}
var begin=()=>{
    log(green("Welcome to the game : "),yellow("How Well Do You Know Gujarat?"));
    startGame();
}
begin();

function comparScore(){
  const flag=scoreList.filter(s=>parseInt(s.score)<=parseInt(score));
  if(flag.length > 0){
    if(scoreList.length === 5){
        scoreList.sort(function(a,b){
            return b.score-a.score;
        });
        scoreList.pop();
    }
    const newScore={"Name":PlayerName,"score":score}
    scoreList.push(newScore);
    fs.readFile('scoreList.json',function(err,content){
        if(err) throw err;
        var parseJson = JSON.parse(content);
        parseJson.socreBoard.sort(function(a,b){
          return b.score-a.score;
        });
        parseJson.socreBoard.pop();
        parseJson.socreBoard.push(newScore);
        fs.writeFile('scoreList.json',JSON.stringify(parseJson),function(err){
          if(err){
            log(err)
          }
        })
      })
    log(green("Congratulations! You have a new highscore."));
    displayScoreBoard()
  }else {
    if(scoreList.length < 5){
      const newScore={"Name":PlayerName,"score":score}
      scoreList.push(newScore);
      fs.readFile('scoreList.json',function(err,content){
        if(err) throw err;
        var parseJson = JSON.parse(content);
        parseJson.socreBoard.push(newScore);
        fs.writeFile('scoreList.json',JSON.stringify(parseJson),function(err){
          if(err){
            log(err)
          }
        })
      })
      log(green("Congratulations! You have a new highscore."));
    }
    else{
      log(red("\nYou couldn't beat the highscore. Better luck next time!"))
    }
    displayScoreBoard()
  }
}
function displayScoreBoard(){
  scoreList.sort(function(a, b) {
    return b.score - a.score;
  })

  log(yellow("\nCurrent Scoreboard:"))
  
  for(player of scoreList){
    log(`Name: ${green(player.Name)}  Score: ${green(player.score)}`)
  }
}