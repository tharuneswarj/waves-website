import { NextResponse } from "next/server";

// Contact form API route.
// Currently logs to console. Replace with your preferred delivery:
//   - Formspree: forward to https://formspree.io/f/{id}
//   - Resend/SendGrid: send email
//   - Notion API: create database entry

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

      // TODO: Replace with actual delivery
      console.log("[Contact] General enquiry:", { name, email, message });
    } else if (formType === "brief") {
      const { name, email, firm, projectType, projectStage, description } =
        body;
      if (!name || !email || !description) {
        return NextResponse.json(
          { error: "Name, email, and project description are required." },
          { status: 400 }
        );
      }

      // TODO: Replace with actual delivery
      console.log("[Contact] Project brief:", {
        name,
        email,
        firm,
        projectType,
        projectStage,
        description,
        phone: body.phone,
        timeline: body.timeline,
        budget: body.budget,
      });
    } else {
      return NextResponse.json(
        { error: "Invalid form type." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
