-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.4.6-MariaDB
-- PHP 版本： 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `profile`
--

-- --------------------------------------------------------

--
-- 資料表結構 `imgurl`
--

CREATE TABLE `imgurl` (
  `url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- 傾印資料表的資料 `imgurl`
--

INSERT INTO `imgurl` (`url`) VALUES
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg'),
('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg');

-- --------------------------------------------------------

--
-- 資料表結構 `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `type` varchar(100) NOT NULL,
  `size` int(11) NOT NULL,
  `updated_by` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
