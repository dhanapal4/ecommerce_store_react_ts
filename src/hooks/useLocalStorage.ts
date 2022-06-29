import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string,initialValue:T | (()=>T)){
    //This will either gets value from localstorage(if available) else,
    // get the value that we passed into this hook.
    const [value,setValue]=useState<T>(()=>{
        const jsonValue=localStorage.getItem(key);

        if(jsonValue!=null) return JSON.parse(jsonValue);

        if(typeof initialValue==='function'){
            return (initialValue as ()=>T)()
        }
        else {
            return initialValue
        }
    });


    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])


    return [value,setValue] as [typeof value,typeof setValue];
}