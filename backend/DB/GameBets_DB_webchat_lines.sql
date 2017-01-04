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
-- Table structure for table `webchat_lines`
--

DROP TABLE IF EXISTS `webchat_lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webchat_lines` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `author` varchar(100) NOT NULL,
  `gravatar` varchar(1000) NOT NULL,
  `text` varchar(255) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ts` (`ts`)
) ENGINE=MyISAM AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webchat_lines`
--

LOCK TABLES `webchat_lines` WRITE;
/*!40000 ALTER TABLE `webchat_lines` DISABLE KEYS */;
INSERT INTO `webchat_lines` VALUES (62,'angel','media/default-avatar.jpg','hola luis','2016-12-20 15:08:50'),(63,'angel','media/default-avatar.jpg','hoaaaa','2016-12-20 16:20:46'),(64,'angel','media/default-avatar.jpg','ds1','2016-12-20 16:21:21'),(65,'angel','media/default-avatar.jpg','2','2016-12-20 16:21:23'),(66,'angel','media/default-avatar.jpg','3','2016-12-20 16:21:25'),(67,'angel','media/default-avatar.jpg','4','2016-12-20 16:21:26'),(68,'angel','media/default-avatar.jpg','5','2016-12-20 16:21:28'),(69,'angel','media/default-avatar.jpg','+1','2016-12-21 20:32:31'),(61,'angel','media/default-avatar.jpg','dsasad','2016-12-20 14:49:27'),(60,'angel','media/default-avatar.jpg','fasafa','2016-12-20 13:59:48'),(59,'angel','media/default-avatar.jpg','hola222','2016-12-20 13:58:02'),(70,'ancoca1993','http://www.gravatar.com/avatar/9bc6139dddf1dbeab198921a12ca0c709bc6139dddf1dbeab198921a12ca0c70?s=400&d=identicon&r=g','hola angel','2016-12-26 09:20:01'),(71,'ancoca1993@gmail.com','http://www.gravatar.com/avatar/9bc6139dddf1dbeab198921a12ca0c709bc6139dddf1dbeab198921a12ca0c70?s=400&d=identicon&r=g','hola angel','2016-12-26 09:20:37'),(72,'ancoca1993@gmail.com','http://www.gravatar.com/avatar/c61b79758e271ae85e7e31eb05f8e1fdc61b79758e271ae85e7e31eb05f8e1fd?s=400&d=identicon&r=g',':)','2016-12-26 09:24:48'),(73,'ancoca1993@gmail.com','http://www.gravatar.com/avatar/c61b79758e271ae85e7e31eb05f8e1fdc61b79758e271ae85e7e31eb05f8e1fd?s=400&d=identicon&r=g','funciona','2016-12-26 10:55:36'),(74,'ancoca1993@gmail.com','http://www.gravatar.com/avatar/c61b79758e271ae85e7e31eb05f8e1fdc61b79758e271ae85e7e31eb05f8e1fd?s=400&d=identicon&r=g','funciona ahora? ','2016-12-26 10:55:45'),(75,'ancoca1993@gmail.com','http://www.gravatar.com/avatar/c61b79758e271ae85e7e31eb05f8e1fdc61b79758e271ae85e7e31eb05f8e1fd?s=400&d=identicon&r=g','nueva linea','2016-12-26 11:00:02'),(76,'ancoca1993@gmail.com','http://www.gravatar.com/avatar/c61b79758e271ae85e7e31eb05f8e1fdc61b79758e271ae85e7e31eb05f8e1fd?s=400&d=identicon&r=g','nueva linea 2','2016-12-26 11:02:19'),(77,'ancoca1993@gmail.com','http://www.gravatar.com/avatar/c61b79758e271ae85e7e31eb05f8e1fdc61b79758e271ae85e7e31eb05f8e1fd?s=400&d=identicon&r=g','h','2016-12-26 11:03:19'),(78,'ancoca1993@gmail.com','http://www.gravatar.com/avatar/c61b79758e271ae85e7e31eb05f8e1fdc61b79758e271ae85e7e31eb05f8e1fd?s=400&d=identicon&r=g','jjj','2016-12-26 11:04:26'),(79,'ancoca1993@gmail.com','http://www.gravatar.com/avatar/c61b79758e271ae85e7e31eb05f8e1fdc61b79758e271ae85e7e31eb05f8e1fd?s=400&d=identicon&r=g','sss','2016-12-26 11:08:06'),(80,'dani@gmail.com','http://www.gravatar.com/avatar/3bccd59be0a57b39bdd9b2760702795e3bccd59be0a57b39bdd9b2760702795e?s=400&d=identicon&r=g','hola angel ','2016-12-27 19:29:21'),(81,'dani@gmail.com','http://www.gravatar.com/avatar/3bccd59be0a57b39bdd9b2760702795e3bccd59be0a57b39bdd9b2760702795e?s=400&d=identicon&r=g','i no es duplica :D','2016-12-27 19:29:46'),(82,'dani@gmail.com','http://www.gravatar.com/avatar/3bccd59be0a57b39bdd9b2760702795e3bccd59be0a57b39bdd9b2760702795e?s=400&d=identicon&r=g','ohh yeaah','2016-12-27 19:32:06'),(83,'dani@gmail.com','http://www.gravatar.com/avatar/3bccd59be0a57b39bdd9b2760702795e3bccd59be0a57b39bdd9b2760702795e?s=400&d=identicon&r=g','aaaa','2016-12-27 19:45:18'),(84,'dani@gmail.com','http://www.gravatar.com/avatar/3bccd59be0a57b39bdd9b2760702795e3bccd59be0a57b39bdd9b2760702795e?s=400&d=identicon&r=g','das','2016-12-27 19:46:32'),(85,'dani@gmail.com','http://www.gravatar.com/avatar/3bccd59be0a57b39bdd9b2760702795e3bccd59be0a57b39bdd9b2760702795e?s=400&d=identicon&r=g','cacsafa','2016-12-27 19:46:39');
/*!40000 ALTER TABLE `webchat_lines` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-27 20:52:35
