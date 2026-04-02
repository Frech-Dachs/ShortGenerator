from pydantic import BaseModel

class NewAsset(BaseModel):
    title: str

class Asset(BaseModel):
    id: str
    title: str
    path: str
    size: float
    duration: float