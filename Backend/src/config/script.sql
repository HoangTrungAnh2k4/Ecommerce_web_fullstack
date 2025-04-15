drop database if exists ecommerce_web;

create database ecommerce_web;

use ecommerce_web;

create table
    user (
        id int primary key auto_increment,
        name varchar(255) not null,
        email varchar(255) not null,
        address varchar(255),
        phoneNumber varchar(255) not null unique,
        role enum ('admin', 'user') not null DEFAULT 'user'
    );

create table
    auth_credentials (
        user_id int primary key,
        phoneNumber varchar(255) not null unique,
        password varchar(255) not null,
        foreign key (user_id) references user (id) on delete cascade
    );

create table
    equipment (
        id int primary key auto_increment,
        type varchar(255) not null,
        name varchar(255) not null unique,
        price int not null,
        discount int not null check (
            discount >= 0
            and discount <= 100
        ),
        sold_quantity int not null check (sold_quantity >= 0),
        best_seller boolean not null default false,
        stock_quantity int not null default 0
    );

create table
    evaluation (
        id int primary key auto_increment,
        value int not null check (
            value >= 0
            and value <= 5
        ),
        comment varchar(255),
        user_id int not null,
        user_name varchar(255) not null,
        equipment_id int not null,
        date datetime not null default current_timestamp,
        foreign key (user_id) references user (id) on delete cascade,
        foreign key (equipment_id) references equipment (id) on delete cascade
    );

create table
    cart (
        id int primary key auto_increment,
        user_id int not null,
        foreign key (user_id) references user (id) on delete cascade
    );

create table
    cart_item (
        cart_id int not null,
        equipment_id int not null,
        quantity int not null check (quantity > 0),
        primary key (cart_id, equipment_id),
        foreign key (cart_id) references cart (id) on delete cascade,
        foreign key (equipment_id) references equipment (id) on delete cascade
    );

create table
    image (
        id int primary key auto_increment,
        url varchar(255) not null,
        equipment_id int not null,
        foreign key (equipment_id) references equipment (id) on delete cascade
    );

INSERT INTO
    equipment (
        type,
        name,
        price,
        discount,
        sold_quantity,
        best_seller
    )
VALUES
    -- PC Type (5 items)
    (
        'pc',
        'Bộ PC Gaming Intel Core i5-12400F/RTX 4060/16GB RAM',
        18990000,
        0,
        150,
        true
    ),
    (
        'pc',
        'Bộ PC Workstation Xeon E5-2678/64GB RAM/Quadro RTX 4000',
        35990000,
        0,
        75,
        false
    ),
    (
        'pc',
        'Bộ PC AMD Ryzen 7 5700X/RX 6700 XT/32GB RAM',
        22990000,
        0,
        120,
        true
    ),
    (
        'pc',
        'Bộ PC Mini ITX Intel Core i3-12100/16GB RAM',
        8990000,
        0,
        200,
        false
    ),
    (
        'pc',
        'Bộ PC High-End Intel Core i9-13900K/RTX 4090/64GB RAM',
        65990000,
        0,
        50,
        true
    ),
    -- CPU Type (5 items)
    (
        'cpu',
        'Intel Core i9-13900K (3.0GHz Up To 5.8GHz, 24 Cores/32 Threads)',
        12990000,
        0,
        300,
        true
    ),
    (
        'cpu',
        'AMD Ryzen 9 7950X (4.5GHz Up To 5.7GHz, 16 Cores/32 Threads)',
        14990000,
        0,
        250,
        true
    ),
    (
        'cpu',
        'Intel Core i5-12400F (2.5GHz Up To 4.4GHz, 6 Cores/12 Threads)',
        4590000,
        0,
        500,
        false
    ),
    (
        'cpu',
        'AMD Ryzen 5 5600X (3.7GHz Up To 4.6GHz, 6 Cores/12 Threads)',
        4990000,
        0,
        450,
        false
    ),
    (
        'cpu',
        'Intel Xeon E5-2678 v3 (2.5GHz, 12 Cores/24 Threads)',
        3490000,
        0,
        150,
        false
    ),
    -- GPU Type (5 items)
    (
        'gpu',
        'MSI GeForce RTX 4090 GAMING X TRIO 24G',
        45990000,
        0,
        80,
        true
    ),
    (
        'gpu',
        'ASUS TUF Gaming Radeon RX 7900 XTX OC Edition 24GB',
        32990000,
        0,
        120,
        true
    ),
    (
        'gpu',
        'Gigabyte GeForce RTX 4060 Ti EAGLE OC 8G',
        12990000,
        0,
        300,
        false
    ),
    (
        'gpu',
        'ASUS Dual GeForce RTX 3060 Ti OC Edition 8GB GDDR6',
        8990000,
        0,
        250,
        false
    ),
    (
        'gpu',
        'Sapphire Pulse Radeon RX 6600 8GB GDDR6',
        5990000,
        0,
        350,
        false
    ),
    -- SSD Type (5 items)
    (
        'ssd',
        'Samsung 980 PRO 1TB PCIe Gen4 NVMe M.2 SSD',
        3490000,
        0,
        600,
        true
    ),
    (
        'ssd',
        'WD Black SN850X 2TB PCIe Gen4 NVMe M.2 SSD',
        5990000,
        0,
        400,
        true
    ),
    (
        'ssd',
        'Crucial P5 Plus 1TB PCIe Gen4 NVMe M.2 SSD',
        2790000,
        0,
        500,
        false
    ),
    (
        'ssd',
        'Kingston NV2 1TB PCIe Gen4 NVMe M.2 SSD',
        1890000,
        0,
        700,
        false
    ),
    (
        'ssd',
        'Samsung 870 EVO 1TB SATA 2.5-inch SSD',
        2290000,
        0,
        550,
        false
    ),
    -- Mainboard Type (5 items)
    (
        'main',
        'ASUS ROG STRIX Z790-E GAMING WIFI',
        8990000,
        0,
        200,
        true
    ),
    (
        'main',
        'MSI MAG B650 TOMAHAWK WIFI',
        5990000,
        0,
        300,
        true
    ),
    (
        'main',
        'Gigabyte B660M AORUS PRO AX DDR4',
        4290000,
        0,
        350,
        false
    ),
    (
        'main',
        'ASUS TUF GAMING B550-PLUS WIFI II',
        3990000,
        0,
        400,
        false
    ),
    (
        'main',
        'MSI PRO H610M-B DDR4',
        1990000,
        0,
        500,
        false
    );