import { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
      // navigate('/', {replace: true})
    } catch (e) {
      console.log(e);
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "800px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-2" type="submit">
                Reset Passord
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              <Link to="/login">Login</Link>
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

export default ForgotPassword;
