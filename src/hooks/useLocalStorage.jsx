import { useState, useEffect } from 'react'

export default function useLocalStorage(key, initalValue) {
  
  const [state, setState] = useState(() => {
    const item = localStorage.getItem(key)
    if(item){
      return JSON.parse(item)
    }
    return initalValue
  })

  useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(state))
  },[key, state])

  return [state, setState]
}