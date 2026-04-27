import json
from urllib import parse, request

from app.core.config import settings
from app.core.exceptions import ApiError


def verify_turnstile_token(token: str | None, remote_ip: str | None = None) -> None:
    if not settings.captcha_enabled:
        return

    secret = (settings.turnstile_secret_key or "").strip()
    if not secret:
        raise ApiError("CAPTCHA_CONFIG_ERROR", "Captcha is enabled but not configured", 500)

    candidate = (token or "").strip()
    if not candidate:
        raise ApiError("CAPTCHA_REQUIRED", "Please complete captcha verification before booking.", 422)

    form: dict[str, str] = {"secret": secret, "response": candidate}
    if remote_ip:
        form["remoteip"] = remote_ip

    body = parse.urlencode(form).encode("utf-8")
    req = request.Request(
        settings.turnstile_verify_url,
        data=body,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )
    try:
        with request.urlopen(req, timeout=8) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except Exception as exc:  # pragma: no cover - network issues vary by env
        raise ApiError("CAPTCHA_VERIFICATION_UNAVAILABLE", "Captcha verification is unavailable", 503) from exc

    if not payload.get("success"):
        raise ApiError("CAPTCHA_FAILED", "Captcha verification failed. Please try again.", 422)
