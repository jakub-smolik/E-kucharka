import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function BootstrapNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/" style={{textDecoration:"none"}}><Navbar.Brand>E-kuchařka</Navbar.Brand></Link>
      </Container>
    </Navbar>
  );
}

export default BootstrapNavbar;