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


