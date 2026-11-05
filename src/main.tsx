import { createRoot } from "react-dom/client";
import App from "./App";
import PlasticSurgeons from "./vsl/PlasticSurgeons";
import TradeVSL from "./vsl/TradeVSL";
import { ServicesOverview, ServiceDetail } from "./services/Services";
import "./style.css";
import "./art-direction.css";
import "./live-overrides.css";
const path = location.pathname.replace(/\/$/, "");
const serviceMatch = path.match(/^\/services\/([a-z0-9-]+)$/);
const page =
  document.documentElement.dataset.page === "plastic-surgeons" ||
  path === "/plastic-surgeons" ? (
    <PlasticSurgeons />
  ) : path === "/plumbers" ? (
    <TradeVSL kind="plumbers" />
  ) : path === "/window-siding-replacement" ? (
    <TradeVSL kind="window-siding-replacement" />
  ) : path === "/services" ? (
    <ServicesOverview />
  ) : serviceMatch ? (
    <ServiceDetail slug={serviceMatch[1]} />
  ) : (
    <App />
  );
createRoot(document.getElementById("root")!).render(page);
