import { createRoot} from "react-dom/client"
import "./tailwind.css"
import FormMahasiswa from "./FormMahasiswa"

createRoot(document.getElementById("root")).render(
  <div>
    <FormMahasiswa />
  </div>
)