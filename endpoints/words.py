from silence.decorators import endpoint

@endpoint(
    route="/words",
    method="GET",
    sql="SELECT * FROM InappropiateWord"
)
def get_all():
    pass

###############################################################################