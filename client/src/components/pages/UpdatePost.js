import Post from '../Post'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdatePost() {
    const [animal, setAnimal] = useState({});
    const [files, setFiles] = useState([]);

    const navigate = useNavigate();
    const params = useParams();
    
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL+`/api/animals/${params.id}`).then(res => {console.log(res); setAnimal(res.data)})
    }, [params.id])

    function updatePost(e) {
        e.preventDefault()
        axios.post(`/api/update/${animal.id}/`, {"name": animal.name, "category": animal.category, "years": animal.years, "months": animal.months, "details": animal.details, "cute_rating": animal.cute_rating, "playful_rating": animal.playful_rating, "kind_rating": animal.kind_rating} ,{ headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")} })
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
            axios.delete(process.env.REACT_APP_SERVER_URL+`/api/delete/${animal.id}/`, { headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")} } ).then(res => navigate('/perfil'));
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
        await axios.post(process.env.REACT_APP_SERVER_URL+`/api/upload_image/${animal.id}`, formData, {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token") } } )
    }

    function handleUploadChange(e) {
      const targetFiles = e.target.files;
      console.log(targetFiles)
      let targetFilesObject = []
      if (targetFiles.length < 4) {
          targetFilesObject = [...targetFiles]
      } else if (targetFiles > 3) {
          window.alert("Por favor, selecione até 3 imagens.")
      }
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
            case "years":
                setAnimal({...animal, years: e.target.value})
                break
            case "months":
                setAnimal({...animal, months: e.target.value})
                break
            default:
                break
        }
    }
    

    return (<>
        <Post handlePost={updatePost} handleDeletePost={handleDeletePost} handleAnimalChange={handleAnimalChange} handleUploadChange={handleUploadChange} handleUpload={handleUpload} animal={animal} files={files}/>
    </>)
    }
