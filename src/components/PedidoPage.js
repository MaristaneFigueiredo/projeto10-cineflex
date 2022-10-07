import Cabecalho from "./Cabecalho"
import { Container, Paragrafo, Botao, P } from "../assets/css/GlobalStyle";
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"



export default function PedidoPage() {

    const { state } = useLocation();
  

    return (
        <>
            <Cabecalho />
            <Container data-identifier="movie-session-infos-reserve-finished">
              
          
                <Titulo>        
                    Pedido feito com sucesso!
                </Titulo>
                <P estiloFonte="bold" alinhamento="left" espacamentoBottom="10px">Filme e sessão</P>
                <P estiloFonte="regular" alinhamento="left" espacamentoBottom="7px">{state.filme}</P>
                <P estiloFonte="regular" alinhamento="left" espacamentoBottom="40px">{state.data} {state.hora} </P>
                
                <P estiloFonte="bold" alinhamento="left" espacamentoBottom="10px">Ingressos</P>
                {state.ingressos.map((ingresso) => {
                  
                    return (
                        <P data-identifier="seat-infos-reserve-finished" key={ingresso} estiloFonte="regular" alinhamento="left" espacamentoBottom="10px">Assento {ingresso}</P>
                    )
                })}


                <P estiloFonte="bold" alinhamento="left" espacamentoBottom="10px" espacamentoTop="40px">Comprador</P>
                <P estiloFonte="regular" alinhamento="left" espacamentoBottom="7px">Nome: {state.name}</P>
                <P estiloFonte="regular" alinhamento="left" espacamentoBottom="70px">CPF: {state.cpf} </P>
                <BotaoCentralizado>
                    <Link to="/"><Botao data-identifier="back-to-home-btn" width="225px" height="42px">Voltar para Home</Botao></Link>


                </BotaoCentralizado>
            </Container>

        </>
    )
}


const BotaoCentralizado = styled.div`
    text-align: center;
    padding: 20px;
    cursor: pointer;
`

const Titulo = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
   
    letter-spacing: 0.04em;
    flex-wrap: wrap;
    color: #247A6B;

    margin-top: 40px; 
    margin-bottom: 50px;
    width: 100vw;

`