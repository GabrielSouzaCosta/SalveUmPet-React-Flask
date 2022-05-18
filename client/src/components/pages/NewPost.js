import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Rating } from 'react-simple-star-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function NewPost() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [age, setAge] = useState({"years": 0, "months": 0});
    const [animalDetails, setAnimalDetails] = useState("");
    const [cuteRating, setCuteRating] = useState(90);
    const [playfulRating, setPlayfulRating] = useState(85);
    const [kindRating, setKindRating] = useState(100);
    const [files, setFiles] = useState([]);

    const navigate = useNavigate();

    async function handleUpload(id) {
        var formData = new FormData();
        if (files) {
            files.forEach((file) => {
                console.log(file)
                formData.append("file", file);
            })
        }
        console.log(formData)
        await axios.post(`/api/upload_image/${id}`, formData, {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token") } } ).then()
        navigate(`/gatos`)
    }

    async function handleNewPost(e) {
        e.preventDefault()
        await axios.post('/api/add_post', {"name": name, "category": category, "years": age.years, "months": age.months, "details": animalDetails, "cute_rating": cuteRating, "playful_rating": playfulRating, "kind_rating": kindRating}, {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token") } })
        .then(res => handleUpload(res.data.id))
        .catch(err => {if (err.response.data.msg === "Missing Authorization Header") {
            console.log(err.response.data.msg);
            sessionStorage.removeItem("token");
            navigate("/login");
            window.alert('Sessão expirada, por favor fazer login novamente');
        } })
    }   

    function handleUploadChange(e) {
      const targetFiles = e.target.files;
      const targetFilesObject= [...targetFiles]
      setFiles(targetFilesObject);
    }

  return (<>
      <Navbar />
      <div style={{backgroundColor: "#110011ee"}} className='vh-100'>
        <div style={{backgroundColor: "#904e55ee"}} className='container-sm text-white h-100'>
            <h1 className='display-6 pb-3 fw-bolder text-center pt-3'>Doar um Pet</h1>

            <div className='d-flex flex-column'>
            <form encType="multipart/form-data" onSubmit={(e) => e.preventDefault() }>
                <div className="d-flex flex-column justify-content-center align-items-center mt-1">
                    <label className='btn btn-success' htmlFor="petImages">Fotinhas &#128525;</label>
                    <input type="file" id="petImages" className='d-none' accept="image/*" multiple onChange={handleUploadChange}/>
                    <div className='d-flex justify-content-center align-items-center pt-2'>
                    {files.map((file, i)=>{
                        return (
                            <img className='img-fluid w-25' key={`image-${i}`} alt="pet" src={URL.createObjectURL(file)} />
                        )   
                    })}
                    </div>

                </div>
            </form> 

            <form onSubmit={(e) => handleNewPost(e)}>
            <div className='d-flex flex-column align-items-center justify-content-center h-100'>


            <label className='my-3' htmlFor='name'>Nome do bichinho:</label>
            <input className='form-control w-25 mb-3' value={name} onChange={(e)=> setName(e.target.value)} id='name' required></input>
                <div className='d-flex align-items-center justify-content-center' onChange={(e) => setCategory(e.target.value)} > 
                    <input style={{backgroundColor:"black"}} type="radio" id="cat" name="drone" value="gato"/>
                    <label htmlFor="cat" className='mx-1'><img style={{width: "50px"}} alt="escolher gato" src='/assets/images/cat.png'/></label> 
                    <input type="radio" id="dog" name="drone" value="cachorro"/>
                    <label htmlFor="dog" className="ms-1"><img style={{width: "50px"}} alt="escolher cachorro" src='/assets/images/dog.png'/></label>
                </div>


            <label className='my-2' htmlFor='age'>Idade:</label>
            <div className='d-flex justify-content-center align-items-center w-25 mt-1' id='age'>
                <label htmlFor='yearsOld' className='me-1'>Anos:</label>
                <input className='form-control w-50 me-1' value={age.years} onChange={(e)=> setAge({...age, years: e.target.value}) } id='yearsOld' type="number" />
                <label htmlFor='monthsOld' className='me-1'>Meses:</label>
                <input className='form-control w-50' value={age.months} onChange={(e)=> setAge({...age, months: e.target.value}) } max="11" id='monthsOld' type="number" />
            </div>
            <label className='my-2' htmlFor='details'>Como seu bichinho é?</label>
            <textarea id='details' required value={animalDetails} onChange={ (e) => setAnimalDetails(e.target.value) } className="form-control w-25 mb-2" rows="3" cols="40"/>
            <div className='mb-1'>
                Fofinho: <Rating ratingValue={cuteRating} allowHalfIcon={true} onClick={ (e) => setCuteRating(e) } emptyIcon={<FontAwesomeIcon icon={faPaw} />} fullIcon={<FontAwesomeIcon icon={faPaw} />}  />
            </div>
            <div className='mb-2'>
                Brincalhão: <Rating  ratingValue={playfulRating} allowHalfIcon={true} onClick={ (e) => setPlayfulRating(e) }  emptyIcon={<FontAwesomeIcon icon={faPaw} />} fullIcon={<FontAwesomeIcon icon={faPaw} />} />
            </div>
            <div className='mb-2'>
                Carinhoso: <Rating required ratingValue={kindRating} allowHalfIcon={true} onClick={ (e) => setKindRating(e) } emptyIcon={<FontAwesomeIcon icon={faPaw} />} fullIcon={<FontAwesomeIcon icon={faPaw} />}  />
            </div>

            <div>
            <input type="checkbox" className='form-check-input me-1' required id="acceptAdoption" name="accept" value="accept_adoption" />
            <label htmlFor="acceptAdoption" className="form-check-label">Eu aceito realizar uma doação responsável</label>

            </div>
            

            <input type="submit" className='btn btn-warning text-success mt-3' value="Doar meu pet"></input>

            </div>

            </form>

            </div>

        </div>
    </div>
  </>
  )
}

export default NewPost