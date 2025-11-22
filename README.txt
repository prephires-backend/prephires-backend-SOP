PrepHires Advanced SOP Backend
------------------------------
This package contains a Node.js Express backend designed for Render.com deployment.
It provides endpoints:
  POST /outline   -> returns SOP outline and risk checks
  POST /generate  -> returns final SOP and flags
  POST /export    -> returns simple download URL (data URI)
  POST /request-review -> demo human-review queue

IMPORTANT:
- Do NOT put your OpenAI API key in client/frontend code.
- Set environment variable OPENAI_API_KEY on Render before deploying.
- Set PORT to 10000 (or leave default).
- CORS: For production, restrict allowed origins.

Sample usage:
- Deploy to Render (connect GitHub repo) or other Node host.
- Configure environment variables:
    OPENAI_API_KEY = sk-...
    PORT = 10000

Your website domain provided: Prephires.com
A screenshot from your session has been included for reference.
