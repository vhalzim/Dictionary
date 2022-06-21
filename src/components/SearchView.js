import  {useState}  from "react";




function SearchView(p) {
  const [word, setWord] = useState ("")
  const [meaning, setMeaning] = useState("")
  const [favoritesListItem, setFavoritesListItem] = useState({title:"", definition:""})
  const [buttonState,setButtonState] = useState(false)
  const [error, setError] = useState (false)
  const [errorMessage, setErrorMessage] = useState("")
  const [buttonStyle, setButtonStyle] = useState (false)





  const consuemApiForMeaning = async() =>{
    try{    
      var data = await fetch ("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
      var dataJson = await data.json()
      setErrorMessage (dataJson.message)
      var def = dataJson[0].meanings[0].definitions[0].definition;
      var apiWord = dataJson[0].word
      setError(false)
      return ({wordValue:apiWord, defValue:def})

    
    }catch(err) {
     setError(true)
    }

  }

  //filter to stylize button "add to favorites"
  function checkOnFavorites(word) {
    const isOnFavorites = p.favoritesArray.findIndex((name)=>{
      return(word === name.title )
    })
    if (isOnFavorites>-1){
      setButtonStyle(true)
      console.log(true)
    } else if (isOnFavorites === -1){
      setButtonStyle(false)
      console.log(false)
    }
    
  }

  const updateWord = (e) =>{
    const newWord = e.target.value
    setWord(newWord)

  }

  const handleClick = () => {
    if(word != "" ){
      consuemApiForMeaning().then(
        (value)=>{
          checkOnFavorites(value.wordValue)
          setButtonState(true)
          setMeaning(value.defValue)
          setWord(value.wordValue)
          setFavoritesListItem({title:value.wordValue, definition:value.defValue})

        }
       )
    } else if (word ===""){
      setError(true)
      setErrorMessage("Please insert a Word")
    }

  }




  return (
    <div className="flex flex-col items-center text-secondary ">
   
      <div className="flex">
        <input placeholder="search a word" onChange={updateWord} value={word} className="outline-none border-b-2 border-b-ternary mr-4 bg-backg"/>
        <button type="button" onClick={handleClick} className="hover:text-ternary"><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>

      
      <h1 className="mt-8 text-4xl font-bold capitalize">{word}</h1>
      {error ===false ? <p className="px-6 text-center my-8">{meaning}</p> : error === true && <p className=" bg-red-600 p-2 rounded-md text-black font-semibold text-center mx-8">{errorMessage}</p>}
      {buttonState === true && error === false && word !="" ? <button type="button" onClick={()=>{p.handleAddButton(favoritesListItem); setButtonStyle(true)}} className={buttonStyle===true? "bg-secondary text-black  p-2 rounded-md text-sm font-semibold":"bg-ternary  p-2 rounded-md text-sm font-semibold shadow-md shadow-primary hover:shadow-none"}>{buttonStyle? "Added to favorites":"Add to favorites"}</button>:""}
    

    </div>
  );
}

export default SearchView;