import express from "express";
import fetch from "node-fetch";

const app = express();

// 👇 Укажи свои данные
const userId = "403395020";             // твой id ВК
const token = "vk1.a.ZPP5U4HizUMKNrzxRKgzynP9dOBtC64GJVNs3E7dYynDnBSH0rCQvh7_WzYiop-IOEkE8GlPKSEfV6c9MB4pzk2AsPefSvcCk3WcEWy0TKDx5J60lVbXeDVI7XcvZQxcv-Ov4a1C0mipUNDIDOtH7ZN913B5hBZG17KMQ-vfo3lr12_3YaOa5Tk42UkxuoOqkXbGKXEKPphXDi-VNfV7Vg";        // вставь сюда актуальный токен

app.get("/", async (req, res) => {
  try {
    // 1️⃣ Пытаемся получить трек через audio.getBroadcast
    const apiBroadcast = `https://api.vk.com/method/audio.getBroadcast?owner_id=${userId}&access_token=${token}&v=5.131`;
    const r1 = await fetch(apiBroadcast);
    const j1 = await r1.json();

    const a = j1?.response?.items?.[0];
    if (a?.artist && a?.title) {
      return res.send(`🎧 ${a.artist} — ${a.title}`);
    }

    // 2️⃣ Если пусто — пробуем взять статус профиля
    const apiStatus = `https://api.vk.com/method/users.get?user_ids=${userId}&fields=status&access_token=${token}&v=5.131`;
    const r2 = await fetch(apiStatus);
    const j2 = await r2.json();

    const statusText = j2?.response?.[0]?.status || "";

    // 3️⃣ Проверяем, есть ли в статусе что-то похожее на музыку
    if (statusText && (statusText.includes("—") || statusText.includes("-"))) {
      return res.send(`🎧 ${statusText}`);
    }

    // 4️⃣ Если вообще ничего
    if (j1?.response?.enabled === 1) {
      return res.send("🚫 Музыкальный статус включён, но ничего не играет");
    }

    if (j1?.error) {
      return res.send(`⚠️ Ошибка VK API: ${j1.error.error_msg}`);
    }

    res.send("❔ Не удалось определить трек");
  } catch (e) {
    res.send("💥 Ошибка запроса: " + e.message);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Порт ${PORT}`));

