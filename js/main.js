const renderDrinks = async () => {
    let baseElement = document.querySelector('#base')
    let drinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
    .then(res => res.json())
    .then(data => data.drinks)

    let drinksBaseElement = document.createElement('section')
    let selectElement = document.createElement('select')

    drinksBaseElement.id = 'drinks'

    for (drink of drinks) {
        let drinkOptionElement = document.createElement('option')
        drinkOptionElement.value = drink.idDrink
        drinkOptionElement.innerText = drink.strDrink

        
        selectElement.appendChild(drinkOptionElement)
    }
    
    selectElement.addEventListener('change', renderDrink)
    
    let bodyElement = document.querySelector('body')
    bodyElement.insertBefore(drinksBaseElement, baseElement)
    drinksBaseElement.appendChild(selectElement)
}

const renderDrink = async (e) => {
    let drinkId = e.target.value
    let drink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
    .then(res => res.json())
    .then(data => data.drinks[0])

    // DRINK TITLE
    let titleElement = document.createElement('h2')
    titleElement.innerText = drink.strDrink
    titleElement.id = 'drinkTitle'

    // DRINK IMAGE
    // drink.strDrinkThumb
    let bgElement = document.createElement('section')
    let imgDivElement = document.createElement('div')
    let imgElement = document.createElement('img')
    bgElement.id = 'bgElement'
    imgElement.src= drink.strDrinkThumb

    // INGREDIENTS AND MEASURES
    let recipeBaseElement = document.createElement('section')
    let ingredientsBaseElement = document.createElement('section')
    let ingredientsTitleElement = document.createElement('h3')
    let ingredientsElement = document.createElement('ul')

    recipeBaseElement.id = 'recipe'
    ingredientsTitleElement.innerText = 'Ingredients'

    ingredientsBaseElement.appendChild(ingredientsTitleElement)
    ingredientsBaseElement.appendChild(ingredientsElement)

    for (key in drink) {
        if (key.includes('Ingredient') && drink[key] !== null) {
            let text = `${drink[key]} - ${drink['strMeasure' + key.substring(13, key.length)]}`
            let textElement = document.createElement('li')
            textElement.innerText = text

            ingredientsElement.appendChild(textElement)
        }
    }

    // INSTRUCTIONS
    let instructionsBaseElement = document.createElement('section')
    let instructionsTitleElement = document.createElement('h3')
    let instructionElement = document.createElement('p')

    instructionsTitleElement.innerText = 'Instructions'
    instructionElement.innerText = drink.strInstructions

    instructionsBaseElement.appendChild(instructionsTitleElement)
    instructionsBaseElement.appendChild(instructionElement)
    
    // ATTACH EVERYTHING TO BASE ELEMENT
    let baseElement = document.querySelector('#base')
    baseElement.innerHTML = ''

    baseElement.appendChild(titleElement)
    baseElement.appendChild(bgElement)
    bgElement.appendChild(imgDivElement)
    bgElement.appendChild(recipeBaseElement)
    imgDivElement.appendChild(imgElement)
    recipeBaseElement.appendChild(ingredientsBaseElement)
    recipeBaseElement.appendChild(instructionsBaseElement)
}

renderDrinks()
