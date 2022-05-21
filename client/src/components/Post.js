import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

function Post(props) {  
  return (<>
    <div style={{backgroundColor: "#110011ee"}} className='h-100 pb-5'>
        <Navbar />
      <div style={{backgroundColor: "#904e55ee", width: "90%"}} className='container-sm text-white my-5 h-100'>
          <h1 className='display-6 pb-3 fw-bolder text-center pt-5'>Doar um Pet</h1>

          <div className='d-flex flex-column'>
          <form encType="multipart/form-data" onSubmit={(e) => e.preventDefault() }>
              <div className="d-flex flex-column justify-content-center align-items-center mt-1">
                  <label className='btn btn-success' htmlFor="petImages">Fotinhas &#128525;  (até 3 imagens)</label>
                  <input type="file" id="petImages" className='d-none' accept="image/*" multiple onChange={(e) => {if (e.target.files.length < 4) {
                       props.handleUploadChange(e);
                  } else if (e.target.files.length > 3) {
                    window.alert("Por favor selecione até 3 imagens")
                  } }}/>
                  <div className='d-flex justify-content-center align-items-center pt-2'>
                  {props.files.map((file, i)=>{
                      return (
                          <img className='img-fluid w-25' key={`image-${i}`} alt="pet" src={URL.createObjectURL(file)} />
                      )   
                  })}
                  </div>

              </div>
          </form> 

          <form onSubmit={props.handlePost}>
            <div className='d-flex flex-column  align-items-center justify-content-start h-100'>

            <label className='mt-3 mb-1' htmlFor='name'>Nome do bichinho:</label>
            <input className='form-control w-25 mb-3' value={props.animal.name} onChange={(e)=> props.handleAnimalChange(e, "name")} id='name' required></input>
                    <div className='d-flex align-items-center justify-content-center' onChange={(e) => props.handleAnimalChange(e, "category")} > 
                    <input style={{backgroundColor:"black"}} type="radio" id="cat" name="drone" value="gato"/>
                    <label htmlFor="cat" className='mx-1'><img style={{width: "50px"}} alt="escolher gato" src={`${process.env.PUBLIC_URL}/assets/images/gato.png`} /></label> 
                    <input type="radio" id="dog" name="drone" value="dog"/>
                    <label htmlFor="dog" className="ms-1"><img style={{width: "50px"}} alt="escolher cachorro" src={`${process.env.PUBLIC_URL}/assets/images/dog.png`} /></label>
                    </div>
            <label className='my-2' htmlFor='age'>Idade:</label>
            <div className='d-flex justify-content-center align-items-center w-25 mt-1' id='age'>
                <label htmlFor='yearsOld' className='me-1'>Anos:</label>
                <input className='form-control w-50 me-1' value={props.animal.years} onChange={(e) => props.handleAnimalChange(e, "years") } min="0" max="20" id='yearsOld' type="number" />
                <label htmlFor='monthsOld' className='me-1'>Meses:</label>
                <input className='form-control w-50' value={props.animal.months} onChange={(e) => props.handleAnimalChange(e, "months") } min="0" max="11" id='monthsOld' type="number" />
            </div>
            <label className='my-2' htmlFor='details'>Como seu bichinho é?</label>
            <textarea id='details' required value={props.animal.details} onChange={ (e) => props.handleAnimalChange(e, "details") } className="form-control w-25 mb-2" rows="3" cols="40"/>
            <div className='mb-1'>
                Fofinho: <Rating ratingValue={props.animal.cute_rating} allowHalfIcon={true} onClick={ (e) => props.handleAnimalChange(e, "cute_rating") } emptyIcon={<FontAwesomeIcon icon={faPaw} />} fullIcon={<FontAwesomeIcon icon={faPaw} />}  />
            </div>
            <div className='mb-2'>
                Brincalhão: <Rating  ratingValue={props.animal.playful_rating} allowHalfIcon={true} onClick={ (e) => props.handleAnimalChange(e, "playful_rating") }  emptyIcon={<FontAwesomeIcon icon={faPaw} />} fullIcon={<FontAwesomeIcon icon={faPaw} />} />
            </div>
            <div className='mb-2'>
                Carinhoso: <Rating required ratingValue={props.animal.kind_rating} allowHalfIcon={true} onClick={ (e) => props.handleAnimalChange(e, "kind_rating") } emptyIcon={<FontAwesomeIcon icon={faPaw} />} fullIcon={<FontAwesomeIcon icon={faPaw} />}  />
            </div>

            <div>
            <input type="checkbox" className='form-check-input me-1' required id="acceptAdoption" name="accept" value="accept_adoption" />
            <label htmlFor="acceptAdoption" className="form-check-label">Eu aceito realizar uma doação responsável</label>

        </div>
            {(props.animal.is_interest === false) ?
            <div className='d-flex justify-content-around w-25'>
                <input type="submit" className='btn btn-warning mt-3 mb-5' value="Salvar Alterações"></input>
                <button className='btn btn-danger mt-3 mb-5' onClick={props.handleDeletePost}>Excluir Publicação</button>
            </div>
            :
            <input type="submit" className='btn btn-warning text-success mt-3 mb-5' value="Doar meu pet"></input> 
            }

          </div>

          </form>

          </div>

      </div>
  </div>

  </>
  )
}

export default Post