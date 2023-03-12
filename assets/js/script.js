var ingredientSearchButton = document.getElementById("ingredientSearchBtn");
ingredientSearchButton.addEventListener("click", ingredientSearch);

function ingredientSearch(event) {
  document.getElementById("startMessage").style.display = "none";
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
      console.log(data.meals[0].strMeal);
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

var selectedMealID = '';
var selectedMealTitle = '';
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
      selectedMealId = recipeData.meals[0].idMeal;
      selectedMealTitle = recipeData.meals[0].strMeal;
      for (var i = 1; i <= 20; i++) {
        //   Check if ingredients are empty before adding to list
        if (recipeData.meals[0]["strIngredient" + i] != "" && recipeData.meals[0]["strIngredient" + i] != null) {
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
      recipeInstructionsEl.setAttribute("class","recipe")

      //   Display mealdb photo on page
      mealDbPhotoEl.setAttribute("src", recipeData.meals[0].strMealThumb);
      document.getElementById("mealDbPhoto").style.display = "block";
      outputAdditionalInfo();
    });
}

// GOOGLE JSON API DOCS: https://developers.google.com/custom-search/v1/overview

function outputAdditionalInfo() {
    fetch("https://www.googleapis.com/customsearch/v1?key=AIzaSyA7T4-wlgKuAXG5Hn61kPaQyePZNQiUXig&cx=4173e26fe17eb4ce5&q=" + selectedMealTitle + "&searchType=image&num=4&imgSize=medium&safe=active&filter=1")
      .then(function (response) {
      //   console.log(response.json);
        return response.json();
      })
      .then(function(searchData) {
      console.log(searchData.items[0].link);
      var displayImages = document.getElementById('add-info');
      while (displayImages.hasChildNodes())
      { 
          displayImages.removeChild(displayImages.firstChild);
      };
      for (var i = 0; i < 4; i++) {
          console.log(searchData.items[i].link);
        //   append search results to page
        var results ='';
          var searchImage = document.createElement("img");
          searchImage.setAttribute("src", searchData.items[i].link);
          searchImage.setAttribute("class", "google-image");
          searchImage.setAttribute("class", "col-sm-3 col-md-3 col-lg-3");
          displayImages.append(searchImage);

      }
    })
}

