import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const validUsername = process.env.ADMIN_USERNAME;
        const validPassword = process.env.ADMIN_PASSWORD;
        const secretToken = process.env.ADMIN_SECRET;

        // Ensure env variables are configured
        if (!validUsername || !validPassword || !secretToken) {
            console.error("Missing ADMIN_USERNAME, ADMIN_PASSWORD, or ADMIN_SECRET in environment variables");
            return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 });
        }

        if (username === validUsername && password === validPassword) {
            return NextResponse.json({ success: true, token: secretToken.trim() });
        } else {
            return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
        }
    } catch (err: any) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
