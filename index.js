const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT ||3000;

const { getRecommendation, getCalories } = require('./app.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);

});



// (async () => {
//     results = await getRecommendation();
//     await getCalories(results);
// })();



// app.get('/', async(req , res) => {
//     results = await getRecommendation();
//     finalFoodItems = await getCalories(results);
//     console.log(finalFoodItems);
//     res.send(finalFoodItems);
// })

app.post('/', async (req, res) => {
    console.log("request body" + req.body);
    results = await getRecommendation(req.body);
    finalFoodItems = await getCalories(results);
    res.send(finalFoodItems);
})



