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
  showIngredientList(event.currentTarget.value);
}

/************************************** 
function loads the meal list
parameter is the meal list json object
**************************************/
function loadMealList(url) {
  var mealListEl = document.querySelector("#mealList");
  var mealItemEl;
  var btnEl;
  while (mealListEl.hasChildNodes())
  { 
      mealListEl.removeChild(mealListEl.firstChild);
  };
  fetch(url).then(function (response) {
      console.log("json "+response.json)
      return response.json();
  }).then(function(data) {
    var meals = data.meals;

    for(var i=0;i<meals.length;i++) 
    {
      document.getElementById("#mealList");
      mealItemEl = document.createElement("div");
      mealItemEl.innerHTML='<div class="meal row align-items-center">'+
      '<p class="col-md-8 mealTxt">' + meals[i].strMeal +'</p>'+
      '<button id="btn-'+i+'" class="mealBtn col-md-4" value="'+meals[i].idMeal+'">'+
      '<img class="mealPhoto"src="'+meals[i].strMealThumb+'" />'
      '</button>'+
      '</div>'
      mealListEl.appendChild(mealItemEl);
      btnEl=document.getElementById("btn-"+i);
      btnEl.addEventListener("click",mealBtnClick);
    };
  })
}


var ingredientListEl = document.getElementById("ingredient-list");
var recipeInstructionsEl = document.getElementById("recipeInstructions");
var mealDbPhotoEl = document.getElementById("mealDbPhoto");
var ingredientListEl = document.getElementById('ingredient-list')

//var selectedMeal = "52796";
function showIngredientList(mealId)
{
// url to retrieve the meal ingredients, instructions, photo
var ingredientsUrl =
  "https://themealdb.com/api/json/v1/1/lookup.php?i=" + mealId; //selectedMeal;
  outputIngredientList(ingredientsUrl);
};
function outputIngredientList(getIngredientList) {
  while (ingredientListEl.hasChildNodes())
  { 
    ingredientListEl.removeChild(ingredientListEl.firstChild);
  };
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


