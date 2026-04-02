from app.schemas.video import NewVideo, Video, VideoStatus
from fastapi import APIRouter

router = APIRouter(prefix="/videos", tags=["videos"])



listOfVideos: list[Video] = []

# def parseProgress(newVideo: NewVideo):
#     if newVideo.

def parseNewVideo(newVideo: NewVideo):
    video = {
        "id": str(len(listOfVideos) + 1),
        "title": newVideo.title,
        "topic": newVideo.topic,
        "description": newVideo.description,
        "status": VideoStatus.draft,
        "assetId": newVideo.assetId,
        "progress": 0,
        "script": "hello",
        "output_file": "path"
    }
    return video

@router.get("/")
def get_all_videos():
    return listOfVideos

@router.post("/", response_model=Video)
def create_video(newVideo: NewVideo):
    video = parseNewVideo(newVideo)
    listOfVideos.append(video)
    return video
