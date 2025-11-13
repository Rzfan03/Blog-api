const express = require("express");
const serverless = require("serverless-http");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const SUPABASE_URL = 'https://npnhsysnwlimuoyijorm.supabase.co';
const SUPABASE_KEY = 'YOUR_KEY_HERE';
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
