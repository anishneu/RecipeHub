import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';
import Footer from './Footer';

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.auth.userType);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="rh-layout">
      <Navbar className="rh-navbar" variant="dark" expand="lg">
        <Container fluid className="site-wrap site-wrap--nav">
          <Navbar.Brand as={Link} to="/">
            Recipe Hub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!userType && <Nav.Link as={Link} to="Home">Home</Nav.Link>}
              {userType === 'chef' && <Nav.Link as={Link} to="Chef">Home</Nav.Link>}
              {userType === 'user' && <Nav.Link as={Link} to="User">Home</Nav.Link>}
              {userType === 'admin' && <Nav.Link as={Link} to="Admin">Home</Nav.Link>}

              {userType !== 'admin' && <Nav.Link as={Link} to="About">About</Nav.Link>}

              {userType === 'chef' && (
                <>
                  <Nav.Link as={Link} to="/createrecipe">Create</Nav.Link>
                  <Nav.Link as={Link} to="/viewrecipes">View</Nav.Link>
                  <Nav.Link as={Link} to="/UpdateRecipes">Manage</Nav.Link>
                  <NavDropdown title="Account" id="chef-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/editprofile">Edit Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/ViewNews">News & Updates</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/Support">Support</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}

              {userType === 'user' && (
                <>
                  <Nav.Link as={Link} to="RecipeList">Recipes</Nav.Link>
                  <Nav.Link as={Link} to="SavedRecipes">Favourites</Nav.Link>
                  <NavDropdown title="Account" id="user-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/editprofile">Edit Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/ViewNews">News & Updates</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/Support">Support</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}

              {userType === 'admin' && (
                <>
                  <Nav.Link as={Link} to="/AllPages">Manage</Nav.Link>
                  <Nav.Link as={Link} to="/News">News</Nav.Link>
                  <NavDropdown title="Account" id="admin-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/editprofile">Edit Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/Support">Support</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>

            {!userType && (
              <Nav>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="rh-layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
