import styled from "styled-components"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import Cabecalho from "./Cabecalho";
import { Container, Paragrafo, Botao } from "../assets/css/GlobalStyle";



export default function AssentosPage() {
    const [ids, setIds] = useState([]);
    const [ingressos, setIngressos] = useState([])
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate()

    const { idSessao } = useParams();
    const [assentos, setAssentos] = useState(undefined)
    const [error, setError] = useState(false)

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
        const requisicaoAssentos = axios.get(URL)

        requisicaoAssentos.then((res) => {
            console.log('resposta assentos', res.data)
            setAssentos(res.data)
        })

        requisicaoAssentos.catch((err) => {
            // console.log(err.response.data)    
            setError(true)
        })
    }, [])



    if (error === true) {
        return <div>Erro na requisição! Tente de novo</div>
    }


    if (!error && assentos === undefined) {
        return <div>Carregando...</div>
    }


    function adicionarAssentos(assento) {
        if (assento.isAvailable === false) {
            alert("Perdeu a vez, assento indisponível!")
            return;
        }

        let arrIds = [...ids]
        let arrNum = [...ingressos]

     
        if (assento.isAvailable === true && !ids.includes(assento.id)) {  // estou testando se o assento está disponível e não selecionado, salvar no array
            arrIds = [...ids, assento.id]
            arrNum = [...ingressos, assento.name]
        } else {
            // console.log('passei no else')
            arrIds = arrIds.filter(
                (a) => {
                    if (a !== assento.id) {                 
                        return a;
                    }
                }
            )

            arrNum = arrNum.filter(
                (a) => {
                    if (a !== assento.name) {                 
                        return a;
                    }
                }
            )


        }
      
        setIds(arrIds)
        setIngressos(arrNum)
        console.log('arrIds', arrIds)
        console.log('arrNum', arrNum)
        
    }

    function listarAssentos(assento) {
        // console.log(assento.name)
        return (
            <div key={assento.name} data-identifier="seat">

                {/* <BotaoAssento onClick={() =>adicionarAssentos(assento)} key={assento.name} 
                  CorBotao={ (assento.isAvailable===true && !ids.includes(assento.id)) ? "#C3CFD9": (assento.isAvailable===true && ids.includes(assento.id)) ? "#1AAE9E" : "#FBE192" }                  
                  CorBorda={ (assento.isAvailable===true && !ids.includes(assento.id)) ? "#808F9D": (assento.isAvailable===true && ids.includes(assento.id)) ? "#0E7D71" : "#F7C52B" }>  
                    {(assento.name.length === 2) ? assento.name :`0${assento.name}`}                  
                </BotaoAssento> */}

                {(assento.isAvailable && ids.includes(assento.id)) ? 
                    <BotaoAssento data-identifier="seat-selected-subtitle" onClick={() => adicionarAssentos(assento)} CorBotao="#1AAE9E" CorBorda="#0E7D71">                        
                        {(assento.name.length === 2) ? assento.name :`0${assento.name}`}         
                    </BotaoAssento>
                    : (assento.isAvailable && !ids.includes(assento.id)) ? 
                    <BotaoAssento data-identifier="seat-available-subtitle" onClick={() => adicionarAssentos(assento)} CorBotao="#C3CFD9" CorBorda="#808F9D">                  
                        {(assento.name.length === 2) ? assento.name :`0${assento.name}`}         
                    </BotaoAssento>
                        //Indisponível
                    : <BotaoAssento data-identifier="seat-unavailable-subtitle" onClick={() => adicionarAssentos(assento)} CorBotao="#FBE192" CorBorda="#F7C52B">                       
                            {(assento.name.length === 2) ? assento.name :`0${assento.name}`}         
                      </BotaoAssento>}

            </div>
        )
    }

    function adicionarReserva(event) {
        event.preventDefault() // não deixa o formulário submeter limpando automaticamente a tela, o que acarretaria apagar os estados e como eu mandaria isso para o servidor

        const URL = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many"

        const body = {
            ids: ids,
            name: name,
            cpf: cpf
        }//corpo da minha requisicao

        const promessa = axios.post(URL, body)

        promessa.then(() => {
            alert("reserva feita")
            //mudar de página
            //  navigate("/") // tela inicial
            navigate("/sucesso", { state: { ids, ingressos, name, cpf, filme: assentos.movie.title, dia: assentos.day.weekday, data: assentos.day.date, hora:assentos.name} }) 

        })


        promessa.catch((erro) =>
            console.log(erro.response.data)

        );
    }



    return (
        <>
            <Cabecalho />
            <Container>
                <Paragrafo>Selecione o(s) assento(s)</Paragrafo>

                <Assento>
                    {assentos.seats.map((assento) => listarAssentos(assento))}
                </Assento>

                <ContainerLegendaAssento>
                    <div>
                        <LegendaAssento CorFundo="#1AAE9E" CorBorda="#0E7D71" />
                        <p>Selecionado</p>
                    </div>
                    <div>
                        <LegendaAssento CorFundo="#C3CFD9" CorBorda="#808F9D" />
                        <p>Disponível</p>
                    </div>
                    <div>
                        <LegendaAssento CorFundo="#FBE192" CorBorda="#F7C52B" />
                        <p>Indisponível</p>
                    </div>
                </ContainerLegendaAssento>

                <form onSubmit={adicionarReserva}>

                    <FormularioCompra>
                        <label forHTML="comprador">Nome do comprador:</label>
                        <span><input
                            data-identifier="buyer-name-input"
                            id="comprador"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Digite seu nome..."
                            required
                        /></span>

                        <label forHTML="cpf">CPF do comprador:</label>
                        <span><input
                            data-identifier="buyer-cpf-input"
                            id="cpf"
                            onChange={e => setCpf(e.target.value)}
                            value={cpf}
                            type="text"
                            placeholder="Digite seu CPF..."
                            required
                        /></span>
                    </FormularioCompra>

                    <BotaoCentralizado>
                        <Botao data-identifier="reservation-btn" type="submit" width="225px" height="42px">Reservar assento(s)</Botao>
                    </BotaoCentralizado>

                </form>

            </Container>

            <Footer display="display">
                <img data-identifier="movie-img-preview" src={assentos.movie.posterURL} alt="imagem filme" />

                <div data-identifier="movie-and-session-infos-preview">
                    <h1>{assentos.movie.title}</h1>
                    <p> {`${assentos.day.weekday} - ${assentos.day.date} - ${assentos.name}`}</p>
                </div>
            </Footer>

        </>
    )
}


const Assento = styled.div`
    /* width: 100vw; */
    display: flex; 
    flex-wrap: wrap;
    gap: 7px;
    margin-bottom: 24px;

`

const BotaoAssento = styled.button`

    background: ${props => props.CorBotao};
    border: 1px solid;
    border-color:${props => props.CorBorda};
    border-radius: 12px;
    width: 26px;
    height: 26px;
    align-items: center;
    margin-bottom: 7px;
    
    
`
const ContainerLegendaAssento = styled.div`
    display:flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 20px;
    
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #4E5A65;
        font-size: 13px;
    }
`
const LegendaAssento = styled.div`
    border: 1px solid;
    border-radius: 50%;
    padding: 5px;
    width: 30px;
    height: 30px;
    background-color: ${props => props.CorFundo};
    border-color: ${props => props.CorBorda}

`


const BotaoCentralizado = styled.div`
text-align: center;
padding: 20px;
`

const FormularioCompra = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
margin-top: 42px;
margin-bottom: 15px;

    label {
        color: #293845;
        font-size: 18px;
        font-weight: 400;
    }

    span {
        border: 1px solid #D4D4D4;
        border-radius: 3px;
    }

    input {
        border: none;
        outline: none;
        height: 51px;
        font-weight: 400;
        font-size: 18px;

        ::placeholder {
            font-style: italic;
            font-weight: 400;
            font-size: 18px;
            color: #AFAFAF;

        }
    }
`

const Footer = styled.div`
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
