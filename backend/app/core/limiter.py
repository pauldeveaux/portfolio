from slowapi import Limiter
from slowapi.util import get_remote_address
from starlette.requests import Request


def get_real_client_ip(request: Request) -> str:
    """
    Resolve the real client IP behind Cloudflare.

    Cloudflare sets CF-Connecting-IP on every proxied request and strips
    any client-supplied value, so it can't be spoofed by the caller as
    long as the origin is only reachable through Cloudflare.
    """
    cf_ip = request.headers.get("CF-Connecting-IP")
    if cf_ip:
        return cf_ip
    return get_remote_address(request)


limiter = Limiter(key_func=get_real_client_ip)
