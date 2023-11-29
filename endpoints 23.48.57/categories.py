from silence.decorators import endpoint


@endpoint(
    route="/categories",
    method="GET",
    sql="SELECT * FROM Categories"
)
def get_categories():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId/categories",
    method="GET",
    sql="SELECT * FROM Photos NATURAL JOIN PhotoCategories NATURAL JOIN Categories WHERE photoId = $photoId"
)
def get_categories_by_PhotoId():
    pass

###############################################################################

@endpoint(
    route="/categories/$categoryId",
    method="GET",
    sql="SELECT * FROM Categories WHERE categoryId = $categoryId"
)
def get_CategoryName():
    pass

###############################################################################

@endpoint(
    route="/categoryName/$categoryName",
    method="GET",
    sql="SELECT * FROM Categories WHERE categoryName = $categoryName"
)
def get_by_CategoryName():
    pass

###############################################################################

@endpoint(
    route="/photoCategories",
    method="GET",
    sql="SELECT * FROM photoCategories"
)
def get_photoCategories():
    pass

###############################################################################

@endpoint(
    route="/photoCategories/$photoId",
    method="GET",
    sql="SELECT * FROM photoCategories where photoId = $photoId"
)
def get_photoCategories_by_photoId():
    pass

###############################################################################

@endpoint(
    route="/categories",
    method="POST",
    sql="INSERT INTO Categories (categoryName) VALUES ($categoryName)",
    description="Creates a new category",
    auth_required=True,
)
def create(categoryName):
    pass

###############################################################################

@endpoint(
    route="/photoCategories/$photoId/$categoryId",
    method="POST",
    sql="INSERT INTO PhotoCategories (photoId, categoryId) VALUES ($photoId, $categoryId)",
    description="Asociate a category with a photo",
    auth_required=False,
)
def asociate(photoId, categoryId):
    pass

###############################################################################

@endpoint(
    route="/photoCategories/$photoId/$categoryId",
    method="DELETE",
    sql="DELETE FROM PhotoCategories WHERE photoId = $photoId AND categoryId = $categoryId",
    description="Removes a category of a photo",
    auth_required=True,
)
def delete():
    pass