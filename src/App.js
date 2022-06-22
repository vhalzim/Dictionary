import React, {useState}  from "react";
import SearchView from "./components/SearchView.js";
import Favorites from "./components/FavoritesList.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import "./index.css" 


function App() {

const [favoritesList, setFavoritesList] = useLocalStorage("list",[])


//this is beeing pased to SearchView
  function addItemToList (listItem) {
    //this is a filther to avoid the repetition of words in the favorites list
    const isANewWord = favoritesList.findIndex((name)=>{
      //here it checks if the title of the new item isnt already on the list 
      //by checkin the index of any item on the previous list witch title matches the title of the new item  
      return(listItem.title === name.title )
    })

    //if there is no match the findIndex method will return an index of -1
    //if there is a match it will return any value from 0 ahead
    if (isANewWord>-1){
      return null
    } else if (isANewWord === -1){
    setFavoritesList ((prevValue) => {return [...prevValue, listItem] })
    }
    
  }


//This is beeing pased to FavoritesList (only?... at least for now)
  const deleteItemFromList = (id)=>{
    setFavoritesList(
      favoritesList.filter((item,index) =>{
           return (index != id)
         })
    )
  } 
  





  return (
    <div className="flex flex-col items-center text-secondary bg-backg w-screen  h-screen pt-6">
      <Router>
        <nav className="flex space-x-16 mt-2 mb-8 list-none text-black ">

          <NavLink exact to="/" className={({isActive})=>(isActive?"bg-secondary px-4 rounded-lg font-semibold text-black":"bg-ternary px-4 rounded-lg font-semibold shadow-md shadow-secondary")}>
            home
          </NavLink>
          <NavLink exact to="/favorites" className={({isActive})=>(isActive?"bg-secondary px-4 rounded-lg font-semibold text-black":"bg-ternary px-4 rounded-lg font-semibold shadow-md shadow-secondary")}>
              favorites
          </NavLink>
 
        </nav>
      <Routes>
        <Route exact path='/' element={<SearchView handleAddButton={addItemToList} favoritesArray={favoritesList}/> }></Route>
        <Route exact path="/favorites" element={<Favorites handleDeleteButton={deleteItemFromList} favoritesArray={favoritesList} />}></Route>
      </Routes>
    </Router>
      
    </div>



 


  );

}

export default App;