import "./style.css";

const RecipeIteam = (props) => {
  const { id, image, title, addToFavorites } = props;

  console.log("Recipe item props:", props);

  const handleAddToFavorites = () => {
    console.log("Adding to favorites:", props);
    addToFavorites();
  };

  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="recipe" />
      </div>
      <p>{title}</p>

      <button type="button" onClick={handleAddToFavorites}>
        Add to Favorites
      </button>
    </div>
  );
};

export default RecipeIteam;
