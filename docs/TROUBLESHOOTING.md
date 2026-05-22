# Troubleshooting

## Container Won't Start

1. Check Worker health:
```bash
curl <WORKER_URL>/api/health
```

2. Check container status:
```bash
curl <WORKER_URL>/api/status
```

3. Try waking the container:
```bash
curl -X POST <WORKER_URL>/api/wake
```

4. Verify secrets are configured:
```bash
npx wrangler secret list
```

## SSH Fails

1. Ensure you're logged into Cloudflare:
```bash
npx wrangler login
```

2. Verify the container is deployed:
```bash
npx wrangler containers list
```

3. Use full SSH command:
```bash
npx wrangler containers ssh clinebox
```

## Model Calls Fail

1. Run the doctor:
```bash
clinebox doctor
```

2. Verify AI Gateway ID is correct
3. Verify API key is stored as a secret
4. Check gateway URL format:
```
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/{provider}
```

## Health Check Fails

The container health endpoint runs on `localhost:8788/health`.
Expected response:
```json
{"ok": true, "service": "clinebox"}
```

## Cold Start Delays

Container startup may take minutes due to:
- Image build
- Image pull
- Runtime warmup

This is expected. The UI shows provisioning state.
