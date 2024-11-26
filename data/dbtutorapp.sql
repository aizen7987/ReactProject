-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: dbtutorapp
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `message` text COLLATE utf8mb3_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (34,9,6,'sdfsdfds','2024-11-22 17:44:00','2024-11-22 17:44:00'),(35,9,6,'sdfsdfsd','2024-11-22 17:46:51','2024-11-22 17:46:51'),(36,9,6,'dsafadsfdas','2024-11-22 17:48:38','2024-11-22 17:48:38'),(37,9,6,'sdafadsfas','2024-11-22 17:49:37','2024-11-22 17:49:37'),(38,9,6,'sadfasdfasd','2024-11-22 19:40:49','2024-11-22 19:40:49'),(39,6,9,'erterte','2024-11-22 19:40:54','2024-11-22 19:40:54'),(40,9,6,'hello','2024-11-22 19:42:46','2024-11-22 19:42:46'),(41,6,9,'como estas?','2024-11-22 19:42:57','2024-11-22 19:42:57'),(42,6,10,'hello','2024-11-22 19:43:27','2024-11-22 19:43:27');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb3_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_spanish_ci NOT NULL,
  `role` enum('tutor','student') COLLATE utf8mb3_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'oscar','$2a$10$sBsZFgBYZyy5sr5sYu3VC.FuDtSLNqKZdiXECdOy3jTxTs6upyEAe','tutor','2024-11-21 15:03:13','2024-11-21 15:03:13'),(7,'luis','$2a$10$LXVpIR11VQdlwq2SdJWziugObhr.9u71zhFrqXBdxTsoNM3GrjFLC','tutor','2024-11-21 17:15:04','2024-11-21 17:15:04'),(8,'alberto','$2a$10$/.HopcNuWW0LAvOQ4QPoN./rA1FLcVX07eKqx6iTUDTwWhtX6IoFG','tutor','2024-11-21 17:17:43','2024-11-21 17:17:43'),(9,'gerson','$2a$10$U2w/Iq2q/BXDG6gsboJ8M.sILvRfEPwkKIHsbkClJksc1O1tDhXeq','student','2024-11-21 17:18:02','2024-11-21 17:18:02'),(10,'angelica','$2a$10$QbqVz0oz6PlylDX8WeaNCeF6pZ85gTVTYiINRalPdoU7xCBT1pt2a','student','2024-11-21 17:18:15','2024-11-21 17:18:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-25 15:05:43
