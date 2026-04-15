import express from "express";
import fetch from "node-fetch";

const app = express();
const token = "vk1.a.V0D5M--m_a-rx1iaSkhunIfL9wYZUJj7EPjzUZ_qOuiAuzUvoCU2nRbio8v2bNFe_58jzkIpRsK1ucA_-hZV95zZPTK46aW9BBvVgD8yFXEzMwmfaYnVmFyaf0SuS9EsFn9oiqN9lwYfHzfh73lK6Ld1sTj-5SNLCvBwXOad0uvmZWKyPWmr7i6xbAkxV0u1wGT4BnuGPmdlt8L5PmVAcA";
const userId = "347796133";

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
      return res.send("🚫 Музыка не играет, или играет из другого источника!");
    }
  } catch (e) {
    console.error(e);
    res.send("⚠️ Проводим технические работы NotLikeThis ");
  }
});

app.listen(3000, () => console.log("✅ Сервер запущен на порту 3000"));




