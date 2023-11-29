###############################################################################
# Project-specific settings
###############################################################################

# Shows debug messages while Silence is running
DEBUG_ENABLED = False

SECRET_KEY = "Change this to any random string"

# Database connection details
DB_CONN = {
    # 127.0.0.1 Para verlo en local cambiar la ip del campo host
    "host": "192.168.68.128",
    "port": 3306,
    "username": "root",
    "password": "iissi$root",
    "database": "entregable-iissi2-migrivros",
}

# The sequence of SQL scripts located in the sql/ folder that must
# be ran when the 'silence createdb' command is issued
SQL_SCRIPTS = [
    "tables.sql",
    "populate-DB.sql",
    "triggers.sql"
]

# The port in which the API and the web server will be deployed
HTTP_PORT = 8080

# The URL prefix for all API endpoints
API_PREFIX = "/api/v1"

# Table and fields that are used for both login and register
# Uncomment this and set up your own table and columns:

USER_AUTH_DATA = {
    "table": "Users",
    "identifier": "email",
    "password": "password",
}
