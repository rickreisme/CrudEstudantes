const express = require("express");
const server = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

server.use(cors());
server.use(express.json());

const senhaBD = process.env.DB_PASSWORD;
const userBD = process.env.DB_USER;
const nomeBD = process.env.DB_NAME;
const portBD = process.env.DB_PORT;
const hostBD = process.env.DB_HOST;

const estudantesPath = path.join(__dirname, "estudantes.json");

const pool = new Pool({
  user: userBD,
  host: hostBD,
  database: nomeBD,
  password: senhaBD,
  port: portBD,
});

const getEstudantes = async () => {
  const client = await pool.connect();

  try {
    const res = await client.query("SELECT * FROM tb_estudante");
    return res.rows;
  } finally {
    client.release();
  }
};

const getEstudante = async (id) => {
  const client = await pool.connect();

  try {
    const res = await client.query("SELECT * FROM tb_estudante WHERE id = $1", [
      id,
    ]);
    return res.rows;
  } finally {
    client.release();
  }
};

server.get("/estudantes", async (req, res) => {
  try {
    const estudantesData = await getEstudantes();
    return res.json({ estudantes: estudantesData });
  } catch (error) {
    console.error("Erro ao buscar estudantes: ", error);
    return res.status(500).json({ error: "Erro ao buscar estudantes" });
  }
});

server.get("/estudantes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const estudanteData = await getEstudante(id);

    if (estudanteData.length === 0) {
      return res.status(404).json({ error: "Estudante não encontrado!" });
    }
    return res.json({ estudante: estudanteData[0] });
  } catch (error) {
    console.error("Erro ao buscar estudante: ", error);
    return res.status(500).json({ error: "Erro ao buscar estudante" });
  }
});

server.post("/estudantes", async (req, res) => {
  const { nome, curso, email, telefone } = req.body;

  console.log("Dados recebidos:", { nome, curso, email, telefone });

  try {
    const result = await pool.query(
      `INSERT INTO tb_estudante (nome, curso, email, telefone) VALUES ($1, $2, $3, $4) RETURNING *`,
      [nome, curso, email, telefone]
    );

    res.status(201).json({
      message: "Estudante adicionado com sucesso!",
      estudante: result.rows[0],
    });
  } catch (err) {
    console.error("Erro ao adicionar estudante: ", err);
    res.status(500).json({ error: "Erro ao adicionar estudante" });

    if (err.code === "23505") {
      res
        .status(409)
        .json({ error: "Email já registrado. Por favor, use outro email!" });
    } else {
      res.status(500).json({ error: "Erro ao adicionar estudante" });
    }
  }
});

server.put("/estudantes/:id/editar", async (req, res) => {
  const { id } = req.params;
  const { nome, curso, email, telefone } = req.body;

  console.log("Dados recebidos para atualização:", {
    id,
    nome,
    curso,
    email,
    telefone,
  });

  if (!id || !nome || !curso || !email || !telefone) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  try {
    const result = await pool.query(
      `UPDATE tb_estudante
        SET nome = $1, curso = $2, email = $3, telefone = $4
        WHERE id = $5
        RETURNING*`,
      [nome, curso, email, telefone, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Estudante não encontrado!" });
    }

    res.status(200).json({
      message: "Estudante atualizado com sucesso!",
      estudante: result.rows[0],
    });
  } catch (err) {
    console.error("Erro ao atualizar estudante: ", err);
    res.status(500).json({ error: "Erro ao atualizar estudante" });
  }
});

server.delete("/estudantes/:id/excluir", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM tb_estudante
        WHERE id = $1
        RETURNING*`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Estudante não encontrado!" });
    }

    res.status(200).json({
      message: "Estudante excluído com sucesso!",
      estudante: result.rows[0],
    });
  } catch (err) {
    console.error("Erro ao excluir estudante: ", err);
    res.status(500).json({ error: "Erro ao excluir estudante" });
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
