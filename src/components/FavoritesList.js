


function Favorites(p) {
  const favoritesList = p.favoritesArray
 



  var keyGenerator = () => {
    let S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }
  



  return (

    <div className="">
      {!favoritesList.length? 
        <div>
          <p className="bg-ternary px-4 py-2 rounded-lg font-semibold text-black">There are not favorites Words</p>
        </div>
        :
        <ul className=" rounded-lg shadow-lg shadow-secondary max-h-[36rem] lg:max-h-[34rem] text-clip overflow-hidden overflow-y-auto">
          {favoritesList.map((listItem, index)=>{
            return(<li key={keyGenerator()} id={index} className="flex flex-col justify-center items-center  px-4 py-2 rounded-lg shadow-lg shadow-primary mx-4 my-6 min-w-[18rem] lg:min-w-[24rem]">
              <h1 className="text-2xl font-bold capitalize">{listItem.title}</h1>
              <p className="my-2">{listItem.definition}</p>
              <button id={index} type="button" onClick={()=>{p.handleDeleteButton(index)}} className="  w-20 bg-ternary font-semibold text-black rounded-md shadow-md shadow-primary hover:shadow-none">Delete</button>
            </li>)
            }
          )}
        </ul> 
      }

    </div>

    

  

  );


}
export default Favorites;