-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: agentes
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agentes`
--

DROP TABLE IF EXISTS `agentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agentes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `rol` enum('duelista','iniciador','controlador','centinela') NOT NULL,
  `descripcion` text NOT NULL,
  `pais_origen` varchar(100) NOT NULL,
  `habilidad_ultimate` varchar(150) NOT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `usuarioId` int DEFAULT NULL,
  `imagen_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `agentes_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agentes`
--

LOCK TABLES `agentes` WRITE;
/*!40000 ALTER TABLE `agentes` DISABLE KEYS */;
INSERT INTO `agentes` VALUES (1,'Jett','duelista','La agente más rápida de Valorant, domina el campo con cuchillas','Corea del Sur','Cascade de cuchillas',1,'2026-04-28 19:56:33','2026-04-28 20:04:57','2026-04-28 20:04:57',1,NULL),(2,'Jett','duelista','La mama de los pollitos','Corea del Sur','Cascade de Cuchillas',1,'2026-04-28 20:34:53','2026-04-28 21:09:37','2026-04-28 21:09:37',1,NULL),(3,'Phoenix','duelista','Negro','Reino Unido','Cenizas',1,'2026-04-28 20:50:37','2026-04-28 21:36:24',NULL,2,''),(4,'Karla','iniciador','Nada','Peru','Pachamama',1,'2026-04-28 20:51:01','2026-04-28 20:58:43','2026-04-28 20:58:43',2,NULL),(5,'Jett','duelista','La mama de los pollitos','Corea del Sur','Cascade de Cuchillas',1,'2026-04-28 21:09:50','2026-04-28 21:20:40',NULL,2,NULL),(6,'Viper','controlador','Pssssss','USA','Pozo de la vibora',1,'2026-04-28 21:21:15','2026-04-28 22:18:29',NULL,2,''),(7,'Gekko','iniciador','Tacotacotacoburritotaco','Mexico','Paliza',1,'2026-04-28 21:21:49','2026-04-28 21:21:49',NULL,2,NULL),(8,'Cypher','centinela','LinLonlan','Marruecos','Asalto neuronal',0,'2026-04-28 21:22:36','2026-04-28 23:19:37',NULL,2,NULL),(9,'Pedro','duelista','profe','Peru','07',1,'2026-04-28 23:20:15','2026-04-28 23:20:33','2026-04-28 23:20:33',2,'');
/*!40000 ALTER TABLE `agentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Carlos','carlos@test.com','$2a$10$i5xNbBA5YmSOedcwS8AQveDmf2zxHTLsLwe/QotCoSZZMPjPiajH.','2026-04-28 19:54:21','2026-04-28 19:54:21'),(2,'Juanito','juanito@senati.pe','$2a$10$LplVeXkhwnRneM3gtO5kyu1yfxIahosykoHsT2i45s5yOIOFmfeN.','2026-04-28 20:37:35','2026-04-28 20:37:35');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-28 18:24:24
