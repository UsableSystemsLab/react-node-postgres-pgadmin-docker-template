#!/bin/sh

# This script is based on the entrypoint.sh script from matschik/docker-compose-postgres-pgadmin GitHub repo.
# Source: https://github.com/matschik/docker-compose-postgres-pgadmin/blob/bb8dcad3a6a8b3aa1c0db4536e36e933a970013c/entrypoint.sh


SERVERS_JSON_PATH="/pgadmin4/servers.json"
PGPASSFILE="$HOME/.pgpass"

# Create the .pgpass file for password
echo "Creating pgpass file at $PGPASSFILE"
echo "${POSTGRES_HOST}:*:*:${POSTGRES_USER}:${POSTGRES_PASSWORD}" > "$PGPASSFILE"
chmod 600 $PGPASSFILE
cat $PGPASSFILE
echo "pgpass file created successfully."

echo "Creating servers.json file in $SERVERS_JSON_PATH"
cat << EOF > $SERVERS_JSON_PATH
{
    "Servers": {
        "1": {
            "Name": "Postgres DB Server",
            "Group": "Servers",
            "Host": "${POSTGRES_HOST}",
            "Port": ${POSTGRES_PORT},
            "MaintenanceDB": "postgres",
            "Username": "${POSTGRES_USER}",
            "PassFile": "$PGPASSFILE",
            "SSLMode": "prefer"
        }
    }
}
EOF

echo "$
SERVERS_JSON_PATH file created successfully."
cat $SERVERS_JSON_PATH

echo "Starting pgAdmin4..."
exec /entrypoint.sh
echo "pgAdmin4 started."
