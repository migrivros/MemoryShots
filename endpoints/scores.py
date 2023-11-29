from silence.decorators import endpoint

@endpoint(
    route="/photos/$photoId/score",
    method="GET",
    sql="SELECT round(AVG(VALUE),2) AS value FROM scores WHERE photoId = $photoId"
)
def get_coments_by_PhotoId():
    pass

###############################################################################

@endpoint(
    route="/scores",
    method="POST",
    sql="INSERT INTO Scores (value, userId, photoId) VALUES ($value, $userId, $photoId)",
    description="Add a score to a photo",
    auth_required=False,
)
def post_score(value, userId, photoId):
    pass

###############################################################################