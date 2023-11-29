from silence.decorators import endpoint

@endpoint(
    route="/trendsScore",
    method="GET",
    sql="SELECT * from photos P join scores S WHERE P.photoId = S.photoId AND DATE(P.uploadDate) <= NOW() AND DATE(P.uploadDate) >= DATE_SUB(NOW(), INTERVAL 7 DAY) GROUP BY P.photoId ORDER BY SUM(S.value) DESC LIMIT 5"
)
def get_trendScore():
    pass

#####################################################################################

@endpoint(
    route="/trendsComment",
    method="GET",
    sql="SELECT * from photos P join Comments C WHERE P.photoId = C.photoId AND DATE(P.uploadDate) <= NOW() AND DATE(P.uploadDate) >= DATE_SUB(NOW(), INTERVAL 7 DAY) GROUP BY P.photoId ORDER BY COUNT(*) DESC LIMIT 5"
)
def get_trendComment():
    pass

#####################################################################################

@endpoint(
    route="/trendCategories",
    method="GET",
    sql="SELECT *, COUNT(*) AS nPhotos FROM PhotoCategories P JOIN categories C ON P.categoryId = C.categoryId GROUP BY C.categoryId ORDER BY COUNT(*) DESC LIMIT 5"
)
def get_trendCategories():
    pass

#####################################################################################

@endpoint(
    route="/trendFollows",
    method="GET",
    sql="SELECT *, COUNT(*) AS nFollow FROM users U JOIN usersfollow UF ON U.userId = UF.user2 GROUP BY U.userId ORDER BY nFollow DESC LIMIT 5;"
)
def get_trendUserFollowed():
    pass

#####################################################################################

@endpoint(
    route="/trendBestUserScore",
    method="GET",
    sql="SELECT U.userId, U.firstName, U.lastName, P.visibility, round(AVG(S.value),2) AS mediumValue FROM Scores S JOIN Photos P JOIN Users U ON S.photoId = P.photoId AND P.userId = U.userId GROUP BY U.userId ORDER BY mediumValue DESC LIMIT 5"
)
def get_trendBestUserScore():
    pass

#####################################################################################