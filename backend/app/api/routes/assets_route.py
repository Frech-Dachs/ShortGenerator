from app.schemas.asset import Asset, NewAsset
from app.services.assets_service import parseAssetId
from fastapi import APIRouter

router = APIRouter(prefix="/assets", tags=["assets"])



listOfAssets: list[Asset] = []

def parseNewAsset(newAsset: NewAsset):
    asset = {
        "id": parseAssetId(listOfAssets),
        "title": newAsset.title,
        "path": "../../uploads/" + parseAssetId(listOfAssets)       
    }
    return asset

@router.get("/")
def get_all_assets():
    return listOfAssets

@router.post("/", response_model=Asset)
def create_asset(newAsset: NewAsset):
    asset = parseNewAsset(newAsset)
    listOfAssets.append(asset)
    return asset
