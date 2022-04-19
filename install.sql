CREATE TABLE `users` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
    `name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
    `phone_number` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
    `x` FLOAT NULL DEFAULT NULL,
    `y` FLOAT NULL DEFAULT NULL,
    `z` FLOAT NULL DEFAULT NULL,
    `model` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
    PRIMARY KEY (`identifier`) USING BTREE,
    INDEX `id` (`id`) USING BTREE
)
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB
    AUTO_INCREMENT=1
;
