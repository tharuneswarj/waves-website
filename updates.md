# Waves Website - Updates (Form Backend Addition)

*Append this to the existing updates.md under P0*

---

### NEW P0: Connect contact forms to Notion

**Files:**
- `src/app/api/contact/route.ts` (replace entirely)
- `.env.local` (add NOTION_API_KEY, NOTION_ENQUIRY_DB_ID, NOTION_BRIEF_DB_ID)

**What:** Replace the console.log backend with Notion API integration. Form submissions create pages in two Notion databases: "Website Enquiries" for general enquiries, "Project Briefs" for project brief submissions. Both databases already exist in the Waves Notion workspace under Command Center.

**Why:** Forms currently log to console and data is lost. This sends submissions to Notion where they can be tracked and followed up on.

**Environment variables to add to `.env.local`:**
```
NOTION_API_KEY=<create an internal integration at https://www.notion.so/my-integrations>
NOTION_ENQUIRY_DB_ID=8a27c61c67e54114914b24bb45f7385f
NOTION_BRIEF_DB_ID=a1ad60e86ca546e9b031717c00f455c2
```

**IMPORTANT: Notion integration setup (founder must do this manually):**
1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name it "Waves Website"
4. Select the Waves workspace
5. Under Capabilities, enable "Insert content" and "Read content"
6. Copy the Internal Integration Secret - that's your NOTION_API_KEY
7. Go to each database in Notion (Website Enquiries and Project Briefs)
8. Click the "..." menu > "Connections" > "Connect to" > select "Waves Website"
9. This grants the integration access to those specific databases

**Install dependency:**
```bash
npm install @notionhq/client
```

**Replace `src/app/api/contact/route.ts` with:**

```typescript
import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const ENQUIRY_DB_ID = process.env.NOTION_ENQUIRY_DB_ID!;
const BRIEF_DB_ID = process.env.NOTION_BRIEF_DB_ID!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType } = body;

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

      const properties: Record<string, unknown> = {
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
```

**After implementing, test by:**
1. Submit a test general enquiry on the contact page
2. Check the "Website Enquiries" database in Notion - should appear as a new row with Status "New"
3. Submit a test project brief
4. Check the "Project Briefs" database - should appear with all fields populated