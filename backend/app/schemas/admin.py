from pydantic import BaseModel, Field


class AdminUserRead(BaseModel):
    id: str
    email: str
    role: str
    is_active: bool


class AdminLoginRequest(BaseModel):
    email: str = Field(..., min_length=5, max_length=255)
    password: str = Field(..., min_length=8, max_length=128)


class AdminLoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in_seconds: int
    user: AdminUserRead


class AdminBootstrapStatusResponse(BaseModel):
    has_any_admin: bool
    has_active_admin: bool
    bootstrap_configured: bool


class AdminUserCreate(BaseModel):
    email: str = Field(..., min_length=5, max_length=255)
    password: str = Field(..., min_length=8, max_length=128)
    role: str = Field(default="staff", pattern="^(admin|staff)$")


class AdminUserUpdate(BaseModel):
    is_active: bool


class AdminUserListResponse(BaseModel):
    items: list[AdminUserRead]
