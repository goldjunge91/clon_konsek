        #  echo DATABASE_URL=postgres://postgres:${DB_PASSWORD}@localhost:5432/postgres
# Export the DATABASE_URL
export DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}

# Echo the exported DATABASE_URL (for verification)
echo "Exported DATABASE_URL=${DATABASE_URL}"