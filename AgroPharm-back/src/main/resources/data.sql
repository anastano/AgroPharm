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
    (1111, 'Svetog Save', 23, 'Zvornik', 'BiH', 75400),
    (2222, 'Bulevar despota Stefana', 7, 'Novi Sad', 'Srbija', 21000);

INSERT INTO roles(id, name)
    VALUES (1, 'ADMIN'),
           (2, 'SELLER'),
           (3, 'DELIVERER'),
           (4, 'CLIENT');


-- Users
INSERT INTO users(
    id, email, password, first_name, last_name, address_id, phone_number, last_password_reset_date, role_id)
VALUES
    (1, 'admin@email.com', '123', 'Admin', 'Adamovic', 1111, '062123456', '2024-04-26 18:43:42.666', 1),
    (2, 'seller@email.com', '123', 'Sale', 'Prodanovic', 1111, '062123457', '2024-04-26 18:43:42.666', 2),
    (3, 'deli@email.com', '123', 'Deli', 'Delic', 1111, '062123457', '2024-04-26 18:43:42.666', 3),
    (4, 'client@email.com', '123', 'Pera', 'Peric', 1111, '062123457', '2024-04-26 18:43:42.666', 4);

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
    id, order_date, client_id, deliverer_id, status, address_id)
VALUES
    (11, '2024-04-26 18:43:42', 4, null, 1, 1111),
    (12, '2024-04-27 18:43:42', 4, null, 0, 2222),
    (13, '2024-04-27 18:43:42', 4, 3, 4, 1111);

INSERT INTO order_items(
    id, quantity, order_id, product_id)
VALUES
    (111, 2, 11, 1),
    (211, 2, 11, 2),
    (311, 1, 12, 1),
    (411, 1, 12, 3),
    (511, 1, 13, 1),
    (611, 1, 13, 2);