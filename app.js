const express = require('express');
const fetch = require('node-fetch');
const app = express();
const FoodItem = require('./food.js');


async function getRecommendation() {
    const heroku_url = 'https://profit-food-recommendation.herokuapp.com/'
    const results = [];


    var input = {
        'Diet': ['high_protien_diet', 'gluten_free_diet'],
        'Disease': ['diabeties', 'anemia'],
        'Nutirent': ['calcium', 'protien']
    };
    input = JSON.stringify(input);

    //send post request to heroku server using fetch
    const response = await fetch(heroku_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json, text/plain, */*',
        },
        body: input,
    });
    const data = await response.json();
    // transfer data to results array

    for (let i = 0; i < Object.keys(data).length; i++) {
        results.push(data[i]);

    }
    //   console.log(results);

    //   console.log(results);


    return results;

}




async function getCalories(query) {

    const url = 'https://api.calorieninjas.com/v1/nutrition?query=';
    const key = 'JXKxU70Kbo7m0hMwp8QZPg==TSFNr4lJizKe5ZX3';

    finalFoodItems = [];

    for (let j = 0; j < query.length; j++) {
        //   console.log("length " + query.length);
        await fetch(url + query[j], {
            method: 'GET',

            headers: {
                'X-Api-Key': key
            },
        })
            .then(res => res.json())
            .then(data => {
                //loop on data length
                finalFoodItem = new FoodItem("", 0.0, 0.0);
                if (data['items'].length > 0) {
                    for (let i = 0; i < data['items'].length; i++) {

                        finalFoodItem.addName(data['items'][i]['name']);
                        finalFoodItem.addCalories(data['items'][i]['calories']);
                        finalFoodItem.addServingSize(data['items'][i]['serving_size_g']);

                    }
                    finalFoodItem.updateCalories(data['items'].length);
                    finalFoodItem.updateServingSize(data['items'].length);
                    finalFoodItems.push(finalFoodItem);
                }

            })
            .catch(err => {
                console.log(err);
            });
    }
    return finalFoodItems;
}


// //1st way
// (async () => {
//     console.log(await getRecommendation());
// })()


// //2nd way
// async function callGetData () {
//     let queries = await getResults();
//     console.log(queries);
// }
// callGetData();

// app.get('/', () => {

//     getFood();
// });

//export getresults and getrecommendation functions
module.exports = {
    getRecommendation,
    getCalories
}
