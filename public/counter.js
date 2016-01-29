'use strict';

var url = "http://localhost:3000/meals";
var addButton = document.querySelector('.add-button');
var filterButton = document.querySelector('.filter-button');
var allButton = document.querySelector('.all-button');
var mealInput = document.querySelector('.meal-input');
var filterInput = document.querySelector('.filter-input');
var calorieInput = document.querySelector('.calorie-input');
var dateInput = document.querySelector('.date-input');
var mealsContainer = document.querySelector('.meals-container')
var sumCalorie = document.querySelector('.sum-calories')


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

var sum = 0;
function listMeals(response) {
  mealsContainer.innerHTML = ' ';
  sum = 0;
  response.forEach(function(meal) {
    sum += meal.calories;
    var meals = document.createElement('div');
    meals.innerText = meal.name + ' ' + meal.calories + 'kcal' + ' ' + meal.date.split('T')[0];
    var button = document.createElement('button');
    button.setAttribute('class', 'delete');
    button.innerText = 'x';
    meals.setAttribute('id', meal.meal_id);
    mealsContainer.appendChild(meals);
    meals.appendChild(button);
  });
  sumCalorie.innerText = 'Sum of the calories: ' + sum;
}

function refreshList () {
  getMeals(url, listMeals)
}

refreshList();

function postMeals(callback) {
  var req = new XMLHttpRequest();
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json');
  var text = ({"name": mealInput.value, "calories": calorieInput.value, "date": dateInput.value})
  req.send(JSON.stringify(text));
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      var response = JSON.parse(req.response);
      callback(response);
    }
  }
}

addButton.addEventListener('click', function() {
  postMeals(function() {
    refreshList();
  });
});

filterButton.addEventListener('click', function() {
  var newUrl = url + '/' + filterInput.value;
  mealsContainer.innerHTML = '';
  getMeals(newUrl, listMeals);
  getMeals(newUrl, sumCalories)
});


allButton.addEventListener('click', function () {
    refreshList()
    getMeals(newUrl, sumCalories)
})

function deleteMeals(id, callback) {
  var req = new XMLHttpRequest();
  req.open('DELETE', url+'/'+id);
  req.send();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      var response = JSON.parse(req.response);
      callback(response);
    }
  }
}

mealsContainer.addEventListener('click', function(e) {
  var id = e.path[1].id;
  console.log(id)
  deleteMeals(id, refreshList);
})
