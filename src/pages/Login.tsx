import { FormEvent, useState } from "react";
import "./Login.scss";
import url from "../helper/api";
import storage from "../helper/storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const data = { email, password };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${url}/auth/authenticate_admin`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        const { data, token } = response;
        if (data == null) {
          setMessage("Erreur lors de la connexion.");
        } else {
          sessionStorage.setItem(storage.token, token);
          navigate("/dashboard");
        }
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-title">Connexion</div>
        <div className="login-form-message">{message}</div>
        <div style={{ marginTop: "10px" }} className="input">
          <label htmlFor="email-input">Adresse e-mail</label>
          <input
            type="email"
            id="email-input"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
            }}
            autoComplete="off"
          />
        </div>
        <div style={{ marginTop: "10px" }} className="input">
          <label htmlFor="password-input">Mot de passe</label>
          <input
            type="password"
            id="password-input"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
            autoComplete="off"
          />
        </div>
        <input
          style={{ marginTop: "10px" }}
          type="submit"
          value="Connexion"
          className="btn btn-add"
        />
      </form>
    </div>
  );
};

export default Login;
