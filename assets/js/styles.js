const appId = 'e2556156';
const appKey = 'ef1fc19b395ec4ed7dd6206da381fc0f';
const query = 'cuisines';

// Use getElementsByClassName or querySelector with the correct class selector
// Use getElementsByClassName or querySelector with the correct class selector

const cardContainer = document.querySelector('.card-container');
const cuisineList = document.getElementById('cuisine-list');


async function fetchRecipesByCuisine(cuisine) {
    const url = `https://api.edamam.com/search?q=${cuisine}&app_id=${appId}&app_key=${appKey}&to=30`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Check if recipes exist in the response
      if (data.hits && data.hits.length > 0) {
        // Randomize the order of recipes
        const randomizedRecipes = shuffleArray(data.hits);

        // Clear previous cards
        cardContainer.innerHTML = '';

        // Create and append cards for each randomized recipe
        randomizedRecipes.forEach(recipe => {
          const card = createRecipeCard(recipe);
          cardContainer.appendChild(card);
        });
      } else {
        console.log(`No recipes found for ${cuisine}.`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style = 'width: 18rem;';
  
    const img = document.createElement('img');
    img.src = recipe.recipe.image;
    img.alt = recipe.recipe.label;
    img.className = 'card-img-top';
  
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
  
    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = recipe.recipe.label;
  
    cardBody.appendChild(cardText);
    card.appendChild(img);
    card.appendChild(cardBody);
  
    return card;
  }

  function shuffleArray(array) {
    // Fisher-Yates Shuffle Algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

        // Convert set to array for creating checklist items
        const cuisineTypesArray = [...cuisineTypesSet];

        // Create checkboxes for each cuisine category
        cuisineTypesArray.forEach(cuisine => {
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = cuisine;
          checkbox.className = 'checklist-checkbox';
          checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
              // Fetch and display randomized recipes for the chosen cuisine
              fetchRecipesByCuisine(cuisine);
            }
          });

          const label = document.createElement('label');
          label.htmlFor = cuisine;
          label.className = 'checklist-checkbox-label';
          label.textContent = cuisine;

          const listItem = document.createElement('li');
          listItem.className = 'checklist-li';
          listItem.appendChild(checkbox);
          listItem.appendChild(label);

          cuisineList.appendChild(listItem);
        });
      } else {
        console.log('No recipes found.');
      }
    } catch (error) {
      console.error(error);
    }
    const removeItemsButton = document.querySelector('.remove-btn');

    console.log(removeItemsButton); // Check if the button is selected
    
    removeItemsButton.addEventListener('click', () => {
      console.log('Button clicked!'); // Check if the click event is triggered
    
      // Remove all child elements of cardContainer
      while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
      }
    });

  }

  fetchCuisineCategories();

  const categoryList = document.getElementById('category-list');

async function fetchCategoryOptions() {
  const categories = ['Vegetarian', 'Vegan', 'Chicken', 'Beef', 'Seafood', 'Lamb', 'Duck'];

  categories.forEach(category => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = category.toLowerCase();
    checkbox.className = 'checklist-checkbox';
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        // Fetch and display randomized recipes for the chosen category
        fetchRecipesByCategory(category);
      }
    });

    const label = document.createElement('label');
    label.htmlFor = category.toLowerCase();
    label.className = 'checklist-checkbox-label';
    label.textContent = category;

    const listItem = document.createElement('li');
    listItem.className = 'checklist-li';
    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    categoryList.appendChild(listItem);
  });
}

async function fetchRecipesByCategory(category) {
  // Use the appropriate API endpoint or query parameter for category-based recipes
  const url = `https://api.edamam.com/search?q=${category}&app_id=${appId}&app_key=${appKey}&to=30`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if recipes exist in the response
    if (data.hits && data.hits.length > 0) {
      // Randomize the order of recipes
      const randomizedRecipes = shuffleArray(data.hits);

      // Clear previous cards
      cardContainer.innerHTML = '';

      // Create and append cards for each randomized recipe
      randomizedRecipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        cardContainer.appendChild(card);
      });
    } else {
      console.log(`No recipes found for ${category}.`);
    }
  } catch (error) {
    console.error(error);
  }
}

// Fetch the "Category" checklist
fetchCategoryOptions();