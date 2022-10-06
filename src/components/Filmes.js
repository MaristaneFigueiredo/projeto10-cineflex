import styled from "styled-components"
import { Link } from "react-router-dom";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react"





export default function Filmes({id, title, url}) {  
    // const { idFilme } = useParams(); 
    // const [sessoes, setSessoes] = useState(undefined) 

    // // OPCIONAL => Se eu quiser mostrar um erro na tela caso a requisição caia no catch
    // const [error, setError] = useState(false)
  
    // useEffect(() => {
    //   const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
    //   const requisicaoSessoes = axios.get(URL)
  
    //   requisicaoSessoes.then((res) => {
    //     // console.log(res.data)
    //     setSessoes(res.data) 
    //   })
  
    //   requisicaoSessoes.catch((err) => {
    //     // console.log(err.response.data)
    
    //     setError(true) // mas seto o erro como true para mostrar a mensagem de erro
    //   })
    // }, [])
  
  

    // if (error === true) {
    //   return <div>Erro na requisição! Tente de novo</div>
    // }
  
    
    // if (!error && sessoes === undefined) {
    //   return <div>Carregando...</div>
    // }
   

    return (  
            // <Link to="/sessoes">
            <Link to={`/sessoes/${id}`}>
                <li><img src={url} /></li>          
            </Link>
    );

}




