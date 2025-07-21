CREATE TABLE farmers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    location VARCHAR(100),
    password VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE crops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    nursery_days INT,          
    days_to_harvest INT,       
    harvest_duration_days INT  
);


CREATE TABLE batches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crop_id INT,
    variety VARCHAR(100),
    date_sown DATE,
    expected_transplant_date DATE,
    expected_harvest_start DATE,
    expected_harvest_end DATE,
    total_seedlings INT,
    FOREIGN KEY (crop_id) REFERENCES crops(id)
);


CREATE TABLE farmer_batches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_id INT,
    batch_id INT,
    seedlings_bought INT,
    date_purchased DATE,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id),
    FOREIGN KEY (batch_id) REFERENCES batches(id)
);


INSERT INTO crops (name, nursery_days, days_to_harvest, harvest_duration_days)
VALUES 
('Cabbage', 25, 70, 0),
('Capsicum', 30, 75, 30),
('Hot Chilli', 35, 90, 365),
('Purple Cabbage', 25, 70, 0),
('Onions', 30, 120, 0);



INSERT INTO farmers (name, phone, email,password, location)
VALUES 
('Alice Mwangi', '0700123456', 'alice@example.com','kenya', 'Kiambu'),
('John Otieno', '0711223344', 'john@example.com','kenya', 'Kisumu');


INSERT INTO batches (crop_id, variety, date_sown, expected_transplant_date, expected_harvest_start, expected_harvest_end, total_seedlings)
VALUES 
(1, 'Green Express', '2025-06-01', DATE_ADD('2025-06-01', INTERVAL 25 DAY), DATE_ADD('2025-06-01', INTERVAL 95 DAY), DATE_ADD('2025-06-01', INTERVAL 95 DAY), 1000),
(2, 'California Wonder', '2025-06-10', DATE_ADD('2025-06-10', INTERVAL 30 DAY), DATE_ADD('2025-06-10', INTERVAL 105 DAY), DATE_ADD('2025-06-10', INTERVAL 135 DAY), 800),
(3, 'Bird Eye', '2025-06-05', DATE_ADD('2025-06-05', INTERVAL 35 DAY), DATE_ADD('2025-06-05', INTERVAL 125 DAY), DATE_ADD('2025-06-05', INTERVAL 490 DAY), 1200);

INSERT INTO farmer_batches (farmer_id, batch_id, seedlings_bought, date_purchased)
VALUES 
(1, 1, 200, '2025-06-20'),
(2, 2, 150, '2025-07-01'),
(1, 3, 300, '2025-07-02');