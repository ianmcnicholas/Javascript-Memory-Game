var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var gameInProgress = false;

$(document).on("keydown", function() {
  if (gameInProgress === false) {
    gameInProgress = true;
    $("h1").html("Level " + level);
    nextSequence();
  }
});

function startOver(){
  gameInProgress = false;
  level = 0;
}

function nextSequence() {
  level += 1;
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkProgress();
});

function checkProgress() {
  console.log(userClickedPattern);
  console.log(userClickedPattern[userClickedPattern.length - 1]);
  console.log(gamePattern);
  console.log(gamePattern[userClickedPattern.length - 1]);

  var successfulTurn = false;

  for (i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] === gamePattern[i]) {
      successfulTurn = true;
    } else {
      successfulTurn = false;
      userClickedPattern = [];
      gamePattern = [];
      playSound("wrong");
      wrongPress();
      $("h1").html("Game Over, Press Any Key to Restart");
      startOver();
    }
  }

  if (successfulTurn === true && userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];
    setTimeout(nextSequence, 700);
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function wrongPress(){
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}
