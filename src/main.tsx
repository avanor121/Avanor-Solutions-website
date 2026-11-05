import { createRoot } from "react-dom/client";
import App from "./App";
import PlasticSurgeons from "./vsl/PlasticSurgeons";
import "./style.css";
import "./art-direction.css";
createRoot(document.getElementById("root")!).render(document.documentElement.dataset.page === "plastic-surgeons" || location.pathname.replace(/\/$/, "") === "/plastic-surgeons" ? <PlasticSurgeons /> : <App />);
