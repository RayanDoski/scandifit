-- Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS scandifit; -- Use 'scandifit' to match your dump's database name

-- Create a user and grant privileges to that database
-- This user will be used by your Flask backend to connect to the database.
-- Replace 'your_db_password' with a strong, secure password.
CREATE USER 'scandifit_user'@'%' IDENTIFIED BY 'Rayan12345';
GRANT ALL PRIVILEGES ON scandifit.* TO 'scandifit_user'@'%'; -- Grant on 'scandifit' database

-- Apply changes
FLUSH PRIVILEGES;

-- Switch to your newly created database (important for subsequent CREATE TABLE statements)
USE scandifit;

-- The rest of your scandifit.sql dump content goes here,
-- starting from '-- MySQL dump 10.13 ...'

-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: scandifit
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adress`
--

DROP TABLE IF EXISTS `adress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adress` (
  `uid` int DEFAULT NULL,
  `gatuadress` varchar(200) DEFAULT NULL,
  `postnummer` varchar(100) DEFAULT NULL,
  `stad` varchar(100) DEFAULT NULL,
  KEY `uid` (`uid`),
  CONSTRAINT `adress_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`),
  CONSTRAINT `adress_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adress`
--

LOCK TABLES `adress` WRITE;
/*!40000 ALTER TABLE `adress` DISABLE KEYS */;
INSERT INTO `adress` VALUES (1,'Magdalenagatan 131','21467','Lidköping'),(13,'albinstogatan 41','21467','Malmö'),(20,'magdalenagatan 131','21467','malmö'),(21,'albinstogatan 41','21467','malmö'),(19,'engata 13','21893','Stockholm'),(2,'Albinsrogatan 41 41','21467','Malmö'),(23,'Albinsrogatan 41','21467','Malmö');
/*!40000 ALTER TABLE `adress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dietarySupplementPreferences`
--

DROP TABLE IF EXISTS `dietarySupplementPreferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dietarySupplementPreferences` (
  `uid` int NOT NULL,
  `SupplementPreferences` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dietarySupplementPreferences`
--

LOCK TABLES `dietarySupplementPreferences` WRITE;
/*!40000 ALTER TABLE `dietarySupplementPreferences` DISABLE KEYS */;
INSERT INTO `dietarySupplementPreferences` VALUES (1,'omega'),(27,'Magnesium'),(28,'multivitamin');
/*!40000 ALTER TABLE `dietarySupplementPreferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dietplan`
--

DROP TABLE IF EXISTS `dietplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dietplan` (
  `uid` int DEFAULT NULL,
  `goal` varchar(100) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `height` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `target_weight` int DEFAULT NULL,
  `activity_level` varchar(100) DEFAULT NULL,
  `training_session_per_week` int DEFAULT NULL,
  `dietary_preferences` varchar(100) DEFAULT NULL,
  `current_daily_water_intake` varchar(50) DEFAULT NULL,
  `sugar_intake` varchar(100) DEFAULT NULL,
  KEY `uid` (`uid`),
  CONSTRAINT `dietplan_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dietplan`
--

LOCK TABLES `dietplan` WRITE;
/*!40000 ALTER TABLE `dietplan` DISABLE KEYS */;
INSERT INTO `dietplan` VALUES (1,'maintenance',19,'man',182,83,90,'4',4,'none','3','sällan'),(23,'maintenance',19,'man',182,81,85,'2',7,'none','3','ett par gånger i veckan');
/*!40000 ALTER TABLE `dietplan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exklusiv`
--

DROP TABLE IF EXISTS `exklusiv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exklusiv` (
  `uid` int DEFAULT NULL,
  `exklusiv` tinyint DEFAULT NULL,
  KEY `uid` (`uid`),
  CONSTRAINT `exklusiv_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`),
  CONSTRAINT `exklusiv_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exklusiv`
--

LOCK TABLES `exklusiv` WRITE;
/*!40000 ALTER TABLE `exklusiv` DISABLE KEYS */;
INSERT INTO `exklusiv` VALUES (1,1),(17,1),(17,1),(17,1),(NULL,1),(NULL,1),(20,1),(22,1),(19,1),(2,1),(23,1);
/*!40000 ALTER TABLE `exklusiv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `rid` int DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  KEY `rid` (`rid`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `review` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pid` int DEFAULT NULL,
  `amount` varchar(100) DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phonenumber`
--

DROP TABLE IF EXISTS `phonenumber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phonenumber` (
  `uid` int DEFAULT NULL,
  `phonenumber` varchar(50) DEFAULT NULL,
  KEY `uid` (`uid`),
  CONSTRAINT `phonenumber_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`),
  CONSTRAINT `phonenumber_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phonenumber`
--

LOCK TABLES `phonenumber` WRITE;
/*!40000 ALTER TABLE `phonenumber` DISABLE KEYS */;
INSERT INTO `phonenumber` VALUES (1,'700252258'),(13,'070025888'),(17,''),(18,'9238893489342'),(NULL,'+46700252258'),(20,'+46700252258'),(21,'0700252258'),(19,'+46700252258'),(2,'+46700252258'),(23,'0700252258'),(24,'0700252258'),(25,'HEJ'),(26,'0700252258'),(27,'+553121286800'),(28,'493030398600');
/*!40000 ALTER TABLE `phonenumber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `sub_price` decimal(10,2) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Opti-Men Multivitamin\n','Multivivitamin Pro for better health and condition',299.00,199.00,'opti-men-multivitamin.jpg'),(2,'Scandifit Exklusiv','Upgradera Din träning Och Få Tillgång Till Alla Saker',4999.00,NULL,'scandifit-exklusiv.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `stars` int DEFAULT NULL,
  `rubrik` varchar(300) DEFAULT NULL,
  `review_text` varchar(1000) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `pid` int DEFAULT NULL,
  `helpful` int DEFAULT NULL,
  `verifierad` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'Rayan Doski',5,'Fantastisk Produkt','Fantastisk Produkt.. Fantastisk Produkt.. Fantastisk Produkt.. Fantastisk Produkt.. Fantastisk Produkt..\nFantastisk Produkt.. Fantastisk Produkt.. Fantastisk Produkt.. Fantastisk Produkt.. Fantastisk Produkt.. Fantastisk Produkt..','2023-10-30 08:20:45',1,80,'Inte Verifierad'),(2,'Razvan',4,'Fantastisk produkt','Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt','2023-10-30 08:27:41',1,42,'Inte Verifierad'),(3,'Razvan',2,'Fantastisk produkt','Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt','2023-10-30 08:27:42',1,18,'Inte Verifierad'),(4,'Razvan',5,'Fantastisk produkt','Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt','2023-10-30 08:27:44',1,4,'Inte Verifierad'),(5,'Razvan',3,'Fantastisk produkt','Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt','2023-10-30 08:27:44',1,2,'Inte Verifierad'),(6,'Razvan',1,'Fantastisk produkt','Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt','2023-10-30 08:27:45',1,4,'Inte Verifierad'),(7,'Razvan',5,'Fantastisk produkt','Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt','2023-10-30 08:27:45',1,6,'Inte Verifierad'),(8,'Razvan',2,'Fantastisk produkt','Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt','2023-10-30 08:27:46',1,4,'Inte Verifierad'),(9,'Razvan',5,'Fantastisk produkt','Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt','2023-10-30 08:27:46',1,3,'Inte Verifierad'),(10,'Rayan',3,'Fantastisk produkt','Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt Fantastisk produkt','2023-10-30 08:27:46',1,5,'Inte Verifierad'),(11,'Reyan Doski',4,'Ny Recention','Test recention,.. Test recention,.. Test recention,.. Test recention,.. Test recention,.. Test recention,.. Test recention,.. Test recention,.. Test recention,.. Test recention,.. Test recention,.. Test recention,..','2023-11-01 07:00:59',1,2,'Inte Verifierad'),(12,'RAYAN.D',5,'Ny recention','Detta är en ny recention','2023-11-01 19:13:13',1,2,'Inte Verifierad'),(13,'NEw',1,'NY recention med bild','NY recention med bild, NY recention med bild, NY recention med bild, NY recention med bild, NY recention med bild, NY recention med bild','2023-11-02 10:37:38',1,1,'Inte Verifierad'),(14,'awdawd',4,'amda','awdawd','2023-11-02 10:43:33',1,3,'Inte Verifierad'),(15,'wd kawd',4,'awdawg','afwefwköjf qj dd wdajkw dakjw dkawdkja wd','2023-11-02 10:45:28',1,7,'Inte Verifierad'),(16,'awmdomaw',1,'awmdiawda','wdawdo','2023-11-02 10:59:08',1,4,'Inte Verifierad'),(17,'TOML',4,'wdoawd','aw diai owd oamwdo iamwdoi amwo aw diai owd oamwdo iamwdoi amwo   aw diai owd oamwdo iamwdoi amwoaw diai owd oamwdo iamwdoi amwo  aw diai owd oamwdo iamwdoi amwo  aw diai owd oamwdo iamwdoi amwo  aw diai owd oamwdo iamwdoi amwo  ','2023-11-02 13:04:55',1,6,'Inte Verifierad'),(18,'Fantstisk',5,'Fantstisk','Fantstisk Fantstisk Fantstisk Fantstisk Fantstisk Fantstisk Fantstisk Fantstisk Fantstisk Fantstisk Fantstisk Fantstisk Fantstisk Fantstisk. Fantstisk Fantstisk v Fantstisk v Fantstisk Fantstisk Fantstisk Fantstisk Fantstisk v Fantstisk v','2023-11-02 13:34:26',1,3,'Inte Verifierad'),(19,'Seventh',4,'Ny Recention','Ny RecentionNy Recention,Ny Recention Ny Recention, Ny Recention,Ny Recention, Ny Recention, Ny Recention, Ny Recention. Ny Recention','2023-11-02 13:38:20',1,4,'Inte Verifierad'),(20,'Fifth',5,'Fifth Try','Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try Fifth Try','2023-11-02 17:46:46',1,3,'Inte Verifierad'),(21,'awdawdawd',1,'awdawd','awdawd','2023-11-02 18:15:49',1,1,'Inte Verifierad'),(22,'',1,'awdawd','','2023-11-02 18:17:07',1,0,'Inte Verifierad'),(23,'Grow Up',1,'Om detta Funkar :)','Om detta Funkar :), Om detta Funkar :), Om detta Funkar :)Om detta Funkar :), Om detta Funkar :), , Om detta Funkar :)','2023-12-16 21:38:39',1,1,'Inte Verifierad'),(24,'TEST',1,'Nytt test för stars','Nytt test för stars, Nytt test för stars, Nytt test för stars, Nytt test för stars, Nytt test för stars, Nytt test för stars, Nytt test för stars','2023-12-16 21:47:56',1,0,'Inte Verifierad'),(25,'HAHAHHAHA',1,'Nytt Test','NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, NYTT, ','2023-12-16 21:49:05',1,0,'Inte Verifierad'),(26,'awdawd',1,'Ny Recention','adawdawd','2023-12-16 21:50:12',1,0,'Inte Verifierad'),(27,'awdawd',1,'awdawda','wdawdawd','2023-12-16 21:50:22',1,0,'Inte Verifierad'),(28,'awdawd',5,'Ny Recention','awdawd','2023-12-16 21:52:38',1,1,'Inte Verifierad'),(29,'LAST ',4,'Last Test :)','Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) Last Test :) ','2023-12-16 21:53:18',1,1,'Inte Verifierad'),(30,'HEJ',5,'WOW','THis is anwdaiwdaowdnauwd','2024-01-20 21:36:38',1,1,'Inte Verifierad'),(31,'AM l SI........',5,'Ny Review','Måste testa en sak :)))))','2024-02-01 11:48:30',1,1,'Inte Verifierad');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sleepplan`
--

DROP TABLE IF EXISTS `sleepplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sleepplan` (
  `uid` int DEFAULT NULL,
  `age` int NOT NULL,
  `weight` int DEFAULT NULL,
  `wake_up_time` varchar(10) DEFAULT NULL,
  `time_to_sleep` int DEFAULT NULL,
  `how_much_sleep_do_you_get_on_avg` varchar(10) DEFAULT NULL,
  `daily_mood_and_energy` varchar(50) DEFAULT NULL,
  `caffeine_in_the_afternoon` varchar(50) DEFAULT NULL,
  `sleep_disturbances_or_symptoms` varchar(50) DEFAULT NULL,
  KEY `uid` (`uid`),
  CONSTRAINT `sleepplan_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sleepplan`
--

LOCK TABLES `sleepplan` WRITE;
/*!40000 ALTER TABLE `sleepplan` DISABLE KEYS */;
INSERT INTO `sleepplan` VALUES (1,19,84,'08:00',15,'3-4h','Energisk och positiv','Ofta','Dags trötthet'),(2,22,80,'06:00',25,'3-4h','Ostadig energi, men positivt humör','Ofta','Svårigheter att somna'),(23,19,81,'05:00',15,'7-8h','Jämnt humör och energi','Aldrig','Inget');
/*!40000 ALTER TABLE `sleepplan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainingplan`
--

DROP TABLE IF EXISTS `trainingplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainingplan` (
  `uid` int DEFAULT NULL,
  `age` varchar(200) DEFAULT NULL,
  `goal` varchar(200) DEFAULT NULL,
  `body_type` varchar(200) DEFAULT NULL,
  `problem_area` varchar(200) DEFAULT NULL,
  `height` varchar(100) DEFAULT NULL,
  `vikt` varchar(100) DEFAULT NULL,
  `malvikt` varchar(100) DEFAULT NULL,
  `gng_per_vecka` varchar(100) DEFAULT NULL,
  `sjukdom` varchar(100) DEFAULT NULL,
  `home_or_gym` varchar(100) DEFAULT NULL,
  `utrustning` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainingplan`
--

LOCK TABLES `trainingplan` WRITE;
/*!40000 ALTER TABLE `trainingplan` DISABLE KEYS */;
INSERT INTO `trainingplan` VALUES (1,'23','ned i vikt','endomorph','stomach','182','80','85','5','inget','hemma','full utrustning'),(11,'30-39','muskelmassa','ectomorph','chest','182','85','83','6','inget','hemma','grundläggande utrustning'),(13,'18-29','muskelmassa','endomorph','stomach','182','80','85','6','inget','gym','full utrustning'),(1,'23','ned i vikt','endomorph','stomach','182','80','85','5','inget','hemma','full utrustning'),(17,'50+','förbättra din fysik','mesomorph','legs','100','10','20','7','inget','gym','full utrustning'),(18,'50+','muskelmassa','mesomorph','chest','184','80','50','6','skolosis','gym','grundläggande utrustning'),(23,'18-29','förbättra din fysik','endomorph','stomach','182','81','85','7','inget','gym','grundläggande utrustning'),(25,'40-49','muskelmassa','mesomorph','arms','182','80','90','6','spinal','hemma','grundläggande utrustning'),(26,'18-29','ned i vikt','mesomorph','chest','182','80','85','4','hypertoni','gym','grundläggande utrustning'),(28,'20','muskelmassa','ectomorph','arms','123','43','43','3','skolosis',NULL,'full utrustning');
/*!40000 ALTER TABLE `trainingplan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `namn` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `Password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Reyan doski','rayan.d15@outlook.com','04'),(2,'stewie griffin','stew@gmail.com','04'),(3,'razvan doski','razo@gmail.com','04'),(4,'Nytt Konto','ny@konto.se','04'),(13,'Rahoan','rahoan@gmail.com','10'),(17,'bellamy blake','bel@gmail.com','100'),(18,'chzhhh ah h a','ifjse@gmail.com','josfe'),(19,'John Murphy','Murphy@gmail.com','Murphy123'),(20,'COfffE','coffe@gmail.com','04'),(21,'sql lärare','rayan@gmail.com','sql'),(22,'hundra','hundra@gmail.com','hundra'),(23,'mustafa mohammed','mustibrushan@gmail.com','sfwhavsv1'),(24,'rayan doski','Rayan.d16@outlook.com','123'),(25,'rayan doski','rdoski405@gmail.com','HEJ2'),(26,'Phil Dunphy','phil@gmail.com','04'),(27,'João Souza Silva','teste@exemplo.us','01'),(28,'Gottfried Wilhelm Leibniz','test@beispiel.de','123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_order`
--

DROP TABLE IF EXISTS `user_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_order` (
  `uid` int DEFAULT NULL,
  `oid` int DEFAULT NULL,
  KEY `uid` (`uid`),
  KEY `oid` (`oid`),
  CONSTRAINT `user_order_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`),
  CONSTRAINT `user_order_ibfk_2` FOREIGN KEY (`oid`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_order`
--

LOCK TABLES `user_order` WRITE;
/*!40000 ALTER TABLE `user_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout`
--

DROP TABLE IF EXISTS `workout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `target_muscle` varchar(200) DEFAULT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout`
--

LOCK TABLES `workout` WRITE;
/*!40000 ALTER TABLE `workout` DISABLE KEYS */;
INSERT INTO `workout` VALUES (1,'tricep curls','triceps','one.jpg','take it backa nd then puch and try to puch with power becouse you need strength, bla bla bla'),(2,'Diamond push-up\n','chest','diamond-pushups.jpg','Gå på händer och knän, med händerna nära varandra och tummarna och pekfingrarna bildar en diamantform. Dra ut fötterna bakåt och räta ut kroppen så att din kroppsvikt stöds av dina händer och framfötter. Håll armbågarna instoppade i kroppen och kroppen rak och stel, andas in medan du sänker bröstet till golvet. Andas ut när du sträcker ut armbågarna och tryck tillbaka kroppen till startpositionen. Upprepa för det föreskrivna antalet repetitioner.\n'),(3,'Push up ','chest','pushups.jpg','Gå på händer och knän, med armarna placerade lite bredare än axelbredden. Dra ut fötterna bakåt och räta ut kroppen. Håll kroppen rak och armbågarna lätt instoppade, andas in medan du sänker bröstet till golvet genom att böja armbågarna. Andas ut när du vänder på rörelsen och tryck tillbaka din kropp till startpositionen. Upprepa.\n'),(4,'Close-grip push-up\n','chest','closegrip-pushups.jpg','Gå på alla fyra med händerna placerade antingen direkt under axlarna eller närmare varandra. Dra ut fötterna bakåt och räta ut kroppen. Håll kroppen rak och armbågarna instoppade, andas in medan du sänker bröstet på händerna. Andas ut när du trycker tillbaka din kropp till startpositionen. Upprepa.\n\n'),(5,'Machine fly\n','chest','Machine-Fly.jpg','Sitt på flugmaskinen med ryggen stadigt pressad mot ryggstödet. Ta tag i spakarna i axelhöjd. Invändigt rotera dina axlar så att dina handleder, armbågar och axlar är i nivå. Håll armbågarna lätt böjda och andas ut medan du trycker ihop spakarna. Andas in medan du vänder på rörelsen tills du känner en mild sträckning i bröstet eller axlarna. Upprepa.'),(6,'Triceps dip\n','triceps','triceps-dip.jpg','Montera de bör-bredda dipstängerna och räta ut dina armar så att dina ben är upphängda från marken. Håll armbågarna instoppade och kroppen upprätt, sänk långsamt ner kroppen tills armbågarna bildar en 90-graders vinkel eller du känner en liten sträckning i axlarna. Glöm inte att andas in. Andas ut när du trycker tillbaka din kropp till startpositionen. Upprepa för det rekommenderade antalet repetitioner.'),(7,'Bodyweight triceps extension\n','triceps','bodyweight-triceps.jpg','Gå på händer och knän. Vila armbågarna och handflatorna på golvet, axelbrett isär. Dra ut fötterna bakåt och räta ut kroppen så att din kroppsvikt stöds av underarmarna och framsidan av dina fötter. Dina händer ska vara ungefär i nivå med ditt ansikte. Håll armbågarna instoppade i kroppen och kroppen rak och stel, andas ut medan du trycker upp kroppen från golvet genom att sträcka ut armbågarna. Andas in medan du sakta sänker ner armbågarna mot golvet genom att vända rörelsen. Upprepa kroppsviktstricepsförlängningen för det föreskrivna antalet repetitioner.'),(8,'Barbell bench press\n','chest','Barbell-Bench-Press.jpg','Ligg liggande (på rygg) på en platt bänk. Sprid benen, ta tillbaka fötterna och ställ dem stadigt på marken. Antingen tårna eller hälarna ska planteras på golvet. Böj ryggen. Demontera skivstången med ett grepp som är lite över axelbrett isär. Medan du håller i skivstången drar du tillbaka (tryck ihop) dina skulderblad och rätar ut handlederna. Andas in medan du sänker skivstången mot bröstet och håll armbågarna instoppade i en 45-graders vinkel. Andas ut när du trycker tillbaka skivstången till startpositionen. Upprepa.'),(9,'Triceps rope push-down\n','triceps','Triceps-Rope-Pushdown.jpg','Stå under linskivan och ta tag i vardera änden av repfästet med ett neutralt grepp (handflatorna vända mot varandra). Dra ner armbågarna åt sidorna och luta dig lite framåt vid höfterna, håll ryggen rak. Andas ut när du sträcker ut armbågarna och trycker repet hela vägen ner. När dina armar sträcker sig, vrid handlederna så att handflatorna är vända nedåt i slutet av rörelsen. Andas in när du vänder på rörelsen och återställ repet till startpositionen. Upprepa.'),(10,'Seated dumbbell overhead triceps extension\n','triceps','seated-dumbbell-overhead-triceps-extension.jpg','Håll en hantel, sitt på en platt bänk eller stol och vila hanteln på sidan på ett knä. Ta tag i basen av hantelstången med båda händerna, en hand över den andra. Sparka upp hanteln med ditt knä och vila den andra änden av hanteln på din axel. Justera ditt grepp så att dina händer gör en hjärtform under tallriken. Lyft hanteln runt axeln och håll den bakom ryggen, med överarmarna vertikala och armbågarna böjda. Håll armbågarna nära huvudet och överarmarna vertikala, andas ut medan du höjer hanteln genom att sträcka ut armbågarna. Andas in medan du sänker hanteln till startpositionen genom att böja armbågarna. Upprepa.'),(11,'Cross-arm push-up\n','triceps','Cross-arm-push-up.jpg','Kom in i en hög planka eller armhävningsposition. Vrid armarna så att fingrarna är vända mot varandra. Håll armarna invändigt roterade, korsa händerna, låt en handled vara framför den andra. Håll din kropp rak, andas in medan du sänker bröstet mot golvet. Andas ut när du trycker tillbaka bröstet till startpositionen. Upprepa för önskat antal recept.'),(12,'EZ bar wide-grip upright row\n','shoulders','EZ-bar-wide-grip-upright-row.jpg','Stå högt och håll en EZ-stång framför dina lår med ett axelbrett överhandsgrepp. Andas ut medan du drar stången uppåt tills den är i nivå med din nedre eller mellersta bröstet. Dra inte stången högre.\nHåll för en räkning av två. Andas in medan du sakta sänker stången tillbaka till startpositionen. Upprepa för det föreskrivna antalet repetitioner.'),(13,'Seated dumbbell front raise\n','shoulders','Seated-Dumbbell-Front-Raise.jpg','Håll en hantel i varje hand, sitt på en stol eller bänk och låt hantlarna hänga rakt ner vid dina sidor. Håll armbågarna väldigt lätt böjda, andas ut medan du höjer hantlarna framåt och uppåt i en halvcirkelformad rörelse tills armarna stiger lite över horisontalplanet. Håll för en räkning av två. Andas in medan du sänker hantlarna på ett kontrollerat sätt till startpositionen. Upprepa för det föreskrivna antalet repetitioner.'),(14,'Seated reverse dumbbell fly\n','shoulders','seated-bent-over-lateral-raise.jpg','Håll ett par hantlar och sitt på änden av en bänk.\nLuta dig framåt tills överkroppen är så nära horisontell som möjligt och låt armarna hänga ner vid dina fötter. Handflatorna ska vara vända mot varandra (neutralt grepp). Håll armarna lätt böjda och armbågarna vinkelräta mot bålen, andas ut medan du höjer armarna ut åt sidorna tills armbågarna är axelhöjd. Håll för en räkning av två. Andas in medan du sänker armarna till startpositionen på ett kontrollerat sätt. Upprepa.'),(15,'Barbell shoulder press\n','shoulders','barbell-military-press.jpg','Stå med fötterna axelbrett isär, håll en skivstång med ett pronerat (överhands) grepp i övre brösthöjd. Andas ut när du trycker skivstången rakt uppåt. På toppen av rörelsen, ryck på axlarna för att höja skivstången ännu högre. Andas in medan du vänder på rörelserna och sänk skivstången till startpositionen på ett kontrollerat sätt. Upprepa.'),(16,'Band shoulder press\n','shoulders','Band-shoulder-press.jpg','Stå med mitten av motståndsbandet under fötterna och greppa handtagen med ett underhandsgrepp (supinerat). Böj armbågarna för att föra händerna till sidorna av dina axlar. Låt kablarna sträcka sig bakom dina axlar. Din nacke och rygg ska vara i neutralt läge, armbågarna ut åt sidorna och handflatorna vända fram. Håll ryggen neutral och armbågarna ut åt sidorna, andas ut medan du rätar ut armbågarna, tryck uppåt mot bandet. Håll för en räkning av två. Andas in när du sakta återgår till startpositionen. Upprepa för önskat antal repetitioner.'),(17,'Band front raise\n','shoulders','Band-front-raise.jpg','Stå med mitten av bandet under fötterna och händerna greppar handtagen med ett överhandsgrepp. Håll armbågarna lätt böjda, andas ut medan du höjer handtagen framåt och uppåt tills de är något över axelhöjd. Håll för en räkning av två. Andas in när du vänder på rörelsen och återgår till startpositionen. Upprepa för önskat antal repetitioner.'),(18,'Barbell deadlift\n','back','Barbell-Deadlift.jpg','Stand with your feet under the barbell, hip-width apart. When you look down, the barbell should run halfway over your feet. Bend down and grasp the barbell with a shoulder-width grip. Take a deep breath. Keeping your torso upright and your back and arms straight, stand and pull the bar up in front of your legs, driving with your legs. At the top of the movement, squeeze your glutes, pull your shoulders back, and exhale. To return the bar to the floor, push your butt backwards and lower the bar down the front of your legs, keeping your back straight. Once the bar passes your knees, bend your knees and lower the bar to the floor.'),(19,'Pull-up\n','back','pull-up.jpg','Grasp the bar with a wider-than-shoulder-width pronated (overhand) grip. Hang with your arms and shoulders fully stretched. Exhale as you pull your body up until your chin rises above the bar. Hold for a count of two and squeeze your back muscles. Inhale as you lower your body until your arms and shoulders are fully stretched. Repeat.'),(20,'Superman','back','superman-exercise.jpg','Lie prone (face down) on a mat with your legs straight and your arms extended straight in front of you. Gently raise your arms, upper torso, and legs off the mat. Hold for a count of two. Gently return them to the starting position. Repeat.'),(21,'Close neutral-grip lat pull-down\n','back','Cable-close-grip-pull-down.jpg','Sit on the lat pull-down machine with your thighs positioned snugly under the supports. Grasp the double-row V handle. Your arms and shoulders should be fully extended upwards. Exhale as you pull the handle down until it touches your upper chest. Squeeze your back muscles and hold for a count of two. Inhale as you return the handle to the starting position. Repeat.'),(22,'Bent-over barbell row\n','back','Bent-over-barbell-row.jpg','Stand over a loaded barbell, with the bar lining up with your toes.\nBend at the hips and a little at the knees and grasp the barbell with hands a little wider than shoulder width apart. Your back should be straight and close to horizontal. Exhale as you pull the barbell up to your waist. Hold for a count of two and squeeze your back muscles.\nInhale as you lower the barbell in a controlled manner until it nearly touches the floor. Repeat.'),(23,'Barbell curl\n','biceps','barbell-curl.jpg','Stå upp rakt med en skivstång med ett axelbrett supinerat grepp (handflatorna vända uppåt). Dina armar ska vara nästan helt utsträckta och skivstången ska vila mot dina lår. Håll kroppen stilla, andas ut medan du rullar upp skivstången mot axlarna tills armbågarna är helt böjda. När dina armbågar är helt böjda, låt dina armbågar röra sig lite framåt (axelböjning), bara tills dina underarmar är vertikala. Håll en räkning till två och kläm dina biceps. Andas in medan du sakta sänker skivstången till startpositionen. Upprepa för det rekommenderade antalet reps.'),(24,'Dumbbell curl\n','biceps','Dumbbell-Alternate-Biceps-Curl.jpg','Stå med ett par hantlar vid dina sidor med ett neutralt grepp (handflatorna vända inåt). Dra axlarna bakåt. Andas ut medan du långsamt rullar en hantel upp mot din axel. När hanteln reser sig, supinera din underarm gradvis så att handflatan är vänd mot din axel vid toppen av krullen. När din armbåge är helt böjd, låt din armbåge röra sig lite framåt (axelböjning), bara tills din underarm är vertikal. Håll en räkning till två och kläm dina biceps. Andas in medan du sakta vänder på rörelsen med halva hastigheten och återställer hanteln till startpositionen. Upprepa samma åtgärd med den motsatta armen och sedan omväxlande repetitioner.'),(25,'Dumbbell hammer curl\n','biceps','Dumbbell-Hammer-Curl.jpg','Stå med en hantel i varje hand med ett neutralt (alias hammare) grepp (handflatorna vända inåt). Håll armbågen vid din sida, andas ut medan du rullar en hantel upp mot axeln tills din biceps är helt sammandragen. Håll en räkning till två och kläm dina biceps.\nAndas in medan du sakta sänker hanteln till startpositionen.\nUpprepa med din motsatta arm. Fortsätt att alternera med armarna.'),(26,'EZ bar reverse curl\n','biceps','EZ-bar-reverse-curl.jpg','Stå och håll en EZ curl bar med ett axelbrett pronerat (överhands) grepp. Dina knän ska vara lätt böjda, dina armar ska vara nästan helt utsträckta och stången ska vila mot dina lår. Håll armbågarna mot sidorna, andas ut när du böjer armbågarna och höj EZ curl-stången mot dina axlar tills dina underarmar är vertikala. Håll en räkning till två och kläm dina biceps. Andas in medan du sänker EZ curl-stången till startpositionen på ett kontrollerat sätt. Upprepa.'),(27,'Biceps leg curl\n','biceps','Biceps-leg-curl.jpg','Sitt på kanten av en stol så att bara skinkorna vilar på sätet. Dina knän ska vara böjda. Med din högra hand, greppa ditt vänstra ben under knät. Håll ditt vänstra ben helt avslappnat, andas ut medan du lyfter det från golvet med armen genom att böja armbågen. Håll en räkning till två och kläm dina biceps. Andas in när du sänker benet till startpositionen. Upprepa för det föreskrivna antalet repetitioner. Upprepa övningen med vänster arm.'),(28,'Crunch\n','stomach','Crunch-resized.jpg','Ligg liggande (på rygg) med böjda ben och fötterna platt på marken. Placera händerna lätt antingen bakom eller vid sidorna av huvudet, håll armbågarna utanför. Håll nedre delen av ryggen platt på golvet, höj huvudet och axlarna några centimeter från marken genom att böja magen. Andas ut när du gör det. Håll den kontrakterade positionen för två. Andas in när du sänker huvudet och axlarna till startpositionen. Upprepa.'),(29,'Seated barbell twist\n','stomach','seated-barbell-twist.jpg','Sitt på en bänk med en lätt skivstång framför dina fötter. Ta upp skivstången med ett brett överhandsgrepp, höj den över huvudet och placera den på baksidan av dina axlar. Håll ryggen rak, andas ut medan du vrider bålen åt sidan tills du känner en mild sträckning i midjan. Andas in när du vänder på rörelsen och vrid tillbaka bålen till startpositionen. Andas ut medan du sakta vrider bålen till motsatt sida. Andas in när du vänder på rörelsen och vrid tillbaka bålen till startpositionen. Fortsätt att upprepa och alternera sidan som du vrider dig till.'),(30,'Captain’s chair leg and hip raise\n','stomach','captains-chair-leg-and-hip-raise.jpg','Sätt dig i kaptensstolen med underarmarna på dynorna, händerna på handtagen, ryggen mot ryggstödet och benen hängande rakt nedåt. Pressa nedre delen av ryggen mot ryggstödet. Håll ihop fötterna, andas ut medan du höjer knäna mot bröstet genom att böja knäna, höfterna och midjan. Försök att hålla slutpositionen två gånger. Andas in medan du sänker fötterna till startpositionen på ett kontrollerat sätt. Upprepa.'),(31,'Captain’s chair straight leg raise\n','stomach','Captains-chair-straight-leg-raise.jpg','Klättra upp i kaptensstolen med underarmarna vilande platt på parallellstängerna och ryggen tryckande mot ryggstödet. Håll knäna raka och nedre delen av ryggen pressad mot ryggstödet, andas ut medan du böjer dina höfter för att höja båda benen tills de är parallella med golvet. Håll för en räkning av två. Andas in medan du sakta sänker benen tillbaka till startpositionen. Upprepa för det föreskrivna antalet repetitioner.'),(32,'Crunch with leg raise\n','stomach','Crunch-with-leg-raise.jpg','Ligg med ryggen i golvet, med händerna bakom huvudet och böjda knän. Placera fotsulorna på golvet och håll nedre delen av ryggen pressad mot golvet. Håll nacken neutral, andas ut när du böjer midjan och höfterna, för bröstet och framsidan av låren (quads) närmare varandra. Håll för en räkning av två. Andas in medan du sakta vänder på rörelsen för att återgå till startpositionen. Upprepa för önskat antal repetitioner.'),(33,'Extra decline sit-up\n','stomach','Extra-decline-sit-up.jpg','Haka fast fötterna under trampdynorna och lägg dig på rygg på en avböjd bänk. Pressa nedre delen av ryggen mot bänken och sträck antingen armarna upp i luften, korsa dem över bröstet eller placera dem bakom huvudet. Andas ut medan du sakta höjer din bål tills den är upprätt. Andas in när du vänder på rörelsen och återgår till startpositionen. Utför det föreskrivna antalet repetitioner.'),(34,'Incline leg press\n','legs','Sled-45-degree-Leg-Press.jpg','Sätt dig i benpressmaskinen. Se till att din rygg pressas stadigt mot ryggstödet. Placera fötterna höftbrett isär på plattformen. Släpp säkerhetsstängerna, ta tag i sidohandtagen för stöd och sträck ut benen utan att låsa knäna. Din bål och ben bör göra en 90-graders vinkel. Andas in när du böjer benen och sänker plattformen tills knäna är nästan helt böjda. Kör med hälarna, tryck tillbaka plattformen till startpositionen när du andas ut. Upprepa. När du är klar, lås säkerhetsbygeln ordentligt. Annars kan plattformen glida ner på dina ben!'),(35,'Machine seated calf raise\n','legs','Lever-Seated-Calf-Raise-plate-loaded.jpg','Sätt dig i vadhöjningsmaskinen och placera framfötterna på fotplattformarna, med hälarna utskjutande. Placera låren under spakkuddarna och justera dynorna så att de stödjer låren ordentligt. Lyft spaken lite och släpp säkerhetsbygeln, vilket ger spaken frihet att gå ner. Håll i handtagen för stöd. Andas in medan du låter spaken sjunka på ett kontrollerat sätt tills du känner en sträckning i vaderna. Håll för en räkning av en. Andas ut medan du trycker spaken hela vägen upp genom att höja hälarna. Håll för en räkning av två. Upprepa. När du är klar, säkra spaken med säkerhetsbygeln.'),(36,'Lying leg curl\n','legs','lying-leg-curl.jpg','Ligg framåtlutad (med ansiktet nedåt) på benbänken och placera dina ben under spakkuddarna. Dina knän ska vara precis under kanten på bänken och spakskydden ska vila precis ovanför hälarna.\nHåll i handtagen för stabilitet. Andas ut medan du böjer knäna och böj spaken tills den nuddar baksidan av låren. Håll för en räkning av två. Andas in när du sänker spaken till utgångsläget.\nUpprepa.  '),(37,'Leg extension\n','legs','lever-leg-extension-resized.jpg','Välj din vikt och sätt dig på benförlängningsmaskinen.\nGör de nödvändiga justeringarna så att lårens ryggstöd får fullt stöd av sitsen och att din rygg får fullt stöd av ryggstödet. Haka fast fötterna under spakens fotkuddar med dynorna vilande precis ovanför anklarna. Ta tag i sidohandtagen för stöd. Andas ut medan du lyfter spaken framåt och uppåt genom att räta ut benen tills de är helt utsträckta. Håll för en räkning av två. Andas in när du återställer spaken till utgångsläget genom att böja på knäna. Upprepa.'),(38,'Barbell squat\n','legs','barbell-squat.jpg','Ladda en skivstång på ett ställ i övre brösthöjd. Kliv under skivstången så att den vilar på baksidan av dina axlar och ta tag i stången på varje sida. Ta av skivstången och gå försiktigt bakåt. Dina fötter ska vara axelbrett isär och peka något utåt. Andas in medan du sätter dig på huk genom att samtidigt trycka rumpan bakåt och böja knäna framåt. Håll bålen upprätt och gå ner åtminstone tills knäna är böjda i 90 graders vinkel. Andas ut när du trycker tillbaka din kropp till startpositionen, kör genom hälarna och håll bålen upprätt. Upprepa.'),(39,'Dumbbell lunge\n','legs','Dumbbell-Lunge.jpg','Stå med fötterna ihop, håll en hantel i varje hand, med armarna vid sidorna. Andas in medan du tar ett stort steg framåt med ett ben, landar först på hälen och sänker sedan framfoten. Håll samtidigt din bål upprätt och sänk ner kroppen tills knäet på ditt stödben nästan nuddar golvet. Andas ut när du kör tillbaka upp med hälen och steg tillbaka till startpositionen. Upprepa med ditt motsatta ben. Fortsätt alternera benet som du gör utfall med.'),(40,'Bodyweight squat\n','legs','bodyweight-squat.jpg','Stå med fötterna axelbrett isär. Dina knän och fötter ska peka åt samma håll. Lyft ut armarna framför dig för balans (eller så kan du lämna dem vid din sida och höja dem när du går ner). Håll huvudet uppe och bålen upprätt, andas in medan du sitter på huk genom att samtidigt böja dina höfter och knän, se till att gå ner åtminstone tills dina lår är parallella med golvet. (Om dina armar var vid dina sidor, lyft ut dem framför dig när du går ner för att hjälpa dig att hålla balansen.) Andas ut när du återgår till startpositionen. Upprepa för det föreskrivna antalet repetitioner.'),(41,'Bulgarian split squat\n','legs','Bulgarian-split-squat.jpg','Stå med ryggen mot sidan av en bänk. Placera toppen av en fot på bänken bakom dig så att du bara står på en fot. Håll din bål upprätt, sitt på huk med ditt stödjande ben tills knäet på ditt bakre ben nästan nuddar golvet. Andas ut när du kör genom ditt stödben för att stå upp igen. Upprepa för önskat antal repetitioner. Upprepa den bulgariska split squat med ditt motsatta ben.'),(42,'Burpee','cardio','burpees.jpg','En burpee är en dynamisk helkroppsövning som sömlöst blandar styrketräning och konditionering. Burpees riktar sig effektivt mot flera muskelgrupper, inklusive ben, bröst, armar och core, samtidigt som de ger en kardiovaskulär utmaning. Nybörjare kan börja med modifierade versioner och gradvis gå vidare till standardburpee allt eftersom deras konditionsnivå förbättras. Att införliva burpees i din träningsrutin ger intensitet och effektivitet till din träning.'),(43,'Hopprep','cardio','jumping-rope.jpg','Hopprep är en enkel men mycket effektiv kardiovaskulär träning som innebär att du upprepade gånger hoppar över ett rep när det passerar under dina fötter. Det är ett mångsidigt och tillgängligt träningspass som lämpar sig för olika konditionsnivåer. Hopprep är ett utmärkt sätt att förbättra kardiovaskulär kondition, koordination och uthållighet. Den kan integreras i olika träningsrutiner eller användas som en fristående övning. Justera intensiteten genom att variera din hastighet och prova olika hopprepstekniker. Dessutom är hopprep en bekväm och bärbar övning, vilket gör den lämplig för hemmaträning eller träning när du är på språng.'),(44,'Jumping Jacks','cardio','jumping-jacks.jpg','Jumping jacks är en klassisk och effektiv aerob träning som engagerar hela kroppen, främjar kardiovaskulär kondition och förbättrar den övergripande koordinationen. Jumping jacks är en utmärkt uppvärmningsövning, perfekt för att höja pulsen och värma upp musklerna. De används också ofta i högintensiv intervallträning (HIIT) och kan modifieras för att passa olika konditionsnivåer. Inkludera jumping jacks i din träningsrutin för att lägga till ett dynamiskt och effektivt element till din kardiovaskulära träning.'),(45,'High Knees','cardio','high-knees.jpg','Höga knän är en dynamisk och energisk övning som riktar sig mot underkroppen, särskilt höftböjare, samtidigt som den ger ett kardiovaskulärt träningspass. Höga knän används ofta som en uppvärmningsövning för att öka hjärtfrekvensen, förbättra flexibiliteten och aktivera underkroppens muskler. De kan också integreras i kardiovaskulära träningspass eller högintensiva intervallträningsrutiner (HIIT). Ändra intensiteten baserat på din konditionsnivå och njut av fördelarna med en effektiv och dynamisk underkroppsträning med höga knän.'),(46,'Bag Work','cardio','bag-work.jpg','Bag work, även känd som heavy bag-träning, är ett kraftfullt och mångsidigt träningspass som innebär att man slår en tung väska för att förbättra konditionen, styrkan och konditionen. Bagarbete är ett effektivt sätt att förbättra kardiovaskulär uthållighet, bygga styrka och förbättra övergripande kampsportsfärdigheter. Den erbjuder en dynamisk och engagerande träning som kan anpassas till olika konditionsnivåer och mål. Prioritera alltid rätt form och teknik för att maximera fördelarna och minimera risken för skador.'),(47,'Löpband','cardio','treadmil.jpg','Löpbandsträning ger en utmärkt kardiovaskulär träning som förbättrar uthålligheten, bränner kalorier och förbättrar den allmänna konditionen. Löpbandsträning kan anpassas till olika konditionsnivåer och mål, vilket gör dem lämpliga för både nybörjare och erfarna löpare. Justera inställningarna baserat på din konditionsnivå och framsteg gradvis allt eftersom din uthållighet förbättras. Rådgör alltid med en sjukvårdspersonal eller fitnessexpert om du har några hälsoproblem eller tillstånd innan du börjar med en ny träningsrutin.');
/*!40000 ALTER TABLE `workout` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-12 15:14:44
