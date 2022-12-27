-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 27, 2022 at 04:05 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `image` text NOT NULL,
  `oldPrice` text NOT NULL,
  `curPrice` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `name`, `image`, `oldPrice`, `curPrice`) VALUES
(53, 'Apple Watch SE 40mm', 'https://cf.shopee.vn/file/f8ec3b6cd40e8f637116dd6b2c83aed4_tn', '8.990.000', '6.990.000'),
(57, 'Apple MacBook Air 13\" 2020', 'https://cf.shopee.vn/file/sg-11134201-22100-7jka5nkyr2iv3c_tn', '25.000.000', '22.490.000'),
(49, 'Apple iPhone 13 Pro Max 128GB', 'https://cf.shopee.vn/file/c064423004a37893d1d4b05531da0f33_tn', '25.000.000', '12.090.000'),
(54, 'Apple iPhone 11', 'https://cf.shopee.vn/file/19db3eddf43e8251af2ba9dd92fedffc_tn', '22.000.000', '12.090.000'),
(58, 'Apple iPad Gen 9th 10.2-inch Wi-Fi 64GB', 'https://cf.shopee.vn/file/38a51fee63a623600932f1aea78d76a9_tn', '22.000.000', '6.990.000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
