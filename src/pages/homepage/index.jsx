import { useEffect, useState } from "react";
import Search from "../../components/search";
import "./style.css";
import RecipeIteam from "../../components/recipe-iteam";
import FavoriteItem from "../../components/favorite-item";

// import { useState } from "react";
// import './styles.css';
// import Search from "../../components/search";

const dumydata = "dumydata";

const Homepage = () => {
  // for loading state
  const [loadingState, setLoadingState] = useState(false);

  // save result that we recive from api

  const [recipes, setRecipes] = useState([]);

  // favarate data state
  const [favorates, setFavorates] = useState([]);
  const getDataFromSearchComponent = (getData) => {
    // keep the loading state true before calling api
    setLoadingState(true);

    // console.log(getData, "getdata");

    // calling api
    async function getReceipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=308e09b4f1504ff8b29a3adc80f40668&querry=${getData}`
      );
      const result = await apiResponse.json();

      const { results } = result;

      if (results && results.length > 0) {
        // set loading status false again
        // set the recipes state

        setLoadingState(false);
        setRecipes(results);
      }
      // console.log(result);
    }
    getReceipes();
  };

  // console.log(loadingState, recipes, "loadingState, recipes");

  const addToFavorates = (getCurrentRecipeitem) => {
    let cpyFavorates = [...favorates];

    // to cheack that item is aalready present in favorates list or not
    const index = cpyFavorates.findIndex(
      (item) => item.id === getCurrentRecipeitem.id
    );
    // console.log(index);
    if (index === -1) {
      cpyFavorates.push(getCurrentRecipeitem);
      setFavorates(cpyFavorates);
      // save the favorates in the local storage
      localStorage.setItem("favorates", JSON.stringify(cpyFavorates));
    } else {
      alert("Item already present in favorates");
    }

    // console.log(favorates);

    useEffect(() => {
      console.log("runs only one time on home page load");
      const extractFavoratesFromLocalStorageOnPageLoad = JSON.parse(
        localStorage.getItem("favorates")
      );
      setFavorates(extractFavoratesFromLocalStorageOnPageLoad);
    }, []);

    console.log(favorates);
  };
  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        dumycopy={dumydata}
      />

      {/* show favorates item */}
      <div className="favorites-wrapper">
        <h1 className="favorates-titile">Favorates</h1>
        <div className="favorites">
          {
            favorates && favorites.length >0 ?
            favorates.map(iteam=>(
              <FavoriteItem
              id={item.id}
              image={item.image}
              title={item.title}
              
              />
            ))
            :null}
        </div>
      </div>

      {/* show loading state */}
      {loadingState && (
        <div className="loading">Loading recipies ! please wait...</div>
      )}
      {/* show loading state */}

      {/* map through all the recipe */}
      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeIteam
                addToFavorates={() => addToFavorates(item)}
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
