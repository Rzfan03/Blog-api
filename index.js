const express = require("express");
const serverless = require("serverless-http");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const SUPABASE_URL = 'https://npnhsysnwlimuoyijorm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbmhzeXNud2xpbXVveWlqb3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjk5MzMwNCwiZXhwIjoyMDc4NTY5MzA0fQ.b8l-OGVE66tOh2hql8ssnq11_ipC_2F1be18bX-C6SI';

const db = createClient(SUPABASE_URL, SUPABASE_KEY);

app.get("/", async (req, res) => {
    try {
        const { data, error } = await db.from("blog").select();
        if (error) throw error;
        res.json({ data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.post("/", async (req, res) => {
    try {
        const { title, image_url, desc } = req.body;
        const { data, error } = await db.from("blog").insert({ title, image_url, desc });
        if (error) throw error;
        res.json({ data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;
module.exports.handler = serverless(app);
