import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paginator from '../Paginator';
import Posts from '../Posts';


export default function CatsPage() {
  const [allCats, setAllCats ] = useState([]);
  const [cats, setCats] = useState([])
  
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL+'/api/animals/cats').then(res => setAllCats(res.data))
  }, [])

  function handleCatsChange (cats) {
    setCats(cats)
  }

  return (<>
    <Posts allAnimals={allCats} animals={cats}/>
    <Paginator allAnimals={allCats} animals={cats} handleAnimalsChange={handleCatsChange} itemsPerPage={8} />
  </>
  )
}