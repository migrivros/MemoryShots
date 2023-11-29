from silence.decorators import endpoint

@endpoint(
    route="/users",
    method="GET",
    sql="SELECT * FROM Users"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT * FROM Users WHERE userId = $userId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/users/name/$userName",
    method="GET",
    sql="SELECT * FROM Users WHERE userName = $userName"
)
def get_by_userName():
    pass
###############################################################################

@endpoint(
    route="/users/$userId",
    method="PUT",
    sql="UPDATE Users SET firstName = $firstName, lastName = $lastName, phoneNumber = $phoneNumber, email = $email, profilePhoto = $profilePhoto  WHERE userId = $userId",
    description="Updates an existing user",
    auth_required=True,
)
def update(firstName, lastName, phoneNumber, email, profilePhoto):
    pass

###############################################################################

@endpoint(
    route="/users",
    method="POST",
    sql="INSERT INTO Users (profilePhoto, firstName, lastName, userName, phoneNumber, email, password) VALUES ($profilePhoto, $firstName, $lastName, $userName, $phoneNumber, $email, $password)",
    description="Register a new user",
    auth_required=False,
)
def create(profilePhoto, firstName, lastName, userName, phoneNumber, email, password):
    pass

###############################################################################
