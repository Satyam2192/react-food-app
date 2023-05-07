import "./style.css"
// import React, { useEffect, useState } from "react";
import { useState } from "react";

// statemanament
// >useState hook

const Search=(props)=>{
    console.log(props)
    const {getDataFromSearchComponent} = props;
    const [inputValue, setInputValue] =useState("") //initial value

    const handleInputvalue = (event)=>{
        const {value} = event.target;
        // set the updated state
        event.preventDefault();   //<<<<-
        setInputValue(value);

    }

    console.log(inputValue);

    const handleSubmit = (event)=>{
        event.preventDefault();
        getDataFromSearchComponent(inputValue)
    }

    return(
        <form onSubmit={handleSubmit} className="search">
            <input name="search" onChange={handleInputvalue} value={inputValue} placeholder="Search Recipes" id="search"/>
            <button type="submit">Search</button>
        </form>
    );
};

export default Search