import { NextResponse } from "next/server";
import nodeMailer from "nodemailer";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const reqBody = await req.json();
    const { email, name, message } = reqBody;

    try {
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NEXT_PUBLIC_GMAIL_USER, // メールアドレス
                pass: process.env.NEXT_PUBLIC_GMAIL_PASSWORD // パスワード
            }
        });

        const mailOptions = {
            from: email,
            to: "nemotogaku1@gmail.com",
            subject: `（お問い合わせ) ${name}様より`,
            text: `${message} Send from ${email}`,
            html: `
            <p>【名前】</p>
            <p>${name}</p>
            <p>【メッセージ内容】</p>
            <p>${message}</p>
            <p>【メールアドレス】</p>
            <p>${email}</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "成功しました" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "失敗しました" }, { status: 500 });
    }
}
