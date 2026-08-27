# Photobooth

## Entwicklungsumgebung

Der Workspace verwendet pnpm 12.0.0 als Standalone-Installation ohne
Corepack. Die exakte Node-Version 20.20.2 wird über `devEngines.runtime` von
pnpm bereitgestellt.

```bash
pnpm install --frozen-lockfile
```

Auf dem Raspberry Pi muss pnpm 12.0.0 einmalig standalone eingerichtet sein.
Der Frozen-Install lädt Node 20.20.2 in den Workspace; Deployment und
Init-Skript verwenden anschließend diese projektgebundene Runtime.
