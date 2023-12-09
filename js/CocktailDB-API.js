// Lesson 09.03 Cocktail API 
// in 67 lines of actual code (big array counts as one line; comments, 
// extra line breaks and console.logs don't count as lines)

// clicking letter buttons gets all drinks that start w that letter
const letters = "ABCDEFGHIJKLMNOPQRSTVWYZ"; // for making letter buttons (no "U" or "X")

// cocktail keywords for making select options:
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

// split letters string into array and iterate it:
letters.split("").forEach(e => {
    const btn = document.createElement('button'); // make a button for the letter
    btn.className = 'letter-btn';
    btn.textContent = e; // each btn displays its letter in uppercase
    btn.id = e.toLowerCase(); // id='a' etc.
    btn.addEventListener('click', getCocktail); // btn click calls getCocktail function
    btnBox.appendChild(btn); // append button to btnBox
});

const menu = document.getElementById('menu'); // get the select menu
menu.addEventListener('change', getCocktail); // menu change calls getCocktail function

// populate menu w options, one per item in cocktailkKeywords array 
// iterate cocktailkKeywords array, making a menu option for each item: 
cocktailkKeywords.forEach(e => {
    const option = document.createElement('option'); // make an option
    option.value = e.toLowerCase(); // lowercase the letter
    option.text = e; // set the ext to the original word, capitalized
    menu.appendChild(option); // append option to select menu
});

const search = document.getElementById('search-box'); // get search input box
search.addEventListener('search', getCocktail); // type in box and hit Enter to call getCocktail func
const randBtn = document.querySelector('button'); // get Random Cocktail button
randBtn.addEventListener('click', getCocktail); // click btn to call getCocktail function
// get the cocktail box where cocktail(s) appear as divs, one div per cocktail, 
// each div containing: cocktail name, instrucitons, ingredients list and image
const cocktailBox = document.getElementById('cocktail-box'); 

function getCocktail() {
    
    // start the url variable with the base part that never changes:
    let url = "https://www.thecocktaildb.com/api/json/v1/1/";
    // this.value exists only for select menu, and non-empty search box
    if(this.value) { // btns don't have values, but search box and menu do
        url += `search.php?s=${this.value}`; // concat value of obj calling function onto url
    } else { // a button called the func but what kind of btn: Letter or Random?
        // ternary: if btn has id, it's a letter btn, else it's random btn; concat accordingly:
        url += this.id ? `search.php?f=${this.id}` : `random.php`;
    }

    if(this.id != 'search-box') search.value = ""; // clear search box if it didn't call function
    if(this.id != 'menu') menu.selectedIndex = 0; // reset menu if it didn't call the function
    
    fetch(url, {method:"GET"}) // send fetch() request with url and GET method
    .then(res => res.json()) // .then() No. 1: Handle the response by parsing the json
    .then(obj => { // .then() No. 2: Handle the parsed object by outputting data:
        console.log('obj.drinks:', obj.drinks); // result returns one obj called "drinks"
        // the value of which is an array, one array item per drink
        cocktailBox.innerHTML = ''; // clear the cocktail box from last search:
        // object has a drinks property, which is an array
        // Sort results by strDrink key (drink name), from A-Z:
        obj.drinks.sort((a,b) => a.strDrink > b.strDrink ? 1 : -1);
        
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
            // display top 5 ingredients as bulleted list
            // the ingredients exist as separate properties, numbered 1-15
            // 'strIngredient1': 'rum', 'strIngredient2': 'ginger ale', etc., up to 15
            // all go up to 'strIngredient15', regardless of actual number of ingredients
            // unused ingredients are set to null;
            // strMeasure is the same: from 1-15 ('strMeasure1' - 'strMeasure15')
            // ingredient and measure numbers correspond to each other, so
            // to make an li w both, concatenate the matching property numbers
            
            for(let i = 1; i <= 5; i++) { // loop 5 times: only display top 5 ingredients
                
                let ingrKey = "strIngredient" + i; // concat ingredient key
                let measKey = "strMeasure" + i; // concat measure key
                
                if(e[ingrKey]) { // if ingredient is not null (if it exists)
                    const li = document.createElement('li'); // make an li for ingredient
                    li.textContent = `${e[ingrKey]} (${e[measKey]})`; // text is ingred & measure
                    ul.appendChild(li); // output li to ul (bulleted list_
                } // end if

            } // end for loop

            drinkDiv.appendChild(ul); // append the ul to the drinkDiv
            const drinkPic = new Image(); // make image to hold the drink pic
            drinkPic.src = e.strDrinkThumb; // set image source
            drinkDiv.appendChild(drinkPic); // append image to drinkDiv

        }); // end drinksArr.forEach

    }) // end second .then()

    .catch(err => console.log("Something went wrong", err)); // finish w error handling

} // end function getCocktail()