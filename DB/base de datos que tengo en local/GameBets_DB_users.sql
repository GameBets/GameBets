-- MySQL dump 10.13  Distrib 5.7.12, for linux-glibc2.5 (x86_64)
--
-- Host: 127.0.0.1    Database: GameBets_DB
-- ------------------------------------------------------
-- Server version	5.7.16-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `token` varchar(1000) NOT NULL,
  `name_user` varchar(50) DEFAULT NULL,
  `passwd` varchar(1000) NOT NULL,
  `avatar` varchar(1000) NOT NULL,
  `named` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `date_birthday` varchar(15) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(9) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `town` varchar(50) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `type` varchar(45) NOT NULL,
  `online` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('750c89e5242f176d83a6d794b89d28b6',NULL,'$2y$10$JnB4Ab9IAULsvKm.Hlpjf.AF3/qBUIbVteadWTZOjZkxX8e1TXnDm','http://www.gravatar.com/avatar/9bc6139dddf1dbeab198921a12ca0c709bc6139dddf1dbeab198921a12ca0c70?s=400&d=identicon&r=g',NULL,NULL,NULL,'asdfg@gmail.com',NULL,NULL,NULL,NULL,1,'client',0),('9c5e32e90487f93c5479ad93b9cdb347',NULL,'$2y$10$H0Fxksc1tbHYOgPfNCJcsu2iBx74ZHdmC0K88JgXib9Sr0eEv1/yu','http://www.gravatar.com/avatar/3bccd59be0a57b39bdd9b2760702795e3bccd59be0a57b39bdd9b2760702795e?s=400&d=identicon&r=g',NULL,NULL,NULL,'dani@gmail.com',NULL,NULL,NULL,NULL,1,'client',1),('d9d335a755697d1b7cb3b7f47cc332b3',NULL,'$2y$10$zuveFVapGILVaqpsl5VCtuN7KsAfL5x6b7xOIpujUxVbH/sD4w8KS','http://www.gravatar.com/avatar/c61b79758e271ae85e7e31eb05f8e1fdc61b79758e271ae85e7e31eb05f8e1fd?s=400&d=identicon&r=g',NULL,NULL,NULL,'ancoca1993@gmail.com',NULL,NULL,NULL,NULL,1,'client',0);
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

-- Dump completed on 2016-12-24 17:28:31
