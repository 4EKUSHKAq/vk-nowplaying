import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", async (req, res) => {
  const userId = "403395020";             // твой id ВК
  const token = "vk1.a.kfAnnzMNcESHiWNtcsn5vOlrZ92BVzPUAq_kH9JYlQF4DKEZxFYqPbNdrYhElw8OQEbRSdkfe3EfuxYq3lbeeyeFpLd56wd0-88TYvF2BP2tFqCJKsuKQM7LVfpytd1zv84LR6xMIZqCLvN4HNncxXy8IbgWCRNU8okKIAbGdJqQRCcWB2b-0jJy7VNwdn1LGPHKAkB4pSOzHdJAcE4mpg";              // ← вставь сюда токен

  const api = `https://api.vk.com/method/audio.getBroadcast?owner_id=${userId}&access_token=${token}&v=5.131`;

  try {
    const r = await fetch(api);
    const j = await r.json();

    const a = j?.response?.items?.[0];
    if (a?.artist && a?.title) {
      res.send(`🎧 ${a.artist} – ${a.title}`);
    } else if (j?.response?.enabled === 1) {
      res.send("🚫 Музыкальный статус включён, но ничего не играет");
    } else if (j?.error) {
      res.send(`⚠️ Ошибка VK API: ${j.error.error_msg}`);
    } else {
      res.send("❔ Не удалось определить статус");
    }
  } catch (e) {
    res.send("💥 Ошибка запроса: " + e.message);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Порт ${PORT}`));

