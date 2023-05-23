/* eslint-disable no-mixed-spaces-and-tabs */

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    getFood();
  }, []);

  const [food, setFood] = useState([]);
  const [search, setSearch] = useState('');

  async function getFood() {
    const url = `https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?ingr=+${search}&nutrition-type=cooking&category%5B0%5D=generic-foods&health%5B0%5D=alcohol-free`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '140ad06cb8msh655bc68573b9206p1da48ajsn8493641b9257',
        'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setFood(result.hints);
      console.log(result.hints);
    } catch (error) {
      console.error(error);
    }
  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getFood();
  };

  return (
    <div className="App">
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={updateSearch} placeholder='Search any food...' />
        <button type="submit" className='btn'>Submit</button>
      </form>
	  <div className='container'>
      {food.map((item) => {
        return (
			
          <div key={item.food.foodId} className='box'>
            <img src={item.food.image} alt="" className='image'/>
			<div className="ptag">
				<p key={item.food.foodId}>{item.food.label}</p>
            	<p>{item.food.nutrients.ENERC_KCAL} KCAL</p>
			</div>
            
          </div>
        );
      })}
	  </div>
    </div>
  );
}

export default App;
