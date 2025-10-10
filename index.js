import express from "express";
import fetch from "node-fetch";

const app = express();
const token = "vk1.a.ZPP5U4HizUMKNrzxRKgzynP9dOBtC64GJVNs3E7dYynDnBSH0rCQvh7_WzYiop-IOEkE8GlPKSEfV6c9MB4pzk2AsPefSvcCk3WcEWy0TKDx5J60lVbXeDVI7XcvZQxcv-Ov4a1C0mipUNDIDOtH7ZN913B5hBZG17KMQ-vfo3lr12_3YaOa5Tk42UkxuoOqkXbGKXEKPphXDi-VNfV7Vg";
const userId = "403395020";

app.get("/", async (req, res) => {
  try {
    const url = `https://api.vk.com/method/users.get?user_ids=${userId}&fields=status&access_token=${token}&v=5.131`;
    const r = await fetch(url);
    const data = await r.json();

    const user = data.response?.[0];

    if (user.status_audio) {
      const artist = user.status_audio.artist;
      const title = user.status_audio.title;
      return res.send(`🎧 ${artist} — ${title}`);
    } else if (user.status) {
      return res.send(`💬 ${user.status}`);
    } else {
      return res.send("🚫 Музыка не играет");
    }
  } catch (e) {
    console.error(e);
    res.send("⚠️ Ошибка при получении трека");
  }
});

app.listen(3000, () => console.log("✅ Сервер запущен на порту 3000"));
