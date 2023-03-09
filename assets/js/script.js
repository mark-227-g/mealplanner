var ingredientSearchButton = document.getElementById("ingredientSearchBtn");
ingredientSearchButton.addEventListener('click', ingredientSearch);

function ingredientSearch(event) {
    var userInput = document.getElementById("userInput").value;
    event.preventDefault();
    console.log(userInput);
    var recipesUrl = "https://themealdb.com/api/json/v1/1/filter.php?i=" + userInput;
    console.log(recipesUrl);
    loadMealList(recipesUrl);
};

function retrieveRecipes(url) {
    fetch(url).then(function (response) {
        console.log("json "+response.json)
        return response.json();
    }).then(function(data) {
        console.log("data "+data.meals[0]['strMeal'])
        //return response.json()
    })
    ;
}



/************************************** 
Event handler for mealBtnClick
**************************************/
function mealBtnClick(event)
{
alert(event.currentTarget.value);
}

/************************************** 
function loads the meal list
parameter is the meal list json object
**************************************/
function loadMealList(url)
{
    var mealListEl = document.querySelector("#mealList");
    var mealItemEl;
    var btnEl;

    fetch(url).then(function (response) {
        console.log("json "+response.json)
        return response.json();
    }).then(function(data) {
       
        console.log("data "+data.meals[0]['strMeal'])
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


var ingredientListEl = document.getElementById('ingredient-list')
var selectedMeal = "52796";

// url to retrieve the meal ingredients, instructions, photo
var ingredientsUrl =
  "https://themealdb.com/api/json/v1/1/lookup.php?i=" + selectedMeal;

function outputIngredientList() {
  fetch(ingredientsUrl).then(function (response) {
    return response.json();
})
.then(function (recipeData) {
    for (var i = 1; i <= 20; i++) {
        // Return when there are no more ingredients. Build out list otherwise
        if (recipeData.meals[0]['strIngredient' + i] == "") {
            return;
        } else {
            var currentIngredient = recipeData.meals[0]['strMeasure' + i] + " " + recipeData.meals[0]["strIngredient" + i];
            var IngredientItem = document.createElement('li');
            IngredientItem.setAttribute("class","list-group-item");
            IngredientItem.innerText = currentIngredient;
            ingredientListEl.append(IngredientItem);
        }
    };
})};
