import { useEffect, useState } from "react";
import Search from "../../components/search";
import "./style.css";
import RecipeIteam from "../../components/recipe-iteam/index";
import FavoriteItem from "../../components/favorite-item";

const dummyData = "dummyData";

const Homepage = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorites")
    );
    console.log("Favorites from local storage:", extractFavoritesFromLocalStorageOnPageLoad);
    setFavorites(extractFavoritesFromLocalStorageOnPageLoad);
  }, []);

  const getDataFromSearchComponent = (getData) => {
    setLoadingState(true);

    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=308e09b4f1504ff8b29a3adc80f40668&query=${getData}`
      );
      const result = await apiResponse.json();

      const { results } = result;

      if (results && results.length > 0) {
        setLoadingState(false);
        setRecipes(results);
      }
    }
    getRecipes();
  };

  const addToFavorites = (getCurrentRecipeItem) => {
    console.log("Adding to favorites:", getCurrentRecipeItem);
    let cpyFavorites = [...favorites];

    const index = cpyFavorites.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );

    if (index === -1) {
      cpyFavorites.push(getCurrentRecipeItem);
      setFavorites(cpyFavorites);
      localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
    } else {
      alert("Item already present in favorites");
    }

    // Add a check to make sure favorites is an array before trying to iterate over it
    if (Array.isArray(cpyFavorites)) {
      for (let i = 0; i < cpyFavorites.length; i++) {
        console.log(cpyFavorites[i]);
      }
    }
  };

  const removeFromFavorites = (id) => {
    let cpyFavorites = [...favorites];

    const index = cpyFavorites.findIndex((item) => item.id === id);

    if (index !== -1) {
      cpyFavorites.splice(index, 1);
      setFavorites(cpyFavorites);
      localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
    }
  };

  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        dummyCopy={dummyData}
      />

      <div className="favorites-wrapper">
        <h1 className="favorites-title">Favorites</h1>
        <div className="favorites">
          {favorites && favorites.length > 0
            ? favorites.map((item) => (
                <FavoriteItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  removeFromFavorites={() => removeFromFavorites(item.id)}
                />
              ))
            : null}
        </div>
      </div>

      {loadingState && (
        <div className="loading">Loading recipes! Please wait...</div>
      )}

      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeIteam
                key={item.id}
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Homepage;