INSERT INTO categories (id, name, description) VALUES
(1, 'Seme', 'Razne vrste semena za poljoprivredne kulture'),
(2, 'Đubriva', 'Mineralna i organska đubriva za različite kulture'),
(3, 'Pesticidi', 'Preparati za zaštitu bilja od štetočina'),
(4, 'Alati', 'Razni poljoprivredni alati i oprema');

INSERT INTO products (id, name, description, price, supplies, reserved, category_id, image_url) VALUES
(1, 'Pšenica Seme', 'Kvalitetno seme pšenice za setvu', 150.00, 1000, 150, 1, 'https://superweb.rs/storage/slike/202205/lg-bioprodukt-kese-dizajn-ambalaze-graficki-dizajn-superweb-cacak.jpeg'),
(2, 'Urea', 'Mineralno đubrivo za useve', 320.00, 500, 50, 2, 'https://superweb.rs/storage/slike/202205/lg-bioprodukt-kese-dizajn-ambalaze-graficki-dizajn-superweb-cacak.jpeg'),
(3, 'Herbicid XY', 'Preparat za suzbijanje korova u kukuruzu', 200.00, 300, 30, 3, 'https://superweb.rs/storage/slike/202205/lg-bioprodukt-kese-dizajn-ambalaze-graficki-dizajn-superweb-cacak.jpeg'),
(4, 'Traktor', 'Traktor za sve poljoprivredne radove', 25000.00, 10, 2, 4, 'https://superweb.rs/storage/slike/202205/lg-bioprodukt-kese-dizajn-ambalaze-graficki-dizajn-superweb-cacak.jpeg');

INSERT INTO addresses(
    id, street, street_number, city, country, postal_code)
VALUES
    (1, 'Svetog Save', 23, 'Zvornik', 'BiH', 75400);

INSERT INTO roles(id, name)
    VALUES (1, 'ADMIN'),
           (2, 'SELLER'),
           (3, 'DELIVERER'),
           (4, 'CLIENT');


-- Users
INSERT INTO users(
    id, email, password, first_name, last_name, address_id, phone_number, last_password_reset_date, role_id)
VALUES
    (1, 'admin@email.com', '123', 'Admin', 'Adamovic', 1, '062123456', '2024-04-26 18:43:42.666', 1),
    (2, 'seller@email.com', '123', 'Sale', 'Prodanovic', 1, '062123457', '2024-04-26 18:43:42.666', 2),
    (3, 'deli@email.com', '123', 'Deli', 'Delic', 1, '062123457', '2024-04-26 18:43:42.666', 3),
    (4, 'client@email.com', '123', 'Pera', 'Peric', 1, '062123457', '2024-04-26 18:43:42.666', 4);

INSERT INTO admins(
    user_id, is_senior)
VALUES
    (1, true);

INSERT INTO sellers(
    user_id, is_enabled)
VALUES
    (2, true);

 INSERT INTO deliverers(
     user_id, is_enabled)
 VALUES
     (3, true);

 INSERT INTO clients(
     user_id, penalty_points, is_enabled)
 VALUES
     (4, 0, true);

INSERT INTO orders(
    id, order_date, client_id, deliverer_id, status)
VALUES
    (1, '2024-04-26 18:43:42', 2, null, 1),
    (2, '2024-04-27 18:43:42', 2, null, 0),
    (3, '2024-04-27 18:43:42', 2, 3, 4);

INSERT INTO order_items(
    id, quantity, order_id, product_id)
VALUES
    (1, 2, 1, 1),
    (2, 2, 1, 2),
    (3, 1, 2, 1),
    (4, 1, 2, 3),
    (5, 1, 3, 1),
    (6, 1, 3, 2);