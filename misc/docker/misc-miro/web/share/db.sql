CREATE DATABASE IF NOT EXISTS `mail` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use `mail`;

CREATE TABLE IF NOT EXISTS `users`(
    `mail` VARCHAR(128) NOT NULL PRIMARY KEY,
    `nickname` VARCHAR(512) NOT NULL,
    `pw` VARCHAR(64) NOT NULL,
    `comment` VARCHAR(256),
    `auth` INT(1)
);