const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { message, history } = req.body;
  if (!message) return res.status(400).json({ msg: "Thiếu message" });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.json({ reply: getFallback(message), source: "fallback" });
  }

  try {
    const messages = [
      { role: "system", content: "Bạn là nhân viên tư vấn của IzumiTech — cửa hàng điện thoại, laptop, tablet, PC, gear, phụ kiện. Trả lời ngắn gọn, thân thiện, tiếng Việt, có emoji vừa phải. Nếu không biết thì gợi ý gọi hotline 1900 6868." },
      ...(Array.isArray(history) ? history.slice(-6) : []),
      { role: "user", content: message }
    ];

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 400
      })
    });

    const data = await r.json();
    if (!r.ok) throw new Error(data.error?.message || "OpenAI lỗi");
    const reply = data.choices?.[0]?.message?.content?.trim() || getFallback(message);
    res.json({ reply, source: "openai" });
  } catch (e) {
    console.error("ChatGPT lỗi:", e.message);
    res.json({ reply: getFallback(message), source: "fallback" });
  }
});

function getFallback(q) {
  const t = q.toLowerCase();
  if (t.includes("chào") || t.includes("hello") || t.includes("hi")) return "Chào bạn! 🥰 Mình có thể giúp gì — tìm máy, hỏi giá hay bảo hành?";
  if (t.includes("giảm") || t.includes("sale") || t.includes("khuyến mãi")) return "Tuần này giảm tới 50% 🎉 Kèm mã IZUMI200 giảm thêm 200K cho đơn đầu tiên!";
  if (t.includes("bảo hành")) return "Bảo hành chính hãng 12 tháng, lỗi đổi mới 30 ngày 🛡️";
  if (t.includes("giao") || t.includes("ship")) return "Nội thành HN/HCM giao 2h 🚚, tỉnh 1-3 ngày, free ship đơn từ 500K!";
  if (t.includes("trả góp")) return "Trả góp 0% qua thẻ hoặc duyệt online chỉ cần CCCD 💳";
  return "Cảm ơn bạn đã nhắn! Mình chưa hiểu rõ, bạn thử nói lại hoặc gọi 1900 6868 để gặp nhân viên ngay nhé 😊";
}

module.exports = router;
