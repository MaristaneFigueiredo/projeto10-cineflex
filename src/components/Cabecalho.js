import styled from "styled-components"

export default function Cabecalho(){
    return (
        <Header>
            <h1>CINEFLEX</h1>
        </Header>
    );
}



const Header =styled.div`
background-color: #C3CFD9;
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 67px;

h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #E8833A;

}


`