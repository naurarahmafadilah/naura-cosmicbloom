import { createRoot } from "react-dom/client"
import "./custom.css"
import Container from "./Container"
import BiodataDiri from "./BiodataDiri"

createRoot(document.getElementById("root"))
.render(
  <Container>
    <BiodataDiri/>
  </Container>
)