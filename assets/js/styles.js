const appId = 'e2556156';
const appKey = 'ef1fc19b395ec4ed7dd6206da381fc0f';
const query = 'cuisines';

// Use getElementsByClassName or querySelector with the correct class selector
const cardContainer = document.getElementsByClassName('card-container')[0];

async function fetchRecipesByCuisine(cuisine) {
  // Set the 'to' parameter to fetch more than 10 items
  const url = `https://api.edamam.com/search?q=${cuisine}&app_id=${appId}&app_key=${appKey}&to=30`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if recipes exist in the response
    if (data.hits && data.hits.length > 0) {
      // Clear previous cards
      cardContainer.innerHTML = '';

      // Create and append cards for each recipe
      data.hits.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style = 'width: 18rem;';

        const img = document.createElement('img');
        img.src = recipe.recipe.image;
        img.className = 'card-img-top';
        img.alt = recipe.recipe.label;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = recipe.recipe.label;

        cardBody.appendChild(cardText);
        card.appendChild(img);
        card.appendChild(cardBody);

        // Append the card to the container
        cardContainer.appendChild(card);
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
          // Fetch and display recipes for the chosen cuisine
          fetchRecipesByCuisine(cuisine);
        });

        // Append the button to the container element (e.g., body)
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