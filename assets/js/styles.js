// const axios = require('axios');

// const apiKey = '0344dc0b28eb42d9b03d968ad5c30085';
// const cuisine = 'Greek';

// const fetchGreekRecipes = async () => {
//   try {
//     const response = await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&apiKey=${apiKey}`
//     );

//     const recipes = response.data.results;
//     console.log('Greek Recipes:', recipes);
//   } catch (error) {
//     console.error('Error fetching Greek recipes:', error.message);
//   }
// };

// fetchGreekRecipes();
// const axios = require('axios');

// const apiKey = '0344dc0b28eb42d9b03d968ad5c30085';
// const cuisines = [
//   'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean',
//   'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek',
//   'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean',
//   'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern',
//   'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'
// ];

// const fetchRecipesByCuisine = async () => {
//   try {
//     for (const cuisine of cuisines) {
//       const response = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&apiKey=${apiKey}`
//       );

//       const recipes = response.data.results;
//       console.log(`${cuisine} Recipes:`, recipes);
//     }
//   } catch (error) {
//     console.error('Error fetching recipes:', error.message);
//   }
// };

// fetchRecipesByCuisine();

// const apiKey = 'a5d7286f6b864fef82d1dd50060278cb';
// const cuisines = [
//   'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean',
//   'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek',
//   'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean',
//   'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern',
//   'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'
// ];

// const fetchRecipesByCuisine = async () => {
//   try {
//     for (const cuisine of cuisines) {
//       const response = await fetch(
//         `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&apiKey=${apiKey}`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       const recipes = data.results;
//       console.log(`${cuisine} Recipes:`, recipes);
     
//     }
//   } catch (error) {
//     console.error('Error fetching recipes:', error.message);
//   }
// };

// fetchRecipesByCuisine();
const appId = 'e2556156';
const appKey = 'ef1fc19b395ec4ed7dd6206da381fc0f';
const query = 'cuisines';

async function fetchRecipesByCuisine(cuisine) {
    const url = `https://api.edamam.com/search?q=${cuisine}&app_id=${appId}&app_key=${appKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // Check if recipes exist in the response
      if (data.hits && data.hits.length > 0) {
        // Log details of recipes within the chosen cuisine
        console.log(`Recipes for ${cuisine}:`);
        data.hits.forEach(recipe => {
          console.log('Label:', recipe.recipe.label);
          console.log('Ingredients:', recipe.recipe.ingredientLines);
          console.log('URL:', recipe.recipe.url);
          console.log('---------------------');
        });
      } else {
        console.log(`No recipes found for ${cuisine}.`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  async function fetchCuisineCategories() {
    try {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`);
      const data = await response.json();
  
      // Check if recipes exist in the response
      if (data.hits && data.hits.length > 0) {
        // Collect unique cuisine types
        const cuisineTypesSet = new Set();
        data.hits.forEach(recipe => {
          if (recipe.recipe.cuisineType) {
            recipe.recipe.cuisineType.forEach(cuisine => {
              cuisineTypesSet.add(cuisine);
            });
          }
        });
  
        // Convert set to array for creating buttons
        const cuisineTypesArray = [...cuisineTypesSet];
  
        // Create buttons for each cuisine category
        cuisineTypesArray.forEach(cuisine => {
          const button = document.createElement('button');
          button.textContent = cuisine;
          button.addEventListener('click', () => {
            // Fetch and log recipes for the chosen cuisine
            fetchRecipesByCuisine(cuisine);
          });
  
          // Append the button to a container element (e.g., body)
          document.body.appendChild(button);
        });
      } else {
        console.log('No recipes found.');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchCuisineCategories();