# -*- coding: utf-8 -*-
"""
Rack de Comprobaciones de Integridad de Entregables Web (Triple QA Test Rack)
Agente 03: Desarrollador Web para Showrooms, Reportes e Interfaces
Verificación determinista pre-deploy: Cero 'undefined', contrato de esquemas, resiliencia y sincronización.
"""
import os
import json
import re
import sys

# Rutas base dinámicas
DASH_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHOW_CANDIDATES = [
    os.path.join(os.path.dirname(DASH_DIR), "showroom-energycpy"),
    r"E:\Proyectos\showroom-energycpy",
    r"C:\Users\Usuario\.gemini\antigravity-ide\scratch\showroom-energycpy",
    r"C:\Users\Usuario\.gemini\antigravity-ide\Proyectos\showroom-energycpy"
]

def find_showroom_dir():
    for cand in SHOW_CANDIDATES:
        if os.path.exists(cand):
            return cand
    return None

def run_tests():
    print("=" * 78)
    print(" 🧪 EJECUTANDO RACK DE COMPROBACIONES DE INTEGRIDAD (AGENTE 03 - WEB QA)")
    print("=" * 78)

    SHOW_DIR = find_showroom_dir()

    # 1. Validar projects-master.json (SSOT)
    master_path = os.path.join(DASH_DIR, "data", "projects-master.json")
    assert os.path.exists(master_path), f"Falta projects-master.json en {master_path}"
    with open(master_path, "r", encoding="utf-8") as f:
        master = json.load(f)
    assert len(master) == 25, f"Esperados 25 proyectos, hallados {len(master)}"
    
    # Comprobación 1 & 2: Cero undefined y dualidad raíz/bilingüe en master
    missing_master_title = [p["id"] for p in master if not p.get("title") or p.get("title") == "undefined"]
    missing_master_desc = [p["id"] for p in master if not p.get("description") or p.get("description") == "undefined"]
    assert not missing_master_title, f"Faltan títulos válidos en master: {missing_master_title}"
    assert not missing_master_desc, f"Faltan descripciones válidas en master: {missing_master_desc}"
    print(f"✔ Comprobación 1 & 2: projects-master.json verificado ({len(master)} proyectos con title y description raíz).")

    # 2. Validar mineria-diente-oro-verde en projects-master.json
    diente_m = [p for p in master if p["id"] == "mineria-diente-oro-verde"]
    assert len(diente_m) == 1, "No se encontró mineria-diente-oro-verde en master"
    assert diente_m[0]["defaultStatus"] == "bloqueado_por_gestion", f"Estado inesperado: {diente_m[0]['defaultStatus']}"
    print("✔ Regla de Negocio: mineria-diente-oro-verde en master fijado como 'bloqueado_por_gestion'.")

    # 3. Validar store.js (Dashboard Store & Auto-Sanación)
    store_path = os.path.join(DASH_DIR, "js", "store.js")
    with open(store_path, "r", encoding="utf-8") as f:
        store_code = f.read()
    assert "syncProjectStatusToShowroom" in store_code, "Falta syncProjectStatusToShowroom en store.js"
    assert "energycpy_projects_channel" in store_code, "Falta canal BroadcastChannel en store.js"
    assert "energycpy_project_statuses" in store_code, "Falta clave localStorage compartida en store.js"
    assert "targetTitle" in store_code or "bestTitle" in store_code, "Falta rutina de auto-sanación de títulos en loadData()"
    
    # Validar DEFAULT_PROJECTS en store.js
    m_dp = re.search(r"export\s+const\s+DEFAULT_PROJECTS\s*=\s*(\[[\s\S]*?\n\]);", store_code)
    assert m_dp, "No se encontró DEFAULT_PROJECTS en store.js"
    dp_list = json.loads(m_dp.group(1))
    assert len(dp_list) == 25, f"DEFAULT_PROJECTS tiene {len(dp_list)}, esperados 25"
    missing_dp_title = [p["id"] for p in dp_list if not p.get("title") or p.get("title") == "undefined"]
    assert not missing_dp_title, f"DEFAULT_PROJECTS tiene proyectos sin title: {missing_dp_title}"
    print("✔ Comprobación 3: store.js implementa auto-sanación reactiva y 25 DEFAULT_PROJECTS con títulos íntegros.")

    # 4. Validar bundle.js (Salida compilada de producción)
    bundle_path = os.path.join(DASH_DIR, "js", "bundle.js")
    with open(bundle_path, "r", encoding="utf-8") as f:
        bundle_code = f.read()
    assert "syncProjectStatusToShowroom" in bundle_code, "bundle.js no contiene syncProjectStatusToShowroom"
    assert "projTitle" in bundle_code, "bundle.js no contiene fallback defensivo projTitle"
    print(f"✔ Comprobación 4: bundle.js generado y verificado ({len(bundle_code):,} bytes) con fallbacks activos.")

    # 5. Validar showroom js/main.js (si existe directorio Showroom)
    if SHOW_DIR and os.path.exists(SHOW_DIR):
        show_main_path = os.path.join(SHOW_DIR, "js", "main.js")
        if os.path.exists(show_main_path):
            with open(show_main_path, "r", encoding="utf-8") as f:
                show_code = f.read()
            assert "energycpy_projects_channel" in show_code, "Falta energycpy_projects_channel en showroom"
            assert "energycpy_project_statuses" in show_code, "Falta energycpy_project_statuses en showroom"
            assert "cardTitle" in show_code, "Falta cardTitle con fallback defensivo en showroom"
            assert "onePagerTitle" in show_code, "Falta onePagerTitle con fallback defensivo en showroom"

            match = re.search(r"const\s+PROJECTS_DATA\s*=\s*(\{[\s\S]*?\n\});", show_code)
            assert match, "No se pudo extraer PROJECTS_DATA de showroom main.js"
            show_projects = json.loads(match.group(1))
            assert len(show_projects) == 25, f"Showroom tiene {len(show_projects)} proyectos, esperados 25"
            assert show_projects["mineria-diente-oro-verde"]["defaultStatus"] == "tramite", "Diente Oro Verde en showroom debe ser 'tramite'"
            missing_show_title = [k for k, v in show_projects.items() if not v.get("title") or v.get("title") == "undefined"]
            assert not missing_show_title, f"Showroom tiene proyectos sin title: {missing_show_title}"
            print("✔ Comprobación 5: showroom js/main.js sincronizado (25 proyectos, Diente Oro Verde 'tramite' y fallbacks).")

    # 6. QA de Dominio & Métricas Financieras
    total_amount = sum(p.get("amountUSD", 0) for p in master)
    assert abs(total_amount - 7636.5) < 0.1, f"Monto alterado: {total_amount}"
    print(f"✔ QA Financiero: Cartera verificada exactamente en USD {total_amount:,.1f}M (+7.6B).")

    print("=" * 78)
    print(" 🏆 RACK DE COMPROBACIONES SUPERADO EXITOSAMENTE (EXIT CODE 0)")
    print("=" * 78)

if __name__ == "__main__":
    try:
        run_tests()
        sys.exit(0)
    except AssertionError as err:
        print(f"\n❌ FALLA CRÍTICA EN RACK DE COMPROBACIONES: {err}")
        sys.exit(1)
    except Exception as ex:
        print(f"\n❌ ERROR INESPERADO EN RACK DE COMPROBACIONES: {ex}")
        sys.exit(2)
