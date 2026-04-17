import { Router } from "express";
import { listTodos, getTodo, createTodo, updateTodo, deleteTodo } from "./todo.service";

export const todoRouter = Router();

todoRouter.get("/", async (_req, res) => res.json(await listTodos()));

todoRouter.get("/:id", async (req, res) => {
  const todo = await getTodo(Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "Not found" });
  res.json(todo);
});

todoRouter.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title is required" });
  res.status(201).json(await createTodo(title));
});

todoRouter.put("/:id", async (req, res) => {
  const todo = await updateTodo(Number(req.params.id), req.body.title, req.body.done);
  if (!todo) return res.status(404).json({ error: "Not found" });
  res.json(todo);
});

todoRouter.delete("/:id", async (req, res) => {
  const ok = await deleteTodo(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});