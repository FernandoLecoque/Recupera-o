// importando components do bootstrap
import React from "react";
import CardProduto from "../components/CardProduto";
import Container from "react-bootstrap/Container";

// Importação de componentes
import NavBarra from "../components/NavBarra";

// Importando o hook useState para monitorar a mudança das variáveis
import { useState, useEffect } from "react";

// Url da api
const url = "http://localhost:5000/produtos"

const Home = () => {
    //Lista com produtos
    const [produtos, setProdutos] = useState([])
    //UseEffect pra puxar os dados da api
    useEffect(()=>{
      async function fetchData(){
        try{
            const req = await fetch(url)
            const prods = await req.json()
            console.log(prods)
            setProdutos(prods)
        }
        catch(erro){
          console.log(erro.message)
        }
      }
      fetchData()
    }, [produtos])
  
  return (
    <div>
      <NavBarra />
      <br /><br /><br />
      <h1>Registro de Animaizinhos :3</h1>
      <br /><br /><br />
      <Container>
        <div className="lista-produtos d-flex col-12 gap-2 mt-3 justify-content-start flex-wrap">
          
          {produtos.map((prod) => (
            <CardProduto
              key={prod.id}
              id={prod.id}
              nome={prod.nome}
              tipo={prod.tipo}
              raca={prod.raca}
              vacina={prod.vacina}
              imagemUrl={prod.imagemUrl}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;