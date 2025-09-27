import { NextRequest, NextResponse } from "next/server";

// Helper: forward cookies
function getCookieHeader(req: NextRequest) {
  const cookies = req.cookies.getAll();
  return cookies.map(({ name, value }) => `${name}=${value}`).join("; ");
}

// Create product
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const response = await fetch(`${process.env.API_URL}products`, {
      method: "POST",
      body: formData,
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

// Get products (single or all)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const type = searchParams.get("type"); // "all" | "top" | "new"

    let url = `${process.env.API_URL}products`;
    if (productId) url = `${process.env.API_URL}products/${productId}`;
    else if (type === "all") url = `${process.env.API_URL}products/all`;
    else if (type === "top") url = `${process.env.API_URL}products/top`;
    else if (type === "new") url = `${process.env.API_URL}products/new`;

    const response = await fetch(url, {
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

// Update product
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { message: "productId is required" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const response = await fetch(
      `${process.env.API_URL}products/${productId}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          cookie: getCookieHeader(req),
        },
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

// Delete product
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { message: "productId is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.API_URL}products/${productId}`,
      {
        method: "DELETE",
        headers: {
          cookie: getCookieHeader(req),
        },
      }
    );

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Add product review
export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { message: "productId is required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const response = await fetch(
      `${process.env.API_URL}products/${productId}/reviews`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          cookie: getCookieHeader(req),
        },
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

// Filter products
export async function OPTIONS(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.API_URL}products/filter`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
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
