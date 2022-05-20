import React, { useState } from 'react';
import Post from '../Post';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function NewPost() {
    const [animal, setAnimal] = useState({name: "", category: "", animalDetails: "", cuteRating: 90, playfulRating: 85, kindRating: 100})
    const [age, setAge] = useState({"years": 0, "months": 0});
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
        await axios.post(`/api/upload_image/${id}`, formData, {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token") } } )
    }

    async function handleNewPost(e) {
        e.preventDefault()
        await axios.post('/api/add_post', {"name": animal.name, "category": animal.category, "years": age.years, "months": age.months, "details": animal.animalDetails, "cute_rating": animal.cuteRating, "playful_rating": animal.playfulRating, "kind_rating": animal.kindRating}, {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token") } })
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

    function handleAnimalChange(e, property) {

        switch (property) {
            case "name":
                setAnimal({...animal, name: e.target.value})
                break
            case "category":
                setAnimal({...animal, category: e.target.value})
                break
            case "animalDetails":
                setAnimal({...animal, animalDetails: e.target.value})
                break
            case "cuteRating":
                setAnimal({...animal, cuteRating: e})
                break
            case "playfulRating":
                setAnimal({...animal, playfulRating: e})
                break
            case "kindRating":
                setAnimal({...animal, kindRating: e})
                break
            default:
                break
        }
    }

    function handleAgeChange(e, t) {
        e.preventDefault();
        if (t === "years") {
            setAge({...age, years: e.target.value});
        } else if (t === "months") {
            setAge({...age, months: e.target.value});
        }
    }

  return (<>
    <Post handleUploadChange={handleUploadChange} handlePost={handleNewPost} handleUpload={handleUpload} handleAnimalChange={handleAnimalChange} handleAgeChange={handleAgeChange} animal={animal} age={age} files={files} />
  </>
  )
}

export default NewPost;
