from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    env: str = "dev"
    database_url: str
    allowed_origins: str = "http://localhost:3000"
    allowed_origin_regex: str = r"^https?://([a-z0-9-]+\.)?localhost(:\d+)?$|^https?://127\.0\.0\.1(:\d+)?$"

    default_bucket_max_capacity: int = 3
    duplicate_booking_window_hours: int = 24
    sms_template_id: str = "booking_confirmed"
    sms_provider_stub: str = "stub"

    db_pool_size: int = 5
    db_max_overflow: int = 10
    admin_jwt_secret: str = "change-me"
    admin_jwt_algorithm: str = "HS256"
    admin_jwt_ttl_minutes: int = 480
    admin_bootstrap_email: str | None = None
    admin_bootstrap_password: str | None = None

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


settings = Settings()

