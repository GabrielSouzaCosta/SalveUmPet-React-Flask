import Post from '../Post'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdatePost() {
    const [animal, setAnimal] = useState({});
    const [age, setAge] = useState({"years": 0, "months": 0});
    const [files, setFiles] = useState([]);

    const navigate = useNavigate();
    const params = useParams();
    
    useEffect(() => {
        axios.get(`/api/animals/${params.id}`).then(res => {console.log(res); setAnimal(res.data)})
    }, [])

    function UpdatePost() {
        axios.post(`/api/update/${animal.id}`).then(res => console.log(res));
        navigate('/perfil');
    }

    async function handleUpload(id) {
        var formData = new FormData();
        if (files) {
            files.forEach((file) => {
                console.log(file)
                formData.append("file", file);
            })
        }
        console.log(formData)
        await axios.post(`/api/upload_image/${animal.id}`, formData, {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token") } } )
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
        <Post handlePost={UpdatePost} handleAnimalChange={handleAnimalChange} handleAgeChange={handleAgeChange} handleUploadChange={handleUploadChange} handleUpload={handleUpload} animal={animal} age={age} files={files}/>
    </>)
    }
