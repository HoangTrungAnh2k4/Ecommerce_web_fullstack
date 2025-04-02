drop database if exists ecommerce_web;

create database ecommerce_web;

use ecommerce_web;

create table
    user (
        id int primary key auto_increment,
        name varchar(255) not null,
        email varchar(255) not null,
        address varchar(255) not null,
        phoneNumber varchar(255) not null unique
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
        name varchar(255) not null,
        price int not null,
        discount int check (
            discount >= 0
            and discount <= 10
        ),
        quantity int not null check (quantity >= 0),
        unique (type, name)
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
        equipment_id int not null,
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

insert into
    equipment (type, name, price, discount, quantity)
values
    (
        'pc',
        '[Tặng màn hình] Bộ PC Gaming I5 14600KF / RAM 16G / VGA RX 6700 XT 12G',
        500,
        10,
        25
    ),
    (
        'pc',
        'Bộ PC Gaming 05 (i5 13400/ B760M /RAM 16GB/ SSD 500GB/ RTX 4060/ 700W)',
        500,
        10,
        25
    ),
    (
        'pc',
        'Bộ PC NC Gaming 08 (I5 12400F/ 16GB RAM/ RTX 4060 OC)',
        500,
        10,
        25
    ),
    (
        'gpu',
        'Card màn hình Gigabyte RTX 3060 12GB GDDR6 Gaming OC V2 (GV-N3060GAMING OC-12GD)',
        500,
        10,
        25
    ),
    (
        'gpu',
        'Card Màn Hình Colorful iGame GeForce RTX 3060 Ultra White OC 12G-V',
        500,
        10,
        25
    ),
    (
        'gpu',
        'Card Màn Hình Asus DUAL RX 6600 8GB V3',
        500,
        10,
        25
    ),
    (
        'cpu',
        'CPU Intel Core i5-12400F Tray NEW (Up to 4.4Ghz, 6 nhân 12 luồng, 18MB Cache, 65W) - Socket Intel LGA 1700)',
        500,
        10,
        25
    ),
    (
        'cpu',
        'CPU Intel Core i5 14600K (Up 5.30 GHz, 14 Nhân 20 Luồng, 24MB Cache, Raptor Lake Refresh)',
        500,
        10,
        25
    ),
    (
        'cpu',
        'CPU AMD Ryzen 5 4600G (3.7GHz Boost 4.2GHz / 6 nhân 12 luồng / 11MB / AM4)',
        500,
        10,
        25
    ),
    (
        'main',
        'Mainboard ASRock Z790 PG Lightning Wifi D5',
        500,
        10,
        25
    ),
    (
        'main',
        'Mainboard Asus PRIME Z790M PLUS CSM DDR5',
        500,
        10,
        25
    ),
    (
        'main',
        'Mainboard MSI B760M GAMING PLUS WIFI DDR4',
        500,
        10,
        25
    ),
    (
        'monitor',
        'Màn hình Asus VA24DQLB (23.8 inch FHD IPS 75Hz)',
        500,
        10,
        25
    ),
    (
        'monitor',
        'Màn hình Philips 24M1N3200ZA/74 (24 inch/ FHD/ IPS/ 165Hz/ 1ms/ G-sync)',
        500,
        10,
        25
    ),
    (
        'monitor',
        'Màn Hình ASUS VA27EHF (27inch/ FullHD/ IPS/ 10,
        250Hz/ 1Ms)',
        500,
        10,
        25
    ),
    (
        'laptop',
        'Laptop HP Gaming Victus 15-fb2063dx (AMD RYZEN 5 7535HS, 8GB, SSD 512GB, AMD Radeon RX 6550M, 15.6'' Full HD, IPS, 144Hz-MICA SILVER) - NK BH tại NC',
        500,
        10,
        25
    ),
    (
        'laptop',
        'Laptop Gigabyte G5 KF-E3VN333SH (i5 12500H/ 8GB RAM/ 512GB SSD/ 15.6″ FHD 144Hz/ RTX 4060 8GB/ Black/ Win11/ 2Yrs)',
        500,
        10,
        25
    ),
    (
        'laptop',
        'Laptop GIGABYTE G5 MF5-52VN383SH (Intel Core i5-13500H, 8GB, 512GB, RTX 4050, 15.6inch, FHD, Win 11, Đen)',
        500,
        10,
        25
    ),
    (
        'ssd',
        'Ổ cứng HDD Western Caviar Blue 1TB 7200Rpm, SATA3 6Gb/s, 64MB Cache',
        500,
        10,
        25
    ),
    (
        'ssd',
        'Ổ Cứng SSD Samsung 980 500GB (310,
        250 MB/s, 2600 MB/s, M.2 PCIe, 2280, Gen 3x4, MLC)',
        500,
        10,
        25
    ),
    (
        'ssd',
        'Ổ cứng SSD Kingston KC3000 512GB NVMe M.2 2280 PCIe Gen 4x4 (Đọc 7000MB/s, Ghi 3900MB/s)-(SKC3000S/512G)',
        500,
        10,
        25
    );