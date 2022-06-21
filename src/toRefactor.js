import  {useState}  from "react";


function ToRefactor() {
  const [word, setWord] = useState ("")
  const [meaning, setMeaning] = useState("")
  const [favoritesListItem, setFavoritesListItem] = useState({title:"", definition:""})
  const [favoritesList, setFavoritesList] = useState ([])
  const [buttonState,setButtonState] = useState(false)
  const [error, setError] = useState (false)
  const [errorMessage, setErrorMessage] = useState("")

  function addItemToList () {
    //this is a filther to avoid the repetition of words in the favorites list
    const isANewWord = favoritesList.findIndex((name)=>{
      //here it checks if the title of the new item isnt already on the list 
      //by checkin the index of any item on the previous list witch title matches the title of the new item  
      return(favoritesListItem.title === name.title )
    })

    //if there is no match the findIndex method will return an index of -1
    //if there is a match it will return any value from 0 ahead
    if (isANewWord>-1){
      console.log(false)
    } else if (isANewWord === -1){
    setFavoritesList ((prevValue) => {return [...prevValue, favoritesListItem]    })
    }
    
  }

  //filter to remove the duplicated words in the favorites list
 //var uniquesFavoritesList = favoritesList.filter((item,index) =>{
 //  return (favoritesList.indexOf(item)===index)
 //})

 //another filter
// var uniquesFavoritesList = favoritesList.filter((item) =>{
//   return (word === item.title)
// })






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

//  let p = new Promise(function(resolve) {
//    setTimeout(() => resolve(console.log("2")), 1000);
//  })
//  
//  console.log("1")
//  p.then(()=>{console.log("3")})

  const updateWord = (e) =>{
    const newWord = e.target.value
    setWord(newWord)

  }

  const handleClick = () => {
    if(word != "" ){
      consuemApiForMeaning().then(
        (value)=>{
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

  var keyGenerator = () => {
    let S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }
  
  const handleDeleteClick = (e)=>{
    const {id}= e.target

    setFavoritesList(
      favoritesList.filter((item,index) =>{
           return (index != id)
         })
    )
  } 


  return (
    <div className="App">
      <h1>{word}</h1>
      <input placeholder="search a word" onChange={updateWord} value={word}/>
      <button type="button" onClick={handleClick}>button</button>
      {error ===false ? <p>{meaning}</p> : error === true && <p>{errorMessage}</p>}
      {buttonState === true && error === false && word != "" ? <button type="button" onClick={addItemToList}>add to favorites</button>:""}
      
      <ul>
        {favoritesList.map((listItem, index)=>{
          return(<li key={keyGenerator()} id={index}>
            <h1>{listItem.title}</h1>
            <p>{listItem.definition}</p>
            <button id={index} type="button" onClick={handleDeleteClick} >delete</button>
          </li>)
          }
        )}
      </ul>

    </div>
  );
}

export default ToRefactor;