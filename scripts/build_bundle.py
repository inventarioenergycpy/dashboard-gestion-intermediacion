# -*- coding: utf-8 -*-
import os
import re

base_dir = r"C:\Users\majon\.gemini\antigravity-ide\scratch\dashboard-gestion-intermediacion"

files_order = [
    ("store.js", os.path.join(base_dir, "js", "store.js")),
    ("auth.js", os.path.join(base_dir, "js", "auth.js")),
    ("doc-templates.js", os.path.join(base_dir, "js", "templates", "doc-templates.js")),
    ("templateManager.js", os.path.join(base_dir, "js", "modules", "templateManager.js")),
    ("smartImporter.js", os.path.join(base_dir, "js", "modules", "smartImporter.js")),
    ("dashboard.js", os.path.join(base_dir, "js", "modules", "dashboard.js")),
    ("projects.js", os.path.join(base_dir, "js", "modules", "projects.js")),
    ("deals.js", os.path.join(base_dir, "js", "modules", "deals.js")),
    ("brokers.js", os.path.join(base_dir, "js", "modules", "brokers.js")),
    ("compliance.js", os.path.join(base_dir, "js", "modules", "compliance.js")),
    ("inquiries.js", os.path.join(base_dir, "js", "modules", "inquiries.js")),
    ("settings.js", os.path.join(base_dir, "js", "modules", "settings.js")),
    ("app.js", os.path.join(base_dir, "js", "app.js"))
]

bundle_parts = [
    "/**\n * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA\n * Standalone Single-Bundle for file:/// and http:// access\n */\n(function() {\n'use strict';\n\n"
]

def clean_code(content, fname):
    lines = content.splitlines()
    cleaned = []
    for line in lines:
        stripped = line.strip()
        # Remove import statements
        if stripped.startswith("import ") or re.match(r"^import\s*\{", stripped) or re.match(r"^import\s+[a-zA-Z0-9_\$]+\s+from", stripped):
            continue
        # Replace export const / export class / export function / export default
        line = re.sub(r"^export\s+default\s+class\s+", "class ", line)
        line = re.sub(r"^export\s+default\s+function\s+", "function ", line)
        line = re.sub(r"^export\s+default\s+", "", line)
        line = re.sub(r"^export\s+const\s+", "const ", line)
        line = re.sub(r"^export\s+let\s+", "let ", line)
        line = re.sub(r"^export\s+var\s+", "var ", line)
        line = re.sub(r"^export\s+class\s+", "class ", line)
        line = re.sub(r"^export\s+function\s+", "function ", line)
        line = re.sub(r"^export\s*\{[^}]*\}\s*;?", "", line)
        cleaned.append(line)
    return "\n".join(cleaned)

for name, fpath in files_order:
    print(f"Processing {name} ({fpath})...")
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    cleaned = clean_code(content, name)
    bundle_parts.append(f"\n/* --- FILE: {name} --- */\n" + cleaned + "\n")

bundle_parts.append("\n})();\n")

bundle_content = "".join(bundle_parts)

bundle_path = os.path.join(base_dir, "js", "bundle.js")
with open(bundle_path, "w", encoding="utf-8") as f:
    f.write(bundle_content)

print(f"Successfully generated {bundle_path} ({len(bundle_content)} bytes)")
