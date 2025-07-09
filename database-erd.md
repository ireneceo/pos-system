-- stores 테이블
CREATE TABLE stores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    business_number VARCHAR(50) UNIQUE,
    owner_name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    logo_url VARCHAR(500),
    ...
);

-- menu_items 테이블  
CREATE TABLE menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    store_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    ...
);