import { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
      setError("Failed to Log In");
    }

    setLoading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "800px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                  Log In
                </Button>
              </Form>
              <div className="w-100 text-center mt-2">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
      </div>
    </Container>
  );
};

export default Login;
