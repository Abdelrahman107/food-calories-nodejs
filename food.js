class FoodItem {
    constructor(name, calories, serving_size_g) {
        this.name = name;
        this.calories = calories;
        this.serving_size_g = serving_size_g;

    }
    addName(name) { 
        
        this.name += " " + name; }
    addCalories(calories) {

        this.calories += calories;
    };
    addServingSize(serving_size_g) {
        this.serving_size_g += serving_size_g;
    };

    //empty constructor
    // constructor() {
    // this.name = '';
    // this.calories = 0;
    // this.serving_size_g = 0;

    // }

    //add setters and getters

    // get name() {
    //     return this.name;
    // }

    // set name(value) {

    //     this.name = value;
    // }

    updateCalories(length) {
        this.calories = (this.calories / length) * 1.3;


    }

    updateServingSize(num) {
        this.serving_size_g = 100;
    }
    // get serving_size_g() {
    //     return this.serving_size_g;
    // }

    // set serving_size_g(value) {
    //     this.serving_size_g = value;
    // }

}




module.exports = FoodItem;