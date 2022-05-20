import React, { useState } from 'react';
import Post from '../Post';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function NewPost() {
    const [animal, setAnimal] = useState({name: "", category: "", details: "", cute_rating: 90, playful_rating: 85, kind_rating: 100})
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
        await axios.post('/api/add_post', {"name": animal.name, "category": animal.category, "years": age.years, "months": age.months, "details": animal.details, "cute_rating": animal.cute_rating, "playful_rating": animal.playful_rating, "kind_rating": animal.kind_rating}, {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token") } })
        .then(res => { handleUpload(res.data.id); navigate(`/perfil`) } )
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
            case "details":
                setAnimal({...animal, details: e.target.value})
                break
            case "cute_rating":
                setAnimal({...animal, cute_rating: e})
                break
            case "playful_rating":
                setAnimal({...animal, playful_rating: e})
                break
            case "kind_rating":
                setAnimal({...animal, kind_rating: e})
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
