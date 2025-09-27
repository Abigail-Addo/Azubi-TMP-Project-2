import { NextRequest, NextResponse } from "next/server";

function getCookieHeader(req: NextRequest) {
  const cookies = req.cookies.getAll();
  return cookies.map(({ name, value }) => `${name}=${value}`).join("; ");
}

// Add item to cart
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.API_URL}carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: getCookieHeader(req),
      },
      body: JSON.stringify(body),
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

// Get cart items
export async function GET(req: NextRequest) {
  try {
    const response = await fetch(`${process.env.API_URL}carts`, {
      method: "GET",
      headers: {
        cookie: getCookieHeader(req),
      },
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

// Update cart quantity
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.productId)
      return NextResponse.json(
        { message: "productId is required" },
        { status: 400 }
      );

    const response = await fetch(
      `${process.env.API_URL}carts/${body.productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          cookie: getCookieHeader(req),
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE – handle both single-item removal and clear-all logic
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    const isClearAll = !body?.productId;
    const url = isClearAll
      ? `${process.env.API_URL}carts/clear`
      : `${process.env.API_URL}carts`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        cookie: getCookieHeader(req),
      },
      body: isClearAll ? undefined : JSON.stringify(body),
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
