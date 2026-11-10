# -*- coding: utf-8 -*-
"""
Script Maestro de Sincronización Automática de Cartera de Inversiones
Energy CPY: Dashboard de Gestión <---> Showroom Web

Sincroniza:
1. data/projects-master.json (SSOT - Single Source of Truth)
2. js/store.js (DEFAULT_PROJECTS en Dashboard)
3. js/bundle.js (Single Bundle compilado para Dashboard)
4. ../showroom-energycpy/js/main.js (PROJECTS_DATA en Showroom Web con mapeo de estados)
5. ../showroom-energycpy/data/projects-master.json (Espejo de datos estático)
"""

import os
import json
import re
import subprocess
import sys

# Rutas base
DASHBOARD_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECTS_MASTER_PATH = os.path.join(DASHBOARD_DIR, "data", "projects-master.json")
STORE_JS_PATH = os.path.join(DASHBOARD_DIR, "js", "store.js")
BUILD_BUNDLE_PATH = os.path.join(DASHBOARD_DIR, "scripts", "build_bundle.py")

# Directorios candidatos para showroom-energycpy
SHOWROOM_CANDIDATES = [
    os.path.join(os.path.dirname(DASHBOARD_DIR), "showroom-energycpy"),
    r"E:\Proyectos\showroom-energycpy",
    r"C:\Users\Usuario\.gemini\antigravity-ide\scratch\showroom-energycpy",
    r"C:\Users\Usuario\.gemini\antigravity-ide\Proyectos\showroom-energycpy"
]

def map_status_to_showroom(dash_status):
    """Mapea el estado del Dashboard al estado visual del Showroom"""
    if dash_status in ("bloqueado_por_gestion", "suspendido"):
        return "tramite"
    elif dash_status == "vendido":
        return "vendido"
    return "activo"

def sync_portfolio():
    print("=" * 78)
    print(" 🚀 INICIANDO SINCRONIZACIÓN AUTOMÁTICA DE CARTERA (DASHBOARD <-> SHOWROOM)")
    print("=" * 78)

    # 1. Cargar projects-master.json
    if not os.path.exists(PROJECTS_MASTER_PATH):
        print(f"❌ Error: No se encontró {PROJECTS_MASTER_PATH}")
        sys.exit(1)

    with open(PROJECTS_MASTER_PATH, "r", encoding="utf-8") as f:
        projects_master = json.load(f)

    print(f"✔ Cargados {len(projects_master)} proyectos maestros desde projects-master.json")

    # 2. Localizar Showroom
    showroom_dirs = []
    seen = set()
    for cand in SHOWROOM_CANDIDATES:
        cand_real = os.path.realpath(cand) if os.path.exists(cand) else cand
        if os.path.exists(cand) and cand_real not in seen:
            seen.add(cand_real)
            showroom_dirs.append(cand)

    if not showroom_dirs:
        print("⚠️ Advertencia: No se localizó ninguna carpeta de showroom-energycpy")
    else:
        print(f"✔ Directorios de Showroom detectados: {showroom_dirs}")

    # 3. Actualizar DEFAULT_PROJECTS en js/store.js del Dashboard
    if os.path.exists(STORE_JS_PATH):
        with open(STORE_JS_PATH, "r", encoding="utf-8") as f:
            store_content = f.read()

        # Construir lista simplificada para DEFAULT_PROJECTS respetando campos críticos
        default_projects_list = []
        for p in projects_master:
            proj_copy = json.loads(json.dumps(p))
            # Garantizar que status refleje defaultStatus
            proj_copy["status"] = p.get("defaultStatus", "activo")
            default_projects_list.append(proj_copy)

        formatted_json = json.dumps(default_projects_list, indent=2, ensure_ascii=False)
        pattern = r"(export\s+const\s+DEFAULT_PROJECTS\s*=\s*)\[[\s\S]*?\n\];"
        
        if re.search(pattern, store_content):
            new_store_content = re.sub(pattern, r"\1" + formatted_json.replace("\\", "\\\\") + ";", store_content)
            with open(STORE_JS_PATH, "w", encoding="utf-8") as f:
                f.write(new_store_content)
            print("✔ DEFAULT_PROJECTS actualizado exitosamente en js/store.js")
        else:
            print("⚠️ Advertencia: No se encontró el bloque DEFAULT_PROJECTS en store.js")

    # 4. Regenerar js/bundle.js
    if os.path.exists(BUILD_BUNDLE_PATH):
        print("✔ Compilando bundle unificado de Dashboard (scripts/build_bundle.py)...")
        res = subprocess.run([sys.executable, BUILD_BUNDLE_PATH], capture_output=True, text=True, encoding="utf-8")
        if res.returncode == 0:
            print("✔ js/bundle.js regenerado con éxito")
        else:
            print(f"❌ Error al compilar bundle.js: {res.stderr}")

    # 5. Sincronizar hacia Showroom Web (PROJECTS_DATA y data/projects-master.json)
    for sh_dir in showroom_dirs:
        sh_main_path = os.path.join(sh_dir, "js", "main.js")
        if os.path.exists(sh_main_path):
            with open(sh_main_path, "r", encoding="utf-8") as f:
                sh_main_content = f.read()

            # Construir PROJECTS_DATA dict para Showroom
            projects_data_dict = {}
            for p in projects_master:
                p_show = json.loads(json.dumps(p))
                # Aplicar mapeo de estados
                dash_status = p.get("defaultStatus", "activo")
                p_show["defaultStatus"] = map_status_to_showroom(dash_status)
                projects_data_dict[p["id"]] = p_show

            sh_json = json.dumps(projects_data_dict, indent=4, ensure_ascii=False)
            pattern_sh = r"(const\s+PROJECTS_DATA\s*=\s*)\{[\s\S]*?\n\};"

            if re.search(pattern_sh, sh_main_content):
                new_sh_content = re.sub(pattern_sh, r"\1" + sh_json.replace("\\", "\\\\") + ";", sh_main_content)
                with open(sh_main_path, "w", encoding="utf-8") as f:
                    f.write(new_sh_content)
                print(f"✔ PROJECTS_DATA actualizado con éxito en {sh_main_path}")
            else:
                print(f"⚠️ No se encontró el bloque PROJECTS_DATA en {sh_main_path}")

        # Copiar projects-master.json como espejo en showroom
        sh_data_dir = os.path.join(sh_dir, "data")
        os.makedirs(sh_data_dir, exist_ok=True)
        sh_master_copy = os.path.join(sh_data_dir, "projects-master.json")
        with open(sh_master_copy, "w", encoding="utf-8") as f:
            json.dump(projects_master, f, indent=2, ensure_ascii=False)
        print(f"✔ projects-master.json espejado en {sh_master_copy}")

    # 6. Resumen de estados
    print("\n" + "=" * 78)
    print(" 📊 RESUMEN CONSOLIDADO DE ESTADOS DE PROYECTO (25 PROYECTOS)")
    print("=" * 78)
    for p in projects_master:
        d_status = p.get("defaultStatus", "activo")
        s_status = map_status_to_showroom(d_status)
        badge = "🔵 ACTIVO" if s_status == "activo" else ("🟡 EN TRÁMITE" if s_status == "tramite" else "🟢 VENDIDO")
        title = p.get("es", {}).get("title", p.get("id"))[:45]
        print(f" • {p['id']:<34} | Dash: {d_status:<22} | Show: {badge:<15} | {title}")
    print("=" * 78)
    print(" 🎉 SINCRONIZACIÓN AUTOMÁTICA FINALIZADA EXITOSAMENTE")
    print("=" * 78)

if __name__ == "__main__":
    sync_portfolio()
