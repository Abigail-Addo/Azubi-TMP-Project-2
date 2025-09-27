// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

function getCookieHeader(req: NextRequest) {
  const cookies = req.cookies.getAll();
  return cookies.map(({ name, value }) => `${name}=${value}`).join("; ");
}

// ----- GET USERS (admin only) -----
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    const url = userId
      ? `${process.env.API_URL}users/${userId}`
      : `${process.env.API_URL}users`;

    const response = await fetch(url, {
      method: "GET",
      headers: { cookie: getCookieHeader(req) },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// ----- UPDATE USER BY ID (admin only) -----
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    const userData = await req.json();

    const res = await fetch(`${process.env.API_URL}users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: getCookieHeader(req),
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Something went wrong" },
      { status: 500 }
    );
  }
}

// ----- DELETE USER BY ID (admin only) -----
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL}users/${userId}`, {
      method: "DELETE",
      headers: {
        cookie: getCookieHeader(req),
      },
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
