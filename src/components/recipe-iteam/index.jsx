
import "./style.css"


const RecipeIteam=(props)=>{

    const {id,image,title, addToFavorates} = props;

    console.log(props, 'recipe-item-prps');

    return(
        <div key={id} className="recipe-item">
            <div>
                <img src={image} alt="image of recipe" />
            </div>
            <p>{title}</p>

            <button type="button" onClick={addToFavorates}>Add to favorates</button>
        </div>
    )
}

export default RecipeIteam;