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


}
fetchSearchData()

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

    console.log(data)

}

fetchCuisineData();

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

    console.log(data)

}

fetchTypeData()

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
        console.log('anan')
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
});

document.querySelectorAll('.cuisine').forEach(item => {
    item.addEventListener('click',cuisineBtn)
})

document.querySelectorAll('.type').forEach(item => {
    item.addEventListener('click',typeBtn)
})




