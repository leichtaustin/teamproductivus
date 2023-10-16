-- '\c productivus'

CREATE DATABASE productivus;


CREATE TABLE goal_obj (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    goal_name VARCHAR(55),
    target_val DECIMAL,
    current_val DECIMAL,
    sprint_id VARCHAR(255),
    last_update DATE,
    daily_val DECIMAL
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

INSERT INTO goal_obj (id, user_email, goal_name, target_val, current_val) VALUES (2, 'austin@test.com', 'second goal', 10, 1);

CREATE TABLE sprints (
    id VARCHAR(255) PRIMARY KEY,
    sprint_name VARCHAR(255),
    sprint_start_date DATE NOT NULL,
    sprint_end_date DATE NOT NULL
    user_email VARCHAR(255)
)
