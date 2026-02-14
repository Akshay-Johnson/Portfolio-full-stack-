import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Resume from "@/lib/models/resume";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const resumeDoc = await Resume.findOne().lean(); // ⭐ convert to plain JSON

    if (!resumeDoc || Array.isArray(resumeDoc)) {
      return NextResponse.json({ message: "No resume found" }, { status: 404 });
    }

    const resume = resumeDoc as any;
    const html = `
<html>
<head>
<style>
  body {
    font-family: "Times New Roman", serif;
    margin: 40px 55px;
    font-size: 12.5px;
    line-height: 1.4;
    color: #000;
  }

  .header {
    text-align: center;
    margin-bottom: 18px;
  }

  .name {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .role {
    font-size: 13px;
    margin-top: 2px;
  }

  .contact {
    margin-top: 5px;
    font-size: 12px;
  }

  .section {
    margin-top: 20px;
  }

  .section-title {
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #444;
    padding-bottom: 3px;
    margin-bottom: 6px;
  }

  .sub-title {
    font-weight: bold;
  }

  ul {
    margin: 4px 0 10px 18px;
    padding: 0;
  }

  li {
    margin-bottom: 2px;
  }

  .row {
    display: flex;
    justify-content: space-between;
  }

  .muted {
    font-style: italic;
  }

</style>
</head>

<body>

<div class="header">
  <div class="name">${resume.profile?.name ?? ""}</div>
  <div class="role">Full Stack Developer</div>

  <div class="contact">
    ${resume.profile?.location ?? ""} &nbsp;|&nbsp;
    +91 ${resume.profile?.phone ?? ""} &nbsp;|&nbsp;
    ${resume.profile?.email ?? ""}
    <br/>
    GitHub: ${resume.profile?.github ?? ""} &nbsp;|&nbsp;
    LinkedIn: ${resume.profile?.linkedin ?? ""}
  </div>
</div>

<div class="section">
  <div class="section-title">PROFESSIONAL SUMMARY</div>
  ${resume.profile?.summary ?? ""}
</div>

<div class="section">
  <div class="section-title">TECHNICAL SKILLS</div>
  ${Object.entries(resume.skills || {})
    .map(
      ([key, value]: any) =>
        `<div><span class="sub-title">${key.charAt(0).toUpperCase() + key.slice(1)}:</span> ${(value || []).join(", ")}</div>`,
    )
    .join("")}
</div>

<div class="section">
  <div class="section-title">EXPERIENCE</div>

  ${(resume.experience || [])
    .map(
      (exp: any) => `
      <div class="row">
        <div><span class="sub-title">${exp.title}</span> &nbsp; ${exp.company}</div>
        <div>${exp.year ?? ""}</div>
      </div>

      <ul>
        ${(exp.points || []).map((p: string) => `<li>${p}</li>`).join("")}
      </ul>
    `,
    )
    .join("")}
</div>

<div class="section">
  <div class="section-title">PROJECTS</div>

 ${(resume.projects || [])
   .map(
     (proj: any) => `
    <div class="sub-title">${proj.title ?? ""}</div>

    <ul>
      ${(proj.description || []).map((d: string) => `<li>${d}</li>`).join("")}
      ${proj.link ? `<li>${proj.link}</li>` : ""}
    </ul>
  `,
   )
   .join("")}

</div>

<div class="section">
  <div class="section-title">EDUCATION</div>

  ${(resume.education || [])
    .map(
      (edu: any) => `
      <div class="row">
        <div>
          <span class="sub-title">${edu.degree}</span><br/>
          <span class="muted">${edu.institute}</span>
        </div>
        <div>${edu.year ?? ""}</div>
      </div>
    `,
    )
    .join("")}
</div>

<div class="section">
  <div class="section-title">CERTIFICATIONS</div>

  ${(resume.certifications || [])
    .map((c: any) =>
      typeof c === "string" ? `<div>${c}</div>` : `<div>${c?.name ?? ""}</div>`,
    )
    .join("")}
</div>

<div class="section">
  <div class="section-title">LANGUAGES</div>

  ${(resume.languages || [])
    .map((l: any) => (typeof l === "string" ? `${l}` : `${l?.name ?? ""}`))
    .join(" — ")}
</div>

</body>
</html>
`;
    chromium.setGraphicsMode = false;

    const executablePath = await chromium.executablePath();

    if (!executablePath) {
      throw new Error("Chromium path missing");
    }

    const browser = await puppeteer.launch({
      args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();

    // ⭐ viewport improves rendering
    await page.setViewport({ width: 1200, height: 1600 });

    await page.setContent(html, {
      waitUntil: "domcontentloaded",
    });

    // ⭐ wait fonts
    await page.evaluateHandle("document.fonts.ready");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error: any) {
    console.error("PDF ERROR:", error?.message);
    console.error(error?.stack);

    return NextResponse.json(
      { message: error?.message || "PDF generation failed" },
      { status: 500 },
    );
  }
}
