import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { type, userData } = await req.json();

    let apiUrl = "";
    if (type === "register") {
      apiUrl = `${process.env.API_URL}users`;
    } else if (type === "login") {
      apiUrl = `${process.env.API_URL}users/auth`;
    } else if (type === "logout") {
      apiUrl = `${process.env.API_URL}users/logout`;
    } else {
      return NextResponse.json({ message: "Invalid type" }, { status: 400 });
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: type === "logout" ? undefined : JSON.stringify(userData),
      credentials: "include",
    });

    const data = await response.json();

    // Build Next.js response
    const res = NextResponse.json(data, { status: response.status });

    // ✅ If backend returned tokens in the body
    if (data?.Authentication && data?.jwt) {
      res.cookies.set("Authentication", data.Authentication, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });

      res.cookies.set("jwt", data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    }

    // ✅ If backend only sends Set-Cookie headers, forward them
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      setCookieHeader.split(",").forEach((cookieStr) => {
        const [cookiePair] = cookieStr.trim().split(";");
        const [name, value] = cookiePair.split("=");

        res.cookies.set(name, value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "lax",
        });
      });
    }

    return res;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Fetch user profile from backend
    const response = await fetch(`${process.env.API_URL}users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") || "", // forward cookies
      },
      credentials: "include",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const userData = await req.json();

    const response = await fetch(`${process.env.API_URL}users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
