import styled from "styled-components"
import { Container, Paragrafo, Botao } from "../assets/css/GlobalStyle";

import Cabecalho from "./Cabecalho";



import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"

export default function SessoesPage() {

    const { idFilme } = useParams(); 
    const [sessoes, setSessoes] = useState(undefined) 

 
    const [error, setError] = useState(false)
  
    useEffect(() => {
      const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
      const requisicaoSessoes = axios.get(URL)
  
      requisicaoSessoes.then((res) => {
        // console.log(res.data)
        setSessoes(res.data) 
      })
  
      requisicaoSessoes.catch((err) => {
        // console.log(err.response.data)    
        setError(true) 
      })
    }, [])
  
  

    if (error === true) {
      return <div>Erro na requisição! Tente de novo</div>
    }
  
    
    if (!error && sessoes === undefined) {
      return <div>Carregando...</div>
    }
   

   
    

    
    function listarSessoes(sessao) {

        // console.log('listarSessoes =', sessao)
        return (
            <div key={sessao.id}>
                <Texto>{`${sessao.weekday} - ${sessao.date}`}</Texto>
                {sessao.showtimes.map((horario) => {
                    // console.log('horario =', horario)
                    return (
                        <Link to={`/assentos/${horario.id}`}>
                        {/* <Link to={`/assentos`}> */}
                             <Botao key={horario.id} width="82px" height="43px" marginRight="8px">{horario.name}</Botao>
                        </Link>

                    )
                } )}
 
            </div>
        )
    }

    



    
    
    return(
        <>
        <Cabecalho />
        <Container>
            <Paragrafo>Selecione o horário</Paragrafo>

            {sessoes.days.map( (sessao) => listarSessoes(sessao))}

            {/* <Texto>Quinta-feira - 24/06/2021</Texto>
            <Botao width="82px" height="43px" marginRight="8px">15:00</Botao>
            <Botao width="82px" height="43px" marginRight="8px">19:00</Botao>       */}
            
        </Container>

        <Footer display="none">           
            <img src={sessoes.posterURL} alt="imagem filme"/>
            <div>
                
                <h1>{sessoes.title}</h1>
                <p> Quinta-feira - 15:00</p>
            </div>
        </Footer>
        </>
    );
}


const Texto = styled.h1 `
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.02em;
    color: #293845;
    margin-top: 10px;
    margin-bottom: 22px;
`


const Footer =styled.div `
    width: 100vw;
    height: 117px;
    background-color: #DFE6ED;    
    border: 1px solid #9EADBA;
    display: flex;  
    align-items: center;
    position: fixed;
    bottom: 0;   
    img{
        width: 64px;
        height: 89px;         
        border: 8px #FFF solid;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 2px; 

        margin-right: 14px ;
        margin-left: 10px;
    }

    div{
        display: flex;
        flex-direction: column;
        justify-content: center;

    }

    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
        color: #293845;
        
    }

    p{
        display: ${props => props.display};        
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
        color: #293845;
        
        
    }    

`