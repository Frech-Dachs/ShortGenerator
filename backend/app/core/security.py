import os

from dotenv import load_dotenv
from itsdangerous import URLSafeSerializer, BadSignature
from pwdlib import PasswordHash

load_dotenv()

password_hash = PasswordHash.recommended()

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-me")
SESSION_COOKIE_NAME = "session"

serializer = URLSafeSerializer(SECRET_KEY, salt="auth-session")


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return password_hash.verify(password, hashed_password)


def create_session_token(user_id: int) -> str:
    return serializer.dumps({"user_id": user_id})


def verify_session_token(token: str) -> int | None:
    try:
        data = serializer.loads(token)
        return int(data["user_id"])
    except (BadSignature, KeyError, ValueError, TypeError):
        return None