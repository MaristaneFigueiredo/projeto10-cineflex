import axios from "axios";
import styled from "styled-components"

import Cabecalho from "./Cabecalho";
import Filmes from "./Filmes";

// import { FILMES } from "./dados"


import { Container, Paragrafo } from "../assets/css/GlobalStyle";
import { useEffect, useState } from "react"




export default function PrincipalPage() {
  const [filmes, setfilmes] = useState(undefined) // no começo, posso não ter filmes

  // OPCIONAL => Se eu quiser mostrar um erro na tela caso a requisição caia no catch
  const [error, setError] = useState(false)

  useEffect(() => {
    const URL = "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    const requisicaoFilmes = axios.get(URL)

    requisicaoFilmes.then((res) => {
      // console.log(res.data)
      setfilmes(res.data) // se o array de filmes chega, guardo no estado
    })

    requisicaoFilmes.catch((err) => {
      // console.log(err.response.data)

      // OPCIONAL => mostrar erro na tela
      setError(true) // mas seto o erro como true para mostrar a mensagem de erro
    })
  }, [])


  // OPCIONAL => Se a requisição deu errado (caiu no catch), renderize essa mensagem
  if (error === true) {
    return <div>Erro na requisição! Tente de novo</div>
  }

  // Se eu ainda não tive resultado da requisição de filmes, mostre o carregando
  if (!error && filmes === undefined) {
    return <div>Carregando...</div>
  }





  return (
    <Principal>
      <Cabecalho />

      <Container>
        <Paragrafo>Selecione o filme</Paragrafo>

        <FilmesContainer>
          {filmes.map((filme) => <Filmes key={filme.id} id={filme.id} title={filme.title} url={filme.posterURL} />)}

        </FilmesContainer>
      </Container>

    </Principal>


  );

}



const Principal = styled.div`
  /* background-color: #E5E5E5;  */
  background-color: #FFFFFF;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
  padding: 0px;
  padding-bottom: 200px;
`



const FilmesContainer = styled.ul`
    display:flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    img {
    height: 193px ;
    width: 129px;
    border: 8px solid #FFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  
    
 }

`


