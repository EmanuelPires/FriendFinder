var path = require("path");
var friendData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendData);

    app.get("/gitrepo", function(req, res) {
      res.redirect("https://github.com/EmanuelPires");
    });
  });

  app.post("/api/friends", function(req, res) {
    newStud = req.body;

    var newPersonScores = [];

    // friendData.push(newStud);
    for (var i = 0; i < newStud.scores.length; i++) {
      var score = parseInt(newStud.scores[i]);
      newPersonScores.push(score);
    }

    newStud.scores = newPersonScores;

    var scoreDiffs = [];
    var peopleScores = [];

    for (var i = 0; i < friendData.length; i++) {
      var match = {
        name: "",
        score: 0
      };

      var len = friendData[i].scores.length;
      for (var k = 0; k < len; k++) {
        match.score += Math.abs(friendData[i].scores[k] - newStud.scores[k]);
      }
      match.name = friendData[i].name;
      scoreDiffs.push(match);
      peopleScores.push(match.score);
    }

    let indexOfMatch = peopleScores.indexOf(Math.min(...peopleScores));

    var matchedFriend = friendData[indexOfMatch];

    res.json(matchedFriend);
    friendData.push(newStud);

    /*
We need to be able to iterate through the FriendData.scores

and check the indexes of each score and 

compare it to the same index as newStud.scores

Find the difference between those differences and 
put that value into a variable


    */
  });
};
