import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "./Login";
import Verify from "./Verify";
import Invite from "./Invite";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/invite" element={<Invite />} /> {/* ✅ nouvelle page */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
