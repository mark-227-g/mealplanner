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
