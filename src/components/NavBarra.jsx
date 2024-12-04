// importando components do bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBarra = () => {
  const usuarioNome = localStorage.getItem("userName")

  return (
    <div>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "40px", color: "gold" }}
          >
            pets 
          </span>
          <Navbar.Brand href="/home"> Pet Unimed </Navbar.Brand>

          <Navbar.Toggle aria-controls="minha-nav" />
          <Navbar.Collapse id="minha-nav">

            <Nav className="me-auto">
              <Nav.Link href="/home" className="active">Animais</Nav.Link>
              <Nav.Link href="/produto/cadastrar">Cadastro Animais</Nav.Link>
           
            </Nav>

            <Nav className="justify-content-end">
                <Navbar.Text style={{color:"white"}}>
                  usuario:{usuarioNome}
                </Navbar.Text>

              <Nav.Link href="/login">Sair</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBarra;