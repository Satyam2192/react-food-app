
import "./style.css"


const FavoriteItem=(props)=>{

    const {id,image,title} = props;


    return(
        <div key={id} className="Favorite-item">
            <div>
                <img src={image} alt="image of recipe" />
            </div>
            <p>{title}</p>

            <button type="button" >Remove from Favorites</button>
        </div>
    )
}

export default FavoriteItem;