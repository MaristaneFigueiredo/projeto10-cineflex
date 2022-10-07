// import styled from "styled-components"
import { Link } from "react-router-dom";






export default function Filmes({id, title, url}) {  

   

    return (              
            <Link data-identifier="movie-outdoor" to={`/sessoes/${id}`}>
                <li><img src={url} /></li>          
            </Link>
    );

}




