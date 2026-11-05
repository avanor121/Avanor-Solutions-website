import { createRoot } from "react-dom/client";
import App from "./App";
import PlasticSurgeons from "./vsl/PlasticSurgeons";
import TradeVSL from "./vsl/TradeVSL";
import "./style.css";
import "./art-direction.css";
import "./live-overrides.css";
const path = location.pathname.replace(/\/$/, "");
createRoot(document.getElementById("root")!).render(document.documentElement.dataset.page === "plastic-surgeons" || path === "/plastic-surgeons" ? <PlasticSurgeons /> : path === "/plumbers" ? <TradeVSL kind="plumbers" /> : path === "/window-siding-replacement" ? <TradeVSL kind="window-siding-replacement" /> : <App />);
