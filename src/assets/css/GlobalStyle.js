// criar estilos globais é necessário importar p styled components permitir essa estilização

import { createGlobalStyle } from "styled-components";
import styled from "styled-components"



const GlobalStyle = createGlobalStyle `
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

* {
	box-sizing: border-box;
	
  }

  body {
	font-family: 'Roboto', serif;
  }
  

`


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 0 30px 0 25px;

`

const Botao = styled.button`
	background-color: #E8833A ;
	width: ${props => props.width};
	height: ${props => props.height};
	color: #FFF;
	font-family: 'Roboto';
	font-size: 18px;
	border: none;
	letter-spacing: 0.02em;
	margin-right:${props => props.marginRight} ;
	margin-bottom:15px;
	cursor: pointer;


`

const Paragrafo = styled.p`
	font-size: 24px;
	font-weight: 400;
	font-family: 'Roboto';
	letter-spacing: 0.04em;
	display: flex;
	justify-content: center;
	align-items: center;

	
	
    margin: 40px 10px; 



`


const P = styled.p`
font-size: 24px;
font-weight: 400;
font-family: 'Roboto';
letter-spacing: 0.04em;
display: flex;
justify-content: ${props =>props.alinhamento};
align-items: ${props =>props.alinhamento};
margin-bottom: ${props => props.espacamentoBottom};
color: ${props => props.corTexto};
font-weight: ${props => props.estiloFonte};

margin-top: ${props => props.espacamentoTop};

`



export {
    GlobalStyle,
    Container,
	Paragrafo,
	Botao,
	P    

}