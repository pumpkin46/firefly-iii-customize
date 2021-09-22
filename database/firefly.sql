/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.19-MariaDB : Database - fin
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`fin` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `fin`;

/*Table structure for table `2fa_tokens` */

DROP TABLE IF EXISTS `2fa_tokens`;

CREATE TABLE `2fa_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `expires_at` datetime NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `2fa_tokens_token_unique` (`token`),
  KEY `2fa_tokens_user_id_foreign` (`user_id`),
  CONSTRAINT `2fa_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `2fa_tokens` */

/*Table structure for table `account_meta` */

DROP TABLE IF EXISTS `account_meta`;

CREATE TABLE `account_meta` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `account_id` int(10) unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_meta_account_id_foreign` (`account_id`),
  CONSTRAINT `account_meta_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `account_meta` */

insert  into `account_meta`(`id`,`created_at`,`updated_at`,`account_id`,`name`,`data`) values 
(1,'2021-09-11 02:20:15','2021-09-11 02:20:15',1,'currency_id','\"1\"'),
(2,'2021-09-11 09:55:08','2021-09-11 09:55:08',2,'account_role','\"defaultAsset\"'),
(3,'2021-09-11 09:55:08','2021-09-11 09:55:08',2,'currency_id','\"1\"'),
(4,'2021-09-11 09:55:08','2021-09-11 09:55:08',2,'include_net_worth','\"1\"'),
(5,'2021-09-12 06:32:44','2021-09-12 06:32:44',3,'currency_id','\"1\"'),
(6,'2021-09-13 07:18:43','2021-09-13 07:18:43',4,'currency_id','\"1\"'),
(7,'2021-09-13 07:18:43','2021-09-13 07:18:43',4,'include_net_worth','\"1\"'),
(8,'2021-09-13 08:25:24','2021-09-13 08:25:24',5,'currency_id','\"1\"'),
(9,'2021-09-13 08:25:24','2021-09-13 08:25:24',5,'include_net_worth','\"1\"'),
(10,'2021-09-13 08:25:40','2021-09-13 08:25:40',6,'currency_id','\"1\"'),
(11,'2021-09-13 08:25:40','2021-09-13 08:25:40',6,'include_net_worth','\"1\"'),
(12,'2021-09-13 08:25:59','2021-09-13 08:25:59',7,'account_role','\"defaultAsset\"'),
(13,'2021-09-13 08:25:59','2021-09-13 08:25:59',7,'currency_id','\"1\"'),
(14,'2021-09-13 08:25:59','2021-09-13 08:25:59',7,'include_net_worth','\"1\"'),
(15,'2021-09-22 01:50:18','2021-09-22 01:50:18',8,'currency_id','\"1\"'),
(16,'2021-09-22 01:50:18','2021-09-22 01:50:18',8,'include_net_worth','\"1\"'),
(17,'2021-09-22 01:51:16','2021-09-22 01:51:16',9,'currency_id','\"1\"'),
(18,'2021-09-22 01:51:16','2021-09-22 01:51:16',9,'include_net_worth','\"1\"'),
(19,'2021-09-22 01:54:47','2021-09-22 01:54:47',10,'currency_id','\"1\"'),
(20,'2021-09-22 01:54:47','2021-09-22 01:54:47',10,'include_net_worth','\"1\"'),
(21,'2021-09-22 16:50:37','2021-09-22 16:50:37',11,'currency_id','\"1\"'),
(22,'2021-09-22 16:50:37','2021-09-22 16:50:37',11,'include_net_worth','\"1\"'),
(23,'2021-09-22 17:01:55','2021-09-22 17:01:55',12,'currency_id','\"1\"'),
(24,'2021-09-22 17:01:55','2021-09-22 17:01:55',12,'include_net_worth','\"1\"'),
(25,'2021-09-22 17:03:49','2021-09-22 17:03:49',13,'currency_id','\"1\"'),
(26,'2021-09-22 17:03:49','2021-09-22 17:03:49',13,'include_net_worth','\"1\"');

/*Table structure for table `account_types` */

DROP TABLE IF EXISTS `account_types`;

CREATE TABLE `account_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_types_type_unique` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `account_types` */

insert  into `account_types`(`id`,`created_at`,`updated_at`,`type`) values 
(1,'2021-09-11 02:16:46','2021-09-11 02:16:46','Default account'),
(2,'2021-09-11 02:16:46','2021-09-11 02:16:46','Cash account'),
(3,'2021-09-11 02:16:47','2021-09-11 02:16:47','Asset account'),
(4,'2021-09-11 02:16:47','2021-09-11 02:16:47','Expense account'),
(5,'2021-09-11 02:16:47','2021-09-11 02:16:47','Revenue account'),
(6,'2021-09-11 02:16:47','2021-09-11 02:16:47','Initial balance account'),
(7,'2021-09-11 02:16:48','2021-09-11 02:16:48','Beneficiary account'),
(8,'2021-09-11 02:16:48','2021-09-11 02:16:48','Import account'),
(9,'2021-09-11 02:16:48','2021-09-11 02:16:48','Loan'),
(10,'2021-09-11 02:16:48','2021-09-11 02:16:48','Reconciliation account'),
(11,'2021-09-11 02:16:48','2021-09-11 02:16:48','Debt'),
(12,'2021-09-11 02:16:48','2021-09-11 02:16:48','Mortgage');

/*Table structure for table `accounts` */

DROP TABLE IF EXISTS `accounts`;

CREATE TABLE `accounts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `account_type_id` int(10) unsigned NOT NULL,
  `name` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `virtual_balance` decimal(36,24) DEFAULT NULL,
  `iban` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emergency_contact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rent_start_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rent_end_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apartment_nr` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expense_account` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `headline` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signature` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `encrypted` tinyint(1) NOT NULL DEFAULT 0,
  `order` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `accounts_user_id_foreign` (`user_id`),
  KEY `accounts_account_type_id_foreign` (`account_type_id`),
  CONSTRAINT `accounts_account_type_id_foreign` FOREIGN KEY (`account_type_id`) REFERENCES `account_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `accounts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `accounts` */

insert  into `accounts`(`id`,`created_at`,`updated_at`,`deleted_at`,`user_id`,`account_type_id`,`name`,`virtual_balance`,`iban`,`phone_number`,`email`,`emergency_contact`,`rent_start_date`,`rent_end_date`,`apartment_nr`,`expense_account`,`headline`,`zip_code`,`city`,`street`,`signature`,`active`,`encrypted`,`order`) values 
(1,'2021-09-11 02:20:15','2021-09-11 02:20:15',NULL,1,2,'Cash account',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(2,'2021-09-11 09:55:08','2021-09-21 19:08:28',NULL,1,3,'test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,1),
(3,'2021-09-12 06:32:44','2021-09-12 06:32:44',NULL,1,4,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(4,'2021-09-13 07:18:43','2021-09-13 07:18:43',NULL,1,4,'2',NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(5,'2021-09-13 08:25:23','2021-09-22 04:46:12',NULL,1,5,'revenue1',0.000000000000000000000000,'','22123123123','22','2','2021-09-13 00:00:00','2021-09-16 00:00:00','2','2222222','test','10202','test','test','S Y',1,0,0),
(6,'2021-09-13 08:25:40','2021-09-22 17:01:18',NULL,1,4,'expense1',0.000000000000000000000000,'','','','',NULL,NULL,'','','test111','test','11',NULL,'11',1,0,0),
(7,'2021-09-13 08:25:59','2021-09-21 19:08:28',NULL,1,3,'destication1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,2),
(8,'2021-09-22 01:50:18','2021-09-22 01:50:18',NULL,1,4,'1121',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(9,'2021-09-22 01:51:16','2021-09-22 17:01:35',NULL,1,4,'test',0.000000000000000000000000,'','','','',NULL,NULL,'','','test','test','test',NULL,'test',1,0,0),
(10,'2021-09-22 01:54:46','2021-09-22 01:54:46',NULL,1,4,'testsdfsdf',NULL,NULL,'1','1','1','2021-06-09 00:00:00','2021-09-14 00:00:00','2','2',NULL,NULL,NULL,NULL,NULL,1,0,0),
(11,'2021-09-22 16:50:37','2021-09-22 16:50:37',NULL,1,5,'sdfsdfsdf',NULL,NULL,'dfsdfsdfsd','fsdfsdf','sdfsdfs','2021-09-24 00:00:00','2021-09-30 00:00:00','1','test','test','test','test',NULL,'test',1,0,0),
(12,'2021-09-22 17:01:55','2021-09-22 17:01:55',NULL,1,4,'expense2',NULL,NULL,'','','',NULL,NULL,'','','','','',NULL,'',1,0,0),
(13,'2021-09-22 17:03:49','2021-09-22 17:03:49',NULL,1,4,'expense3',NULL,NULL,'','','',NULL,NULL,'','','test','test','test',NULL,'test',1,0,0);

/*Table structure for table `apartment_payments` */

DROP TABLE IF EXISTS `apartment_payments`;

CREATE TABLE `apartment_payments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `apartment_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  `date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `apartment_payments` */

insert  into `apartment_payments`(`id`,`apartment_id`,`account_id`,`transaction_id`,`date`,`created_at`,`updated_at`) values 
(3,1,5,45,'2021-08-01 00:00:00','2021-09-16 16:12:04','2021-09-16 16:12:04'),
(4,2,5,46,'2021-09-16 00:00:00','2021-09-16 16:12:43','2021-09-16 16:12:43'),
(5,1,5,47,'2021-12-01 00:00:00','2021-09-16 16:14:47','2021-09-16 16:14:47'),
(6,1,5,48,'2021-02-01 00:00:00','2021-09-16 16:14:53','2021-09-16 16:14:53'),
(7,1,5,49,'2021-05-01 00:00:00','2021-09-16 16:15:26','2021-09-16 16:15:26');

/*Table structure for table `apartments` */

DROP TABLE IF EXISTS `apartments`;

CREATE TABLE `apartments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `apartmentNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rawRent` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expenseAccount` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `renterAccount` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sourceAccount` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totalRent` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utilities` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utilitiesTotal` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vat` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `apartments` */

insert  into `apartments`(`id`,`apartmentNo`,`rawRent`,`expenseAccount`,`renterAccount`,`sourceAccount`,`totalRent`,`utilities`,`utilitiesTotal`,`vat`,`created_at`,`updated_at`) values 
(1,'1','1','6','5','7','1','50','1','1','2021-09-13 09:30:58','2021-09-14 16:20:26'),
(2,'111111','1','4','5','2','1','10','1','1','2021-09-13 10:22:11','2021-09-13 13:00:58'),
(3,'2','2','6','5','2','2','0','2','2','2021-09-22 17:30:16','2021-09-22 17:30:16');

/*Table structure for table `attachments` */

DROP TABLE IF EXISTS `attachments`;

CREATE TABLE `attachments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `attachable_id` int(10) unsigned NOT NULL,
  `attachable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `md5` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filename` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mime` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int(10) unsigned NOT NULL,
  `uploaded` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `attachments_user_id_foreign` (`user_id`),
  CONSTRAINT `attachments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `attachments` */

/*Table structure for table `auto_budgets` */

DROP TABLE IF EXISTS `auto_budgets`;

CREATE TABLE `auto_budgets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `budget_id` int(10) unsigned NOT NULL,
  `transaction_currency_id` int(10) unsigned NOT NULL,
  `auto_budget_type` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `amount` decimal(36,24) NOT NULL,
  `period` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `auto_budgets_transaction_currency_id_foreign` (`transaction_currency_id`),
  KEY `auto_budgets_budget_id_foreign` (`budget_id`),
  CONSTRAINT `auto_budgets_budget_id_foreign` FOREIGN KEY (`budget_id`) REFERENCES `budgets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `auto_budgets_transaction_currency_id_foreign` FOREIGN KEY (`transaction_currency_id`) REFERENCES `transaction_currencies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `auto_budgets` */

/*Table structure for table `available_budgets` */

DROP TABLE IF EXISTS `available_budgets`;

CREATE TABLE `available_budgets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `transaction_currency_id` int(10) unsigned NOT NULL,
  `amount` decimal(36,24) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `available_budgets_transaction_currency_id_foreign` (`transaction_currency_id`),
  KEY `available_budgets_user_id_foreign` (`user_id`),
  CONSTRAINT `available_budgets_transaction_currency_id_foreign` FOREIGN KEY (`transaction_currency_id`) REFERENCES `transaction_currencies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `available_budgets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `available_budgets` */

/*Table structure for table `bills` */

DROP TABLE IF EXISTS `bills`;

CREATE TABLE `bills` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `transaction_currency_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `match` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount_min` decimal(36,24) NOT NULL,
  `amount_max` decimal(36,24) NOT NULL,
  `date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `extension_date` date DEFAULT NULL,
  `repeat_freq` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skip` smallint(5) unsigned NOT NULL DEFAULT 0,
  `automatch` tinyint(1) NOT NULL DEFAULT 1,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `name_encrypted` tinyint(1) NOT NULL DEFAULT 0,
  `match_encrypted` tinyint(1) NOT NULL DEFAULT 0,
  `order` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `bills_user_id_foreign` (`user_id`),
  KEY `bills_transaction_currency_id_foreign` (`transaction_currency_id`),
  CONSTRAINT `bills_transaction_currency_id_foreign` FOREIGN KEY (`transaction_currency_id`) REFERENCES `transaction_currencies` (`id`) ON DELETE SET NULL,
  CONSTRAINT `bills_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `bills` */

/*Table structure for table `budget_limits` */

DROP TABLE IF EXISTS `budget_limits`;

CREATE TABLE `budget_limits` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `budget_id` int(10) unsigned NOT NULL,
  `transaction_currency_id` int(10) unsigned DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `amount` decimal(36,24) NOT NULL,
  `period` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `generated` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `budget_limits_budget_id_foreign` (`budget_id`),
  KEY `budget_limits_transaction_currency_id_foreign` (`transaction_currency_id`),
  CONSTRAINT `budget_limits_budget_id_foreign` FOREIGN KEY (`budget_id`) REFERENCES `budgets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `budget_limits_transaction_currency_id_foreign` FOREIGN KEY (`transaction_currency_id`) REFERENCES `transaction_currencies` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `budget_limits` */

/*Table structure for table `budget_transaction` */

DROP TABLE IF EXISTS `budget_transaction`;

CREATE TABLE `budget_transaction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `budget_id` int(10) unsigned NOT NULL,
  `transaction_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `budget_transaction_budget_id_foreign` (`budget_id`),
  KEY `budget_transaction_transaction_id_foreign` (`transaction_id`),
  CONSTRAINT `budget_transaction_budget_id_foreign` FOREIGN KEY (`budget_id`) REFERENCES `budgets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `budget_transaction_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `budget_transaction` */

/*Table structure for table `budget_transaction_journal` */

DROP TABLE IF EXISTS `budget_transaction_journal`;

CREATE TABLE `budget_transaction_journal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `budget_id` int(10) unsigned NOT NULL,
  `budget_limit_id` int(10) unsigned DEFAULT NULL,
  `transaction_journal_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `budget_transaction_journal_budget_id_foreign` (`budget_id`),
  KEY `budget_transaction_journal_transaction_journal_id_foreign` (`transaction_journal_id`),
  KEY `budget_id_foreign` (`budget_limit_id`),
  CONSTRAINT `budget_id_foreign` FOREIGN KEY (`budget_limit_id`) REFERENCES `budget_limits` (`id`) ON DELETE SET NULL,
  CONSTRAINT `budget_transaction_journal_budget_id_foreign` FOREIGN KEY (`budget_id`) REFERENCES `budgets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `budget_transaction_journal_transaction_journal_id_foreign` FOREIGN KEY (`transaction_journal_id`) REFERENCES `transaction_journals` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `budget_transaction_journal` */

/*Table structure for table `budgets` */

DROP TABLE IF EXISTS `budgets`;

CREATE TABLE `budgets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `encrypted` tinyint(1) NOT NULL DEFAULT 0,
  `order` mediumint(8) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `budgets_user_id_foreign` (`user_id`),
  CONSTRAINT `budgets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `budgets` */

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `encrypted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `categories_user_id_foreign` (`user_id`),
  CONSTRAINT `categories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `categories` */

insert  into `categories`(`id`,`created_at`,`updated_at`,`deleted_at`,`user_id`,`name`,`encrypted`) values 
(1,'2021-09-12 06:32:44','2021-09-12 06:32:44',NULL,1,'1',0);

/*Table structure for table `category_transaction` */

DROP TABLE IF EXISTS `category_transaction`;

CREATE TABLE `category_transaction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned NOT NULL,
  `transaction_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_transaction_category_id_foreign` (`category_id`),
  KEY `category_transaction_transaction_id_foreign` (`transaction_id`),
  CONSTRAINT `category_transaction_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `category_transaction_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `category_transaction` */

/*Table structure for table `category_transaction_journal` */

DROP TABLE IF EXISTS `category_transaction_journal`;

CREATE TABLE `category_transaction_journal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned NOT NULL,
  `transaction_journal_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_transaction_journal_category_id_foreign` (`category_id`),
  KEY `category_transaction_journal_transaction_journal_id_foreign` (`transaction_journal_id`),
  CONSTRAINT `category_transaction_journal_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `category_transaction_journal_transaction_journal_id_foreign` FOREIGN KEY (`transaction_journal_id`) REFERENCES `transaction_journals` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `category_transaction_journal` */

insert  into `category_transaction_journal`(`id`,`category_id`,`transaction_journal_id`) values 
(4,1,5),
(5,1,6),
(6,1,7),
(7,1,8),
(8,1,36),
(9,1,52),
(10,1,53);

/*Table structure for table `configuration` */

DROP TABLE IF EXISTS `configuration`;

CREATE TABLE `configuration` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `configuration_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `configuration` */

insert  into `configuration`(`id`,`created_at`,`updated_at`,`deleted_at`,`name`,`data`) values 
(1,'2021-09-11 02:16:54','2021-09-11 02:17:05',NULL,'db_version','16'),
(2,'2021-09-11 02:16:54','2021-09-11 02:16:55',NULL,'is_decrypted_accounts','true'),
(3,'2021-09-11 02:16:55','2021-09-11 02:16:55',NULL,'is_decrypted_attachments','true'),
(4,'2021-09-11 02:16:55','2021-09-11 02:16:55',NULL,'is_decrypted_bills','true'),
(5,'2021-09-11 02:16:56','2021-09-11 02:16:56',NULL,'is_decrypted_budgets','true'),
(6,'2021-09-11 02:16:56','2021-09-11 02:16:56',NULL,'is_decrypted_categories','true'),
(7,'2021-09-11 02:16:56','2021-09-11 02:16:56',NULL,'is_decrypted_piggy_banks','true'),
(8,'2021-09-11 02:16:56','2021-09-11 02:16:56',NULL,'is_decrypted_preferences','true'),
(9,'2021-09-11 02:16:56','2021-09-11 02:16:57',NULL,'is_decrypted_tags','true'),
(10,'2021-09-11 02:16:57','2021-09-11 02:16:57',NULL,'is_decrypted_transaction_journals','true'),
(11,'2021-09-11 02:16:57','2021-09-11 02:16:57',NULL,'is_decrypted_transactions','true'),
(12,'2021-09-11 02:16:57','2021-09-11 02:16:57',NULL,'is_decrypted_journal_links','true'),
(13,'2021-09-11 02:16:58','2021-09-11 02:16:58',NULL,'oauth_private_key','\"eyJpdiI6Ikoxc3JCUjI3OEtsMW9TbWdVdGp4bFE9PSIsInZhbHVlIjoiOW1QY0JHSGxGejlyNmdBVHJQcTk4YnNlL0FDWHZ1b0JVSkM3aWYvYmNkQUJ2N0xIT2I0Y1FNWC9pUTJvREc4STZ1SGltL3p5MDQzNURVM0xXb3hmdGFvN3JXc09MQm40ckNIdSsrbWhYN2dTY3Zaa3Qrd0ZnK1dTSlpQeEpuSitFcDhYME5OcU14ZCtyUjhWVjdIUWZTSTNIcGNoOEV0Tk5ZU3I5c2o0TDlFZW8rNUJVZ04xVE84RmJRZUxuNW1Gd2xjV0FiL1U0VzBEeWFPL1NHakw0UmJISjFhcTVJU1ZkR1dyaDlVMFpTZGRMQ1RYcXJRUnNYYldHNXgxRXQrcWF3cU13OTJZcTE0dWdSVXNJdnh4US9yVnBRZ2FLZjhiQ3B5R2xWSk5JMmJTWUZnZTZpaTR4dmNnQXlBREJSSkJmZEdYbXdEL0VaeDhveG5hZGJKV01JUllIWGVBRklCR3g5TlZhVTV3UGovWlAyYy90enB1TXpybjU0R2doWmQwcDZ4WUdobUVkdFN1RkVuYVExOHZucnRKbGJUNG4rZExPeTJzRE4waGFONGkzeDBhSGxwb3VVa0RKcHVjTW8xZ1VQSlhKNG1qNlJEclMwK25rcUsvMTNJckRIaWRNakRUZDRJZDFlTWlGUGNlK2RqTTNCOEZKRGpqV3BHYk01NjJLNk1CRGl3RmdBdG1oa0h0M1BsN1IrZ1pDcUlrSGxNNEJuc1dkWnk0M2UyUDEwd2UranhMVFlNckFpMUtnaCtjcE9Dd0Z5cExBOXdXa1Q3RWxKS2swb3c5NUdDdno2MDF1QVQrVlB6b2JKVCtVenA0bVVKYlg0SDM0WnY2NlVXQVg0VzN4THJneFd2RklSNnpUSVhTYnN4eklzODZvSHR4ZUFIT0Q2S0N4bDJoMlVpTmNEZWNhaUN6RmZKK09XTWZ5TjRxcTQ0Zm1iTnZNUndNY0dqQ0dHRkZ2RFkxUHFpL0JpWERZSE5KQmpXRTF5bUJUNjJlelh1TGl3S2tUTU0wNU9ITVd0T2JNd0ZsWm5Sd0dCNnRjUUdhTkh1V1ZILzA5M1VLUDJkSDdrMXVIU1IxcGRoVXU3ZmhwRFMvRmFRcnFHS0o5NkEzQ1JOT0dlYzRtbjBMQ2czTUJ6RGhNQmtsS08vQ1RjSklKQUZ0djJIWG02eXNDZUt1SFBhbjd4QzNLQmk3QWlrQVUxNG5IMW51S2RBMEdZQ21RNHpkdkZzaHczMlNhR3VzQWZBbWl0bmhwQlgrR2pmaGFMQmt1ZXdmMGdXUXFUU2FOcU1yQlU4bG9uWmZJTGt5MWxDbnM1YzZNNktJSnFQRzVXOTcwWndnSFRmaGQ2NlZSNm5JRitkS3ZwamRZeno4TEZwM292NUlCb1luaUV4dEY2OWphaW90aGRvZFF0SklvUWNFQnYrSE1BbXc2ak9YZTNER2p3b3IxNW52TTJtZTRZZ3RoMFE2bTlZN0RVejJDbDk1Qk5TaVhsZFpJN3ppdDRxR0M4SnJHbzk5bGpnZklWZnA1MFdOTUpRWEdjcnBubnNyT0dCdVJzSkkrQjZMUi95bnFPYVE2Ty9XV1IzNE1OczIzTUl5cXJNNmFnaVZES05hTEI3YXV3cGxLeUdBUHVjWXFIYUcyc3dzK1hKZWF3b3R0eDlNbEorU2ZiY094YjJ2K3I2WmdGZ0ZzL05QQ2hvMldhbTNuU2x1aENPbTRqaHhTbjc5YXp4S2s1TmY1aGphOFNGQ1E0U2kzMzQ2SUhaS2dNSWhMaXhmcHdRaC9aYVQzUkF2L2xQakNYbW5Ua0NoMnhSZkFWcldjWVkzc3VKL3d4eGpYaVhnTzZ5WDNNRmNneSt1WFBjcTBaOVpJMDJ5OTNYMWtGdjRlRkoyMlJzRUluT1FYQ2JYUndqM0Z3RDVTVEhGTng0bGJGcXV6VVRkWEUrRFdwTEV5T1JwUjZ6cW5hZzRpMktMVk5EcWFHYU1YRTJEZ3ZOUHlnME5HUFpBUVFCY3NCTnV5YmZZV2xSS2VzQTJEUVBpTVVNTkI3MjRvM0UvWkRZc21XaVhQTUt1ZjNRcGNWQmVNeFA2WkdqVDdJWDVpUGdXcStqNDJZWnhjUGt6ZFRYbXhFcHZqY2d2ZnR6VWJkWVJLekNubzMyaHhQTFF5QnUxOVdyYSs2aXJXWGRWQnZTUERzTjRXam0xRkllL3RIUmhzKzdaUjVzeHBhV2twOHJCUnFUdm5Qd1l5MGNBaGVkUWJOdEExby8rM0F0TWM0d3paL2hEQVhMUDY4Q05FZ0UvM2FpZlE1QWpRTU5GVkVyMlhtbXo4V0dRUDRDTmg1aGNkekhRNlZvVEsxbkpNYTNaSkFqTnpnanBXQnk2WHhzU2lWbjF2OVFnR3VFa1Flc1Z3dlBIcmtkTFVvN2pUaE1zQTVkMjdZVnZBQ3JJTWxpVUtVbHVrMW9qWFgyY0FHVkk0bEpkQnJSNmwwQTZWdHI1KzFud2w4RWoySDh2cU1rVWNZRm5nTXFZRURQNWt3N0xNY2VhU0ExZy90Skg2Q1R4bDRFdWlPTVF1blZQMi9TdmNVQ29FTlFZMjU4U3ZwY3MwZGpKZzI5RFQyRnAzZ2VNMUh3bXFpVnlqTFcvZmRVbWRzcFBhYWVkOWp2SEdOMUtYWkROaFJ2Nmg5SVo4UFJMZEVWSjZ3bGNPUVdSQlpqdmNRSE8yMjhsS2F2cXpHa1d0YmVUUzZ0b0U3MGl2SXgxcjg0YmhBT1F6enZCVVdCK2h6YTJmNDdRM0VZRlFlbERDYVh0Y1dkQkNGVjcvZG50SXRTSzdRekhwZ2dySWxmMXdGaTQ2N2ZjYnZ5c1l4WGNIbzIxOVZuNkFFV0h1YkN2dlFwQ0RJdCtRbG1YNWRmbGQzTGV6b3A3TkF3MDhiK0M4RlAyY0NEejVReHFKdlczRExQMVdRZGRDZkxIZFVWQXlHMjFMYUkxMWhLM1VyUnlNUkh6T1JONlZraGp3Y1R0NWUvNTBqZnhkbytLbkdQK3k2K0hmcXVkZzNPcmpKTGVacjBxbnYyZDZmcUtkVTJ4bHh4cHhoVTlyYnNKeEhUQ0tENTk4OGlRSXgwaWtrbGRVbUJYdmZEc0ZKOVBZRmpiSGNJOCtDSG1ydmdDTWlDZEUvTFN5RlNseUlhVk1HV1YvblZMQWxxRDJ0b1JFVm16clhrZEZ3SzljdVNvV1ViYkN2UHlhOWJmWkRVSFg1V282S3JEWU5UR2wvdEJ1ZytSSG5Hb1IrTmZwRVZ4V1FJWGZsRE8xa3VENURWK3pRbWdjNHhQME94Y3ZldEZpVUkrTXhyWEREand2V2c4WHpUWkZSeVc1UXlWczRwNVg0TUdZdTYvbXRZQkZyTml3TC9lOVY1ZVAxY0xNQ1ZUOW9aRXpnTlNnSXVlaW9ndHZHbnVxcnRZem1TeC8zSUhkMklVeTdLVWJIRkdKbVZZakZvL2xhNjcrR1NuMXcvWUhhZWpQVUN4MlJQeGRCQXFCMmdlMEJGbS8rSGIzNkdjU0htUURpUVZVdkVrRnEzcWFESEd5SWVqRURvZ0dXM3hHcHN6a2ZTb0xWc0FaMTRZelBqR1dSQ1kwLzc4b0FPNVBFSDlGVER6Wk1KZTBPNVE1OEtKTktYRDJ4WGtLZE00MHlsbG5mTUpiTmg4elUzWG5XWmFrbU9vSnFSNjBIZ09lM2NpOXF4cXcyZHNyekNZSmRZZ2FCMnB4MFNINDlCVGV6b3JNdi9zN2MyL2lUWDNvWGVFR1MxdndrYlVNenJ4OHJUdkFLdUd3UGZROUR3SW1BYmcwd0ZIU05kTk1xTlBxV1JhNEZhSlh6UE0xZ3lXVW9uT2ZsQkplYXlhelFSUzU1ZDhCWjVrU3ZlSTlEakFOeHhmdWIvaUxOUk95cDQvK3VFMWpQYnQ0VnpQVFlyOUM3aldXSURlbWY4d09wR1NuUFZNNmc2blpCUHp5SlJDblk4dzZjaWxMMU1xajRYWXI1TU81RmR4NjYwdjlOcTJrZk1PZ2ZQSzlueVJWNTRVOUhGd0NBTjFRejBsZWJWZlVPVmM1WTBFdU0xeWJYQ1lXYytWang3OUllZE9IM0tXOGZtU3lTclpsNXlwdE4vYjlQbkR2bGxNWGkySk53blVhc09iNjg1ZHFCVWNudTFFMUhIcEtaN2UyWWhPb0JTR2E1VVd2eVp1d1VKby9DSk5ZcG9CTnRSdE9CSjNQbTd0QUx5REZTcFBrUGVOQm0zajN6UWZuTWxEME82c0pYaWNuM2lzZm1iWTY5TU5WeDJDcFJSTlU2dE5ma2kyT281QVE4dkJOcDhxZVFvYVJiT1d5VmVhejd6N3ljd05nRi9rSndvU01KV215RjVYZ21zTnZkUzNHK0Zvc0VxNWpNNGZic1VCRmpVRWZYRHJFNytZYmIySVB0NVVVK2RITmc1citsQW1lSXNIYlVSQVdORXRCQmQzYWlWeFVHemNKU3FreklJaW1EVUNDbHovSDh5bDR1OHAyWlZUZ0xVaXNvODJJamhBZjhhOEM2alBNNU5aS2Q0cVJOdk5QUCs4OHhmbFZjQitsM1RtVjdPeS9XMHZlYzVxZTc0bTlNWlBWcDFmbjFVZXl1dURzcmZuU0Q5N1FqVTlodzRSMmVJdUhKU0E3SytBby95QUhDSzZoTDBoNzVyZnl2Wk1vQklqL2lWemU3b3dDblVqWmUxMXhFWTZMejVzLzhiMHVPb2JURUJJajVGc2lSVlgvK1ExdDVDMTkzVGtDYWo4VEY0Ukc0anB3aDF0dlJuRWVBc28wbjJ5L0tENG9XOXFJbU5UM2tBbS9NUTdjbjlGcjF1TW9VbE1lK291OFN5cDEwcDA0L2Q2THNid3NCM0xPSit5OXlhSVhBV09pL3BtWWo3ZlhzOHZYZFpFN05qU3UxVko4R1kwWFBwd0Z5VHY2VDVJa2tlR3lrZy95M09qRXlRWHVnTFI2Q0lVV0x0eGc1cHE4cjlaUzVPSjR2Z0RabldqcXdkTXlxQlFHanJmTmJiM0o2TEkrbXpoUU4waVBreXREcmhZdktsQ2lidlMrQWRwTkxubS9QVGRrTFkrbkoyQmtnSURPWFZ0NkpwQkpab1RFTW1mVm10S0pjTXExbkxZV2lkZSt5WDh4eG92YlBwNStqU1crVUxxeHFvNnQ1emV5Y0FRVG41MWhYd2UrUlpkdzJaTnlSSGVhT3B6K0grQkl6dWQxTXFLRlVYcFlWNkcyazRNRytWQzBlcmFhUGtocENtTk9SNWdpNTJRYmFxYUMzYjNtbCtGNVNzekNVSkgyVFBKU1M2RFRLR0tWQUdWS1FlRCtrdWVOLzVjSGxUVDhrNEZmdTRVcnJOQ1pQd09JSDU1YjRwbGFMN0I2dUN3T0ZGWnQ2azRKN0I4bjRwSXRPMXMxVUpxa3gxcnpmRTB2UkpwZUVtRGlFZnpiS0NXb2Fxb3NmeWlockx0ZTNZV0oxUmlVMG9oSUxlVVBDb0M5V25FVXRGeWVybHl0RE1vaVBpOUYwZFJFZ0J4UmtFM1RQcHpDTHNwUTArU3BhbE5GMDQwKytUNndEd1hKcTFRVGY5WCt5aHZiMTA0MkVFRnowK3dQMUV0MHBSb3ROaEdRSGljemQrZXNwTThuMklTcGd4QmhUL1J6WnA0dWxOaDc2TXVNNXFwdVY5ZnpMaWpEOC9QTUYxZHA1UlNDRjJjODJodkZpbFR0TGNwUHFqMC9OUUIrUk9nN0llTFd5b0ZvTm12c2htRUxTVnlseHFmMkxYNjVnWWhZb0YzRlJvZmN2QjhRQUt0a2FqR05mN0JuZU5HNWNNSFUxWTV5SVBqMHJYb0pmUVVha0s1OTJKVEgzTk0yd1ZwK3BXZ0Nidmc2UC9jNkcrMnBPUnVqdXVEUkRpN1pvaGxkLzVxR1o4QlN5U054SllRVmlwQk0rUT0iLCJtYWMiOiJkZDY0MzU2MWI1YWJlOGMxZDM5ODM1M2U4YjkwNmU0NWZkMTc3MmZkMzVlOGVmZWRmNjQ2Y2U1Njk2Y2YwNmNmIn0=\"'),
(14,'2021-09-11 02:16:58','2021-09-11 02:16:58',NULL,'oauth_public_key','\"eyJpdiI6IkkwVHlHT0E3cXBUbG9LNC9RZTJjMGc9PSIsInZhbHVlIjoiVzJYbnQ1OXc5L3d2NXFPeDNKZFhJdWhydDJHR1VWMEhaTjErYi9jUXJBMVM1UFppVU5hMVRZb256WnJoWk9VQTJLQnBZMk5NWVVMbjhxSzBYRkpRM3lIUXFqeTNydjg3cU1jeS8xbHZIRjRwTmJORTZVSDBIWWRRblhNM2lEYllaSUF1RnZNWHJGU0lsV1A0b2RrR0QyUUJMQWQ3NTVkUW5qbzBzQ3BaZmUwaE4zNGtIS2ZsTVpoTzRBbzZMU2xuT2hTYmxtb3RwbE0yU1JqY1dqYU9OdjBhblhFTGk0TVJ3Z3FXWWRreTJKNEViN0YvSXloRDB4MjRtam9Rb1IrTFAxVkNuaHhPbUZVK2dYdGRaQjJtUVk4bHVqUFdrWGp1Y2JvcStSTVN5eTQxOG9KTTZlSGc1WDVpUWE5NTFnbjJOczZTNUNPWHdBUm0wc1NvQTRqRlJXWWpSSWcxUDYzQUNQOEdHMlkrNWh5TTVLZEZCd1Y5c2Vwb25pWHFTUFhKZG9SK0cyZ1ZwZXZjRVlWcVZJWGV1eGE3MVQwM2FqWXZYaG1kb3ZkcE5hL1BpNG1GRlVpaG9rNE9DRVdOeXNyRDM4L05sMEJDUW5QTzkwNDdLUzZqZldpSmFuSzl1UzF5aTFLZGNiQVNJSXovL1FlRm01SFVicU1hS0tvYkl3bGQ1QndUUmdMMFNjVFdMM3RFbkR0cGtkaktFNVcrdGxvY1A1RUlEYjNpQmV3cVJGaE02RExXSjVoRXhBWmVDallZd1pOdzZEckh4UlFnbUJrTlFobGZDSytXamVlUzlMYzNUQ0t2bnQxdGtaTjNxclJMUndhT3F4ZksxL2VxK1o0NUpyT2dvOU1ja045ZFJ0SVVCckpCR0ViTzZuR1RzSnpWT2lYMkZ0WkNvSDhVczRoU0FxQ2ZmODJuMXMzTFJ2alN1Z0NxUTFuVHRTcThYQllsOUJQbUNEcDJyWFRkSnJIRCt4ckFzZC9XaUg0Z2dpdTgzdSs0a0tYVzZ5Mml4SWZJaFpXMWN4ZXEra1dCY25nTm5HemYrMFl5Ykg1cXpiK1lBU1FSbWJwVWJzL3ZJNFNaMjlMSUlyQVFiSFNudmdPUXgxWmw0VTBReWNyaFRLQXpWd0dtSzZ2OU9yWkRhYWVrQWwwQ2JZTnV6QnMvVDBXbCtvNm9ZSm9TZi9MaGdBbDdvRGtYNGltV2twdC8vSCtySlNIcVZsbXQ0MzE3VEk1blU4YzNxSzZmNGk5aVpUYzJWWlVhUU11WE9NaEgxbWpwdEE1ejZqRWRjRWpRQzlRL3RXbTdpamI4V2hROUorcW5XSE9XN1RnVi9NdEZ4cEVlbUIxUmF1bjU4R0dSUDlQam5Zc1pMTmo5NklXdEZGUmQ4QjBFVkF6R3BibUdRZlRzSDR5cWtSaHNOZGNDSzZCUWlFQmsvSW5rWXRjRlJwbVZpOEs3QUJZTDcwdVRwaGFZeWw0Z3B3PT0iLCJtYWMiOiIxMGQ4MTk3YjRmZDk5NjdlNDg1ZDFhZGRkNDZjZjNkYTIwNDZlMTE2ZDNkYTA2OWViYmIwYzgwOWRiZDdkYTJkIn0=\"'),
(15,'2021-09-11 02:17:01','2021-09-11 02:17:01',NULL,'480_transaction_identifier','true'),
(16,'2021-09-11 02:17:02','2021-09-11 02:17:02',NULL,'480_migrated_to_groups','true'),
(17,'2021-09-11 02:17:02','2021-09-11 02:17:03',NULL,'480_account_currencies','true'),
(18,'2021-09-11 02:17:03','2021-09-11 02:17:03',NULL,'480_transfer_currencies','true'),
(19,'2021-09-11 02:17:03','2021-09-11 02:17:03',NULL,'480_other_currencies','true'),
(20,'2021-09-11 02:17:03','2021-09-11 02:17:03',NULL,'480_migrate_notes','true'),
(21,'2021-09-11 02:17:03','2021-09-11 02:17:03',NULL,'480_migrate_attachments','true'),
(22,'2021-09-11 02:17:03','2021-09-11 02:17:03',NULL,'480_bills_to_rules','true'),
(23,'2021-09-11 02:17:04','2021-09-11 02:17:04',NULL,'480_bl_currency','true'),
(24,'2021-09-11 02:17:04','2021-09-11 02:17:04',NULL,'480_cc_liabilities','false'),
(25,'2021-09-11 02:17:04','2021-09-11 02:17:04',NULL,'480_back_to_journals','true'),
(26,'2021-09-11 02:17:04','2021-09-11 02:17:04',NULL,'480_rename_account_meta','true'),
(27,'2021-09-11 02:17:04','2021-09-11 02:17:04',NULL,'481_migrate_recurrence_meta','true'),
(28,'2021-09-11 02:17:04','2021-09-11 02:17:04',NULL,'500_migrate_tag_locations','true'),
(29,'2021-09-11 02:17:04','2021-09-11 02:17:04',NULL,'550_migrate_recurrence_type','true'),
(30,'2021-09-11 02:17:05','2021-09-11 02:17:05',NULL,'ff3_version','\"5.5.13\"'),
(31,'2021-09-11 02:17:08','2021-09-11 02:17:08',NULL,'installation_id','\"e4653707-d6eb-48f7-9076-978640f37efd\"'),
(32,'2021-09-11 02:17:45','2021-09-11 02:17:45',NULL,'is_demo_site','false'),
(33,'2021-09-11 02:17:46','2021-09-11 02:17:46',NULL,'single_user_mode','true'),
(34,'2021-09-11 10:21:56','2021-09-11 10:21:56',NULL,'permission_update_check','-1'),
(35,'2021-09-11 10:21:56','2021-09-11 10:21:56',NULL,'last_update_warning','1631348516');

/*Table structure for table `currency_exchange_rates` */

DROP TABLE IF EXISTS `currency_exchange_rates`;

CREATE TABLE `currency_exchange_rates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `from_currency_id` int(10) unsigned NOT NULL,
  `to_currency_id` int(10) unsigned NOT NULL,
  `date` date NOT NULL,
  `rate` decimal(36,24) NOT NULL,
  `user_rate` decimal(36,24) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `currency_exchange_rates_user_id_foreign` (`user_id`),
  KEY `currency_exchange_rates_from_currency_id_foreign` (`from_currency_id`),
  KEY `currency_exchange_rates_to_currency_id_foreign` (`to_currency_id`),
  CONSTRAINT `currency_exchange_rates_from_currency_id_foreign` FOREIGN KEY (`from_currency_id`) REFERENCES `transaction_currencies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `currency_exchange_rates_to_currency_id_foreign` FOREIGN KEY (`to_currency_id`) REFERENCES `transaction_currencies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `currency_exchange_rates_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `currency_exchange_rates` */

/*Table structure for table `export_jobs` */

DROP TABLE IF EXISTS `export_jobs`;

CREATE TABLE `export_jobs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `key` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `export_jobs_user_id_foreign` (`user_id`),
  CONSTRAINT `export_jobs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `export_jobs` */

/*Table structure for table `failed_jobs` */

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `failed_jobs` */

/*Table structure for table `group_journals` */

DROP TABLE IF EXISTS `group_journals`;

CREATE TABLE `group_journals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `transaction_group_id` int(10) unsigned NOT NULL,
  `transaction_journal_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_in_group` (`transaction_group_id`,`transaction_journal_id`),
  KEY `group_journals_transaction_journal_id_foreign` (`transaction_journal_id`),
  CONSTRAINT `group_journals_transaction_group_id_foreign` FOREIGN KEY (`transaction_group_id`) REFERENCES `transaction_groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `group_journals_transaction_journal_id_foreign` FOREIGN KEY (`transaction_journal_id`) REFERENCES `transaction_journals` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `group_journals` */

/*Table structure for table `import_jobs` */

DROP TABLE IF EXISTS `import_jobs`;

CREATE TABLE `import_jobs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `tag_id` int(10) unsigned DEFAULT NULL,
  `key` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_type` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stage` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `configuration` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extended_status` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactions` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `errors` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `import_jobs_key_unique` (`key`),
  KEY `import_jobs_user_id_foreign` (`user_id`),
  KEY `import_jobs_tag_id_foreign` (`tag_id`),
  CONSTRAINT `import_jobs_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE SET NULL,
  CONSTRAINT `import_jobs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `import_jobs` */

/*Table structure for table `jobs` */

DROP TABLE IF EXISTS `jobs`;

CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `jobs` */

/*Table structure for table `journal_links` */

DROP TABLE IF EXISTS `journal_links`;

CREATE TABLE `journal_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `link_type_id` int(10) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  `destination_id` int(10) unsigned NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `journal_links_link_type_id_source_id_destination_id_unique` (`link_type_id`,`source_id`,`destination_id`),
  KEY `journal_links_source_id_foreign` (`source_id`),
  KEY `journal_links_destination_id_foreign` (`destination_id`),
  CONSTRAINT `journal_links_destination_id_foreign` FOREIGN KEY (`destination_id`) REFERENCES `transaction_journals` (`id`) ON DELETE CASCADE,
  CONSTRAINT `journal_links_link_type_id_foreign` FOREIGN KEY (`link_type_id`) REFERENCES `link_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `journal_links_source_id_foreign` FOREIGN KEY (`source_id`) REFERENCES `transaction_journals` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `journal_links` */

/*Table structure for table `journal_meta` */

DROP TABLE IF EXISTS `journal_meta`;

CREATE TABLE `journal_meta` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `transaction_journal_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `hash` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `journal_meta_transaction_journal_id_foreign` (`transaction_journal_id`),
  CONSTRAINT `journal_meta_transaction_journal_id_foreign` FOREIGN KEY (`transaction_journal_id`) REFERENCES `transaction_journals` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `journal_meta` */

insert  into `journal_meta`(`id`,`created_at`,`updated_at`,`transaction_journal_id`,`name`,`data`,`hash`,`deleted_at`) values 
(1,'2021-09-12 06:32:45','2021-09-13 10:46:35',1,'import_hash_v2','\"ce8657cc6463c693b572d4ca9c24c463310ce8c83894a94c67907106a53b66f3\"','a7700e609f9a9d80991c8512c74f44b35a0b953931800610b4202838e24a7adc','2021-09-13 10:46:35'),
(2,'2021-09-12 06:32:45','2021-09-13 10:46:35',1,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-13 10:46:35'),
(3,'2021-09-12 06:39:44','2021-09-13 10:46:29',2,'import_hash_v2','\"8dda137c655abd1397a3bc242ba1df7b5154fdbada50a5b997ca4aa8b1d01472\"','1468e5979a4b5b0026076788448ed8f82d0fbf47d5c8483c558574e72b7fd73b','2021-09-13 10:46:29'),
(4,'2021-09-12 06:39:45','2021-09-13 10:46:29',2,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-13 10:46:29'),
(5,'2021-09-12 06:42:22','2021-09-13 10:45:58',3,'import_hash_v2','\"0741b136e0307ee435ee55a413f74fd08e5051f9c751fac347dc13ffcc314f20\"','9a34b471273d19b0c3a7b81d7f14952abeedb94cc8017570b664b5a401511ca8','2021-09-13 10:45:58'),
(6,'2021-09-12 06:42:22','2021-09-13 10:45:58',3,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-13 10:45:58'),
(7,'2021-09-13 08:49:47','2021-09-13 10:46:54',4,'import_hash_v2','\"d5e8b9631ffb8ebb3dd9dbccaefcd1557cfa4e5c6d93ed5958acea015abc0564\"','2f1bf8034f582f6de0d7bf380b6751372293bc10069ccc567116a5f538512cb2','2021-09-13 10:46:54'),
(8,'2021-09-13 08:49:47','2021-09-13 10:46:54',4,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-13 10:46:54'),
(9,'2021-09-13 10:49:46','2021-09-13 10:49:46',5,'import_hash_v2','\"b65580ab2c9ea7e897af67b4ae1dbc60f502459cb4544cd8c0f3a559a2fec7dd\"','5fba5953b810f6c69d3538ccd98f563711ed04e6927d79f1ea8b3e88229a9b6b',NULL),
(10,'2021-09-13 10:49:46','2021-09-13 10:49:46',5,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(11,'2021-09-13 10:50:47','2021-09-13 10:50:47',6,'import_hash_v2','\"b65580ab2c9ea7e897af67b4ae1dbc60f502459cb4544cd8c0f3a559a2fec7dd\"','5fba5953b810f6c69d3538ccd98f563711ed04e6927d79f1ea8b3e88229a9b6b',NULL),
(12,'2021-09-13 10:50:47','2021-09-13 10:50:47',6,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(13,'2021-09-13 10:52:51','2021-09-13 10:52:51',7,'import_hash_v2','\"b65580ab2c9ea7e897af67b4ae1dbc60f502459cb4544cd8c0f3a559a2fec7dd\"','5fba5953b810f6c69d3538ccd98f563711ed04e6927d79f1ea8b3e88229a9b6b',NULL),
(14,'2021-09-13 10:52:51','2021-09-13 10:52:51',7,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(15,'2021-09-13 16:11:49','2021-09-13 16:11:49',8,'import_hash_v2','\"e17b449c3c20b0288e6346342e67643929fa2aa335cdf8ed452696990e6a8797\"','bd37b5b9b6bb4c480fe9af9c57457c0206ab3e23d887dc38701de7b33fbc813e',NULL),
(16,'2021-09-13 16:11:49','2021-09-13 16:11:49',8,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(17,'2021-09-13 16:16:06','2021-09-16 15:29:36',9,'import_hash_v2','\"527bb34fbb8fcc836ba53ce234d57af69ab472c3e455e3b3b877d96174fcd95d\"','0d4e9706bbd67bef955d6301c430f639f17e9eb7b5e67204ca58f4d4acf04127','2021-09-16 15:29:36'),
(18,'2021-09-13 16:16:06','2021-09-16 15:29:36',9,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:36'),
(19,'2021-09-13 16:19:43','2021-09-16 15:29:36',10,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:36'),
(20,'2021-09-13 16:19:43','2021-09-16 15:29:36',10,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:36'),
(21,'2021-09-13 16:34:04','2021-09-16 15:29:36',11,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:36'),
(22,'2021-09-13 16:34:04','2021-09-16 15:29:36',11,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:36'),
(23,'2021-09-13 16:35:13','2021-09-16 15:29:36',12,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:36'),
(24,'2021-09-13 16:35:13','2021-09-16 15:29:36',12,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:36'),
(25,'2021-09-13 16:35:51','2021-09-16 15:29:36',13,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:36'),
(26,'2021-09-13 16:35:51','2021-09-16 15:29:36',13,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:36'),
(27,'2021-09-13 16:36:03','2021-09-16 15:29:35',14,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:35'),
(28,'2021-09-13 16:36:03','2021-09-16 15:29:35',14,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:35'),
(29,'2021-09-13 16:36:57','2021-09-16 15:29:35',15,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:35'),
(30,'2021-09-13 16:36:57','2021-09-16 15:29:35',15,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:35'),
(31,'2021-09-14 15:44:11','2021-09-14 15:44:11',16,'import_hash_v2','\"5b9a810d2f10b5bbbcf59cdc3eb7729b21f0c0d2b0b1343933b88a3887c44c07\"','04e65ce5fe92f799ad9e35fc69e70c8363792724ac17eb9be00ac13b68cf0f4c',NULL),
(32,'2021-09-14 15:44:11','2021-09-14 15:44:11',16,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(33,'2021-09-14 15:44:27','2021-09-14 15:44:27',17,'import_hash_v2','\"42b58b2f69222b5a4e9a009a72730ccd04cc3b3c2639bbfeea7a625540dd82cb\"','f114a689af287f829c806a2e4f5a2672562c22132c446194cf135a022fe17be9',NULL),
(34,'2021-09-14 15:44:27','2021-09-14 15:44:27',17,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(35,'2021-09-14 15:45:27','2021-09-14 15:45:27',18,'import_hash_v2','\"fbe21458524a5a0fae009e524b7eafb0c3d663b203786df61614d2e76a9a7798\"','29673eed0965642e370adc18e3859421c0a8f4201edbd74e390ba790e79baeb3',NULL),
(36,'2021-09-14 15:45:27','2021-09-14 15:45:27',18,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(37,'2021-09-14 16:03:24','2021-09-16 15:29:35',19,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:35'),
(38,'2021-09-14 16:03:24','2021-09-16 15:29:35',19,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:35'),
(39,'2021-09-14 16:04:58','2021-09-16 15:29:35',20,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:35'),
(40,'2021-09-14 16:04:58','2021-09-16 15:29:35',20,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:35'),
(41,'2021-09-14 16:05:52','2021-09-16 15:29:35',21,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:35'),
(42,'2021-09-14 16:05:52','2021-09-16 15:29:35',21,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:35'),
(43,'2021-09-14 16:06:09','2021-09-16 15:29:35',22,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:35'),
(44,'2021-09-14 16:06:09','2021-09-16 15:29:35',22,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:35'),
(45,'2021-09-14 16:07:11','2021-09-16 15:29:34',23,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:34'),
(46,'2021-09-14 16:07:11','2021-09-16 15:29:34',23,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:34'),
(47,'2021-09-14 16:07:29','2021-09-16 15:29:34',24,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:34'),
(48,'2021-09-14 16:07:29','2021-09-16 15:29:34',24,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:34'),
(49,'2021-09-14 16:12:26','2021-09-16 15:29:34',25,'import_hash_v2','\"68616c7a41c6caa7b7c4ae62ce59cc7cc8102e48f859569c02afdf4d5411a5ef\"','b3effc8f6e799ce2c735aa4eda8ee223d8a966ef354729025008ca27793f30a4','2021-09-16 15:29:34'),
(50,'2021-09-14 16:12:26','2021-09-16 15:29:34',25,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:34'),
(51,'2021-09-14 16:13:05','2021-09-14 16:13:05',26,'import_hash_v2','\"d2eae7ceac24c1d7030b207daa4a5abbccb2563f078350e36bc78e431adfd64f\"','374a0fedafffcd020a050b94800270dd93aa43b45f82972fdf85ee76254a6d50',NULL),
(52,'2021-09-14 16:13:05','2021-09-14 16:13:05',26,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(53,'2021-09-14 16:14:37','2021-09-14 16:14:37',27,'import_hash_v2','\"cb694143acd38f3227fb1929db5551763b1a9fd607e72a8138ed569ed6093a69\"','e46bc0bd97944ff3e8fa84f095d2bd0df690ac86e6c860802d1f7185649155d9',NULL),
(54,'2021-09-14 16:14:37','2021-09-14 16:14:37',27,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(55,'2021-09-14 16:15:13','2021-09-14 16:15:13',28,'import_hash_v2','\"e43112d85df197b5ece4227e2b0ac67560a257e971dbdb94f134ab97c6452dc7\"','7b5677b9f0992b6177ec60ebc8b06641020b2a4080bb6485180c7b493eaac290',NULL),
(56,'2021-09-14 16:15:13','2021-09-14 16:15:13',28,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(57,'2021-09-14 16:15:25','2021-09-14 16:15:25',29,'import_hash_v2','\"31a92f8c35bae8c13b2b7165a1187287d288057f3b3be87d5103816621633799\"','bd7c91d186580f60dda2cfcbaf7df8c606e6f357bf2313c3cab13d74550d39dd',NULL),
(58,'2021-09-14 16:15:25','2021-09-14 16:15:25',29,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(59,'2021-09-14 16:17:11','2021-09-14 16:17:11',30,'import_hash_v2','\"fbe21458524a5a0fae009e524b7eafb0c3d663b203786df61614d2e76a9a7798\"','29673eed0965642e370adc18e3859421c0a8f4201edbd74e390ba790e79baeb3',NULL),
(60,'2021-09-14 16:17:11','2021-09-14 16:17:11',30,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(61,'2021-09-14 16:17:25','2021-09-14 16:17:25',31,'import_hash_v2','\"73975d7d0556e7d756cef4e4936d598b765a433ba47d0a3539589988e87bd4c6\"','35def7b7f7d20eb54257408d6925ba73fba8d486831393308a10f9970bb0443e',NULL),
(62,'2021-09-14 16:17:25','2021-09-14 16:17:25',31,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(63,'2021-09-14 16:20:36','2021-09-16 15:29:34',32,'import_hash_v2','\"f450a4b9dff0a89ffb2640e8c144a37fc067c8385960dcad6f7e1899186d02d3\"','a284a211a919d442e9c95aeff705a221084164d5387dfa8bf94e6b675d088429','2021-09-16 15:29:34'),
(64,'2021-09-14 16:20:36','2021-09-16 15:29:34',32,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:34'),
(65,'2021-09-14 16:20:45','2021-09-16 15:29:33',33,'import_hash_v2','\"68616c7a41c6caa7b7c4ae62ce59cc7cc8102e48f859569c02afdf4d5411a5ef\"','b3effc8f6e799ce2c735aa4eda8ee223d8a966ef354729025008ca27793f30a4','2021-09-16 15:29:33'),
(66,'2021-09-14 16:20:45','2021-09-16 15:29:34',33,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:34'),
(67,'2021-09-14 16:21:10','2021-09-14 16:21:10',34,'import_hash_v2','\"3d750a4a7850d397242af762c8605bce3004d68850bba6d60b2b0b06796088b4\"','058016ea5152f853e8d21566718542a1879dc00bd8098f657f4ec86185e6a333',NULL),
(68,'2021-09-14 16:21:10','2021-09-14 16:21:10',34,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(69,'2021-09-14 20:43:05','2021-09-14 20:43:05',35,'import_hash_v2','\"9a05bc66c0c274de827f668e64cd24b8cae1652b181f57d5ec4083fae11b8db0\"','1f30b7b78a6306a0d36b16ba22ff115e3650c1ee6d70a7b12256806566bfa07c',NULL),
(70,'2021-09-14 20:43:05','2021-09-14 20:43:05',35,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(71,'2021-09-16 15:09:00','2021-09-16 15:09:00',36,'import_hash_v2','\"e932630bbd491a59675387a5f7ec10dcb0433fbf6a8c5403fb3660c535e15949\"','b2e904bf4593a6e921685a3e14334d509721d56e4d1a2058daaf50c26a7b8425',NULL),
(72,'2021-09-16 15:09:01','2021-09-16 15:09:01',36,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(73,'2021-09-16 15:09:35','2021-09-16 15:29:33',37,'import_hash_v2','\"a5edefd982079222f3ad4212e66b2a52bc16afae1226fdca9d47a180c7024bca\"','dfcb9e165464bc5c373171dcaf9de3cb4d35938a5e74e725a43c615836239ff8','2021-09-16 15:29:33'),
(74,'2021-09-16 15:09:35','2021-09-16 15:29:33',37,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 15:29:33'),
(75,'2021-09-16 15:13:22','2021-09-16 15:13:22',38,'import_hash_v2','\"bb2831f75505abc6d2ed1324c68ec2c005258f5b034474ce4d8c11ffe3114582\"','06d06c75afcf6af64c03a3be5b61241b26761db36be969663563f6d0ff572821',NULL),
(76,'2021-09-16 15:13:22','2021-09-16 15:13:22',38,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(77,'2021-09-16 15:30:04','2021-09-16 15:30:04',39,'import_hash_v2','\"bb2831f75505abc6d2ed1324c68ec2c005258f5b034474ce4d8c11ffe3114582\"','06d06c75afcf6af64c03a3be5b61241b26761db36be969663563f6d0ff572821',NULL),
(78,'2021-09-16 15:30:04','2021-09-16 15:30:04',39,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(79,'2021-09-16 16:02:16','2021-09-16 16:02:16',40,'import_hash_v2','\"1e606e94e598dacb0c29ae9d5ec6a34eb6bcbae324f9e6007fc532676373c126\"','8dae3ab3f5239103b87a896538cf30f90ecb0bbaab1325c328b954a023e74e5d',NULL),
(80,'2021-09-16 16:02:16','2021-09-16 16:02:16',40,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(81,'2021-09-16 16:02:44','2021-09-16 16:02:44',41,'import_hash_v2','\"3780d3cf9816ab900fa981712c5f501ca3fe91b705198feb2c902577233614de\"','242c1e9cc5d9d2ce2c6abe5bcef2a5cc77eae6041340e7c475c0f502ae25f8c3',NULL),
(82,'2021-09-16 16:02:44','2021-09-16 16:02:44',41,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(83,'2021-09-16 16:09:54','2021-09-16 16:09:54',44,'import_hash_v2','\"c5d865019129a307c011383f3efe033d914f940817162a0dae5d1b4c2ba260ac\"','b2f29f5fd12b2d0ec732d9bfb04728da037f06c8ca56da186178f58dd0b1e8ee',NULL),
(84,'2021-09-16 16:09:54','2021-09-16 16:09:54',44,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(85,'2021-09-16 16:11:17','2021-09-16 16:11:24',45,'import_hash_v2','\"12c88a348c0486852935441707798a798ef928657d572fa2993f754da26daa35\"','604877f5ba4bacd7739d9e0f69dbae00a37c7f5470f5de5da420bc0ed2001c09','2021-09-16 16:11:24'),
(86,'2021-09-16 16:11:17','2021-09-16 16:11:24',45,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 16:11:24'),
(87,'2021-09-16 16:11:50','2021-09-16 16:15:05',46,'import_hash_v2','\"38dd783baf451f3d2d167d1e7e50d952ef43f8bcde082c816d9b8cb3361cad4e\"','a1b5fc27cae32319e74678221a968f893c709d9b83561f798fa51ae3f6470a1e','2021-09-16 16:15:05'),
(88,'2021-09-16 16:11:50','2021-09-16 16:15:05',46,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6','2021-09-16 16:15:05'),
(89,'2021-09-16 16:12:04','2021-09-16 16:12:04',47,'import_hash_v2','\"e718cc020fe6824d4f7f61aab8ed03e87fea20bd50a3e2413be29e2bfd7e50ef\"','eed4ff813300fa6066ccdc31d7bd8fe151d5a42ece61c2107b7272808c3a041b',NULL),
(90,'2021-09-16 16:12:04','2021-09-16 16:12:04',47,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(91,'2021-09-16 16:12:42','2021-09-16 16:12:42',48,'import_hash_v2','\"08f4ae0182b4c030678ab74e343dffd4a018469ec20bfe18f3a22877fada5317\"','e1308b8940cb7f402bd437d11a824a1c3fb6bb125b23eb1466625fe270b5bd64',NULL),
(92,'2021-09-16 16:12:42','2021-09-16 16:12:42',48,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(93,'2021-09-16 16:14:46','2021-09-16 16:14:46',49,'import_hash_v2','\"1500ef303d95669c378e8205b123d07f830c521bcde142486fd995a70fa9c488\"','3479ebe2118eb5737ced8517bcdaad5d59da7757da500b97bcb2c53e415a6577',NULL),
(94,'2021-09-16 16:14:46','2021-09-16 16:14:46',49,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(95,'2021-09-16 16:14:52','2021-09-16 16:14:52',50,'import_hash_v2','\"75ae05ff54065f179c536a53079c73a5b60f6e1f4ce099a5cd068afd5dee0fdf\"','1c388b88d091e06ddc1ba204499c5676f364a36ab87fe570cc3ffef9e63548e4',NULL),
(96,'2021-09-16 16:14:52','2021-09-16 16:14:52',50,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(97,'2021-09-16 16:15:25','2021-09-16 16:15:25',51,'import_hash_v2','\"430f8764d7e6f178f1accc271221955d5be9514a9ac30c019dc42942f9b195e8\"','ca29532b7869c51eb8bd0dfa638e41ee166d41473ab0099c745a8577f3304d57',NULL),
(98,'2021-09-16 16:15:25','2021-09-16 16:15:25',51,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(99,'2021-09-16 16:16:29','2021-09-16 16:16:29',52,'import_hash_v2','\"9c10f6685e2dd2cae3f38122d86e01fdc1271b278d4a18403cb68103802965b2\"','4c004be80f3c8c365fac6fcd6dbb09b763cf639e4699766a003de9b8f867dd1f',NULL),
(100,'2021-09-16 16:16:29','2021-09-16 16:16:29',52,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(101,'2021-09-16 16:17:13','2021-09-16 16:17:13',53,'import_hash_v2','\"41821cf0ffe1a52132fb93bf3ca2e2a81eb04a3016ceba35689e9cee694f4de6\"','89cdce916c15d709a553a833283e74750b045ec37a66bdf5bb61e6bf4987eac5',NULL),
(102,'2021-09-16 16:17:13','2021-09-16 16:17:13',53,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL),
(103,'2021-09-16 16:17:49','2021-09-16 16:17:49',54,'import_hash_v2','\"b4b55b6bced3a0535008398c93f1d7da25d9f9f63bba9fa7448f3562ceb5ae60\"','5a3e453436be381b3ec89c8af4fd7b45220247c1663b9526d26688ec1a80e1b0',NULL),
(104,'2021-09-16 16:17:49','2021-09-16 16:17:49',54,'original_source','\"ff3-v5.5.13|api-v1.5.2\"','7c9afe8e46ca673f31c2d7a00198b99f38925a8d1a62720fe8fb3a0a031e2db6',NULL);

/*Table structure for table `limit_repetitions` */

DROP TABLE IF EXISTS `limit_repetitions`;

CREATE TABLE `limit_repetitions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `budget_limit_id` int(10) unsigned NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `amount` decimal(36,24) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `limit_repetitions_budget_limit_id_foreign` (`budget_limit_id`),
  CONSTRAINT `limit_repetitions_budget_limit_id_foreign` FOREIGN KEY (`budget_limit_id`) REFERENCES `budget_limits` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `limit_repetitions` */

/*Table structure for table `link_types` */

DROP TABLE IF EXISTS `link_types`;

CREATE TABLE `link_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `outward` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `inward` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `editable` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `link_types_name_outward_inward_unique` (`name`,`outward`,`inward`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `link_types` */

insert  into `link_types`(`id`,`created_at`,`updated_at`,`deleted_at`,`name`,`outward`,`inward`,`editable`) values 
(1,'2021-09-11 02:16:54','2021-09-11 02:16:54',NULL,'Related','relates to','relates to',0),
(2,'2021-09-11 02:16:54','2021-09-11 02:16:54',NULL,'Refund','(partially) refunds','is (partially) refunded by',0),
(3,'2021-09-11 02:16:54','2021-09-11 02:16:54',NULL,'Paid','(partially) pays for','is (partially) paid for by',0),
(4,'2021-09-11 02:16:54','2021-09-11 02:16:54',NULL,'Reimbursement','(partially) reimburses','is (partially) reimbursed by',0);

/*Table structure for table `locations` */

DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `locatable_id` int(10) unsigned NOT NULL,
  `locatable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` decimal(36,24) DEFAULT NULL,
  `longitude` decimal(36,24) DEFAULT NULL,
  `zoom_level` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `locations` */

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values 
(1,'2016_06_16_000000_create_support_tables',1),
(2,'2016_06_16_000001_create_users_table',1),
(3,'2016_06_16_000002_create_main_tables',1),
(4,'2016_08_25_091522_changes_for_3101',1),
(5,'2016_09_12_121359_fix_nullables',1),
(6,'2016_10_09_150037_expand_transactions_table',1),
(7,'2016_10_22_075804_changes_for_v410',1),
(8,'2016_11_24_210552_changes_for_v420',1),
(9,'2016_12_22_150431_changes_for_v430',1),
(10,'2016_12_28_203205_changes_for_v431',1),
(11,'2017_04_13_163623_changes_for_v440',1),
(12,'2017_06_02_105232_changes_for_v450',1),
(13,'2017_08_20_062014_changes_for_v470',1),
(14,'2017_11_04_170844_changes_for_v470a',1),
(15,'2018_01_01_000001_create_oauth_auth_codes_table',1),
(16,'2018_01_01_000002_create_oauth_access_tokens_table',1),
(17,'2018_01_01_000003_create_oauth_refresh_tokens_table',1),
(18,'2018_01_01_000004_create_oauth_clients_table',1),
(19,'2018_01_01_000005_create_oauth_personal_access_clients_table',1),
(20,'2018_03_19_141348_changes_for_v472',1),
(21,'2018_04_07_210913_changes_for_v473',1),
(22,'2018_04_29_174524_changes_for_v474',1),
(23,'2018_06_08_200526_changes_for_v475',1),
(24,'2018_09_05_195147_changes_for_v477',1),
(25,'2018_11_06_172532_changes_for_v479',1),
(26,'2019_01_28_193833_changes_for_v4710',1),
(27,'2019_02_05_055516_changes_for_v4711',1),
(28,'2019_02_11_170529_changes_for_v4712',1),
(29,'2019_03_11_223700_fix_ldap_configuration',1),
(30,'2019_03_22_183214_changes_for_v480',1),
(31,'2019_11_30_000000_create_2fa_token_table',1),
(32,'2019_12_28_191351_make_locations_table',1),
(33,'2020_03_13_201950_changes_for_v520',1),
(34,'2020_06_07_063612_changes_for_v530',1),
(35,'2020_06_30_202620_changes_for_v530a',1),
(36,'2020_07_24_162820_changes_for_v540',1),
(37,'2020_11_12_070604_changes_for_v550',1),
(38,'2021_03_12_061213_changes_for_v550b2',1),
(40,'2021_09_12_070647_create_apartments_table',2),
(42,'2021_09_13_162310_create_apartment_payments_table',3);

/*Table structure for table `notes` */

DROP TABLE IF EXISTS `notes`;

CREATE TABLE `notes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `noteable_id` int(10) unsigned NOT NULL,
  `noteable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `notes` */

/*Table structure for table `oauth_access_tokens` */

DROP TABLE IF EXISTS `oauth_access_tokens`;

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `oauth_access_tokens` */

/*Table structure for table `oauth_auth_codes` */

DROP TABLE IF EXISTS `oauth_auth_codes`;

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `oauth_auth_codes` */

/*Table structure for table `oauth_clients` */

DROP TABLE IF EXISTS `oauth_clients`;

CREATE TABLE `oauth_clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `oauth_clients` */

/*Table structure for table `oauth_personal_access_clients` */

DROP TABLE IF EXISTS `oauth_personal_access_clients`;

CREATE TABLE `oauth_personal_access_clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_personal_access_clients_client_id_index` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `oauth_personal_access_clients` */

/*Table structure for table `oauth_refresh_tokens` */

DROP TABLE IF EXISTS `oauth_refresh_tokens`;

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `oauth_refresh_tokens` */

/*Table structure for table `object_groupables` */

DROP TABLE IF EXISTS `object_groupables`;

CREATE TABLE `object_groupables` (
  `object_group_id` int(11) NOT NULL,
  `object_groupable_id` int(10) unsigned NOT NULL,
  `object_groupable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `object_groupables` */

/*Table structure for table `object_groups` */

DROP TABLE IF EXISTS `object_groups`;

CREATE TABLE `object_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` mediumint(8) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `object_groups_user_id_foreign` (`user_id`),
  CONSTRAINT `object_groups_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `object_groups` */

/*Table structure for table `password_resets` */

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `password_resets` */

/*Table structure for table `permission_role` */

DROP TABLE IF EXISTS `permission_role`;

CREATE TABLE `permission_role` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `permission_role_role_id_foreign` (`role_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `permission_role` */

/*Table structure for table `permissions` */

DROP TABLE IF EXISTS `permissions`;

CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `permissions` */

/*Table structure for table `piggy_bank_events` */

DROP TABLE IF EXISTS `piggy_bank_events`;

CREATE TABLE `piggy_bank_events` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `piggy_bank_id` int(10) unsigned NOT NULL,
  `transaction_journal_id` int(10) unsigned DEFAULT NULL,
  `date` date NOT NULL,
  `amount` decimal(36,24) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `piggy_bank_events_piggy_bank_id_foreign` (`piggy_bank_id`),
  KEY `piggy_bank_events_transaction_journal_id_foreign` (`transaction_journal_id`),
  CONSTRAINT `piggy_bank_events_piggy_bank_id_foreign` FOREIGN KEY (`piggy_bank_id`) REFERENCES `piggy_banks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `piggy_bank_events_transaction_journal_id_foreign` FOREIGN KEY (`transaction_journal_id`) REFERENCES `transaction_journals` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `piggy_bank_events` */

/*Table structure for table `piggy_bank_repetitions` */

DROP TABLE IF EXISTS `piggy_bank_repetitions`;

CREATE TABLE `piggy_bank_repetitions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `piggy_bank_id` int(10) unsigned NOT NULL,
  `startdate` date DEFAULT NULL,
  `targetdate` date DEFAULT NULL,
  `currentamount` decimal(36,24) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `piggy_bank_repetitions_piggy_bank_id_foreign` (`piggy_bank_id`),
  CONSTRAINT `piggy_bank_repetitions_piggy_bank_id_foreign` FOREIGN KEY (`piggy_bank_id`) REFERENCES `piggy_banks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `piggy_bank_repetitions` */

insert  into `piggy_bank_repetitions`(`id`,`created_at`,`updated_at`,`piggy_bank_id`,`startdate`,`targetdate`,`currentamount`) values 
(1,'2021-09-22 04:32:00','2021-09-22 04:32:00',1,'2021-09-22','2021-09-30',0.000000000000000000000000);

/*Table structure for table `piggy_banks` */

DROP TABLE IF EXISTS `piggy_banks`;

CREATE TABLE `piggy_banks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `account_id` int(10) unsigned NOT NULL,
  `name` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `targetamount` decimal(36,24) NOT NULL,
  `startdate` date DEFAULT NULL,
  `targetdate` date DEFAULT NULL,
  `order` int(10) unsigned NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `encrypted` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `piggy_banks_account_id_foreign` (`account_id`),
  CONSTRAINT `piggy_banks_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `piggy_banks` */

insert  into `piggy_banks`(`id`,`created_at`,`updated_at`,`deleted_at`,`account_id`,`name`,`targetamount`,`startdate`,`targetdate`,`order`,`active`,`encrypted`) values 
(1,'2021-09-22 04:32:00','2021-09-22 04:32:00',NULL,2,'tet',1000.000000000000000000000000,'2021-09-22','2021-09-30',1,0,1);

/*Table structure for table `preferences` */

DROP TABLE IF EXISTS `preferences`;

CREATE TABLE `preferences` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `preferences_user_id_foreign` (`user_id`),
  CONSTRAINT `preferences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `preferences` */

insert  into `preferences`(`id`,`created_at`,`updated_at`,`user_id`,`name`,`data`) values 
(1,'2021-09-11 02:18:28','2021-09-22 15:27:08',1,'login_ip_history','[{\"ip\":\"127.0.0.1\",\"time\":\"2021-09-22 15:27:08\",\"notified\":true}]'),
(2,'2021-09-11 02:18:28','2021-09-11 02:18:28',1,'viewRange','\"1M\"'),
(3,'2021-09-11 02:18:28','2021-09-11 02:18:28',1,'language','\"en_US\"'),
(4,'2021-09-11 02:18:28','2021-09-11 02:18:28',1,'locale','\"equal\"'),
(5,'2021-09-11 02:18:28','2021-09-22 17:30:41',1,'lastActivity','\"0.22560400 1632324641\"'),
(6,'2021-09-11 02:18:28','2021-09-11 02:18:28',1,'currencyPreference','\"EUR\"'),
(7,'2021-09-11 02:18:29','2021-09-11 02:18:29',1,'list-length','10'),
(8,'2021-09-11 02:18:45','2021-09-11 02:18:51',1,'shown_demo_reports_index','true'),
(9,'2021-09-11 02:18:45','2021-09-11 02:18:45',1,'customFiscalYear','false'),
(10,'2021-09-11 02:20:15','2021-09-11 02:20:20',1,'shown_demo_transactions_create_withdrawal','true'),
(11,'2021-09-11 02:20:15','2021-09-16 16:12:33',1,'transaction_journal_optional_fields','{\"interest_date\":false,\"book_date\":false,\"process_date\":false,\"due_date\":false,\"payment_date\":false,\"invoice_date\":false,\"internal_reference\":false,\"notes\":false,\"attachments\":false,\"external_uri\":false,\"location\":false,\"links\":false}'),
(12,'2021-09-11 02:20:17','2021-09-11 02:20:17',1,'listPageSize','50'),
(13,'2021-09-11 02:57:18','2021-09-22 04:32:10',1,'shown_demo_piggy-banks_index','true'),
(14,'2021-09-11 03:10:12','2021-09-11 10:23:58',1,'shown_demo_index','true'),
(15,'2021-09-11 09:54:58','2021-09-11 09:55:03',1,'shown_demo_accounts_create_asset','true'),
(16,'2021-09-11 09:55:08','2021-09-13 08:25:59',1,'frontPageAccounts','[2,7]'),
(17,'2021-09-12 21:34:06','2021-09-12 21:34:11',1,'shown_demo_transactions_create_transfer','true'),
(18,'2021-09-12 21:34:22','2021-09-12 21:34:25',1,'shown_demo_transactions_create_deposit','true'),
(19,'2021-09-13 06:44:22','2021-09-13 06:44:27',1,'shown_demo_transactions_create_f','true'),
(20,'2021-09-13 06:55:43','2021-09-13 08:25:12',1,'shown_demo_accounts_create_revenue','true'),
(21,'2021-09-13 07:18:05','2021-09-13 07:18:15',1,'shown_demo_accounts_create_expense','true'),
(22,'2021-09-16 16:06:52','2021-09-16 16:15:16',1,'disablePaidAlert','true'),
(23,'2021-09-16 16:12:26','2021-09-16 16:12:30',1,'shown_demo_preferences_index','true'),
(24,'2021-09-16 16:12:26','2021-09-16 16:12:26',1,'fiscalYearStart','\"01-01\"'),
(25,'2021-09-17 20:10:32','2021-09-17 20:10:32',1,'shown_demo_bills_index','false'),
(26,'2021-09-17 20:10:36','2021-09-17 20:10:36',1,'shown_demo_budgets_index','false'),
(27,'2021-09-17 20:11:10','2021-09-17 20:11:15',1,'shown_demo_reports_report_default','true'),
(28,'2021-09-22 04:31:40','2021-09-22 04:31:47',1,'shown_demo_piggy-banks_create','true');

/*Table structure for table `recurrences` */

DROP TABLE IF EXISTS `recurrences`;

CREATE TABLE `recurrences` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `transaction_type_id` int(10) unsigned NOT NULL,
  `title` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_date` date NOT NULL,
  `repeat_until` date DEFAULT NULL,
  `latest_date` date DEFAULT NULL,
  `repetitions` smallint(5) unsigned NOT NULL,
  `apply_rules` tinyint(1) NOT NULL DEFAULT 1,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `recurrences_user_id_foreign` (`user_id`),
  KEY `recurrences_transaction_type_id_foreign` (`transaction_type_id`),
  CONSTRAINT `recurrences_transaction_type_id_foreign` FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `recurrences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `recurrences` */

/*Table structure for table `recurrences_meta` */

DROP TABLE IF EXISTS `recurrences_meta`;

CREATE TABLE `recurrences_meta` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `recurrence_id` int(10) unsigned NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recurrences_meta_recurrence_id_foreign` (`recurrence_id`),
  CONSTRAINT `recurrences_meta_recurrence_id_foreign` FOREIGN KEY (`recurrence_id`) REFERENCES `recurrences` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `recurrences_meta` */

/*Table structure for table `recurrences_repetitions` */

DROP TABLE IF EXISTS `recurrences_repetitions`;

CREATE TABLE `recurrences_repetitions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `recurrence_id` int(10) unsigned NOT NULL,
  `repetition_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `repetition_moment` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `repetition_skip` smallint(5) unsigned NOT NULL,
  `weekend` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recurrences_repetitions_recurrence_id_foreign` (`recurrence_id`),
  CONSTRAINT `recurrences_repetitions_recurrence_id_foreign` FOREIGN KEY (`recurrence_id`) REFERENCES `recurrences` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `recurrences_repetitions` */

/*Table structure for table `recurrences_transactions` */

DROP TABLE IF EXISTS `recurrences_transactions`;

CREATE TABLE `recurrences_transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `recurrence_id` int(10) unsigned NOT NULL,
  `transaction_currency_id` int(10) unsigned NOT NULL,
  `transaction_type_id` int(10) unsigned DEFAULT NULL,
  `foreign_currency_id` int(10) unsigned DEFAULT NULL,
  `source_id` int(10) unsigned NOT NULL,
  `destination_id` int(10) unsigned NOT NULL,
  `amount` decimal(36,24) NOT NULL,
  `foreign_amount` decimal(36,24) DEFAULT NULL,
  `description` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recurrences_transactions_recurrence_id_foreign` (`recurrence_id`),
  KEY `recurrences_transactions_transaction_currency_id_foreign` (`transaction_currency_id`),
  KEY `recurrences_transactions_foreign_currency_id_foreign` (`foreign_currency_id`),
  KEY `recurrences_transactions_source_id_foreign` (`source_id`),
  KEY `recurrences_transactions_destination_id_foreign` (`destination_id`),
  KEY `type_foreign` (`transaction_type_id`),
  CONSTRAINT `recurrences_transactions_destination_id_foreign` FOREIGN KEY (`destination_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `recurrences_transactions_foreign_currency_id_foreign` FOREIGN KEY (`foreign_currency_id`) REFERENCES `transaction_currencies` (`id`) ON DELETE SET NULL,
  CONSTRAINT `recurrences_transactions_recurrence_id_foreign` FOREIGN KEY (`recurrence_id`) REFERENCES `recurrences` (`id`) ON DELETE CASCADE,
  CONSTRAINT `recurrences_transactions_source_id_foreign` FOREIGN KEY (`source_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `recurrences_transactions_transaction_currency_id_foreign` FOREIGN KEY (`transaction_currency_id`) REFERENCES `transaction_currencies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `type_foreign` FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_types` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `recurrences_transactions` */

/*Table structure for table `role_user` */

DROP TABLE IF EXISTS `role_user`;

CREATE TABLE `role_user` (
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_user_role_id_foreign` (`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `role_user` */

insert  into `role_user`(`user_id`,`role_id`) values 
(1,1);

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `roles` */

insert  into `roles`(`id`,`created_at`,`updated_at`,`name`,`display_name`,`description`) values 
(1,'2021-09-11 02:16:53','2021-09-11 02:16:53','owner','Site Owner','User runs this instance of FF3'),
(2,'2021-09-11 02:16:53','2021-09-11 02:16:53','demo','Demo User','User is a demo user');

/*Table structure for table `rt_meta` */

DROP TABLE IF EXISTS `rt_meta`;

CREATE TABLE `rt_meta` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `rt_id` int(10) unsigned NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rt_meta_rt_id_foreign` (`rt_id`),
  CONSTRAINT `rt_meta_rt_id_foreign` FOREIGN KEY (`rt_id`) REFERENCES `recurrences_transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `rt_meta` */

/*Table structure for table `rule_actions` */

DROP TABLE IF EXISTS `rule_actions`;

CREATE TABLE `rule_actions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `rule_id` int(10) unsigned NOT NULL,
  `action_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int(10) unsigned NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `stop_processing` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `rule_actions_rule_id_foreign` (`rule_id`),
  CONSTRAINT `rule_actions_rule_id_foreign` FOREIGN KEY (`rule_id`) REFERENCES `rules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `rule_actions` */

/*Table structure for table `rule_groups` */

DROP TABLE IF EXISTS `rule_groups`;

CREATE TABLE `rule_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int(10) unsigned NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `stop_processing` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `rule_groups_user_id_foreign` (`user_id`),
  CONSTRAINT `rule_groups_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `rule_groups` */

/*Table structure for table `rule_triggers` */

DROP TABLE IF EXISTS `rule_triggers`;

CREATE TABLE `rule_triggers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `rule_id` int(10) unsigned NOT NULL,
  `trigger_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trigger_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int(10) unsigned NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `stop_processing` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `rule_triggers_rule_id_foreign` (`rule_id`),
  CONSTRAINT `rule_triggers_rule_id_foreign` FOREIGN KEY (`rule_id`) REFERENCES `rules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `rule_triggers` */

/*Table structure for table `rules` */

DROP TABLE IF EXISTS `rules`;

CREATE TABLE `rules` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `rule_group_id` int(10) unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int(10) unsigned NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `stop_processing` tinyint(1) NOT NULL DEFAULT 0,
  `strict` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `rules_user_id_foreign` (`user_id`),
  KEY `rules_rule_group_id_foreign` (`rule_group_id`),
  CONSTRAINT `rules_rule_group_id_foreign` FOREIGN KEY (`rule_group_id`) REFERENCES `rule_groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rules_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `rules` */

/*Table structure for table `sessions` */

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  UNIQUE KEY `sessions_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `sessions` */

/*Table structure for table `tag_transaction_journal` */

DROP TABLE IF EXISTS `tag_transaction_journal`;

CREATE TABLE `tag_transaction_journal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag_id` int(10) unsigned NOT NULL,
  `transaction_journal_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_transaction_journal_tag_id_transaction_journal_id_unique` (`tag_id`,`transaction_journal_id`),
  KEY `tag_transaction_journal_transaction_journal_id_foreign` (`transaction_journal_id`),
  CONSTRAINT `tag_transaction_journal_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tag_transaction_journal_transaction_journal_id_foreign` FOREIGN KEY (`transaction_journal_id`) REFERENCES `transaction_journals` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `tag_transaction_journal` */

/*Table structure for table `tags` */

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `tag` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tagMode` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(36,24) DEFAULT NULL,
  `longitude` decimal(36,24) DEFAULT NULL,
  `zoomLevel` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tags_user_id_foreign` (`user_id`),
  CONSTRAINT `tags_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `tags` */

insert  into `tags`(`id`,`created_at`,`updated_at`,`deleted_at`,`user_id`,`tag`,`tagMode`,`date`,`description`,`latitude`,`longitude`,`zoomLevel`) values 
(1,'2021-09-12 06:32:45','2021-09-12 06:32:45',NULL,1,'1','nothing',NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `telemetry` */

DROP TABLE IF EXISTS `telemetry`;

CREATE TABLE `telemetry` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `submitted` datetime DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `installation_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `telemetry_user_id_foreign` (`user_id`),
  CONSTRAINT `telemetry_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `telemetry` */

/*Table structure for table `transaction_currencies` */

DROP TABLE IF EXISTS `transaction_currencies`;

CREATE TABLE `transaction_currencies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 0,
  `code` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `symbol` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `decimal_places` smallint(5) unsigned NOT NULL DEFAULT 2,
  PRIMARY KEY (`id`),
  UNIQUE KEY `transaction_currencies_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `transaction_currencies` */

insert  into `transaction_currencies`(`id`,`created_at`,`updated_at`,`deleted_at`,`enabled`,`code`,`name`,`symbol`,`decimal_places`) values 
(1,'2021-09-11 02:16:48','2021-09-11 02:16:48',NULL,1,'EUR','Euro','€',2),
(2,'2021-09-11 02:16:49','2021-09-11 02:16:49',NULL,0,'HUF','Hungarian forint','Ft',2),
(3,'2021-09-11 02:16:49','2021-09-11 02:16:49',NULL,0,'GBP','British Pound','£',2),
(4,'2021-09-11 02:16:49','2021-09-11 02:16:49',NULL,0,'UAH','Ukrainian hryvnia','₴',2),
(5,'2021-09-11 02:16:49','2021-09-11 02:16:49',NULL,0,'PLN','Polish złoty','zł',2),
(6,'2021-09-11 02:16:49','2021-09-11 02:16:49',NULL,0,'TRY','Turkish lira','₺',2),
(7,'2021-09-11 02:16:49','2021-09-11 02:16:49',NULL,0,'USD','US Dollar','$',2),
(8,'2021-09-11 02:16:49','2021-09-11 02:16:49',NULL,0,'BRL','Brazilian real','R$',2),
(9,'2021-09-11 02:16:50','2021-09-11 02:16:50',NULL,0,'CAD','Canadian dollar','C$',2),
(10,'2021-09-11 02:16:50','2021-09-11 02:16:50',NULL,0,'IDR','Indonesian rupiah','Rp',2),
(11,'2021-09-11 02:16:50','2021-09-11 02:16:50',NULL,0,'AUD','Australian dollar','A$',2),
(12,'2021-09-11 02:16:50','2021-09-11 02:16:50',NULL,0,'NZD','New Zealand dollar','NZ$',2),
(13,'2021-09-11 02:16:50','2021-09-11 02:16:50',NULL,0,'EGP','Egyptian pound','E£',2),
(14,'2021-09-11 02:16:51','2021-09-11 02:16:51',NULL,0,'MAD','Moroccan dirham','DH',2),
(15,'2021-09-11 02:16:51','2021-09-11 02:16:51',NULL,0,'ZAR','South African rand','R',2),
(16,'2021-09-11 02:16:51','2021-09-11 02:16:51',NULL,0,'JPY','Japanese yen','¥',0),
(17,'2021-09-11 02:16:51','2021-09-11 02:16:51',NULL,0,'RMB','Chinese yuan','¥',2),
(18,'2021-09-11 02:16:51','2021-09-11 02:16:51',NULL,0,'RUB','Russian ruble','₽',2),
(19,'2021-09-11 02:16:52','2021-09-11 02:16:52',NULL,0,'INR','Indian rupee','₹',2),
(20,'2021-09-11 02:16:52','2021-09-11 02:16:52',NULL,0,'XBT','Bitcoin','₿',8),
(21,'2021-09-11 02:16:52','2021-09-11 02:16:52',NULL,0,'BCH','Bitcoin cash','₿C',8),
(22,'2021-09-11 02:16:52','2021-09-11 02:16:52',NULL,0,'ETH','Ethereum','Ξ',12),
(23,'2021-09-11 02:16:52','2021-09-11 02:16:52',NULL,0,'ILS','Israeli new shekel','₪',2),
(24,'2021-09-11 02:16:52','2021-09-11 02:16:52',NULL,0,'CHF','Swiss franc','CHF',2),
(25,'2021-09-11 02:16:52','2021-09-11 02:16:52',NULL,0,'HRK','Croatian kuna','kn',2);

/*Table structure for table `transaction_groups` */

DROP TABLE IF EXISTS `transaction_groups`;

CREATE TABLE `transaction_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `title` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transaction_groups_user_id_foreign` (`user_id`),
  CONSTRAINT `transaction_groups_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `transaction_groups` */

insert  into `transaction_groups`(`id`,`created_at`,`updated_at`,`deleted_at`,`user_id`,`title`) values 
(1,'2021-09-12 06:32:45','2021-09-13 10:46:35','2021-09-13 10:46:35',1,NULL),
(2,'2021-09-12 06:39:45','2021-09-13 10:46:30','2021-09-13 10:46:30',1,NULL),
(3,'2021-09-12 06:42:22','2021-09-13 10:45:58','2021-09-13 10:45:58',1,NULL),
(4,'2021-09-13 08:49:47','2021-09-13 10:46:54','2021-09-13 10:46:54',1,NULL),
(5,'2021-09-13 10:49:46','2021-09-13 10:49:46',NULL,1,NULL),
(6,'2021-09-13 10:50:47','2021-09-13 10:50:47',NULL,1,NULL),
(7,'2021-09-13 10:52:51','2021-09-13 10:52:51',NULL,1,NULL),
(8,'2021-09-13 16:11:49','2021-09-13 16:11:49',NULL,1,NULL),
(9,'2021-09-13 16:16:06','2021-09-16 15:29:36','2021-09-16 15:29:36',1,NULL),
(10,'2021-09-13 16:19:43','2021-09-16 15:29:36','2021-09-16 15:29:36',1,NULL),
(11,'2021-09-13 16:34:05','2021-09-16 15:29:36','2021-09-16 15:29:36',1,NULL),
(12,'2021-09-13 16:35:13','2021-09-16 15:29:36','2021-09-16 15:29:36',1,NULL),
(13,'2021-09-13 16:35:51','2021-09-16 15:29:36','2021-09-16 15:29:36',1,NULL),
(14,'2021-09-13 16:36:03','2021-09-16 15:29:35','2021-09-16 15:29:35',1,NULL),
(15,'2021-09-13 16:36:57','2021-09-16 15:29:35','2021-09-16 15:29:35',1,NULL),
(16,'2021-09-14 15:44:11','2021-09-14 15:44:11',NULL,1,NULL),
(17,'2021-09-14 15:44:27','2021-09-14 15:44:27',NULL,1,NULL),
(18,'2021-09-14 15:45:27','2021-09-14 15:45:27',NULL,1,NULL),
(19,'2021-09-14 16:03:24','2021-09-16 15:29:35','2021-09-16 15:29:35',1,NULL),
(20,'2021-09-14 16:04:58','2021-09-16 15:29:35','2021-09-16 15:29:35',1,NULL),
(21,'2021-09-14 16:05:52','2021-09-16 15:29:35','2021-09-16 15:29:35',1,NULL),
(22,'2021-09-14 16:06:10','2021-09-16 15:29:35','2021-09-16 15:29:35',1,NULL),
(23,'2021-09-14 16:07:11','2021-09-16 15:29:35','2021-09-16 15:29:35',1,NULL),
(24,'2021-09-14 16:07:29','2021-09-16 15:29:34','2021-09-16 15:29:34',1,NULL),
(25,'2021-09-14 16:12:26','2021-09-16 15:29:34','2021-09-16 15:29:34',1,NULL),
(26,'2021-09-14 16:13:05','2021-09-14 16:13:05',NULL,1,NULL),
(27,'2021-09-14 16:14:37','2021-09-14 16:14:37',NULL,1,NULL),
(28,'2021-09-14 16:15:13','2021-09-14 16:15:13',NULL,1,NULL),
(29,'2021-09-14 16:15:25','2021-09-14 16:15:25',NULL,1,NULL),
(30,'2021-09-14 16:17:12','2021-09-14 16:17:12',NULL,1,NULL),
(31,'2021-09-14 16:17:25','2021-09-14 16:17:25',NULL,1,NULL),
(32,'2021-09-14 16:20:36','2021-09-16 15:29:34','2021-09-16 15:29:34',1,NULL),
(33,'2021-09-14 16:20:45','2021-09-16 15:29:34','2021-09-16 15:29:34',1,NULL),
(34,'2021-09-14 16:21:10','2021-09-14 16:21:10',NULL,1,NULL),
(35,'2021-09-14 20:43:05','2021-09-14 20:43:05',NULL,1,NULL),
(36,'2021-09-16 15:09:01','2021-09-16 15:09:01',NULL,1,NULL),
(37,'2021-09-16 15:09:35','2021-09-16 15:29:33','2021-09-16 15:29:33',1,NULL),
(38,'2021-09-16 15:13:22','2021-09-16 15:13:22',NULL,1,NULL),
(39,'2021-09-16 15:30:04','2021-09-16 15:30:04',NULL,1,NULL),
(40,'2021-09-16 16:02:16','2021-09-16 16:02:16',NULL,1,NULL),
(41,'2021-09-16 16:02:44','2021-09-16 16:02:44',NULL,1,NULL),
(42,'2021-09-16 16:09:54','2021-09-16 16:09:54',NULL,1,NULL),
(43,'2021-09-16 16:11:17','2021-09-16 16:11:24','2021-09-16 16:11:24',1,NULL),
(44,'2021-09-16 16:11:50','2021-09-16 16:15:06','2021-09-16 16:15:06',1,NULL),
(45,'2021-09-16 16:12:04','2021-09-16 16:12:04',NULL,1,NULL),
(46,'2021-09-16 16:12:43','2021-09-16 16:12:43',NULL,1,NULL),
(47,'2021-09-16 16:14:46','2021-09-16 16:14:46',NULL,1,NULL),
(48,'2021-09-16 16:14:52','2021-09-16 16:14:52',NULL,1,NULL),
(49,'2021-09-16 16:15:25','2021-09-16 16:15:25',NULL,1,NULL),
(50,'2021-09-16 16:16:29','2021-09-16 16:16:29',NULL,1,NULL),
(51,'2021-09-16 16:17:13','2021-09-16 16:17:13',NULL,1,NULL),
(52,'2021-09-16 16:17:49','2021-09-16 16:17:49',NULL,1,NULL);

/*Table structure for table `transaction_journals` */

DROP TABLE IF EXISTS `transaction_journals`;

CREATE TABLE `transaction_journals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `transaction_type_id` int(10) unsigned NOT NULL,
  `transaction_group_id` int(10) unsigned DEFAULT NULL,
  `bill_id` int(10) unsigned DEFAULT NULL,
  `transaction_currency_id` int(10) unsigned DEFAULT NULL,
  `description` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  `interest_date` date DEFAULT NULL,
  `book_date` date DEFAULT NULL,
  `process_date` date DEFAULT NULL,
  `order` int(10) unsigned NOT NULL DEFAULT 0,
  `tag_count` int(10) unsigned NOT NULL,
  `encrypted` tinyint(1) NOT NULL DEFAULT 1,
  `completed` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `transaction_journals_user_id_foreign` (`user_id`),
  KEY `transaction_journals_transaction_type_id_foreign` (`transaction_type_id`),
  KEY `transaction_journals_bill_id_foreign` (`bill_id`),
  KEY `transaction_journals_transaction_currency_id_foreign` (`transaction_currency_id`),
  KEY `transaction_journals_transaction_group_id_foreign` (`transaction_group_id`),
  CONSTRAINT `transaction_journals_bill_id_foreign` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`id`) ON DELETE SET NULL,
  CONSTRAINT `transaction_journals_transaction_currency_id_foreign` FOREIGN KEY (`transaction_currency_id`) REFERENCES `transaction_currencies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `transaction_journals_transaction_group_id_foreign` FOREIGN KEY (`transaction_group_id`) REFERENCES `transaction_groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `transaction_journals_transaction_type_id_foreign` FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `transaction_journals_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `transaction_journals` */

insert  into `transaction_journals`(`id`,`created_at`,`updated_at`,`deleted_at`,`user_id`,`transaction_type_id`,`transaction_group_id`,`bill_id`,`transaction_currency_id`,`description`,`date`,`interest_date`,`book_date`,`process_date`,`order`,`tag_count`,`encrypted`,`completed`) values 
(1,'2021-09-12 06:32:44','2021-09-13 10:46:35','2021-09-13 10:46:35',1,1,1,NULL,1,'1','0001-01-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(2,'2021-09-12 06:39:44','2021-09-13 10:46:29','2021-09-13 10:46:29',1,1,2,NULL,1,'1','2021-01-12 00:00:00',NULL,NULL,NULL,0,0,1,1),
(3,'2021-09-12 06:42:22','2021-09-13 10:45:58','2021-09-13 10:45:58',1,1,3,NULL,1,'1','2021-09-12 00:00:00',NULL,NULL,NULL,0,0,1,1),
(4,'2021-09-13 08:49:46','2021-09-13 10:46:54','2021-09-13 10:46:54',1,3,4,NULL,1,'1','2021-09-13 00:00:00',NULL,NULL,NULL,0,0,1,1),
(5,'2021-09-13 10:49:46','2021-09-13 10:49:46',NULL,1,1,5,NULL,1,'1','2021-09-13 00:00:00',NULL,NULL,NULL,0,0,1,1),
(6,'2021-09-13 10:50:47','2021-09-13 10:50:47',NULL,1,1,6,NULL,1,'1','2021-09-13 00:00:00',NULL,NULL,NULL,0,0,1,1),
(7,'2021-09-13 10:52:51','2021-09-13 10:52:51',NULL,1,1,7,NULL,1,'1','2021-09-13 00:00:00',NULL,NULL,NULL,0,0,1,1),
(8,'2021-09-13 16:11:49','2021-09-13 16:11:49',NULL,1,3,8,NULL,1,'test','2021-09-13 00:00:00',NULL,NULL,NULL,0,0,1,1),
(9,'2021-09-13 16:16:05','2021-09-16 15:29:36','2021-09-16 15:29:36',1,2,9,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(10,'2021-09-13 16:19:42','2021-09-16 15:29:36','2021-09-16 15:29:36',1,2,10,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(11,'2021-09-13 16:34:04','2021-09-16 15:29:36','2021-09-16 15:29:36',1,2,11,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(12,'2021-09-13 16:35:13','2021-09-16 15:29:36','2021-09-16 15:29:36',1,2,12,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(13,'2021-09-13 16:35:50','2021-09-16 15:29:36','2021-09-16 15:29:36',1,2,13,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(14,'2021-09-13 16:36:03','2021-09-16 15:29:35','2021-09-16 15:29:35',1,2,14,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(15,'2021-09-13 16:36:57','2021-09-16 15:29:35','2021-09-16 15:29:35',1,2,15,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(16,'2021-09-14 15:44:10','2021-09-14 15:44:11',NULL,1,2,16,NULL,1,'revenue1','2021-03-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(17,'2021-09-14 15:44:26','2021-09-14 15:44:27',NULL,1,2,17,NULL,1,'revenue1','2021-04-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(18,'2021-09-14 15:45:27','2021-09-14 15:45:27',NULL,1,2,18,NULL,1,'revenue1','2021-06-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(19,'2021-09-14 16:03:24','2021-09-16 15:29:35','2021-09-16 15:29:35',1,2,19,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(20,'2021-09-14 16:04:58','2021-09-16 15:29:35','2021-09-16 15:29:35',1,2,20,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(21,'2021-09-14 16:05:52','2021-09-16 15:29:35','2021-09-16 15:29:35',1,2,21,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(22,'2021-09-14 16:06:09','2021-09-16 15:29:35','2021-09-16 15:29:35',1,2,22,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(23,'2021-09-14 16:07:11','2021-09-16 15:29:34','2021-09-16 15:29:34',1,2,23,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(24,'2021-09-14 16:07:29','2021-09-16 15:29:34','2021-09-16 15:29:34',1,2,24,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(25,'2021-09-14 16:12:26','2021-09-16 15:29:34','2021-09-16 15:29:34',1,2,25,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(26,'2021-09-14 16:13:05','2021-09-14 16:13:05',NULL,1,2,26,NULL,1,'revenue1','2021-05-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(27,'2021-09-14 16:14:37','2021-09-14 16:14:37',NULL,1,2,27,NULL,1,'revenue1','2021-05-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(28,'2021-09-14 16:15:13','2021-09-14 16:15:13',NULL,1,2,28,NULL,1,'revenue1','2021-08-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(29,'2021-09-14 16:15:25','2021-09-14 16:15:25',NULL,1,2,29,NULL,1,'revenue1','2021-06-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(30,'2021-09-14 16:17:11','2021-09-14 16:17:12',NULL,1,2,30,NULL,1,'revenue1','2021-06-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(31,'2021-09-14 16:17:25','2021-09-14 16:17:25',NULL,1,2,31,NULL,1,'revenue1','2021-01-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(32,'2021-09-14 16:20:36','2021-09-16 15:29:34','2021-09-16 15:29:34',1,2,32,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(33,'2021-09-14 16:20:45','2021-09-16 15:29:34','2021-09-16 15:29:34',1,2,33,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(34,'2021-09-14 16:21:10','2021-09-14 16:21:10',NULL,1,2,34,NULL,1,'revenue1','2021-07-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(35,'2021-09-14 20:43:05','2021-09-14 20:43:05',NULL,1,2,35,NULL,1,'revenue1','2021-10-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(36,'2021-09-16 15:09:00','2021-09-16 15:09:01',NULL,1,1,36,NULL,1,'1','2021-09-16 00:00:00',NULL,NULL,NULL,0,0,1,1),
(37,'2021-09-16 15:09:34','2021-09-16 15:29:33','2021-09-16 15:29:33',1,2,37,NULL,1,'revenue1','2021-09-16 00:00:00',NULL,NULL,NULL,0,0,1,1),
(38,'2021-09-16 15:13:22','2021-09-16 15:13:22',NULL,1,3,38,NULL,1,'1','2021-09-16 00:00:00',NULL,NULL,NULL,0,0,1,1),
(39,'2021-09-16 15:30:03','2021-09-16 15:30:04',NULL,1,3,39,NULL,1,'1','2021-09-16 00:00:00',NULL,NULL,NULL,0,0,1,1),
(40,'2021-09-16 16:02:16','2021-09-16 16:02:16',NULL,1,1,40,NULL,1,'1','2021-09-16 00:00:00',NULL,NULL,NULL,0,0,1,1),
(41,'2021-09-16 16:02:44','2021-09-16 16:02:44',NULL,1,2,41,NULL,1,'test','2021-09-16 00:00:00',NULL,NULL,NULL,0,0,1,1),
(42,'2021-09-16 16:07:32','2021-09-16 16:07:32','2021-09-16 16:07:32',1,2,NULL,NULL,1,'revenue1','2021-03-01 00:00:00',NULL,NULL,NULL,0,0,1,0),
(43,'2021-09-16 16:07:59','2021-09-16 16:07:59','2021-09-16 16:07:59',1,2,NULL,NULL,1,'revenue1','2021-04-01 00:00:00',NULL,NULL,NULL,0,0,1,0),
(44,'2021-09-16 16:09:54','2021-09-16 16:09:54',NULL,1,2,42,NULL,1,'revenue1','2021-04-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(45,'2021-09-16 16:11:16','2021-09-16 16:11:24','2021-09-16 16:11:24',1,2,43,NULL,1,'revenue1','2021-06-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(46,'2021-09-16 16:11:50','2021-09-16 16:15:06','2021-09-16 16:15:06',1,2,44,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(47,'2021-09-16 16:12:03','2021-09-16 16:12:04',NULL,1,2,45,NULL,1,'revenue1','2021-08-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(48,'2021-09-16 16:12:42','2021-09-16 16:12:43',NULL,1,2,46,NULL,1,'revenue1','2021-09-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(49,'2021-09-16 16:14:46','2021-09-16 16:14:46',NULL,1,2,47,NULL,1,'revenue1','2021-12-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(50,'2021-09-16 16:14:52','2021-09-16 16:14:52',NULL,1,2,48,NULL,1,'revenue1','2021-02-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(51,'2021-09-16 16:15:25','2021-09-16 16:15:25',NULL,1,2,49,NULL,1,'revenue1','2021-05-01 00:00:00',NULL,NULL,NULL,0,0,1,1),
(52,'2021-09-16 16:16:28','2021-09-16 16:16:29',NULL,1,1,50,NULL,1,'test','2021-09-16 00:00:00',NULL,NULL,NULL,0,0,1,1),
(53,'2021-09-16 16:17:13','2021-09-16 16:17:13',NULL,1,1,51,NULL,1,'revenue1','2021-09-16 00:00:00',NULL,NULL,NULL,0,0,1,1),
(54,'2021-09-16 16:17:48','2021-09-16 16:17:49',NULL,1,1,52,NULL,1,'revenue1','2021-09-16 00:00:00',NULL,NULL,NULL,0,0,1,1);

/*Table structure for table `transaction_types` */

DROP TABLE IF EXISTS `transaction_types`;

CREATE TABLE `transaction_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `transaction_types_type_unique` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `transaction_types` */

insert  into `transaction_types`(`id`,`created_at`,`updated_at`,`deleted_at`,`type`) values 
(1,'2021-09-11 02:16:52','2021-09-11 02:16:52',NULL,'Withdrawal'),
(2,'2021-09-11 02:16:53','2021-09-11 02:16:53',NULL,'Deposit'),
(3,'2021-09-11 02:16:53','2021-09-11 02:16:53',NULL,'Transfer'),
(4,'2021-09-11 02:16:53','2021-09-11 02:16:53',NULL,'Opening balance'),
(5,'2021-09-11 02:16:53','2021-09-11 02:16:53',NULL,'Reconciliation'),
(6,'2021-09-11 02:16:53','2021-09-11 02:16:53',NULL,'Invalid');

/*Table structure for table `transactions` */

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `reconciled` tinyint(1) NOT NULL DEFAULT 0,
  `account_id` int(10) unsigned NOT NULL,
  `transaction_journal_id` int(10) unsigned NOT NULL,
  `description` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_currency_id` int(10) unsigned DEFAULT NULL,
  `amount` decimal(36,24) NOT NULL,
  `booking_number` int(11) DEFAULT NULL,
  `vat_percent` int(11) DEFAULT NULL,
  `vat` decimal(36,24) DEFAULT NULL,
  `netto` decimal(36,24) DEFAULT NULL,
  `foreign_amount` decimal(36,24) DEFAULT NULL,
  `foreign_currency_id` int(10) unsigned DEFAULT NULL,
  `identifier` smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `transactions_account_id_foreign` (`account_id`),
  KEY `transactions_transaction_journal_id_foreign` (`transaction_journal_id`),
  KEY `transactions_transaction_currency_id_foreign` (`transaction_currency_id`),
  KEY `transactions_foreign_currency_id_foreign` (`foreign_currency_id`),
  CONSTRAINT `transactions_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `transactions_foreign_currency_id_foreign` FOREIGN KEY (`foreign_currency_id`) REFERENCES `transaction_currencies` (`id`) ON DELETE SET NULL,
  CONSTRAINT `transactions_transaction_currency_id_foreign` FOREIGN KEY (`transaction_currency_id`) REFERENCES `transaction_currencies` (`id`) ON DELETE SET NULL,
  CONSTRAINT `transactions_transaction_journal_id_foreign` FOREIGN KEY (`transaction_journal_id`) REFERENCES `transaction_journals` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `transactions` */

insert  into `transactions`(`id`,`created_at`,`updated_at`,`deleted_at`,`reconciled`,`account_id`,`transaction_journal_id`,`description`,`transaction_currency_id`,`amount`,`booking_number`,`vat_percent`,`vat`,`netto`,`foreign_amount`,`foreign_currency_id`,`identifier`) values 
(1,'2021-09-12 06:32:44','2021-09-13 10:46:35','2021-09-13 10:46:35',0,2,1,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(2,'2021-09-12 06:32:44','2021-09-13 10:46:35','2021-09-13 10:46:35',0,3,1,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(3,'2021-09-12 06:39:44','2021-09-13 10:46:29','2021-09-13 10:46:29',0,2,2,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(4,'2021-09-12 06:39:44','2021-09-13 10:46:29','2021-09-13 10:46:29',0,3,2,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(5,'2021-09-12 06:42:22','2021-09-13 10:45:58','2021-09-13 10:45:58',0,2,3,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(6,'2021-09-12 06:42:22','2021-09-13 10:45:58','2021-09-13 10:45:58',0,1,3,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(7,'2021-09-13 08:49:46','2021-09-13 10:46:54','2021-09-13 10:46:54',0,7,4,NULL,1,-10.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(8,'2021-09-13 08:49:46','2021-09-13 10:46:54','2021-09-13 10:46:54',0,2,4,NULL,1,10.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(9,'2021-09-13 10:49:46','2021-09-13 10:49:46',NULL,0,7,5,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(10,'2021-09-13 10:49:46','2021-09-13 10:49:46',NULL,0,1,5,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(11,'2021-09-13 10:50:47','2021-09-13 10:50:47',NULL,0,7,6,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(12,'2021-09-13 10:50:47','2021-09-13 10:50:47',NULL,0,1,6,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(13,'2021-09-13 10:52:51','2021-09-13 10:52:51',NULL,0,7,7,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(14,'2021-09-13 10:52:51','2021-09-13 10:52:51',NULL,0,1,7,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(15,'2021-09-13 16:11:49','2021-09-13 16:11:49',NULL,0,7,8,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(16,'2021-09-13 16:11:49','2021-09-13 16:11:49',NULL,0,2,8,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(17,'2021-09-13 16:16:05','2021-09-16 15:29:36','2021-09-16 15:29:36',0,6,9,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(18,'2021-09-13 16:16:05','2021-09-16 15:29:36','2021-09-16 15:29:36',0,7,9,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(19,'2021-09-13 16:19:42','2021-09-16 15:29:36','2021-09-16 15:29:36',0,5,10,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(20,'2021-09-13 16:19:42','2021-09-16 15:29:36','2021-09-16 15:29:36',0,7,10,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(21,'2021-09-13 16:34:04','2021-09-16 15:29:36','2021-09-16 15:29:36',0,5,11,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(22,'2021-09-13 16:34:04','2021-09-16 15:29:36','2021-09-16 15:29:36',0,7,11,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(23,'2021-09-13 16:35:13','2021-09-16 15:29:36','2021-09-16 15:29:36',0,5,12,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(24,'2021-09-13 16:35:13','2021-09-16 15:29:36','2021-09-16 15:29:36',0,7,12,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(25,'2021-09-13 16:35:50','2021-09-16 15:29:35','2021-09-16 15:29:35',0,5,13,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(26,'2021-09-13 16:35:50','2021-09-16 15:29:36','2021-09-16 15:29:36',0,7,13,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(27,'2021-09-13 16:36:03','2021-09-16 15:29:35','2021-09-16 15:29:35',0,5,14,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(28,'2021-09-13 16:36:03','2021-09-16 15:29:35','2021-09-16 15:29:35',0,7,14,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(29,'2021-09-13 16:36:57','2021-09-16 15:29:35','2021-09-16 15:29:35',0,5,15,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(30,'2021-09-13 16:36:57','2021-09-16 15:29:35','2021-09-16 15:29:35',0,7,15,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(31,'2021-09-14 15:44:11','2021-09-14 15:44:11',NULL,0,5,16,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(32,'2021-09-14 15:44:11','2021-09-14 15:44:11',NULL,0,7,16,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(33,'2021-09-14 15:44:26','2021-09-14 15:44:26',NULL,0,5,17,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(34,'2021-09-14 15:44:26','2021-09-14 15:44:26',NULL,0,7,17,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(35,'2021-09-14 15:45:27','2021-09-14 15:45:27',NULL,0,5,18,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(36,'2021-09-14 15:45:27','2021-09-14 15:45:27',NULL,0,2,18,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(37,'2021-09-14 16:03:24','2021-09-16 15:29:35','2021-09-16 15:29:35',0,5,19,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(38,'2021-09-14 16:03:24','2021-09-16 15:29:35','2021-09-16 15:29:35',0,7,19,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(39,'2021-09-14 16:04:58','2021-09-16 15:29:35','2021-09-16 15:29:35',0,5,20,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(40,'2021-09-14 16:04:58','2021-09-16 15:29:35','2021-09-16 15:29:35',0,7,20,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(41,'2021-09-14 16:05:52','2021-09-16 15:29:35','2021-09-16 15:29:35',0,5,21,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(42,'2021-09-14 16:05:52','2021-09-16 15:29:35','2021-09-16 15:29:35',0,7,21,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(43,'2021-09-14 16:06:09','2021-09-16 15:29:35','2021-09-16 15:29:35',0,5,22,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(44,'2021-09-14 16:06:09','2021-09-16 15:29:35','2021-09-16 15:29:35',0,7,22,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(45,'2021-09-14 16:07:11','2021-09-16 15:29:34','2021-09-16 15:29:34',0,5,23,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(46,'2021-09-14 16:07:11','2021-09-16 15:29:34','2021-09-16 15:29:34',0,7,23,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(47,'2021-09-14 16:07:29','2021-09-16 15:29:34','2021-09-16 15:29:34',0,5,24,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(48,'2021-09-14 16:07:29','2021-09-16 15:29:34','2021-09-16 15:29:34',0,7,24,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(49,'2021-09-14 16:12:26','2021-09-16 15:29:34','2021-09-16 15:29:34',0,5,25,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(50,'2021-09-14 16:12:26','2021-09-16 15:29:34','2021-09-16 15:29:34',0,2,25,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(51,'2021-09-14 16:13:05','2021-09-14 16:13:05',NULL,0,5,26,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(52,'2021-09-14 16:13:05','2021-09-14 16:13:05',NULL,0,2,26,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(53,'2021-09-14 16:14:37','2021-09-14 16:14:37',NULL,0,5,27,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(54,'2021-09-14 16:14:37','2021-09-14 16:14:37',NULL,0,7,27,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(55,'2021-09-14 16:15:13','2021-09-14 16:15:13',NULL,0,5,28,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(56,'2021-09-14 16:15:13','2021-09-14 16:15:13',NULL,0,7,28,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(57,'2021-09-14 16:15:25','2021-09-14 16:15:25',NULL,0,5,29,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(58,'2021-09-14 16:15:25','2021-09-14 16:15:25',NULL,0,7,29,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(59,'2021-09-14 16:17:11','2021-09-14 16:17:11',NULL,0,5,30,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(60,'2021-09-14 16:17:11','2021-09-14 16:17:11',NULL,0,2,30,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(61,'2021-09-14 16:17:25','2021-09-14 16:17:25',NULL,0,5,31,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(62,'2021-09-14 16:17:25','2021-09-14 16:17:25',NULL,0,7,31,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(63,'2021-09-14 16:20:36','2021-09-16 15:29:34','2021-09-16 15:29:34',0,5,32,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(64,'2021-09-14 16:20:36','2021-09-16 15:29:34','2021-09-16 15:29:34',0,7,32,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(65,'2021-09-14 16:20:45','2021-09-16 15:29:33','2021-09-16 15:29:33',0,5,33,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(66,'2021-09-14 16:20:45','2021-09-16 15:29:33','2021-09-16 15:29:33',0,2,33,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(67,'2021-09-14 16:21:10','2021-09-14 16:21:10',NULL,0,5,34,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(68,'2021-09-14 16:21:10','2021-09-14 16:21:10',NULL,0,7,34,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(69,'2021-09-14 20:43:05','2021-09-14 20:43:05',NULL,0,5,35,NULL,1,-1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(70,'2021-09-14 20:43:05','2021-09-14 20:43:05',NULL,0,7,35,NULL,1,1.000000000000000000000000,NULL,NULL,NULL,NULL,NULL,NULL,0),
(71,'2021-09-16 15:09:00','2021-09-16 15:09:00',NULL,0,2,36,NULL,1,-100.000000000000000000000000,1,10,10.000000000000000000000000,90.000000000000000000000000,NULL,NULL,0),
(72,'2021-09-16 15:09:00','2021-09-16 15:09:00',NULL,0,3,36,NULL,1,100.000000000000000000000000,1,10,10.000000000000000000000000,90.000000000000000000000000,NULL,NULL,0),
(73,'2021-09-16 15:09:34','2021-09-16 15:29:33','2021-09-16 15:29:33',0,5,37,NULL,1,-200.000000000000000000000000,1,10,20.000000000000000000000000,180.000000000000000000000000,NULL,NULL,0),
(74,'2021-09-16 15:09:34','2021-09-16 15:29:33','2021-09-16 15:29:33',0,7,37,NULL,1,200.000000000000000000000000,1,10,20.000000000000000000000000,180.000000000000000000000000,NULL,NULL,0),
(75,'2021-09-16 15:13:22','2021-09-16 15:13:22',NULL,0,2,38,NULL,1,-100.000000000000000000000000,2,10,10.000000000000000000000000,90.000000000000000000000000,NULL,NULL,0),
(76,'2021-09-16 15:13:22','2021-09-16 15:13:22',NULL,0,7,38,NULL,1,100.000000000000000000000000,2,10,10.000000000000000000000000,90.000000000000000000000000,NULL,NULL,0),
(77,'2021-09-16 15:30:04','2021-09-16 15:30:04',NULL,0,2,39,NULL,1,-100.000000000000000000000000,3,10,10.000000000000000000000000,90.000000000000000000000000,NULL,NULL,0),
(78,'2021-09-16 15:30:04','2021-09-16 15:30:04',NULL,0,7,39,NULL,1,100.000000000000000000000000,3,10,10.000000000000000000000000,90.000000000000000000000000,NULL,NULL,0),
(79,'2021-09-16 16:02:16','2021-09-16 16:02:16',NULL,0,7,40,NULL,1,-1000.000000000000000000000000,4,21,210.000000000000000000000000,790.000000000000000000000000,NULL,NULL,0),
(80,'2021-09-16 16:02:16','2021-09-16 16:02:16',NULL,0,3,40,NULL,1,1000.000000000000000000000000,2,21,210.000000000000000000000000,790.000000000000000000000000,NULL,NULL,0),
(81,'2021-09-16 16:02:44','2021-09-16 16:02:44',NULL,0,1,41,NULL,1,-200.000000000000000000000000,1,10,20.000000000000000000000000,180.000000000000000000000000,NULL,NULL,0),
(82,'2021-09-16 16:02:44','2021-09-16 16:02:44',NULL,0,7,41,NULL,1,200.000000000000000000000000,5,10,20.000000000000000000000000,180.000000000000000000000000,NULL,NULL,0),
(83,'2021-09-16 16:09:54','2021-09-16 16:09:54',NULL,0,5,44,NULL,1,-1.000000000000000000000000,1,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(84,'2021-09-16 16:09:54','2021-09-16 16:09:54',NULL,0,7,44,NULL,1,1.000000000000000000000000,6,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(85,'2021-09-16 16:11:16','2021-09-16 16:11:24','2021-09-16 16:11:24',0,5,45,NULL,1,-1.000000000000000000000000,2,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(86,'2021-09-16 16:11:16','2021-09-16 16:11:24','2021-09-16 16:11:24',0,7,45,NULL,1,1.000000000000000000000000,7,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(87,'2021-09-16 16:11:50','2021-09-16 16:15:05','2021-09-16 16:15:05',0,5,46,NULL,1,-1.000000000000000000000000,2,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(88,'2021-09-16 16:11:50','2021-09-16 16:15:05','2021-09-16 16:15:05',0,7,46,NULL,1,1.000000000000000000000000,7,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(89,'2021-09-16 16:12:03','2021-09-16 16:12:03',NULL,0,5,47,NULL,1,-1.000000000000000000000000,3,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(90,'2021-09-16 16:12:03','2021-09-16 16:12:03',NULL,0,7,47,NULL,1,1.000000000000000000000000,8,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(91,'2021-09-16 16:12:42','2021-09-16 16:12:42',NULL,0,5,48,NULL,1,-1.000000000000000000000000,4,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(92,'2021-09-16 16:12:42','2021-09-16 16:12:42',NULL,0,2,48,NULL,1,1.000000000000000000000000,4,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(93,'2021-09-16 16:14:46','2021-09-16 16:14:46',NULL,0,5,49,NULL,1,-1.000000000000000000000000,5,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(94,'2021-09-16 16:14:46','2021-09-16 16:14:46',NULL,0,7,49,NULL,1,1.000000000000000000000000,9,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(95,'2021-09-16 16:14:52','2021-09-16 16:14:52',NULL,0,5,50,NULL,1,-1.000000000000000000000000,6,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(96,'2021-09-16 16:14:52','2021-09-16 16:14:52',NULL,0,7,50,NULL,1,1.000000000000000000000000,10,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(97,'2021-09-16 16:15:25','2021-09-16 16:15:25',NULL,0,5,51,NULL,1,-1.000000000000000000000000,7,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(98,'2021-09-16 16:15:25','2021-09-16 16:15:25',NULL,0,7,51,NULL,1,1.000000000000000000000000,11,0,0.000000000000000000000000,1.000000000000000000000000,NULL,NULL,0),
(99,'2021-09-16 16:16:28','2021-09-16 16:16:28',NULL,0,7,52,NULL,1,-100.000000000000000000000000,12,20,20.000000000000000000000000,80.000000000000000000000000,NULL,NULL,0),
(100,'2021-09-16 16:16:28','2021-09-16 16:16:28',NULL,0,3,52,NULL,1,100.000000000000000000000000,3,20,20.000000000000000000000000,80.000000000000000000000000,NULL,NULL,0),
(101,'2021-09-16 16:17:13','2021-09-16 16:17:13',NULL,0,7,53,NULL,1,-100.000000000000000000000000,13,21,21.000000000000000000000000,79.000000000000000000000000,NULL,NULL,0),
(102,'2021-09-16 16:17:13','2021-09-16 16:17:13',NULL,0,3,53,NULL,1,100.000000000000000000000000,4,21,21.000000000000000000000000,79.000000000000000000000000,NULL,NULL,0),
(103,'2021-09-16 16:17:48','2021-09-16 16:17:48',NULL,0,7,54,NULL,1,-200.000000000000000000000000,14,21,42.000000000000000000000000,158.000000000000000000000000,NULL,NULL,0),
(104,'2021-09-16 16:17:48','2021-09-16 16:17:48',NULL,0,1,54,NULL,1,200.000000000000000000000000,2,21,42.000000000000000000000000,158.000000000000000000000000,NULL,NULL,0);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `objectguid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `blocked` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `blocked_code` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mfa_secret` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`objectguid`,`created_at`,`updated_at`,`email`,`password`,`remember_token`,`reset`,`blocked`,`blocked_code`,`mfa_secret`) values 
(1,NULL,'2021-09-11 02:18:27','2021-09-11 02:18:27','philipp@intelligent-solutions.at','$2y$10$tqOqUITjebCVhVBzNilfXeEhHKxFYRoswKQo8uYhsvyQXlKJp7FDi','Ty9xwkJjKDVKCEYuNqikKWrDppeJn1eMpjRTlk5SHgZ45RPvzoIkiB8rKZSt',NULL,0,NULL,NULL);

/*Table structure for table `webhook_attempts` */

DROP TABLE IF EXISTS `webhook_attempts`;

CREATE TABLE `webhook_attempts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `webhook_message_id` int(10) unsigned NOT NULL,
  `status_code` smallint(5) unsigned NOT NULL DEFAULT 0,
  `logs` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `response` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `webhook_attempts_webhook_message_id_foreign` (`webhook_message_id`),
  CONSTRAINT `webhook_attempts_webhook_message_id_foreign` FOREIGN KEY (`webhook_message_id`) REFERENCES `webhook_messages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `webhook_attempts` */

/*Table structure for table `webhook_messages` */

DROP TABLE IF EXISTS `webhook_messages`;

CREATE TABLE `webhook_messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `sent` tinyint(1) NOT NULL DEFAULT 0,
  `errored` tinyint(1) NOT NULL DEFAULT 0,
  `webhook_id` int(10) unsigned NOT NULL,
  `uuid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webhook_messages_webhook_id_foreign` (`webhook_id`),
  CONSTRAINT `webhook_messages_webhook_id_foreign` FOREIGN KEY (`webhook_id`) REFERENCES `webhooks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `webhook_messages` */

/*Table structure for table `webhooks` */

DROP TABLE IF EXISTS `webhooks`;

CREATE TABLE `webhooks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `trigger` smallint(5) unsigned NOT NULL,
  `response` smallint(5) unsigned NOT NULL,
  `delivery` smallint(5) unsigned NOT NULL,
  `url` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `webhooks_user_id_title_unique` (`user_id`,`title`),
  KEY `webhooks_title_index` (`title`),
  KEY `webhooks_secret_index` (`secret`),
  CONSTRAINT `webhooks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `webhooks` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
