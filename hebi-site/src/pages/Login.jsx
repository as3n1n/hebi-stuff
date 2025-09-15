import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    if (user && pass) navigate("/verify");
  };

  return (
    <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-glow animate-fadeInUp">
      <h2 className="text-3xl font-bold text-primary mb-4 text-center">Login</h2>
      <form className="flex flex-col gap-4" onSubmit={handle}>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="p-3 rounded-lg bg-dark border border-surface focus:border-primary outline-none text-text"
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="p-3 rounded-lg bg-dark border border-surface focus:border-primary outline-none text-text"
        />
        <Button type="submit" className="mt-4">Login</Button>
      </form>
    </div>
  );
}
