
const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbutton');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetails = document.querySelector('.recipe-details');
const recipeClose = document.querySelector('.recipeclose-btn');
const recipeDetailsContent=document.querySelector('.recipe-details-content');




const fetchRecipes = async (query) => {
    recipeContainer.innerHTML="<h2>Fetching Recipes.....</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML="";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish </p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `
        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);


const fetchIngredients=(meal)=>{
    let ingredientsList="";
    for(let i=1; i<20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientsList +=`<li>${measure} ${ingredient}</li>`;
        }
        else{
            break;
        }
    }
    return ingredientsList;


}


        const openRecipePopup=(meal)=>{
            recipeDetailsContent.innerHTML=`
            <h2  class="recipeName" >${meal.strMeal}</h2>
            <h3>Ingredents:</h3>
            <ul  class="ingredentList">${fetchIngredients(meal)}</ul>
         
            <div>
                <h3 class="instructions">Instructions:</h3>
                <p> ${meal.strInstructions}</p>
                </div>

            `

            recipeDetailsContent.parentElement.style.display="block";
        }


        recipeClose.addEventListener('click',()=>{
            recipeDetailsContent.parentElement.style.display="none";
        })
        

        button.addEventListener('click',(e)=>{
            openRecipePopup(meal);
        });


        recipeContainer.appendChild(recipeDiv);
    });
}

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();

if(!searchInput){
    recipeContainer.innerHTML=`<h2>Type the meal in the search box</h2>`;
    return;
}

    fetchRecipes(searchInput);
});







