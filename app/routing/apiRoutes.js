
module.exports = apiRoutes = (app) => {

    let amigos = require("./../data/friends.js");

    app.get("/api/friends", function (req, res) {
        return res.json(amigos);
    });

    // Create New Characters - takes in JSON input
    app.post("/api/friends", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newAmigo = req.body;

        console.log(newAmigo);

        amigos.push(newAmigo);

        // res.json(newAmigo);

        //matching time!
        let amigoScoreArray = [];

        //Sum up the score from obj.scores
        for (var i in amigos) {
            var amigoScore = amigos[i].scores.reduce((a, b) => parseInt(a) + parseInt(b));
            amigoScoreArray.push(amigoScore);
        }

        //use the last (newly added) person's score to subtract the other people's score
        for (var i = 0; i < amigoScoreArray.length; i++) {
            amigoScoreArray[i] = amigoScoreArray[i] - amigoScoreArray[amigoScoreArray.length - 1]
        }

        //take out the last (newly added) person b/c it definitely 0
        amigoScoreArray.splice(amigoScoreArray.length - 1, 1);

        console.log(amigoScoreArray);

        // it is better to have 0 difference
        var goal = 0;

        var closest = amigoScoreArray.reduce(function (prev, curr) {
            return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
        });

        //target the index in amigos array with the smallest diff.
        var targetIndex = amigoScoreArray.indexOf(closest)

        console.log(targetIndex);

        res.json(amigos[targetIndex]);

    });
}
