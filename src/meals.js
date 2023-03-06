// Get the meal search button element
// Get the user input for the meal search
// Get the list element where search results will be displayed
const mealButton = document.querySelector("#meal-button");
// Get the trimmed search query input value
const mealInput = document.querySelector("#meal-input");
// If there is a search query input value, create the API URL with the search query
const mealList = document.querySelector("#meal-list");

mealButton.addEventListener("click", () => {
  const searchQuery = mealInput.value.trim();
  if (searchQuery) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        mealList.innerHTML = ""; // clear previous search results
        if (data.meals) {
          data.meals.forEach((meal) => {
            // If there are search results, create a new list item for each meal with the meal name, recipe, image, and YouTube video
            const newMeal = document.createElement("li");
            newMeal.innerHTML = `
              <h2>${meal.strMeal}</h2>
              <div class="recipe" style="display: flex;">
                <img src="${meal.strMealThumb}" alt="${
              meal.strMeal
            }" width="20%">
                <div class="video-container">
                    <iframe src="${meal.strYoutube.replace(
                      "watch?v=",
                      "embed/"
                    )}" frameborder="0" allowfullscreen></iframe>
                </div>
              </div>
              <ul style="list-style-type: disc; text-align: justify;">
                ${meal.strInstructions
                  .split("\r\n")
                  .map((instruction) => `<li>${instruction}</li>`)
                  .join("")}
              </ul>
            `;
            // Join the HTML list items into a string and add them to the new list item
            mealList.appendChild(newMeal);
          });
        } else {
          // If there are no search results, create a new list item with a "No results found" message and add it to the list
          const noResults = document.createElement("li");
          noResults.textContent = "No results found.";
          mealList.appendChild(noResults);
        }
      })
      // Catch any errors that occur during the fetch request and log them to the console.
      .catch((error) => console.error(error));
  }
});
