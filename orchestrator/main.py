"""
An Hà Multi-Agent Orchestrator
Điều phối team AI agent: PM → Designer → Backend → Frontend → Tester
"""

import anthropic
import json
import os
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).parent.parent
DOCS = ROOT / "docs"
AGENTS = ROOT / "agents"
WEBSITE = ROOT / "website"

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# ── Agent System Prompts ──────────────────────────────────────────────────────

def load_agent_prompt(agent_name: str) -> str:
    """Load system prompt từ agents/*.md"""
    md = (AGENTS / f"{agent_name}.md").read_text(encoding="utf-8")
    # Extract nội dung trong code block ```...```
    lines = md.split("\n")
    in_block = False
    prompt_lines = []
    for line in lines:
        if line.strip().startswith("```") and not in_block:
            in_block = True
            continue
        elif line.strip() == "```" and in_block:
            in_block = False
            continue
        if in_block:
            prompt_lines.append(line)
    return "\n".join(prompt_lines) if prompt_lines else md


SYSTEM_PROMPTS = {
    "pm":       load_agent_prompt("pm"),
    "designer": load_agent_prompt("designer"),
    "backend":  load_agent_prompt("backend"),
    "frontend": load_agent_prompt("frontend"),
    "tester":   load_agent_prompt("tester"),
}


# ── Core Agent Runner ─────────────────────────────────────────────────────────

def run_agent(
    role: str,
    task: str,
    context: Optional[str] = None,
    model: str = "claude-sonnet-4-6",
) -> str:
    """Chạy một agent với task cụ thể, trả về output text."""
    messages = []
    if context:
        messages.append({
            "role": "user",
            "content": f"<context>\n{context}\n</context>\n\n{task}",
        })
    else:
        messages.append({"role": "user", "content": task})

    response = client.messages.create(
        model=model,
        max_tokens=4096,
        system=SYSTEM_PROMPTS[role],
        messages=messages,
    )
    return response.content[0].text


# ── Workflow Steps ────────────────────────────────────────────────────────────

def step_pm_kickoff() -> str:
    print("\n[PM] Khởi động dự án, xem xét kiến trúc...")
    arch = (DOCS / "architecture.md").read_text(encoding="utf-8")
    task = (
        "Dựa trên architecture.md, hãy:\n"
        "1. Xác nhận kiến trúc hợp lý cho B2B tem chống hàng giả\n"
        "2. Tạo task list Sprint 1 chi tiết cho từng agent\n"
        "3. Nêu 3 rủi ro chính và cách giảm thiểu\n"
        "Output dạng markdown có section rõ ràng."
    )
    output = run_agent("pm", task, context=arch)
    (DOCS / "pm-sprint1-brief.md").write_text(output, encoding="utf-8")
    print("[PM] ✓ Sprint 1 brief đã tạo → docs/pm-sprint1-brief.md")
    return output


def step_designer_tokens() -> str:
    print("\n[Designer] Tạo design tokens & component guidelines...")
    ds = (DOCS / "design-system.md").read_text(encoding="utf-8")
    arch = (DOCS / "architecture.md").read_text(encoding="utf-8")
    task = (
        "Dựa trên design-system.md và architecture.md, hãy tạo:\n"
        "1. Tailwind config extend object (màu sắc, font, spacing custom)\n"
        "2. Danh sách Tailwind class cụ thể cho 5 components: Button, Card, Badge, Input, Section\n"
        "3. Hero section layout guideline cho HomePage\n"
        "Output dạng markdown với code blocks TypeScript/CSS."
    )
    output = run_agent("designer", task, context=f"{ds}\n---\n{arch}")
    (DOCS / "designer-tokens.md").write_text(output, encoding="utf-8")
    print("[Designer] ✓ Tokens đã tạo → docs/designer-tokens.md")
    return output


def step_backend_schema() -> str:
    print("\n[Backend] Thiết kế Prisma schema & API handlers...")
    api_spec = (DOCS / "api-spec.md").read_text(encoding="utf-8")
    task = (
        "Dựa trên api-spec.md, hãy viết:\n"
        "1. Prisma schema đầy đủ (Contact, Product, CaseStudy, Subscriber)\n"
        "2. Zod validation schemas cho /api/contact request\n"
        "3. Next.js Route Handler cho POST /api/contact (với error handling)\n"
        "Output là TypeScript code thuần, có thể dùng trực tiếp."
    )
    output = run_agent("backend", task, context=api_spec)
    (DOCS / "backend-schema-output.md").write_text(output, encoding="utf-8")
    print("[Backend] ✓ Schema & handler đã tạo → docs/backend-schema-output.md")
    return output


def step_frontend_components(designer_output: str) -> str:
    print("\n[Frontend] Tạo component architecture & HomePage...")
    arch = (DOCS / "architecture.md").read_text(encoding="utf-8")
    task = (
        "Dựa trên architecture.md và design tokens từ Designer, hãy viết:\n"
        "1. TypeScript types cho Props của: HeroSection, ProductCard, CaseStudyCard, ContactForm\n"
        "2. HeroSection component đầy đủ với Tailwind CSS (B2B tem chống hàng giả)\n"
        "3. Navigation Header với mobile hamburger menu\n"
        "Output là React/TypeScript code."
    )
    output = run_agent("frontend", task, context=f"{arch}\n---\nDesigner output:\n{designer_output}")
    (DOCS / "frontend-components-output.md").write_text(output, encoding="utf-8")
    print("[Frontend] ✓ Components đã tạo → docs/frontend-components-output.md")
    return output


def step_tester_cases(arch: str) -> str:
    print("\n[Tester] Tạo E2E test scripts Playwright...")
    test_plan = (DOCS / "test-plan.md").read_text(encoding="utf-8")
    task = (
        "Dựa trên test-plan.md và architecture, hãy viết:\n"
        "1. Playwright E2E test file cho contact form (TC-002, TC-003)\n"
        "2. Playwright test cho navigation (TC-005)\n"
        "3. Jest unit test skeleton cho ContactForm component\n"
        "Output là TypeScript/Playwright code."
    )
    output = run_agent("tester", task, context=f"{test_plan}\n---\n{arch}")
    (DOCS / "tester-scripts-output.md").write_text(output, encoding="utf-8")
    print("[Tester] ✓ Test scripts đã tạo → docs/tester-scripts-output.md")
    return output


def step_pm_review(agent_outputs: dict) -> str:
    print("\n[PM] Review tổng hợp output từ tất cả agents...")
    summary = "\n\n---\n\n".join(
        f"## {role.upper()} Output\n{output}"
        for role, output in agent_outputs.items()
    )
    task = (
        "Review tổng hợp output của cả team:\n"
        "1. Đánh giá chất lượng từng deliverable\n"
        "2. Identify gaps hoặc inconsistencies\n"
        "3. Tạo action items cho Sprint 2\n"
        "4. Quyết định: Team có sẵn sàng bắt đầu code website chưa?\n"
        "Output: PM Report dạng markdown."
    )
    output = run_agent("pm", task, context=summary)
    (DOCS / "pm-sprint1-review.md").write_text(output, encoding="utf-8")
    print("[PM] ✓ Sprint 1 review → docs/pm-sprint1-review.md")
    return output


# ── Main Orchestration ────────────────────────────────────────────────────────

def run_sprint1():
    """Chạy toàn bộ Sprint 1 workflow."""
    print("=" * 60)
    print("  AN HÀ MULTI-AGENT ORCHESTRATOR - SPRINT 1")
    print("=" * 60)

    # Step 1: PM kickoff
    pm_output = step_pm_kickoff()

    # Step 2: Designer & Backend song song (độc lập nhau)
    # (Trong production có thể dùng asyncio/threading)
    designer_output = step_designer_tokens()
    backend_output = step_backend_schema()

    # Step 3: Frontend (cần designer output)
    arch = (DOCS / "architecture.md").read_text(encoding="utf-8")
    frontend_output = step_frontend_components(designer_output)

    # Step 4: Tester (cần arch)
    tester_output = step_tester_cases(arch)

    # Step 5: PM review tổng hợp
    all_outputs = {
        "pm": pm_output,
        "designer": designer_output,
        "backend": backend_output,
        "frontend": frontend_output,
        "tester": tester_output,
    }
    pm_review = step_pm_review(all_outputs)

    print("\n" + "=" * 60)
    print("  SPRINT 1 HOÀN THÀNH!")
    print("  Output files trong /docs/:")
    for f in sorted(DOCS.glob("*.md")):
        size = f.stat().st_size
        print(f"  - {f.name} ({size:,} bytes)")
    print("=" * 60)

    return all_outputs


if __name__ == "__main__":
    run_sprint1()
