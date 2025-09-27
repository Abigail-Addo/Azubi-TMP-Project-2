import { NextRequest, NextResponse } from "next/server";

function getCookieHeader(req: NextRequest) {
  const cookies = req.cookies.getAll();
  return cookies.map(({ name, value }) => `${name}=${value}`).join("; ");
}

// ----- CREATE ORDER -----
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(`${process.env.API_URL}orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: getCookieHeader(req),
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

// ----- GET ORDERS -----
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const orderId = url.searchParams.get("id"); // fetch single order
    const all = url.searchParams.get("all"); // fetch all orders (admin)

    let endpoint = "";

    if (orderId) {
      // Single order
      endpoint = `orders/${orderId}`;
    } else if (all === "true") {
      // All orders (admin)
      endpoint = "orders";
    } else {
      // Current user's orders
      endpoint = "orders/mine";
    }

    const res = await fetch(`${process.env.API_URL}${endpoint}`, {
      method: "GET",
      headers: { cookie: getCookieHeader(req) },
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

// ----- PAY ORDER (initialize Paystack) -----
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(`${process.env.API_URL}orders/pay`, {
      method: "POST", // matches your Express route
      headers: {
        "Content-Type": "application/json",
        cookie: getCookieHeader(req),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

// ----- MARK ORDER DELIVERED (admin only) -----
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.orderId)
      return NextResponse.json(
        { message: "orderId is required" },
        { status: 400 }
      );

    const response = await fetch(
      `${process.env.API_URL}/${body.orderId}orders/deliver`,
      {
        method: "PUT", // matches Express route
        headers: {
          "Content-Type": "application/json",
          cookie: getCookieHeader(req),
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
