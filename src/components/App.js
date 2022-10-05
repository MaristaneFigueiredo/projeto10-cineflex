
import { GlobalStyle } from "../assets/css/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";


import PrincipalPage from "./PrincipalPage";
// import FilmesPage from "./Filmes";
import RodapePage from "./RodapePage";
import SessoesPage from "./SessoesPage";
import AssentosPage from "./AssentosPage";
import AssentoPage from "./AssentoPage";
import PedidoPage from "./PedidoPage";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            
            <Routes>
                {/* Cada rota tem que estar em Route */}
                <Route path="/" element={<PrincipalPage/>} />
                {/* <Route path="/filmes" element={<FilmesPage />} /> */}
                <Route path="/rodape" element={<RodapePage />} />
                <Route path="/sessoes" element={<SessoesPage />} />
                <Route path="/assentos" element={<AssentosPage />} />
                <Route path="/assento" element={<AssentoPage />} />
                <Route path="/pedido" element={<PedidoPage />} />

            </Routes>
        </BrowserRouter>

    );
}