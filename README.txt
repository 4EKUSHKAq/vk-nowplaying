1. Открой index.js и вставь свой токен вместо ВАШ_ТОКЕН.
2. Заархивируй папку vk-nowplaying (index.js, package.json, README.txt).
3. На сайте render.com:
   - New Web Service → Upload Zip.
   - Environment: Node.
   - Start command: npm start.
4. После деплоя Render выдаст ссылку вроде https://vk-nowplaying.onrender.com/
5. В StreamElements создай команду:
   !addcommand !трек $(customapi https://vk-nowplaying.onrender.com/)
