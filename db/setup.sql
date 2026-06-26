-- Creamos la tabla de autores

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL, 
    bio TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- Creamos la tabla de publicaciones - posts

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    content TEXT NOT NULL,
    published BOOLEAN DEFAULT FALSE, -- Por defecto, el post se guarda como borrador (no publicado)--PENDIENTE
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creamos la tabla comentarios

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE
);
