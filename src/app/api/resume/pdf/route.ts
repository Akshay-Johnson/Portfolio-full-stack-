import puppeteer from "puppeteer";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Resume from "@/lib/models/resume";

export async function GET() {
  await connectDB();

  const resume = await Resume.findOne();

  if (!resume) {
    return NextResponse.json({ message: "No resume found" });
  }

  // Convert Resume To HTML

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
      <div class="sub-title">${proj.title}</div>

      <ul>
        <li>${proj.description}</li>
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

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);

  const pdfBuffer = await page.pdf({
    format: "A4",
  });

  await browser.close();

  return new NextResponse(Buffer.from(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    },
  });
}
