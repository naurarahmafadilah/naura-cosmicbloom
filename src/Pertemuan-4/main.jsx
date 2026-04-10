import { createRoot } from "react-dom/client"
import "./tailwind.css"
import ServiceListSearchFilter from "./ServiceListSearchFilter"

createRoot(document.getElementById("root")).render(
  <div>
    <ServiceListSearchFilter />
  </div>
)