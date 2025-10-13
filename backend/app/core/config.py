from pydantic import ValidationError
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Application configuration loaded from environment variables.
    """
    FRONTEND_ORIGIN: str = "http://localhost:3000"

    EMAIL_HOST: str
    EMAIL_PORT: int
    EMAIL_USER: str
    EMAIL_PASSWORD: str
    EMAIL_RECIPIENT: str

    class Config:
        """
        Pydantic configuration for environment variable loading and validation.
        """
        env_file = ".env"
        extra = "ignore"


try:
    settings = Settings()
except ValidationError as e:
    """
       Validates required environment variables.

       Raises:
           RuntimeError: If one or more environment variables are missing or invalid.
       """
    missing = [err['loc'][0] for err in e.errors()]
    msg = f"Missing or invalid environment variables: {', '.join(missing)}"
    raise RuntimeError(msg)