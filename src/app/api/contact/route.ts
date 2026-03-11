import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import type { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const ENQUIRY_DB_ID = process.env.NOTION_ENQUIRY_DB_ID!;
const BRIEF_DB_ID = process.env.NOTION_BRIEF_DB_ID!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType } = body;

    // ── Local dev fallback: if no API key, just log and succeed ──
    if (!process.env.NOTION_API_KEY) {
      console.log("[Contact] No NOTION_API_KEY set — logging locally:", body);
      return NextResponse.json({ success: true });
    }

    if (formType === "enquiry") {
      const { name, email, message } = body;
      if (!name || !email || !message) {
        return NextResponse.json(
          { error: "Name, email, and message are required." },
          { status: 400 }
        );
      }

      await notion.pages.create({
        parent: { database_id: ENQUIRY_DB_ID },
        properties: {
          Name: {
            title: [{ text: { content: name } }],
          },
          Email: {
            email: email,
          },
          Message: {
            rich_text: [{ text: { content: message.slice(0, 2000) } }],
          },
          Status: {
            select: { name: "New" },
          },
        },
      });
    } else if (formType === "brief") {
      const { name, email, firm, projectType, projectStage, description } = body;
      if (!name || !email || !description) {
        return NextResponse.json(
          { error: "Name, email, and project description are required." },
          { status: 400 }
        );
      }

      const properties: CreatePageParameters["properties"] = {
        Name: {
          title: [{ text: { content: name } }],
        },
        Email: {
          email: email,
        },
        Description: {
          rich_text: [{ text: { content: description.slice(0, 2000) } }],
        },
        Status: {
          select: { name: "New" },
        },
      };

      if (firm) {
        properties.Firm = {
          rich_text: [{ text: { content: firm } }],
        };
      }
      if (body.phone) {
        properties.Phone = {
          phone_number: body.phone,
        };
      }
      if (projectType) {
        properties["Project Type"] = {
          select: { name: projectType },
        };
      }
      if (projectStage) {
        properties["Project Stage"] = {
          select: { name: projectStage },
        };
      }
      if (body.timeline) {
        properties.Timeline = {
          rich_text: [{ text: { content: body.timeline } }],
        };
      }
      if (body.budget) {
        properties.Budget = {
          select: { name: body.budget },
        };
      }

      await notion.pages.create({
        parent: { database_id: BRIEF_DB_ID },
        properties,
      });
    } else {
      return NextResponse.json(
        { error: "Invalid form type." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact] Notion API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
