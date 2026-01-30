import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppPortal from "./App.portal.tsx";
import "./index.css";

// Check if this is portal deployment
const isPortal = import.meta.env.VITE_IS_PORTAL === "true" || 
                 window.location.hostname.includes("pinterest-portal");

// Use portal app if on portal domain, otherwise use regular app
const AppComponent = isPortal ? AppPortal : App;

createRoot(document.getElementById("root")!).render(<AppComponent />);
