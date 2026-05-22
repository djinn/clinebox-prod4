# SSH into ClineBox

## Prerequisites

- Wrangler CLI installed (`npm install -g wrangler` or `bun install -g wrangler`)
- Logged into Cloudflare (`npx wrangler login`)

## Connect to Container

```bash
npx wrangler containers ssh clinebox
```

## First Connection

On first SSH:

1. The container bootstraps automatically
2. Cline CLI is pre-installed
3. AI Gateway is configured
4. Welcome banner appears

## Quick Start

Once connected, just run:

```bash
clinebox
```

This sources your AI Gateway configuration, runs a quick health check on first use, and drops you into the workspace with Cline ready.

## Manual Start

If you prefer to do things manually:

```bash
cd /workspace
cline
```

## Doctor Command

```bash
clinebox-doctor
```

Validates:
- Cloudflare Account ID
- AI Gateway ID
- Model provider and selection
- API key existence
- Gateway reachability
- Cline installation
- Workspace permissions
