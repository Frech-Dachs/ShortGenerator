from pydantic import BaseModel
from enum import Enum

class VideoStatus(str, Enum):
    draft = "draft"
    rendering = "rendering"
    complete = "complete"
    failed = "failed"

class NewVideo(BaseModel):
    title: str
    topic: str
    description: str
    assetId: str

class Video(BaseModel):
    id: str
    title: str
    topic: str
    description: str
    status: VideoStatus
    assetId: str
    progress: int
    script: str
    output_file: str