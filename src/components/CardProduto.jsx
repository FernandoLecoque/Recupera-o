import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardProduto = (props) => {
  // Funcao pra deletar um produto
  const handleDelete = async (e) => {
    const req = await fetch(`http://localhost:5000/produtos/${props.id}`, {
      method: "DELETE",
    });
    const res = await req.json();
    console.log(res);
    alert(`Produto ${res.nome} removido`);
  };

  return (
    <div>
      <Card style={{ width: "16rem", height: "30rem" }}>
        {/* Imagem do Card */}
        <Card.Img variant="top" src={props.imagemUrl} height="200px" />

        <Card.Body>
          {/* Título do card com nome do produto */}
          <Card.Title>{props.nome}</Card.Title>
          {/* Subtitulo no card com preco do produto */}
         
          <Card.Text>
            <b> Raça: </b> <br></br> {props.raca}
          </Card.Text>
          <Card.Text>
            <b> Tipo: </b> <br></br> {props.tipo}
          </Card.Text>
          <Card.Text>
            <b> Vacinado(a)?: </b> <br></br> {props.vacina}
          </Card.Text>

          <Card.Link href={`/produto/editar/${props.id}`}>
            <Button variant="success">Editar</Button>
          </Card.Link>

          <Card.Link href="/home">
            <Button variant="warning" type="button" onClick={handleDelete}>
              Adotar
            </Button>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProduto;
