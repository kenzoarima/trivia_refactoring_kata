module.exports = function Game() {
  const players = [];
  const places = [];
  const purses = [];

  /**
   * For each player, store the flag, to tell if that player `i` is in penalty box or not.
   */
  const inPenaltyBox = [];

  const popQuestions = [];
  const scienceQuestions = [];
  const sportsQuestions = [];
  const rockQuestions = [];

  let currentPlayer = 0;
  let isGettingOutOfPenaltyBox = false;

  const didPlayerNotWin = function() {
    return !(purses[currentPlayer] == 6);
  };

  const currentCategory = function() {
    switch (places[currentPlayer]) {
      case 0:
      case 4:
      case 8:
        return "Pop";
        break;
      case 1:
      case 5:
      case 9:
        return "Science";
        break;
      case 2:
      case 6:
      case 10:
        return "Sports";
        break;
      default:
        return "Rock";
    }    
  };

  for (let i = 0; i < 50; i++) {
    popQuestions.push("Pop Question " + i);
    scienceQuestions.push("Science Question " + i);
    sportsQuestions.push("Sports Question " + i);
    rockQuestions.push("Rock Question " + i);
  }

  this.add = function(playerName) {
    players.push(playerName);
    places[howManyPlayers() - 1] = 0;
    purses[howManyPlayers() - 1] = 0;
    inPenaltyBox[howManyPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  const howManyPlayers = function() {
    return players.length;
  };

  const askQuestion = function() {
    switch (currentCategory()) {
      case "Pop":
        console.log(popQuestions.shift());
        break;
      case "Science":
        console.log(scienceQuestions.shift());
        break;
      case "Sports":
        console.log(sportsQuestions.shift());
        break;
      case "Rock":
        console.log(rockQuestions.shift());
        break;
    }
  };

  const getNewPlaceAfterRolling = function(roll) {
    places[currentPlayer] = places[currentPlayer] + roll > 11 ? 
                                  places[currentPlayer] + roll - 12 : 
                                  places[currentPlayer] + roll;

    console.log(
      players[currentPlayer] + "'s new location is " + places[currentPlayer]
    );
  };

  this.roll = function(roll) {
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true;
        console.log(players[currentPlayer] + " is getting out of the penalty box");

        getNewPlaceAfterRolling(roll);
        console.log("The category is " + currentCategory());
        askQuestion();
      } else {
        isGettingOutOfPenaltyBox = false;
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
      }
    } else {
      getNewPlaceAfterRolling(roll);
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.rotateToNextPlayer = function() {
    currentPlayer += 1;
    if (currentPlayer == players.length) currentPlayer = 0;
  };

  const addCoinToCurrentPlayerPurse = function() {
    console.log("Answer was correct!!!!");
    purses[currentPlayer] += 1;
    console.log(players[currentPlayer] + " now has " + purses[currentPlayer] + " Gold Coins.");
  };

  this.wasCorrectlyAnswered = function() {
    if (inPenaltyBox[currentPlayer]) {
      
      if (isGettingOutOfPenaltyBox) {
        addCoinToCurrentPlayerPurse();
        return didPlayerNotWin();
      } else {
        return true;
      }
    } else {
      addCoinToCurrentPlayerPurse();
      return didPlayerNotWin();
    }
  };

  this.wrongAnswer = function() {
    console.log("Question was incorrectly answered");
    console.log(players[currentPlayer] + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;

    return true;
  };
};
