INSERT INTO categories (id, name, description) VALUES
(1, 'Semena', 'Razne vrste semena za poljoprivredne kulture'),
(2, 'Đubriva', 'Mineralna i organska đubriva za različite kulture'),
(3, 'Zaštita bilja', 'Preparati za zaštitu bilja od štetočina'),
(4, 'Alati i oprema', 'Razni poljoprivredni alati i oprema');

INSERT INTO products (id, name, description, price, supplies, reserved, category_id, image_url) VALUES
(11, 'Seme pšenice', 'Kvalitetno seme pšenice za setvu', 150.00, 1000, 150, 1, 'https://agroportal.rs/wp-content/uploads/2023/07/psenica-zrno-krupno-01.jpg'),
(21, 'Kadifa cveće', 'Kvalitetno seme cveća kadifa', 50.00, 1000, 150, 1, 'https://c.cdnmp.net/966870925/p/l/1/floris-cvece-kadifa-visoka-0-5g~5801.jpg'),
(31, 'Lepa kata cveće', 'Kvalitetno seme cveća lepa kata', 50.00, 1000, 150, 1, 'https://i0.wp.com/agroapoteka.com/wp-content/uploads/2021/02/Lepa-Kata-Aster-Piuma.jpg?fit=800%2C800&ssl=1'),
(41, 'Slamno cveće', 'Kvalitetno seme slamnog cveća', 50.00, 1000, 150, 1, 'https://i0.wp.com/agroapoteka.com/wp-content/uploads/2021/02/%D0%BF%D1%80%D0%B5%D1%83%D0%B7%D0%B8%D0%BC%D0%B0%D1%9A%D0%B5-3.jpg?w=225&ssl=1'),
(51, 'Cveće ladolež seme', 'Kvalitetno seme cveća ladolež', 50.00, 1000, 150, 1, 'https://i0.wp.com/agroapoteka.com/wp-content/uploads/2021/02/Ladolez.jpg?fit=800%2C800&ssl=1'),
(61, 'Petunija cveće seme', 'Kvalitetno seme cveća petunija', 50.00, 1000, 150, 1, 'https://vrtnarstvo-mrak.si/wp-content/uploads/2018/09/Petunija-705x470.jpg'),
(71, 'Urea', 'Mineralno đubrivo za useve', 320.00, 500, 50, 2, 'https://urbangarden.rs/wp-content/uploads/2023/06/urea.jpg'),
(81, 'Herbicid 34N', 'Preparat za suzbijanje korova u kukuruzu', 750.00, 300, 30, 3, 'https://www.behardoo.ba/hoaloocy/2022/11/Glifomark_1l.jpg'),
(91, 'Nika-fert 20:20:20', 'Đubrivo sa mikroelementima – B,Cu,Fe,Mn,Zn,Mo', 320.00, 500, 50, 2, 'https://agrounik.rs/wp-content/uploads/2020/06/20-20-20.jpg'),
(10, 'Seme hibrida kukuruza', 'Kvalitetno seme kukuruza za uspešan prinos', 3800.00, 500, 50, 1, 'https://www.kws.com/rs/media/kws-kashmir-2-crop.jpg');

INSERT INTO addresses(
    id, street, street_number, city, country, postal_code)
VALUES
    (1111, 'Svetog Save', 23, 'Zvornik', 'BiH', 75400),
    (2222, 'Bulevar despota Stefana', 7, 'Novi Sad', 'Srbija', 21000),
    (3333, 'Bulevar oslobođenja', 102, 'Novi Sad', 'Srbija', 21000),
    (4444, 'Stražilovska', 17, 'Novi Sad', 'Srbija', 21000),
    (5555, 'Zmaj Jovina', 22, 'Novi Sad', 'Srbija', 21000);


INSERT INTO roles(id, name)
    VALUES (1, 'ADMIN'),
           (2, 'SELLER'),
           (3, 'DELIVERER'),
           (4, 'CLIENT');


-- Users
INSERT INTO users(
    id, email, password, first_name, last_name, address_id, phone_number, last_password_reset_date, role_id)
VALUES
    (11, 'admin@email.com', '123', 'Aleksandra', 'Novaković', 4444, '062123456', '2024-04-26 18:43:42.666', 1),
    (22, 'seller@email.com', '123', 'Sale', 'Prodanović', 2222, '068723457', '2024-04-26 18:43:42.666', 2),
    (33, 'deli@email.com', '123', 'Deki', 'Delić', 3333, '062123499', '2024-04-26 18:43:42.666', 3),
    (44, 'client@email.com', '123', 'Pera', 'Perić', 1111, '0642123487', '2024-04-26 18:43:42.666', 4),
    (55, 'mika@email.com', '123', 'Mika', 'Mikić', 5555, '062124487', '2024-04-26 18:43:42.666', 4),
    (66, 'nikola@email.com', '123', 'Nikola', 'Novaković', 2222, '062333487', '2024-04-26 18:43:42.666', 4),
    (77, 'vela@email.com', '123', 'Velenka', 'Novaković', 3333, '062123999', '2024-04-26 18:43:42.666', 4);

INSERT INTO admins(
    user_id, is_senior)
VALUES
    (11, true);

INSERT INTO sellers(
    user_id, is_enabled)
VALUES
    (22, true);

 INSERT INTO deliverers(
     user_id, is_enabled)
 VALUES
     (33, true);

 INSERT INTO clients(
     user_id, penalty_points, is_enabled)
 VALUES
     (44, 0, true);

INSERT INTO orders(
    id, order_date, client_id, deliverer_id, status, address_id)
VALUES
    (11, '2024-09-20 19:45:42', 44, null, 0, 1111),
    (12, '2024-09-20 17:33:42', 44, null, 0, 2222),
    (13, '2024-09-20 18:13:42', 44, 33, 1, 1111);

INSERT INTO order_items(
    id, quantity, order_id, product_id)
VALUES
    (111, 2, 11, 11),
    (211, 2, 11, 21),
    (311, 1, 12, 11),
    (411, 1, 12, 31),
    (511, 1, 13, 11),
    (611, 1, 13, 21);

INSERT INTO notifications(
    id, title, content, is_read, created_at, user_id)
VALUES
    (11, 'Narudžbina preuzeta', 'Narudžbina sa brojem 12 je pruzeta za dostavu', false, '2024-09-20 18:43:42', 44);