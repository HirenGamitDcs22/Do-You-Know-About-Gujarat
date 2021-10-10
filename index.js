const rs=require("readline-sync");
const jsondata=require("./about-Gujarat.json");
const chalk=require("chalk");

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

var checkAns=(ans,correctAnswer)=>{
    if(ans.toLowerCase() === correctAnswer.toLowerCase()) {
        score+=5;
        return true;
    }else{
        score-=2;
        return false;
    }
}

var askQuestion=(q) => {
    log(yellow(q.question));
    log(yellow(q.optionA));
    log(yellow(q.optionB));
    log(yellow(q.optionC));
    log(yellow(q.optionD));
    var correctAnswer=q.CorrectOption;
    var ans=rs.question("");
    return checkAns(ans,correctAnswer);
}

var startGame = ()=>{
    PlayerName=rs.question(cyan("\nWhat is Your Name? "));
    log(green(`Hello ${PlayerName}!`));
    log("\nThere will be 10 questions.\nAnswer them with", green("a (for Option A) or b (for Option B) or c (for Option C) or d (for Option D)"), "\n")
    log(cyan("+5 points for correct answer. -2 for wrong answer.\n"));
    questionlist=jsondata.questionList;
    const randomquestion=questionlist.sort(()=>.5-Math.random()).slice(0,10);
    for(i in randomquestion) {
        const isCorrect=askQuestion(randomquestion[i]);
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
}
var begin=()=>{
    log(green("Welcome to the game : "),yellow("How Well Do You Know Gujarat?"));
    startGame();
}
begin();