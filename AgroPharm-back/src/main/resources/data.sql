INSERT INTO categories (id, name, description) VALUES
(1, 'Semena', 'Razne vrste semena za poljoprivredne kulture'),
(2, 'Đubriva', 'Mineralna i organska đubriva za različite kulture'),
(3, 'Zaštita bilja', 'Preparati za zaštitu bilja od štetočina'),
(4, 'Alati i oprema', 'Razni poljoprivredni alati i oprema');

INSERT INTO products (id, name, description, price, supplies, reserved, category_id, image_url) VALUES
(1, 'Pšenica seme', 'Kvalitetno seme pšenice za setvu', 150.00, 1000, 150, 1, 'https://agroportal.rs/wp-content/uploads/2023/07/psenica-zrno-krupno-01.jpg'),
(2, 'Kadifa cveće', 'Kvalitetno seme cveća', 50.00, 1000, 150, 1, 'https://c.cdnmp.net/966870925/p/l/1/floris-cvece-kadifa-visoka-0-5g~5801.jpg'),
(3, 'Lepa kata seme', 'Kvalitetno seme cveća', 50.00, 1000, 150, 1, 'https://i0.wp.com/agroapoteka.com/wp-content/uploads/2021/02/Lepa-Kata-Aster-Piuma.jpg?fit=800%2C800&ssl=1'),
(4, 'Slamno cveće', 'Kvalitetno seme cveća', 50.00, 1000, 150, 1, 'https://i0.wp.com/agroapoteka.com/wp-content/uploads/2021/02/%D0%BF%D1%80%D0%B5%D1%83%D0%B7%D0%B8%D0%BC%D0%B0%D1%9A%D0%B5-3.jpg?w=225&ssl=1'),
(5, 'Cveće ladolež seme', 'Kvalitetno seme cveća', 50.00, 1000, 150, 1, 'https://i0.wp.com/agroapoteka.com/wp-content/uploads/2021/02/Ladolez.jpg?fit=800%2C800&ssl=1'),
(6, 'Petunija cveće seme', 'Kvalitetno seme cveća', 50.00, 1000, 150, 1, 'https://vrtnarstvo-mrak.si/wp-content/uploads/2018/09/Petunija-705x470.jpg'),
(7, 'Urea', 'Mineralno đubrivo za useve, 5kg', 320.00, 500, 50, 2, 'https://urbangarden.rs/wp-content/uploads/2023/06/urea.jpg'),
(8, 'Herbicid', 'Preparat za suzbijanje korova u kukuruzu', 750.00, 300, 30, 3, 'https://www.behardoo.ba/hoaloocy/2022/11/Glifomark_1l.jpg'),
(9, 'Nika-fert 20:20:20', 'Đubrivo sa mikroelementima – B,Cu,Fe,Mn,Zn,Mo, 2kg', 320.00, 500, 50, 2, 'https://agrounik.rs/wp-content/uploads/2020/06/20-20-20.jpg'),
(10, 'Kukuruz seme', 'Kvalitetno seme kukuruza, 25000 semena', 3800.00, 500, 50, 1, 'https://www.kws.com/rs/media/kws-kashmir-2-crop.jpg');

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
    (11, '2024-04-26 18:43:42', 4, null, 0, 1111),
    (12, '2024-04-27 18:43:42', 4, null, 0, 2222),
    (13, '2024-04-27 18:43:42', 4, 3, 1, 1111);

INSERT INTO order_items(
    id, quantity, order_id, product_id)
VALUES
    (111, 2, 11, 1),
    (211, 2, 11, 2),
    (311, 1, 12, 1),
    (411, 1, 12, 3),
    (511, 1, 13, 1),
    (611, 1, 13, 2);