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
    }, [params.id])

    function updatePost(e) {
        e.preventDefault()
        axios.post(`/api/update/${animal.id}/`, {"name": animal.name, "category": animal.category, "years": age.years, "months": age.months, "details": animal.details, "cute_rating": animal.cute_rating, "playful_rating": animal.playful_rating, "kind_rating": animal.kind_rating} ,{ headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")} })
        .then(res => { handleUpload(res.data.id); navigate(`/perfil`) } )
        .catch(err => {if (err.response.data.msg === "Missing Authorization Header") {
            console.log(err.response.data.msg);
            sessionStorage.removeItem("token");
            navigate("/login");
            window.alert('Sessão expirada, por favor fazer login novamente');
        } })
    }

    function handleDeletePost(e) {
        e.preventDefault();
        let excluir = window.confirm("Quer mesmo excluir a postagem?");
        if (excluir) {
            axios.delete(`/api/delete/${animal.id}/`, { headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")} } ).then(res => navigate('/perfil'));
        }
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
        <Post handlePost={updatePost} handleDeletePost={handleDeletePost} handleAnimalChange={handleAnimalChange} handleAgeChange={handleAgeChange} handleUploadChange={handleUploadChange} handleUpload={handleUpload} animal={animal} age={age} files={files}/>
    </>)
    }
