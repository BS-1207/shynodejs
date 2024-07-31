CREATE TABLE user (
    id VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    nick VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    birthday date NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp()
)