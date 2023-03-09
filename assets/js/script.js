var ingredientSearchButton = document.getElementById("ingredientSearchBtn");
ingredientSearchButton.addEventListener("click", ingredientSearch);

function ingredientSearch(event) {
  var userInput = document.getElementById("userInput").value;
  event.preventDefault();
  console.log(userInput);
  var recipesUrl =
    "https://themealdb.com/api/json/v1/1/filter.php?i=" + userInput;
  console.log(recipesUrl);
  loadMealList(recipesUrl);
}

function retrieveRecipes(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.meals[0]["strMeal"]);
    });
}

/************************************** 
Event handler for mealBtnClick
**************************************/
function mealBtnClick(event) {
  alert(event.currentTarget.value);
}

/************************************** 
function loads the meal list
parameter is the meal list json object
**************************************/
function loadMealList(url) {
  var mealListEl = document.querySelector("#mealList");
  var mealItemEl;
  var btnEl;

  var mealList = retrieveRecipes(url);

  $.each(mealList, function (key, value) {
    document.getElementById("#mealList");
    mealItemEl = document.createElement("div");
    mealItemEl.innerHTML =
      '<div class="meal row align-items-center">' +
      '<p class="col-md-8 mealTxt">' +
      value.strMeal +
      "</p>" +
      '<button id="btn-' +
      key +
      '" class="mealBtn col-md-4" value="' +
      value.idMeal +
      '">' +
      '<img class="mealPhoto"src="' +
      value.strMealThumb +
      '" />';
    "</button>" + "</div>";
    mealListEl.appendChild(mealItemEl);
    btnEl = document.getElementById("btn-" + key);
    btnEl.addEventListener("click", mealBtnClick);
  });
}

// $(document).ready(loadMealList());

var ingredientListEl = document.getElementById("ingredient-list");
var recipeInstructionsEl = document.getElementById("recipeInstructions");
var mealDbPhotoEl = document.getElementById("mealDbPhoto");
var selectedMeal = "52796";

// url to retrieve the meal ingredients, instructions, photo
var ingredientsUrl =
  "https://themealdb.com/api/json/v1/1/lookup.php?i=" + selectedMeal;

function outputIngredientList(getIngredientList) {
  fetch(getIngredientList)
    .then(function (response) {
      return response.json();
    })
    .then(function (recipeData) {
      //   Build out list of ingredients on page
      for (var i = 1; i <= 20; i++) {
        //   Check if ingredients are empty before adding to list
        if (recipeData.meals[0]["strIngredient" + i] != "") {
          var currentIngredient =
            recipeData.meals[0]["strMeasure" + i] +
            " " +
            recipeData.meals[0]["strIngredient" + i];
          var IngredientItem = document.createElement("li");
          IngredientItem.setAttribute("class", "list-group-item");
          IngredientItem.innerText = currentIngredient;
          ingredientListEl.append(IngredientItem);
        }
      }
      //   Output the Recipe Instructions on page
      recipeInstructionsEl.innerText = recipeData.meals[0]["strInstructions"];

      //   Display mealdb photo on page
      mealDbPhotoEl.setAttribute("src", recipeData.meals[0].strMealThumb);
    });
}

outputIngredientList(ingredientsUrl);
