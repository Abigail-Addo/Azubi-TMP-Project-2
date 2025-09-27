import { NextRequest, NextResponse } from "next/server";

// Helper: forward cookies
function getCookieHeader(req: NextRequest) {
  const cookies = req.cookies.getAll();
  return cookies.map(({ name, value }) => `${name}=${value}`).join("; ");
}

// Create category
export async function POST(req: NextRequest) {
  try {
    const categoryData = await req.json();

    const response = await fetch(`${process.env.API_URL}category`, {
      method: "POST",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
        cookie: getCookieHeader(req),
      },
    });

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Get category
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const url = categoryId
      ? `${process.env.API_URL}category/${categoryId}`
      : `${process.env.API_URL}category/categories`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        cookie: getCookieHeader(req),
      },
    });

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Update category
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { message: "categoryId is required" },
        { status: 400 }
      );
    }

    const categoryData = await req.json();

    const response = await fetch(
      `${process.env.API_URL}category/${categoryId}`,
      {
        method: "PUT",
        body: JSON.stringify(categoryData),
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

// Delete category
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { message: "categoryId is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.API_URL}category/${categoryId}`,
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
