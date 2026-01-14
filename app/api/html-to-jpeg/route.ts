import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
// import fs from "fs/promises";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { html_content } = body;
  // STEP 1: VALIDATE REQUEST BODY
  if (!html_content) {
    return NextResponse.json(
      {
        success: false,
        message: "Request body is incomplete, HTML contentis missing",
      },
      { status: 400 }
    );
  }
  let browser;
  try {
    // Launch a headless browser instance
    browser = await puppeteer.launch({
      // Required for running in environments like Docker/servers
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Set the page content to the HTML provided by the client
    await page.setContent(html_content, { waitUntil: "networkidle0" });
    const pdfData = await page.pdf({ format: "A4" });
    // await fs.writeFile("file.pdf", pdfData);
    // Optional: Define a specific viewport size if needed
    // await page.setViewport({ width: 600, height: 800 });

    // Capture a screenshot of the body element
    const imageBuffer = await page.screenshot({
      type: "png",
      fullPage: true, // Captures the full height of the rendered HTML
      // clip: { x: 0, y: 0, width: 600, height: 800 } // Use clip if fullPage isn't right
    });

    await browser.close();

    return NextResponse.json(
      {
        success: true,
        message: "Content Paint Successful",
        data: { img_buffer: imageBuffer, pdf_data: pdfData },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
}
