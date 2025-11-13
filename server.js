const express = require("express");
const serverless = require("serverless-http");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const SUPABASE_URL = 'https://npnhsysnwlimuoyijorm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbmhzeXNud2xpbXVveWlqb3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5OTMzMDQsImV4cCI6MjA3ODU2OTMwNH0.ImUGL4NxqeO2KPPUk-ZwTrsJ2UcSK-sTgYCg_yaNjck';

const db = createClient(SUPABASE_URL, SUPABASE_KEY);

app.get("/", async (req, res) => {
  const { data, error } = await db.from("blog").select();
  if (error) {
    return res.status(500).json({ error });
  }
  res.json({ data });
});

app.post("/", async (req, res) => {
  const { title, image_url, desc } = req.body;
  const { data, error } = await db.from("blog").insert({ title, image_url, desc });
  if (error) {
    return res.status(500).json({ error });
  }
  res.json({ data });
});

module.exports.handler = serverless(app);
