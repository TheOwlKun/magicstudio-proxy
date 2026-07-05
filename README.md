<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=180&color=0:0F0F0F,100:3A3A3A&text=MagicStudio%20Proxy&fontColor=FFFFFF&fontAlignY=35&desc=OpenAI-Compatible%20Image%20Generation%20Gateway&descAlignY=58&animation=fadeIn" />

<h1 align="center">✨ MagicStudio Proxy</h1>

<p align="center">
An elegant, production-ready OpenAI-compatible proxy for MagicStudio AI.
</p>

<p align="center">
Built for developers who value performance, stability, and clean architecture.
</p>

<p align="center">
<a href="https://github.com/TheOwlKun/magicstudio-proxy/blob/main/LICENSE">
<img src="https://img.shields.io/badge/License-MIT-EAEAEA?style=for-the-badge&labelColor=111111"/>
</a>

<a href="https://nodejs.org/">
<img src="https://img.shields.io/badge/Node.js-18+-EAEAEA?style=for-the-badge&logo=node.js&labelColor=111111"/>
</a>

<img src="https://img.shields.io/badge/OpenAI-Compatible-EAEAEA?style=for-the-badge&labelColor=111111"/>

<img src="https://img.shields.io/badge/Production-Ready-EAEAEA?style=for-the-badge&labelColor=111111"/>

<img src="https://img.shields.io/badge/Zero-Configuration-EAEAEA?style=for-the-badge&labelColor=111111"/>
</p>

<p align="center">
⚡ OpenAI Compatible • 🚀 Production Ready • 🛡 Secure by Default • 🎨 MagicStudio AI
</p>

</div>

---

# ✨ Overview

MagicStudio Proxy bridges the gap between your applications and MagicStudio's AI image generation service by exposing a fully OpenAI-compatible API.

Simply replace your existing OpenAI endpoint with MagicStudio Proxy and continue using your favorite SDKs without changing your application logic.

Designed from the ground up for reliability, scalability, and developer experience.

---

# 🚀 Why MagicStudio Proxy?

<table>
<tr>
<td width="33%" align="center">

### ⚡ Compatibility

Works with existing OpenAI SDKs.

No client-side rewrites.

Drop-in replacement.

</td>

<td width="33%" align="center">

### 🛡 Security

Helmet

CORS

Rate Limiting

API Authentication

</td>

<td width="33%" align="center">

### 🚀 Performance

Smart FIFO Queue

Concurrent Processing

OOM Protection

Optimized Throughput

</td>

</tr>
</table>

---

# ✨ Features

* ✅ Fully OpenAI-compatible API
* ⚡ Intelligent request scheduling
* 🚀 High-performance concurrency engine
* 🛡 Built-in rate limiting
* 🔒 Optional API key authentication
* 🎨 MagicStudio AI integration
* 📦 Lightweight Express server
* 🔄 Zero changes required to existing OpenAI clients
* 💻 Developer-friendly architecture
* 📈 Production-ready deployment

---

# 📦 Quick Start

## Clone Repository

```bash
git clone https://github.com/TheOwlKun/magicstudio-proxy.git
cd magicstudio-proxy
```

---

## Install

```bash
npm install
```

---

## Configure

```bash
cp .env.example .env
```

<div align="center">
  <h3>🔍 Obtaining your CLIENT_ID</h3>
  <p>
    <i>A valid Client ID is <b>strictly required</b> to interface with the upstream service. It is not provided by default.</i><br><br>
    Visit <a href="https://magicstudio.com/ai-art-generator/">https://magicstudio.com/ai-art-generator/</a> (<i>Pro tip: Use an Incognito Window unless you want the browser cookies to aggressively judge your prompt history 🕵️‍♂️</i>) ➔ Generate an image ➔ Open Developer Tools (<code>F12</code>)<br>
    Navigate to the <b>Network</b> tab ➔ Inspect the <code>ai-art-generator</code> request ➔ Copy the <code>client_id</code> payload and add it to your <code>.env</code> file.
  </p>
</div>

---

## Run

### Development
```bash
npm run dev
```

### Production (Background Service)
To run the proxy continuously in the background (even if you close your terminal or reboot), use the built-in PM2 ecosystem:

```bash
# 1. Install PM2 globally
npm install -g pm2

# 2. Start the proxy in the background
npm run start:prod

# 3. View live logs
npm run logs

# 4. Stop the proxy
npm run stop
```

---

# 💻 Usage

## JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: "sk-your-secret-key",
    baseURL: "http://localhost:4000/v1"
});

const response = await client.images.generate({
    model: "flux-lora",
    prompt: "Minimalist architecture, cinematic lighting",
    n: 1
});

console.log(response.data[0].b64_json);
```

---

## Python

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-secret-key",
    base_url="http://localhost:4000/v1"
)

image = client.images.generate(
    model="flux-lora",
    prompt="Beautiful Japanese temple in snow",
    n=1
)

print(image.data[0].b64_json)
```

---

## cURL

```bash
curl http://localhost:4000/v1/images/generations \
-H "Content-Type: application/json" \
-H "Authorization: Bearer sk-your-secret-key" \
-d '{
    "model":"flux-lora",
    "prompt":"Minimalist architecture",
    "n":1
}'
```

---

# 🛡 Built For Production

Unlike traditional wrappers, MagicStudio Proxy includes production-grade safeguards by default:

* Intelligent request queue
* FIFO scheduling
* Out-of-memory protection
* Configurable concurrency
* Authentication support
* Secure headers
* Rate limiting
* Graceful request handling

Perfect for personal projects, internal tools, and high-traffic deployments.

---

# ❤️ Support Development

If this project saved you time or made your workflow easier, consider supporting future open-source development.

<p align="center">
  <a href="https://www.buymeacoffee.com/theowlkun">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="55"/>
  </a>
</p>

---

<p align="center">
  Crafted with ❤️ by <b><a href="https://github.com/TheOwlKun">@TheOwlKun</a></b>
  <br><br>⭐ If you find this project useful, consider giving it a star!
</p>
