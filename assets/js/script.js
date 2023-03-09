var ingredientListEl = document.getElementById('ingredient-list')
var selectedMeal = "52796";

// url to retrieve the meal ingredients, instructions, photo
var ingredientsUrl =
  "https://themealdb.com/api/json/v1/1/lookup.php?i=" + selectedMeal;

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
});
var mealList = JSON.parse('{"meals":[{"strMeal":"Kung Po Prawns","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/1525873040.jpg","idMeal":"52946"},{"strMeal":"Massaman Beef curry","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/tvttqv1504640475.jpg","idMeal":"52827"},{"strMeal":"Mee goreng mamak","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/xquakq1619787532.jpg","idMeal":"53048"},{"strMeal":"Nasi lemak","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/wai9bw1619788844.jpg","idMeal":"53051"},{"strMeal":"Rocky Road Fudge","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/vtxyxv1483567157.jpg","idMeal":"52786"}]}');



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
function loadMealList()
{
    var mealListEl = document.querySelector("#mealList");
    var mealItemEl;
    var btnEl;

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

/************************************** 
fill meal on load
**************************************/
$(document).ready(loadMealList());