// Lesson 09.03 Cocktail API in 60 lines of actual code (big array counts as 1 line)
const letters = "ABCDEFGHIJKLMNOPQRSTVWYZ"; // for making letter buttons (no "U" or "X")
const cocktailkKeywords = [ 
    "Amaretto", "Beer", "Black", "Bloody", "Bourbon", "Fizz", "Brandy", "Cherry", 
    "Chocolate", "Coffee", "Coke", "Cream", "Gin", "Green", "Iced", "Island", "Lemon", 
    "Lime", "Liqueur", "Milk", "Orange", "Red", "Rum", "Salt", "Scotch", "Soda", "Sour", 
    "Spiced", "Tea", "Tequila", "Vodka", "Whiskey", "Wine", "Royal", "Punch", "Peach", 
    "Cranberry", "Russian", "Captain", "Port", "Cooler", "Smash", "Cocktail", "Irish", 
    "Jamaican", "Tonic", "Slammer", "Apple", "Grape", "Cider", "High", "Long", "Caribbean", 
    "Hot", "Almond", "Shot", "-", "Sweet", "Old", "Banana", "Classic", "Electric", "Big", 
    "Bermuda", "English", "Italian", "Smoothie", "Ginger", "Banana", "Papaya", "Frozen",
    "Pineapple", "Kiwi", "Rose", "Blue", "Mojito", "Martini", "French", "Mango", "Negroni", 
    "Golden", "Night", "Cold", "Mint", "Daiquiri", "Margarita", "Smash", "Shake", " and ", 
    "Sling", "Berry", "Champagne", "Jack", "Hawaii", "Cordial", "Fruit", "Spring", "Spice", 
    "Toddy", "Watermelon", "Lassi", ".", "/", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
];
cocktailkKeywords.sort(); // sort() array alphabetically, ascending order (A-Z)
const btnBox = document.getElementById('letter-button-box'); // all letter btns go in here
letters.split("").forEach(e => { // split letters string into array and iterate it:
    const btn = document.createElement('button'); // make a button for the letter
    btn.className = 'letter-btn';
    btn.textContent = e; // each btn displays its letter in uppercase
    btn.id = e.toLowerCase(); // id='a' etc.
    btn.addEventListener('click', getCocktail); // btn click calls getCocktail function
    btnBox.appendChild(btn); // append button to btnBox
});
const menu = document.getElementById('menu'); // get the select menu
menu.addEventListener('change', getCocktail); // menu change calls getCocktail function
cocktailkKeywords.forEach(e => { // iterate cocktailkKeywords array
    const option = document.createElement('option'); // make an option
    option.value = e.toLowerCase(); // lowercase the letter
    option.text = e; // set the ext to the original word, capitalized
    menu.appendChild(option); // append option to select menu
});
const search = document.getElementById('search-box'); // get search input box
search.addEventListener('search', getCocktail); // type in box and hit Enter to call getCocktail func
const randBtn = document.querySelector('button'); // get Random Cocktail button
randBtn.addEventListener('click', getCocktail); // click btn to call getCocktail function
const cocktailBox = document.getElementById('cocktail-box');  // get the cocktail info pics and text go

function getCocktail() {
    let url = "https://www.thecocktaildb.com/api/json/v1/1/"; // base url
    url += this.value ? `search.php?s=${this.value}` : this.id ? `search.php?s=${this.value}` : `random.php`;
    if(this.id != 'search-box') search.value = ""; // clear search box if it didn't call function
    if(this.id != 'menu') menu.selectedIndex = 0; // reset menu if it didn't call the function
    fetch(url, {method:"GET"}) // send fetch() request with url and GET method
    .then(res => res.json()) // .then() No. 1: Handle the response by parsing the json
    .then(obj => { // .then() No. 2: Handle the parsed object by outputting data:
        cocktailBox.innerHTML = ''; // clear the cocktail box from last search:
        obj.drinks.sort((a,b) => a.strDrink > b.strDrink ? 1 : -1); // alphabetize drink results by name
        obj.drinks.forEach(e => { // iterate the drinks array:
            const drinkDiv = document.createElement('div'); // make div to hold drink pic & text
            drinkDiv.className = 'drink-div'; // assign div its class
            cocktailBox.appendChild(drinkDiv); // append drinkDiv to cocktailBox
            const h2 = document.createElement('h2'); // make h2 to display drink name
            h2.textContent = e.strDrink; // ex: Long Island Iced Tea
            drinkDiv.appendChild(h2); // append h2 to drink div as its first child
            const infoP = document.createElement('p'); // make p-tag to hold drink info
            infoP.textContent = e.strInstructions; // info consists of instructions
            drinkDiv.appendChild(infoP); // append info p-tag to drinkDiv
            const ul = document.createElement('ul'); // make a ul for ingredients list
            for(let i = 1; i <= 5; i++) { // loop 5 times: only display top 5 ingredients
                if(e["strIngredient" + i]) { // if ingredient is not null (if it exists)
                    const li = document.createElement('li'); // make an li for ingredient
                    li.textContent = `${e["strIngredient" + i]} (${e["strMeasure" + i]})`;
                    ul.appendChild(li); // output li to ul (bulleted list_
                } // end if
            } // end for loop
            drinkDiv.appendChild(ul); // append the ul to the drinkDiv
            const drinkPic = new Image(e.strDrinkThumb); // make image to hold the drink pic
            drinkPic.src = e.strDrinkThumb;
            drinkDiv.appendChild(drinkPic); // append image to drinkDiv
        }); // end drinksArr.forEach
    }) // end second .then()
} // end function getCocktail()