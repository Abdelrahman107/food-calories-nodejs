const fetch = require("node-fetch");
const FoodItem = require("./food.js");

async function getRecommendation(input) {
  const heroku_url = "https://profit-food-recommendation.herokuapp.com/";
  const results = [];

  // var input = {
  //     'Diet': ['high_protien_diet', 'low_fat_diet'],
  //     'Disease': ['anemia', 'cancer'],
  //     'Nutirent': ['vitamin_c', 'protien']
  // };
  input = JSON.stringify(input);
  console.log("input: " + input);

  //send post request to heroku server using fetch
  const response = await fetch(heroku_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: input,
  });
  const data = await response.json();
  // transfer data to results array

  for (let i = 0; i < Object.keys(data).length; i++) {
    results.push(data[i]);
  }

  console.log(results);

  return results;
}

async function getCalories(query) {
  const url = "https://api.calorieninjas.com/v1/nutrition?query=";
  const key = "JXKxU70Kbo7m0hMwp8QZPg==TSFNr4lJizKe5ZX3";

  try {
    // map to fetch

    const urlList = query.map((item) => {
      return url + item;
    });

  
    const apis = urlList.map((item) => {
      return (_) =>
        fetch(item, {
          method: "GET",
          headers: {
            "X-Api-Key": key,
          },
        }).then((response) => response.json());
    });

    const res = [];
    finalFoodItems = [];
    for (let i = 0; i < apis.length; i += 10) {
      // slice
      const sliced = apis.slice(i, i + 10);
      const promises = sliced.map((item) => {
        return item();
      });
      const response = await Promise.all(promises);
      response.forEach((item) => {
        data = item;
        finalFoodItem = new FoodItem("", 0.0, 0.0);
        if (data["items"].length > 0) {
          for (let i = 0; i < data["items"].length; i++) {
            finalFoodItem.addName(data["items"][i]["name"]);
            finalFoodItem.addCalories(data["items"][i]["calories"]);
            finalFoodItem.addServingSize(data["items"][i]["serving_size_g"]);
          }
          finalFoodItem.updateCalories(data["items"].length);
          finalFoodItem.updateServingSize(data["items"].length);
          finalFoodItems.push(finalFoodItem);
        }
      });
    }
    return finalFoodItems;
  } catch (error) {
    console.log(error);
  }
}


//export getresults and getrecommendation functions
module.exports = {
  getRecommendation,
  getCalories,
};
