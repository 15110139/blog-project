# Create user table
CREATE TABLE `user` (
    `id` varchar(64) NOT NULL,
    `create_date` datetime DEFAULT NULL,
    `modify_date` varchar(64) DEFAULT NULL,
    `del` int(2) DEFAULT NULL,
    `username` varchar(256) NOT NULL,
    `password` varchar(256) NOT NULL,
    `name` varchar(256) NOT NULL,
    PRIMARY KEY (`id`)
);

# Create blog table
CREATE TABLE `blog` (
    `id` varchar(64) NOT NULL,
    `create_date` datetime DEFAULT NULL,
    `modify_date` varchar(64) DEFAULT NULL,
    `del` int(2) DEFAULT NULL,
    `title` text NOT NULL,
    `content` text NOT NULL,
    `user_id` varchar(64) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_08dfe0c802192ba0c499d4cdb9c` (`user_id`),
    CONSTRAINT `FK_08dfe0c802192ba0c499d4cdb9c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);