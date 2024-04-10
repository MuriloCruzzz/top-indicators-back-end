import express from "express";
import userRoutes from "./routes/users.js";
import getLinhas from "./routes/listar_linhas_router.js";
import postParadas from "./routes/inserirParadas.js";
import cors from "cors";

const port = 8800;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

app.use("/linhas", getLinhas);

app.use("/paradas", postParadas);




app.listen(port);
console.log("Server rodando na porta "+ port + "");


/// comando CMD cd Desktop\PROJETO IFSP\IFSP-SEMESTRE-6\Projeto Integrado II\Crud Node\api