from pydantic import BaseModel

class Asset(BaseModel):
    title: str
    assetId: str
    assetPath: str