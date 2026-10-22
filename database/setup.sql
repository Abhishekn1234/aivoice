-- Local development account. Change this password before using outside development,
-- and keep DB_PASSWORD in .env in sync with the password below.
CREATE DATABASE IF NOT EXISTS sayso
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

CREATE USER IF NOT EXISTS 'sayso'@'127.0.0.1' IDENTIFIED BY 'change-me';
ALTER USER 'sayso'@'127.0.0.1' IDENTIFIED BY 'change-me';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX
  ON sayso.* TO 'sayso'@'127.0.0.1';
