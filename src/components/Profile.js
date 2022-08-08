import { useState } from "react";
import { Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      setError("Failed to log out");
    }
  };
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "800px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email: </strong>
            {currentUser.email}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
          <Button variant="link" onClick={() => navigate(-1) }>Back</Button>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
