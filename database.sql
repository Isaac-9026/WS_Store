
CREATE DATABASE dbstore;

USE dbstore;

CREATE TABLE marcas
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(30) NOT NULL UNIQUE
)ENGINE = INNODB;

CREATE TABLE productos
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    idmarca INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    precio DECIMAL(7,2) NOT NULL,
    stock INT NOT NULL,
    garantia TINYINT UNSIGNED NOT NULL,
    CONSTRAINT fk_marca FOREIGN KEY (idmarca)
        REFERENCES marcas(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX idx_idmarca (idmarca)
) ENGINE=INNODB;

INSERT INTO marcas (marca) VALUES
('Samsung'),
('Apple'),
('Sony');

INSERT INTO productos (idmarca, nombre, descripcion, precio, stock, garantia) VALUES
(1, 'Galaxy S23', 'Smartphone Samsung de última generación', 899.99, 50, 24),
(1, 'Galaxy Tab S8', 'Tablet Samsung para productividad', 599.50, 30, 12),
(2, 'iPhone 15', 'Nuevo iPhone con cámara avanzada', 1199.99, 40, 24),
(2, 'iPad Air', 'Tablet Apple ligera y potente', 649.00, 25, 12);

SELECT * FROM productos;