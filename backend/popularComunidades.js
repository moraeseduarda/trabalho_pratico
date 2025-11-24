import mongoose from "mongoose";
import 'dotenv/config';
import Comunidade from "./models/Comunidade.js";
import { comunidadesLiterarias } from "./data/comunidades.js";

async function popularComunidades() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    for (const comunidade of comunidadesLiterarias) {
      const existente = await Comunidade.findOne({ nome: comunidade.nome });

      if (!existente) {
        await Comunidade.create(comunidade);
        console.log(`Comunidade "${comunidade.nome}" criada!`);
      } else {
        console.log(`Comunidade "${comunidade.nome}" já existe!`);
      }
    }

    await mongoose.disconnect();
    console.log("Processo finalizado!");
  } catch (error) {
    console.error("Erro ao popular comunidades:", error);
  }
}

popularComunidades();
