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
const urlProd = "http://localhost:5000/produtos";

const CadastroProduto = () => {
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
 const [raca, SetRaca] = useState("");
 const [tipo, setTipo] = useState("Cachorro");
 const [vacina, SetVacina] = useState("");
 const [imagemUrl, setImagemUrl] = useState("");

 //Variáveis para o alerta
 const [alertClass, setAlertClass] = useState("mb-3 d-none");
 const [alertMensagem, setAlertMensagem] = useState("");
 const [alertVariant, setAlertVariant] = useState("danger");

 // Criando o navigate
 const navigate = useNavigate();

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
 const req = await fetch(urlProd, {
 method: "POST",
 headers: { "Content-type": "application/json" },
 body: JSON.stringify(produto),
 });
 const res = req.json();
 console.log(res);
 setAlertClass("mb-3 mt-2");
 setAlertVariant("success");
 setAlertMensagem("Animal registrado com sucesso");
 alert("Animal registrado com sucesso");
 // navigate("/home");
 } 
 catch (error) {
 console.log(error);
 }
 } 
 else {
 setAlertClass("mb-3 mt-2");
 setAlertMensagem("O campo tipo não pode ser vazio");
 }
 } else {
 setAlertClass("mb-3 mt-2");
 setAlertMensagem("O campo raça não pode ser vazio");
 }
 } else {
 setAlertClass("mb-3 mt-2");
 setAlertMensagem("O campo nome não pode ser vazio");
 }
 };

 return (
 <div>
 <NavBarra />
 <Container>
 <br /><br /><br />
 <h1>Registrar Animais</h1>
 <br /><br /><br />
 <form className="mt-3" onSubmit ={handleSubmit}> 
 <Row>

 <Col xs={6}>
 {/* Caixinha de nome */}
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

 {/* Caixinha de descrição */}
 <FloatingLabel
 controlId="floatingInputDescricao"
 label="Raça do animal"
 className="mb-3"
 >
 <Form.Control
 type="text"
 placeholder="Digite a raça do animal..."
 value={raca}
 onChange ={(e) => {
SetRaca(e.target.value);
 }}
 />
 </FloatingLabel>

 {/* Select de categorias */}
 <Form.Group controlId="formGridTipo" className="mb-3">
 <br /><br />
 <Form.Label>Tipo de animal</Form.Label>
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

 {/* Caixinha de preço */}
 <FloatingLabel
 controlId="floatingInputPreco"
 label="Digite se seu animal e vacinado ou não..."
 className="mb-3"
 >
 <Form.Control
 type="text"
 placeholder="Digite se seu animal e vacinado ou não..."
 value={vacina}
 onChange={(e) => {
 SetVacina(e.target.value);
 }}
 />
 </FloatingLabel>
 </Col>
 <Col xs={6}>
 <Form.Group controlId="formFileLg" className="mb-3">
 {/* Caixinha de imagem */}
 <FloatingLabel
 controlId="floatingInputImagem"
 label="Envie o link da imagem do seu animal"
 className="mb-3"
 >
 <Form.Control
 type="text"
 placeholder="Envie o link da imagem do seu animal"
 value={imagemUrl}
 onChange ={(e) => {
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
 Registrar
 </Button>
 </form>
 </Container>
 </div>
 );
};

export default CadastroProduto;
