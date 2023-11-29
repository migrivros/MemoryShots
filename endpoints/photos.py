from silence.decorators import endpoint

@endpoint(
    route="/photos",
    method="GET",
    sql="SELECT * FROM Photos"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/photos/index",
    method="GET",
    sql="SELECT * FROM Photos ORDER BY uploadDate DESC LIMIT 15"
)
def get_index():
    pass

###############################################################################

@endpoint(
    route="/photos/indexFollow/$userId",
    method="GET",
    sql="SELECT * FROM photos P JOIN usersfollow UF ON (P.userId = UF.user2) WHERE UF.user1 = $userId ORDER BY P.uploadDate DESC"
)
def get_index_follow():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="GET",
    sql="SELECT * FROM Photos WHERE photoId = $photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/user/photos/$userId",
    method="GET",
    sql="SELECT * FROM Photos WHERE userId = $userId ORDER BY uploadDate DESC"
)
def get_by_UserId():
    pass

###############################################################################

@endpoint(
    route="/photos/category/$categoryId",
    method="GET",
    sql="SELECT * FROM photos NATURAL JOIN PhotoCategories WHERE categoryId = $categoryId GROUP BY photoId ORDER BY uploadDate DESC"
)
def get_by_Category():
    pass

###############################################################################

@endpoint(
    route="/photos",
    method="POST",
    sql="INSERT INTO Photos (title, description, photoURL, visibility, userId) VALUES ($title, $description, $photoURL, $visibility, $userId)",
    description="Creates a new photo",
    auth_required=True,
)
def create(title, description, photoURL, visibility, userId):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="PUT",
    sql="UPDATE Photos SET title = $title, description = $description, photoURL = $photoURL, visibility = $visibility WHERE photoId = $photoId",
    description="Updates an existing photo",
    auth_required=True,
)
def update(title, description, photoURL, visibility):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="DELETE",
    sql="DELETE FROM Photos WHERE photoId = $photoId",
    description="Removes a photo",
    auth_required=True,
)
def delete():
    pass
