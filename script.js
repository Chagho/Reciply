// SEARCH FUNCTION //
async function fetchSearchData() {
    APIKEY = '13f2b6b4380742ac8461f0d7ed432e32'
    const currentURL = window.location.href;
    
    let foodName;
    if(currentURL.includes('%20')) {
        foodName = currentURL.split('=')[1].replace('%20',' ')
    }else {
        foodName = currentURL.split('=')[1];
    }

    document.querySelector('.resultsHeader').innerHTML = `
        Results for "${foodName}" recipes
    `;

    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=${foodName}&number=100`);
    const data = await response.json();


    createRecipes(data)
}


// CUISINE FUNCTION //
async function fetchCuisineData() {
    APIKEY = '13f2b6b4380742ac8461f0d7ed432e32';
    const currentURL = window.location.href;

    let cuisineName;
    if(currentURL.includes('%20')) {
        cuisineName = currentURL.split('=')[1].replace('%20',' ')
    }else {
        cuisineName = currentURL.split('=')[1];
    }
    
    document.querySelector('.resultsHeader').innerHTML = `
        Results for "${cuisineName}" recipes
    `;
    

    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&cuisine=${cuisineName}&number=100`);
    const data = await response.json();

    createRecipes(data)
}



// TYPE FUNCTION //
async function fetchTypeData() {
    APIKEY = '13f2b6b4380742ac8461f0d7ed432e32'
    const currentURL = window.location.href;
    
    let typeName;
    if(currentURL.includes('%20')) {
        typeName = currentURL.split('=')[1].replace('%20',' ')
    }else {
        typeName = currentURL.split('=')[1];
    }

    document.querySelector('.resultsHeader').innerHTML = `
        Results for "${typeName}" recipes
    `;

    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&type=${typeName}&number=100`);
    const data = await response.json();

    createRecipes(data)
}



switch (true) {
    case window.location.href.includes('query'): fetchSearchData(); break;
    case window.location.href.includes('cuisine'): fetchCuisineData(); break;
    case window.location.href.includes('type'): fetchTypeData(); break;
    case window.location.href.includes('id'): fetchRecipeData(); break;
}

// INDEX BUTTONS AND SEARCHS //
function searchBtn(e) {
    const searchValue = document.getElementById('searchBar').value;

    if(searchValue){
        const newURL = "results.html?query=";
        window.location.replace(newURL + searchValue);
    }else {
        alert('Search is empty!')
    }


}

function searchEnter(e) {
    if (e.key === "Enter") {  
        searchBtn();
    }
}

function cuisineBtn(e) {
    e.preventDefault()
    const cuisineName = e.target.textContent;

    const newURL = "results.html?cuisine=";
    window.location.replace(newURL + cuisineName);
}

function typeBtn(e) {
    e.preventDefault()
    const typeName = e.target.textContent;

    const newURL = "results.html?type=";
    window.location.replace(newURL + typeName);
}



function filterRecipes() {
    const filterValue = document.querySelector('.filter').value.toLowerCase();
    const recipes = document.querySelectorAll('.recipeText');
    const recipeContainers = document.querySelectorAll('.recipe');

    recipes.forEach((recipe, index) => {
        const recipeName = recipe.textContent.toLowerCase();
        if (recipeName.includes(filterValue)) {
            recipeContainers[index].style.display = 'flex';
        } else {
            recipeContainers[index].style.display = 'none';
}});

}


function createRecipes(item) {
    const mainDiv = document.querySelector('.main-results')

    for(let i = 0;i<item.totalResults;i++) {
        let div = document.createElement('div')

        div.innerHTML = `
        <div class="recipe flex items-center justify-center p-3">
            <div
            class="relative h-[450px] w-96 shadow-xl rounded-3xl overflow-hidden bg-itembg"
            >
            <img src="${item.results[i].image}" class="h-60 w-full" />
            <p class="recipeText m-3 text-xl font-semibold mb-6">${item.results[i].title}</p>
            <a
                id="${item.results[i].id}"
                href=""
                class="get-recipe absolute bottom-2 left-2 m-3 bg-mainblue text-slate-700 font-bold inline-block px-8 py-3 rounded text-center"
                >Get The Recipe</a
            >
        </div>
      </div>
    `
    mainDiv.appendChild(div)
    }
    document.querySelectorAll('.get-recipe').forEach(item => {
        item.addEventListener('click', getRecipeBtn);
    });
}


function getRecipeBtn(e) {
    e.preventDefault();
    const id = e.target.id;

    const newURL = "recipe.html?id=";
    window.location.replace(newURL + id);
}


async function fetchRecipeData() {
    APIKEY = '13f2b6b4380742ac8461f0d7ed432e32'
    const currentURL = window.location.href;
    
    let recipeId;
    recipeId = currentURL.split('=')[1];   

    const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APIKEY}`);
    const data = await response.json();

    createRecipeIng(data)
}

function createRecipeIng(item) {
    const mainDiv = document.querySelector('.main-recipe')

    mainDiv.innerHTML = `
        <div class="flex flex-col items-start justify-center p-6 mb-6 md:mb-0">
        <img src="${item.image}" class="w-full rounded-xl mb-6">
        <h1 class="text-left font-bold text-4xl mb-6 md:text-6xl">${item.title}</h1>
        <h2 class="text-center mb-3 font-semibold text-xl md:text-3xl">Ingredients:</h2>
        <ul class="ingredients grid grid-cols-2 items-center justify-center w-full p-3 gap-6 text-xl bg-itembg pl-6 rounded-lg">
        </ul>
      </div>
      <div class="bg-black w-full h-1 flex justify-center items-center md:w-1 md:h-full grid-flow-col-dense">
              <i
        class="bx bxs-star text-[50px] bg-white z-10"
      ></i>
      </div>
      <div class="recipe-bg bg-recipebg flex flex-col items-center justify-center p-6 pt-12">
        <h1 class="text-4xl font-bold mb-6 md:text-5xl">Step by step recipe instructions;</h1>
        <div class="instruction"></div>
      </div>
    `
    for(let i = 0;i<item.extendedIngredients.length;i++) {
        const listIng = document.createElement('li');
        listIng.classList.add('break-all','list-disc','ml-3')
        listIng.textContent = `${item.extendedIngredients[i].original}`;
        document.querySelector('.ingredients').appendChild(listIng);
    }

    for(let i = 0;i<item.analyzedInstructions[0].steps.length;i++){
        const listInst = document.createElement('p');
        listInst.classList.add('text-lg','mb-3','md:text-xl','md:mb-6','md:font-semibold','bg-itembg','bg-opacity-70','p-2','rounded')
        listInst.innerHTML = `${item.analyzedInstructions[0].steps[i].number}. ${item.analyzedInstructions[0].steps[i].step}`
        document.querySelector('.instruction').appendChild(listInst)
    }
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.matches('.get-recipe')) {
        getRecipeBtn(e);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.searchBtn');
    if (searchButton) {
        searchButton.addEventListener('click', searchBtn);
    }

    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('keydown', searchEnter);
    }

    const filterInput = document.querySelector('.filter');
    if (filterInput) {
        filterInput.addEventListener('input', filterRecipes);
    }

    document.querySelectorAll('.cuisine').forEach(item => {
        item.addEventListener('click', cuisineBtn);
    });

    document.querySelectorAll('.type').forEach(item => {
        item.addEventListener('click', typeBtn);
    });

    document.querySelectorAll('.get-recipe').forEach(item => {
        item.addEventListener('click', getRecipeBtn);
    });
});






