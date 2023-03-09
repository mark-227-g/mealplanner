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
        console.log(response)
        return response.json();
    });
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

    var mealList = JSON.parse(retrieveRecipes(url));

    $.each( mealList.meals, function( key, value ) 
    {
      document.getElementById("#mealList");
      mealItemEl = document.createElement("div");
      mealItemEl.innerHTML='<div class="meal row align-items-center">'+
      '<p class="col-md-8 mealTxt">' + value.strMeal +'</p>'+
      '<button id="btn-'+key+'" class="mealBtn col-md-4" value="'+value.idMeal+'">'+
      '<img class="mealPhoto"src="'+value.strMealThumb+'" />'
      '</button>'+
      '</div>'
      mealListEl.appendChild(mealItemEl);
      btnEl=document.getElementById("btn-"+key);
      btnEl.addEventListener("click",mealBtnClick);
    });
}

// $(document).ready(loadMealList());


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
