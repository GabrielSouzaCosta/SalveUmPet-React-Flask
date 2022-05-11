import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Rating } from 'react-simple-star-rating';

function NewPost() {
    const [rating, setRating] = useState(0);


  return (<>
      <Navbar />
      <div style={{backgroundColor: "#110011ee"}} className='vh-100'>
        <div style={{backgroundColor: "#904e55ee"}} className='container-sm text-white'>
            <div className='d-flex flex-column align-items-center justify-content-center vh-100'>

            <h1 className='display-6 pb-3 fw-bolder'>Doar um Pet</h1>
            <label className='my-3' htmlFor='name'>Nome do bichinho:</label>
            <input className='form-control w-25 mb-3' id='name'></input>
                <div className='d-flex align-items-center justify-content-center'> 
                    <input style={{backgroundColor:"black"}} type="radio" id="cat" name="drone" value="gato" />
                    <label htmlFor="cat" className='mx-1'><img style={{width: "50px"}} src='/assets/images/cat.png'/></label> 
                    <input type="radio" id="dog" name="drone" value="cachorro"/>
                    <label htmlFor="dog" className="ms-1"><img style={{width: "50px"}} src='/assets/images/dog.png'/></label>
                </div>


            <label className='my-2' htmlFor='age'>Idade:</label>
            <div className='d-flex justify-content-center align-items-center w-25 mt-1' id='age'>
                <label htmlFor='yearsOld' className='me-1'>Anos:</label>
                <input className='form-control w-50 me-1' id='yearsOld' type="number" />
                <label htmlFor='monthsOld' className='me-1'>Meses:</label>
                <input className='form-control w-50' id='monthsOld' type="number" />
            </div>
            <label className='my-2' htmlFor='details'>Como seu bichinho é?</label>
            <textarea id='details' className="form-control w-25 mb-2" rows="3" cols="40"/>
            
            <Rating onClick={ (e) => setRating(e) } ratingValue={rating} />

            <form>
                <div className="d-flex flex-column justify-content-center align-items-center mt-1">
                    <p className='p mb-1'>Imagens do seu pet:</p>
                    <label className='btn btn-success' htmlFor="petImages">Enviar fotinhas &#128525;</label>
                    <p><input type="file" className="d-none" id="petImages" accept="image/png, image/jpeg" multiple/></p>
                </div>
            </form>

            </div>


        </div>
    </div>
  </>
  )
}

export default NewPost