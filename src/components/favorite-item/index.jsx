
import "./style.css";

const FavoriteItem = (props) => {
  const { id, image, title, removeFromFavorites } = props;

  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt="image of recipe" />
      </div>
      <p>{title}</p>

      <button type="button" onClick={removeFromFavorites}>
        Remove from Favorites
      </button>
    </div>
  );
};

export default FavoriteItem;