// importando components do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

// Importação de componentes
import NavBarra from "../components/NavBarra";

// Importando o hook useState para monitorar a mudança das variáveis
import { useState, useEffect } from "react";

//Importação do navigate pra transitar entre páginas
import { useNavigate } from "react-router-dom";

// Url da api
const urlCate = "http://localhost:5000/categorias";

const EditarProduto = () => {
//Lista com categorias
const [categorias, setCategorias] = useState([]);
//UseEffect pra puxar os dados da api
useEffect(() => {
 async function fetchData() {
 try {
 const req = await fetch(urlCate);
 const cate = await req.json();
 console.log(cate);
 setCategorias(cate);
 } catch (erro) {
 console.log(erro.message);
 }
 }
 fetchData();
}, []);

 //Link produto sem imagem
 const linkImagem =
 "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png";

 //Variáveis para o produto
 const [nome, setNome] = useState("");
 const [tipo, setTipo] = useState("");
 const [raca, setRaca] = useState("Eletrônicos");
 const [vacina, setVacina] = useState("");
 const [imagemUrl, setImagemUrl] = useState("");

 //Variáveis para o alerta
 const [alertClass, setAlertClass] = useState("mb-3 d-none");
 const [alertMensagem, setAlertMensagem] = useState("");
 const [alertVariant, setAlertVariant] = useState("danger");

 // Criando o navigate
 const navigate = useNavigate();

 // Código para pegar url atual, jogar em um array, e pedar o ultimo elemento 
 const params = window.location.pathname.split("/")
 const idProd = params[params.length - 1]

 //Buscar as informações do produto
 useEffect(() => {
 async function fetchData() {
 try{
 const req = await fetch(`http://localhost:5000/produtos/${idProd}`)
 const prod = await req.json()
 console.log(prod)
 setNome(prod.nome)
 setTipo(prod.tipo)
setRaca(prod.raca)
 setVacina(prod.vacina)
 setImagemUrl(prod.imagemUrl == "" ? "" : prod.imagemUrl)
 } 
 catch(error){
 console.log(error.message)
 }
 }
 fetchData()
 }, []);


 //Função pra lidar com o envio dos dados
 const handleSubmit = async (e) => {
 //Previne a página de ser recarregada
 e.preventDefault();

 if (nome != "") {
 if (tipo != "") {
 if (raca != "") {
 const produto = { nome, tipo, raca, vacina, imagemUrl };
 console.log(produto);
 try {
 const req = await fetch(`http://localhost:5000/produtos/${idProd}`, {
 method: "PUT",
 headers: { "Content-type": "application/json" },
 body: JSON.stringify(produto),
 });
 const res = req.json();
 console.log(res);
 setAlertClass("mb-3 mt-2");
 setAlertVariant("success");
 setAlertMensagem("INformações editadas com sucesso");
 alert("Informações editadas com sucesso");
 // navigate("/home");
 } 
 catch (error) {
 console.log(error);
 }
 } 
 else {
 setAlertClass("mb-3 mt-2");
 setAlertMensagem("O campo nome não pode ser vazio");
 }
 } else {
 setAlertClass("mb-3 mt-2");
 setAlertMensagem("O campo tipo não pode ser vazio");
 }
 } else {
 setAlertClass("mb-3 mt-2");
 setAlertMensagem("O campo raça não pode ser vazio");
 }
 };


 return (
 <div>
 <NavBarra />
 <Container>
 <br /><br /><br />
 <h1>Editar Informações do animal</h1>
 <br /><br /><br />
 <form className="mt-3" onSubmit ={handleSubmit}>
 <Row>
 <Col xs={6}>


 {/* Escrever o nome do animal */}
 <FloatingLabel
 controlId="floatingInputNome"
 label="Nome"
 className="mb-3"
 >
 <Form.Control
 type="text"
 placeholder="Digite o nome do Animal..."
 value={nome}
 onChange={(e) => {
 setNome(e.target.value);
 }}
 />
 </FloatingLabel>



 {/* Escrever qual e a raça do animal */}
 <FloatingLabel
 controlId="floatingInputDescricao"
 label="Raça"
 className="mb-3"
 >
 <Form.Control
 type="text"
 placeholder="Digite a raça do animal..."
 value={raca}
 onChange={(e) => {
 setRaca(e.target.value);
 }}
 />
 </FloatingLabel>



 {/* Selecionar o Tipo do animal */}
 <Form.Group controlId="formGridTipo" className="mb-3">
 <br /><br />
 <Form.Label>Tipo do Animal</Form.Label>
 <br /><br />
 <Form.Select
 value={tipo}
 onChange={(e) => {
 setTipo(e.target.value);
 }}
 >
 {categorias.map((cat) => (
 <option key={cat.id} value={cat.nome}>
 {cat.nome}
 </option>
 ))}
 </Form.Select>
 </Form.Group>



 {/* Selecionar o tipo de vacinação do animal*/}
 <FloatingLabel
 controlId="floatingInputPreco"
 label="Digite se o seu animal e vacinado ou nao..."
 className="mb-3"
 >
 <Form.Control
 type="text"
 placeholder="Digite se o seu animal e vacinado ou nao..."
 value={vacina}
 onChange={(e) => {
 setVacina(e.target.value);
 }}
 />
 </FloatingLabel>
 </Col>
 <Col xs={6}>
 <Form.Group controlId="formFileLg" className="mb-3">

 
 {/* Caixinha de imagem do animal do cliente */}
 <FloatingLabel
 controlId="floatingInputImagem"
 label="Envie o link da imagem do Animal"
 className="mb-3"
 >
 <Form.Control
 type="text"
 placeholder="Envie o link da imagem do Animal"
 value={imagemUrl}
 onChange={(e) => {
 setImagemUrl(e.target.value);
 }}
 />
 </FloatingLabel>

 <Image
 src={imagemUrl == "" ? linkImagem : imagemUrl}
 rounded
 width={300}
 height={300}
 />
 </Form.Group>
 </Col>
 </Row>

 {/* Alerta caso haja erro */}
 <Alert variant={alertVariant} className={alertClass}>
 {alertMensagem}
 </Alert>

 {/* Botão para enviar o formulário de cadastro de produto */}
 <Button variant="primary" size="lg" type="submit">
 Editar
 </Button>
 </form>
 </Container>
 </div>
 );
};

export default EditarProduto;