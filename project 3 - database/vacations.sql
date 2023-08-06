CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `followerId` int NOT NULL AUTO_INCREMENT,
  `following_userId` int NOT NULL,
  `following_vacationId` int NOT NULL,
  PRIMARY KEY (`followerId`),
  KEY `fk_users_vacation_userId_idx` (`following_userId`),
  KEY `fk_users_vacation_vacationId_idx` (`following_vacationId`),
  CONSTRAINT `fk_users_vacation_userId` FOREIGN KEY (`following_userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_users_vacation_vacationId` FOREIGN KEY (`following_vacationId`) REFERENCES `vacation_details` (`vacationId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=298 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (117,15,56),(168,27,54),(169,28,54),(170,28,56),(173,29,53),(174,29,54),(181,27,64),(182,28,65),(190,30,62),(191,30,53),(192,30,56),(197,27,56),(238,27,71),(242,15,71),(244,27,62),(260,28,70),(262,28,45),(263,28,46),(269,14,62),(272,14,45),(275,27,17),(281,14,17),(284,14,70),(289,14,41),(290,14,64),(293,32,56),(294,32,54),(295,27,65);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userRole` varchar(15) DEFAULT 'User',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (14,'Liron','Isachar','liron@gmail.com','$2b$10$YnNpM2IW5WUE/Gb9KerjyupO5uzHtO.v.veMszF93I1pE/l.r4VDO','User'),(15,'תמיר','אלמקייס','timmy@gmail.com','$2b$10$I36zC4amiwoagjjoCdE7VeEfbgr/qMlkHSvNCd1qRZTlLdtWh8Gqy','Admin'),(27,'משה','כהן','mosh@gmail.com','$2b$10$oo0yd9EtoE9um.6YOiN/8.AO9sQEVo9gKfX1EEf.LAqiYWmo3nHca','User'),(28,'עומרי','עזרא','omri@gmail.com','$2b$10$pBBbCa/ws7fi8r6sEulr1.xO5UGJNNo0hdvupkOIwHZpcWx0EBnq6','User'),(29,'Liz','Cohen','liz@gmail.com','$2b$10$El1RP2ecK73TO3j2u4L45.26PIpkXaJEz824EZI/UISw09Gsygt5C','User'),(30,'moti','luchim','mot@gmail.com','$2b$10$GfQFvz6u47H0w1naYkfYW.U1AkfZVDnFjyFGkfO9eT9eqhNXe5hIC','User'),(31,'timor','levi','tim@gmail.com','$2b$10$rNPPLndrUyK1/JCWHTAN1On6.rnlH93plwk/tlA6ZH2a9CsAqXdsG','User'),(32,'Gabriel','yakubov','gabi@gmail.com','$2b$10$rGyhbqLm0hNxq22EVaT/xuC3BQ/krBJV26oVwEP33xkpQAxlotTve','User');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation_details`
--

DROP TABLE IF EXISTS `vacation_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation_details` (
  `vacationId` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `vacationStart` datetime NOT NULL,
  `vacationEnd` datetime NOT NULL,
  `price` int NOT NULL,
  `imageName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`vacationId`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation_details`
--

LOCK TABLES `vacation_details` WRITE;
/*!40000 ALTER TABLE `vacation_details` DISABLE KEYS */;
INSERT INTO `vacation_details` VALUES (17,'Eilat, Israel','Resorts and reefs are the draw on Israel\'s skinny Red Sea coastline, and Eilat tempts visitors with sun that lasts all year round. Sandy beaches, warm waters, and nightlife complete the package, along with desert scenery that\'s just beyond the crowded coast. ','2023-08-06 00:00:00','2023-08-12 00:00:00',1499,'960fc4cd-981b-4923-b8f3-31009301753f.jpg'),(41,'Naples, Italy','Naples, or Napoli for Italians, is a major port city in the south of Italy in the Campania region. With 4.4 million inhabitants (\'Neapolitans\'), it is the third largest city in Italy. The chaotic city has everything for an inspiring city trip because of the rich history, the Italian cuisine and especially in the field of art and culture, the city has a lot to offer.','2023-09-10 00:00:00','2023-09-15 00:00:00',1399,'009d31fc-042a-4411-965f-200553c2c551.jpeg'),(45,'Thailand Islands','Thailand is an absolute gem of a destination in South-East Asia, with mesmerizing islands, paradise white-sand beaches, and one of the most vibrant capital cities in the world. The fantastic people, weather, and food add to the magic of what will undoubtedly be one of your most memorable vacations ever.','2023-10-10 00:00:00','2023-10-24 00:00:00',1895,'a61702a1-27f1-425e-a7b4-35bd1aaea51f.webp'),(46,'Madeira, Portugal','Madeira, Portugal; a holiday and tourism guide for 2023. Madeira is an oasis of green within the Atlantic Ocean. This lush island with its permanent spring-like climate, is diverse and fascinating, and one of the truly unique holiday destinations of Europe.','2023-10-10 00:00:00','2023-10-20 00:00:00',949,'d1471b19-882b-4a1b-8787-f3df7edbe6be.jpeg'),(53,'Ushuaia, Argentina','Ushuaia is located between the Beagle Channel, glaciers and eternally snow-capped peaks. Ushuaia is a city that you absolutely want to visit during a trip in Argentina. The Ushuaia area lends itself to beautiful hikes in Tierra del Fuego, to ','2023-11-11 00:00:00','2023-11-29 00:00:00',1699,'2254a3a1-32e3-41ad-a639-885a40fd5953.jpeg'),(54,'Jerusalem, Israel','Jerusalem is the religious and historical epicenter of the world. A surreal and vibrant city, Jerusalem is holy to Jews, Muslims, and Christians – over one-third of all the people on the earth. The ancient place is as unique as she is special. Beyond her religious and historic significance, Jerusalem is the capital of modern-day Israel and an advanced, dynamic city. The intricacies and beautiful contradictions – ancient and developed, religious and secular – that make up Jerusalem have to be seen to be believed.','2023-08-10 00:00:00','2023-08-21 00:00:00',1799,'845bc6bf-cf07-4c03-b77d-5af9de605bcd.jpeg'),(56,'Barcelona, Spain','Barcelona contains both the authentically historic and the wildly bizarre. From the scenic trails of the colorful Park Güell to the romantic narrow alleys of Barri Gòtic; from the beachside nightclubs to the city\'s dozens of sacred churches and architectural marvels, this city by the sea seems to attract all types: the adventurer, the couple, the partier, the culture lover – and more – with an almost overwhelming variety of things to do. ','2023-08-10 00:00:00','2023-08-27 00:00:00',1290,'c1fe8581-f65d-4d52-9470-a2b11febcf95.png'),(62,'Rome, Italy','Rome, the charming capital of Italy, is a sprawling city studded with numerous historical landmarks and attractions. Renowned world over for its ruins, renaissance architecture, museums full of artistic treasures, grand basilicas, romantic street-side cafes and piazzas, Rome has simply too much to offer to a traveller!','2023-08-05 00:00:00','2023-08-10 00:00:00',782,'70b2e2c0-408e-42b1-a586-7e8e0eba1344.jpeg'),(64,'Amsterdam','The Dutch capital is known for its quiet canals and gabled, narrow houses, but there’s plenty more to discover in this compact, friendly city, from buzzing food halls to street art museums. This itinerary will help you explore Amsterdam’s highlights all within two days, guiding you from galleries to cafes to palaces, with some cycling and boating thrown in for good measure.','2023-11-25 00:00:00','2023-11-30 00:00:00',878,'82200a11-fbd0-4001-ad8c-396bad873bcb.jpeg'),(65,'Paris, Frace','Paris (nicknamed the \"City of light\") is the capital city of France, and the largest city in France. The area is 105 square kilometres (41 square miles), and around 2.15 million people live there. If suburbs are counted, the population of the Paris area rises to 10.7 million people.','2023-09-01 00:00:00','2023-09-08 00:00:00',1575,'886dd45c-7187-451b-9262-6244bfd28051.webp'),(70,'Miami, USA','Miami, city, seat (1844) of Miami-Dade county, southeastern Florida, U.S. A major transportation and business hub, Miami is a leading resort and Atlantic Ocean port situated on Biscayne Bay at the mouth of the Miami River. The Everglades area is a short distance to the west.','2023-07-30 00:00:00','2023-08-25 00:00:00',2565,'8d0306d0-cba0-4c1c-81ba-e32cc9b9a628.jpeg'),(71,'Dahab, Egypt','Dahab (Egyptian Arabic: دهب, \"gold\") is a small Egyptian town on the southeast coast of the Sinai Peninsula in Egypt, approximately 80 km (50 mi) northeast of Sharm el-Sheikh. Formerly a Bedouin fishing village, Dahab is now considered to be one of Egypt\'s most treasured diving destinations.','2023-08-05 00:00:00','2023-08-10 00:00:00',370,'0b453f07-ada3-4d79-8ac9-1a91e00f6523.jpeg'),(74,'Milano, Italy','Milan is the capital city of the region of Lombardy in northern Italy. It is the second largest city by population in Italy, behind Rome. It is Italy\'s leading financial centre and its most prosperous manufacturing and commercial city.','2023-08-05 00:00:00','2023-08-15 00:00:00',894,'395199fd-9f53-4097-91eb-5137e0a0ce5b.jpeg'),(75,'Maldives','\r\nThe Republic of the Maldives is an island nation in the Indian Ocean. It is composed of multiple atolls which are made up of a total of 1196 islands, and is located in the continent of Asia. The chain of islands is to the south-west of India and Sri Lanka and stretches over 871 km.','2023-08-04 00:00:00','2023-08-18 00:00:00',1550,'55f796db-0276-4d6b-ab26-40083cac2413.jpeg'),(95,'Las Vegas, USA','Las Vegas Outdoor Fun specializes in getting you up close and personal with the famous Nellis Sand Dunes by providing Off-Road ATV & UTV Rentals! Carve you own trails into endless untouched dunes with our top-of-the-line equipment! This will be an adventure you will never forget!','2023-08-17 00:00:00','2023-09-06 00:00:00',2449,'7244e58c-3b0f-4823-afa5-0f8cef8fe19e.jpeg');
/*!40000 ALTER TABLE `vacation_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-06 11:48:08
