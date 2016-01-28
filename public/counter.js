'use strict';

var url = "http://localhost:3000/meals";
var addButton = document.querySelector('.add-button');
var filterButton = document.querySelector('.filter-button');
var allButton = document.querySelector('.all-button');
var mealInput = document.querySelector('.meal-input');
var filterInput = document.querySelector('.filter-input');
var calorieInput = document.querySelector('.calorie-input');
var dateInput = document.querySelector('.date-input');
var mealsContainer = document.querySelector('.main-container')


function getMeals(url, callback) {
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
    var meals = document.createElement('div');
    meals.innerText = meal.name + ' ' + meal.calories + ' ' + meal.date;
    meals.setAttribute('id', meal.meal_id);
    mealsContainer.appendChild(meals);
  });
}

getMeals(url, listMeals);

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
  }
  req.send(JSON.stringify(text));
}

addButton.addEventListener('click', function() {
  postMeals(function() {
    getMeals(url, listMeals);
  });
});

filterButton.addEventListener('click', function() {
  var newUrl = url + '/' + filterInput.value;
  mealsContainer.innerHTML = '';
  getMeals(newUrl, listMeals)
});


allButton.addEventListener('click', function () {
    getMeals(url, listMeals)
})

function deleteMeals(callback, id) {
  var req = new XMLHttpRequest();
  req.open('DELETE', url+'/'+id);
  req.send()
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      var res = JSON.parse(req.response);
      callback(res);
    }
  }
}
