from silence.decorators import endpoint

@endpoint(
    route="/follow/$user1/$user2",
    method="GET",
    sql="SELECT * FROM usersfollow U WHERE U.user1 = $user1 AND U.user2 = $user2"
)
def get_status_follow():
    pass

###############################################################################

@endpoint(
    route="/follow/$user1/$user2",
    method="POST",
    sql="INSERT INTO UsersFollow (user1, user2) VALUES ($user1, $user2)",
    description="Follow an user",
    auth_required=False,
)
def follow_user(user1, user2):
    pass

###############################################################################

@endpoint(
    route="/unfollow/$user1/$user2",
    method="DELETE",
    sql="DELETE FROM UsersFollow WHERE user1 = $user1 AND user2 = $user2",
    description="Unfollow an user",
    auth_required=False,
)
def unfollow_user():
    pass
