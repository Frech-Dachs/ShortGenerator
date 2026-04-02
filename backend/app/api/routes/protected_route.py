from fastapi import APIRouter, Depends

from app.api.dependencies.auth import get_current_user
from app.models.user_model import User

router = APIRouter(prefix="/protected", tags=["protected"])


@router.get("/profile")
def get_profile(current_user: User = Depends(get_current_user)):
    return {
        "message": "You are authenticated",
        "user": {
            "id": current_user.id,
            "email": current_user.email,
            "username": current_user.username,
        },
    }