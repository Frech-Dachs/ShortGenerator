from app.schemas.asset import NewAsset, Asset

def parseAssetId(listOfAssets: list[Asset]):
    id = str(len(listOfAssets) + 1)
    return id