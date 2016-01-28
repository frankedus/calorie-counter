'use strict';

var url = "http://localhost:3000/meals";
var addButton = document.querySelector('.add-button');
var mealInput = document.querySelector('.meal-input');
var calorieInput = document.querySelector('.calorie-input');
var dateInput = document.querySelector('.date-input');
var mealsContainer = document.querySelector('.main-container')


function getMeals(callback) {
  var req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      var response = JSON.parse(req.response);
      callback(response);
    }
  }
}

function listMeals(response) {
  mealsContainer.innerHTML = ' ';
  response.forEach(function(meal) {
    var meals = document.createElement('p');
    meals.innerText = meal.name + ' ' + meal.calories + ' ' + meal.date;
    meals.setAttribute('id', meal.meal_id);
    mealsContainer.appendChild(meals);
  });
}

getMeals(listMeals);

function postMeals(callback) {
  var req = new XMLHttpRequest();
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json');
  var text = ({"name": mealInput.value, "calories": calorieInput.value, "date": dateInput.value})
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      var res = JSON.parse(req.response);
      callback(res);
    }
  };
  req.send(JSON.stringify(text));
}

addButton.addEventListener('click', function() {
  postMeals(function() {
    getMeals(listMeals);
  })
})

function deleteMeals(callback, id) {
  var req = new XMLHttpRequest();
  req.open('DELETE', url+'/'+id);


}
