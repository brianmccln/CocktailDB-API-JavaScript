## CocktailDB API - JavaScript
### This app connects to CocktailDB API and gets drinks based on user interaction
- **search** box for searching cocktail names by keyword
- **select** menu for choosing drinks that contain keyword option
- **letter buttons** A-Z for getting all drinks that start with that letter
- **random button** for loading one random cocktail
- **getCocktails()** search, select and buttons all call getCocktail()
- searches load up to 25 results (random button only gets one result)
- select options and letter buttons generated dynamically with JS
- results include name of drink, instructions, ingredients with measures and drink image
- ingredients are separate keys: **strIngredient1**, **strIngredient2**, etc. all the way to  **strIngredient15**. These are used to make **ul** of ingredients and their measures.