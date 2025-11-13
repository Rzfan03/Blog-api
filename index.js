const express = require("express");
const supabase = require("@supabase/supabase-js");
const app = express();
const PORT = 2008;
const SUPABASE_URL = 'https://npnhsysnwlimuoyijorm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbmhzeXNud2xpbXVveWlqb3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5OTMzMDQsImV4cCI6MjA3ODU2OTMwNH0.ImUGL4NxqeO2KPPUk-ZwTrsJ2UcSK-sTgYCg_yaNjck';

app.use(express.json())
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

app.get("/", async (request, response) => {
    const getBlog = await db.from("blog").select();
    console.log(getData);
    response.json({ getBlog })
})


app.post("/", async (request, response ) => {
    const {title, image_url, desc} = request.body
    const createPostData = await db.from("blog").insert({title, image_url, desc})
    console.log("🍛 ~ app.post ~ createPost:", createPostData)



    response.send("OK")
})

app.listen(PORT, () => {
    console.log("server berhasil jalan di port", PORT)
})