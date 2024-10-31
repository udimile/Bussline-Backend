CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       type VARCHAR(20) CHECK (type IN ('student', 'guardian')) NOT NULL
);


CREATE TABLE guardians (
                           id SERIAL PRIMARY KEY,
                           user_id INT NOT NULL,
                           cpf VARCHAR(11) NOT NULL UNIQUE,
                           FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE students (
                          id SERIAL PRIMARY KEY,
                          user_id INT NOT NULL,
                          guardian_id INT,
                          cpf VARCHAR(11) NOT NULL UNIQUE,
                          ra VARCHAR(20) NOT NULL UNIQUE,
                          school VARCHAR(255) NOT NULL,
                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                          FOREIGN KEY (guardian_id) REFERENCES guardians(id) ON DELETE SET NULL
);


