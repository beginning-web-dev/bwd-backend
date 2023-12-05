CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT,
    `first_name` VARCHAR(25) NOT NULL,
    `last_name` VARCHAR(25) NOT NULL,
    `username` VARCHAR(10) NOT NULL,
    `email` VARCHAR(32) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `role` ENUM('admin', 'moderator', 'user') NOT NULL,
    PRIMARY KEY(`id`)
);