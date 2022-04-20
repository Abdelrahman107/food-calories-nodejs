const express = require('express');
const fetch = require('node-fetch');
const app = express();
const bodyParser = require('body-parser');

const { getRecommendation, getCalories } = require('./app.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());







// for(let i = 0; i < queries.length; i++){
//    console.log(queries[i]);
// }

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');

});



// (async () => {
//     results = await getRecommendation();
//     await getCalories(results);
// })();



app.get('/', async(req , res) => {
    results = await getRecommendation();
    finalFoodItems = await getCalories(results);
    console.log(finalFoodItems);
    res.send(finalFoodItems);
})

// app.post('/', async (req, res) => {
//     console.log("request body" + req.body);
//     results = await getRecommendation(req.body);
//     finalFoodItems = await getCalories(results);
//     res.send(finalFoodItems);
// });



