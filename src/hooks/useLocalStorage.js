
import { useState } from 'react';

const useLocalStorage = (key, initalValue) => {
    const [storedValue, setStoredValue] = useState(()=>{
        try{
            const item = window.localStorage.getItem(key)
            return item? JSON.parse(item) : initalValue;
        }catch (error){
            return initalValue
        }
    })

    const setValue = (value)=>{
        try{
            const valueToStore = value instanceof Function? value(storedValue): value;
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }catch (error){
            console.error(error)
        }
    }

    return [storedValue, setValue]
};

export default useLocalStorage;