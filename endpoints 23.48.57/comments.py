from silence.decorators import endpoint

@endpoint(
    route="/photos/$photoId/comments",
    method="GET",
    sql="SELECT * FROM Comments NATURAL JOIN Users WHERE photoId = $photoId"
)
def get_coments_by_PhotoId():
    pass

###############################################################################

@endpoint(
    route="/comments",
    method="POST",
    sql="INSERT INTO Comments (text, userId, photoId) VALUES ($text, $userId, $photoId)",
    description="Post a new commet",
    auth_required=True,
)
def create(text, userId, photoId):
    pass

###############################################################################