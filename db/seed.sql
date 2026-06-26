-- Insertamos datos de pruebas iniciales

INSERT INTO authors (name, email, bio) VALUES
('Admin', 'admin@miniblog.com', 'Creador del blog'),
('Test User', 'test@miniblog.com', 'Usuario de pruebas');


INSERT INTO posts (author_id, title, content, published) VALUES
(1, 'Bienvenido a MiniBlog', 'Este es el primer post oficial de la API.', true),
(2, 'Borrador de prueba', 'Contenido de prueba que aún no está publicado.', false);


INSERT INTO comments (content, post_id, author_id) VALUES
('¡Qué buen post!', 1, 2),
('Me sirvió mucho, gracias.', 2, 1);