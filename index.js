import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", async (req, res) => {
  const userId = "403395020";             // твой id ВК
  const token = "vk1.a.bRXs0neVIzoJ_EK1aSJrpUtT15AM1H3oMdS1RPVc0uKt6y23n3BEXI0ghmEf0fIr5zUqN9Mb1-vyqI8XIbhnUNKM9hZWovHnFaQlg_9R_IbbWBPfUf4R8e9oxL1aFHfCKon2y4m3YjDNE8JPf-4tK94kITzspt3U1IKqVr5Ot8SC84_zEug9qAUYHdvOj3Mdt7pqUUrMRHCaTlfj279oDQ";              // ← вставь сюда токен

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
