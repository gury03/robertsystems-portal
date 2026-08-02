-- Tabla de contenido del CMS (panel de administración del portal)
CREATE TABLE IF NOT EXISTS cms_content (
  lang TEXT NOT NULL,
  section TEXT NOT NULL,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (lang, section)
);
