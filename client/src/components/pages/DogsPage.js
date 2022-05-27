import React, {useState, useEffect} from 'react';

import Paginator from '../Paginator';
import Posts from '../Posts';
import axios from 'axios';

export default function DogsPage() {
  const [allDogs, setAllDogs] = useState([])
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL+'/api/animals/dogs').then(res => setAllDogs(res.data))
  }, [])

  function handleDogsChange (dogs) {
    setDogs(dogs)
  }

  return (
  <>  
  <Posts allAnimals={allDogs} animals={dogs}  />
  <Paginator allAnimals={allDogs} animals={dogs} handleAnimalsChange={handleDogsChange} itemsPerPage={8}  />
  </>
  )
}
