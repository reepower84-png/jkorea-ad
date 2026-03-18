import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    // Validation
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // Send Discord notification directly
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhookUrl) {
      console.error("Discord webhook URL is not configured");
      return NextResponse.json(
        { error: "서버 설정 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    const embed = {
      title: "📩 새로운 상담 문의가 접수되었습니다!",
      color: 0x6366f1,
      fields: [
        {
          name: "👤 이름",
          value: name,
          inline: true,
        },
        {
          name: "📞 연락처",
          value: phone,
          inline: true,
        },
        {
          name: "💬 상담문의",
          value: message,
          inline: false,
        },
      ],
      footer: {
        text: "종합광고 | 제이코리아",
      },
      timestamp: new Date().toISOString(),
    };

    const discordResponse = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!discordResponse.ok) {
      console.error("Discord webhook failed:", discordResponse.status);
      return NextResponse.json(
        { error: "알림 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "문의가 성공적으로 접수되었습니다." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
