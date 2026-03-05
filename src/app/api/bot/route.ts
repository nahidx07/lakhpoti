import { NextResponse } from "next/server";
import axios from "axios";

const BOT_TOKEN = "YOUR_BOT_TOKEN";

export async function POST(req: Request) {
  const body = await req.json();
  
  if (body.message?.text === "/start") {
    const chatId = body.message.chat.id;
    const firstName = body.message.from.first_name;

    const message = `হ্যালো ${firstName}! লক্ষপতি অ্যাপে স্বাগতম। 💸\n\nনিচের বাটনে ক্লিক করে ইনকাম শুরু করুন।`;
    
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      chat_id: chatId,
      photo: "https://your-domain.com/welcome-image.jpg", // একটি সুন্দর ছবির ইউআরএল দিন
      caption: message,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 Open Lakhpoti App", web_app: { url: "https://lakhpoti-bd.vercel.app" } }],
          [{ text: "📢 Update Channel", url: "https://t.me/lakhpotiOfficial" }]
        ]
      }
    });
  }

  return NextResponse.json({ ok: true });
}
