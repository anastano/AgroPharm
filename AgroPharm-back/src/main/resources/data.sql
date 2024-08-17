INSERT INTO categories (id, name, description) VALUES
(1, 'Seme', 'Razne vrste semena za poljoprivredne kulture'),
(2, 'Đubriva', 'Mineralna i organska đubriva za različite kulture'),
(3, 'Pesticidi', 'Preparati za zaštitu bilja od štetočina'),
(4, 'Alati', 'Razni poljoprivredni alati i oprema');

INSERT INTO products (id, name, description, price, supplies, reserved, category_id) VALUES
(1, 'Pšenica Seme', 'Kvalitetno seme pšenice za setvu', 150.00, 1000, 150, 1),
(2, 'Urea', 'Mineralno đubrivo za useve', 320.00, 500, 50, 2),
(3, 'Herbicid XY', 'Preparat za suzbijanje korova u kukuruzu', 200.00, 300, 30, 3),
(4, 'Traktor', 'Traktor za sve poljoprivredne radove', 25000.00, 10, 2, 4);
