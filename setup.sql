-- Create the PostgreSQL role
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'test') THEN
        CREATE ROLE test WITH LOGIN PASSWORD 'sample_password';
    END IF;
END
$$;
CREATE DATABASE astrobattles;
-- Connect to the new database
\c astrobattles;

-- Grant the role permissions on the database
GRANT ALL PRIVILEGES ON DATABASE astrobattles TO test;

-- Create the 'scores' table
CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

GRANT USAGE, SELECT ON SEQUENCE scores_id_seq TO test;
GRANT INSERT ON TABLE scores TO test;
GRANT SELECT, UPDATE, DELETE ON TABLE scores TO test;
ALTER DATABASE astrobattles OWNER TO test;
