-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 09, 2026 at 08:34 PM
-- Server version: 10.6.25-MariaDB
-- PHP Version: 8.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aqibmeh1_demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `Exam`
--

CREATE TABLE `Exam` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `totalCandidates` int(11) NOT NULL DEFAULT 0,
  `totalSlots` int(11) NOT NULL DEFAULT 0,
  `questionSets` int(11) NOT NULL DEFAULT 0,
  `questionType` varchar(191) DEFAULT NULL,
  `startTime` datetime(3) NOT NULL,
  `endTime` datetime(3) NOT NULL,
  `duration` int(11) NOT NULL,
  `negativeMarking` double NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `employerId` varchar(191) NOT NULL,
  `image` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Exam`
--

INSERT INTO `Exam` (`id`, `title`, `totalCandidates`, `totalSlots`, `questionSets`, `questionType`, `startTime`, `endTime`, `duration`, `negativeMarking`, `createdAt`, `updatedAt`, `employerId`, `image`) VALUES
('cmnrra8ub001h2org8hlym94k', 'Senior Frontend Engineer (React/TypeScript)', 100, 5, 20, 'BOTH', '2026-05-10 04:00:00.000', '2026-05-10 05:30:00.000', 90, 0.25, '2026-04-09 17:33:38.243', '2026-04-09 17:33:38.243', 'cmnrra6k500012orgpz98yrgx', NULL),
('cmnrra8ui001o2org513dze75', 'Backend Architect (Node.js/Microservices)', 50, 2, 15, 'RADIO', '2026-05-12 08:00:00.000', '2026-05-12 09:30:00.000', 90, 0.5, '2026-04-09 17:33:38.250', '2026-04-09 17:33:38.250', 'cmnrra6k500012orgpz98yrgx', NULL),
('cmnrra8un001u2org16kpy9wm', 'Data Scientist - Machine Learning', 80, 3, 10, 'CHECKBOX', '2026-06-01 03:00:00.000', '2026-06-01 05:00:00.000', 120, 0.25, '2026-04-09 17:33:38.256', '2026-04-09 17:33:38.256', 'cmnrra6k500012orgpz98yrgx', NULL),
('cmnrra8ut00202orgiqpa0gzx', 'HR Manager - Strategic Recruitment', 30, 1, 25, 'TEXT', '2026-04-25 05:00:00.000', '2026-04-25 06:00:00.000', 60, 0, '2026-04-09 17:33:38.262', '2026-04-09 17:33:38.262', 'cmnrra6k500012orgpz98yrgx', NULL),
('cmnrra8uz00232orgkdqyxkf6', 'Cybersecurity Lead (SOC/Pentesting)', 40, 2, 12, 'RADIO', '2026-07-20 09:00:00.000', '2026-07-20 11:00:00.000', 120, 1, '2026-04-09 17:33:38.267', '2026-04-09 17:33:38.267', 'cmnrra6k500012orgpz98yrgx', NULL),
('cmnrra8v500292orgkvhzp2tq', 'Digital Marketing Executive', 120, 10, 30, 'RADIO', '2026-05-15 10:00:00.000', '2026-05-15 11:00:00.000', 60, 0.25, '2026-04-09 17:33:38.273', '2026-04-09 17:33:38.273', 'cmnrra6k500012orgpz98yrgx', NULL),
('cmnrra8va002f2orgr35ybtg1', 'Financial Controller - GAAP/IFRS', 20, 1, 15, 'RADIO', '2026-05-30 04:00:00.000', '2026-05-30 06:00:00.000', 120, 0.5, '2026-04-09 17:33:38.279', '2026-04-09 17:33:38.279', 'cmnrra6k500012orgpz98yrgx', NULL),
('cmnrra8vg002l2orgi8c0y3vs', 'Project Manager - Agile Practitioner', 60, 4, 18, 'BOTH', '2026-06-12 08:30:00.000', '2026-06-12 10:00:00.000', 90, 0.25, '2026-04-09 17:33:38.284', '2026-04-09 17:33:38.284', 'cmnrra6k500012orgpz98yrgx', NULL),
('cmnrra8vl002r2org1mm91wvs', 'DevOps Engineer (Cloud Native)', 45, 2, 14, 'CHECKBOX', '2026-05-05 03:00:00.000', '2026-05-05 05:00:00.000', 120, 0.5, '2026-04-09 17:33:38.289', '2026-04-09 17:33:38.289', 'cmnrra6k500012orgpz98yrgx', NULL),
('cmnrra8vq002x2org1od8v7qs', 'Content Strategist & Copywriter', 90, 5, 20, 'TEXT', '2026-04-20 04:00:00.000', '2026-04-20 05:00:00.000', 60, 0, '2026-04-09 17:33:38.295', '2026-04-09 17:33:38.295', 'cmnrra6k500012orgpz98yrgx', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Option`
--

CREATE TABLE `Option` (
  `id` varchar(191) NOT NULL,
  `text` varchar(191) NOT NULL,
  `isCorrect` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `questionId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Option`
--

INSERT INTO `Option` (`id`, `text`, `isCorrect`, `createdAt`, `updatedAt`, `questionId`) VALUES
('cmnrra8ub001j2org5cdsrah0', 'useMemo memoizes values, useCallback memoizes functions', 1, '2026-04-09 17:33:38.243', '2026-04-09 17:33:38.243', 'cmnrra8ub001i2org6wj68fdx'),
('cmnrra8ub001k2orginr8n6ot', 'useMemo is for components, useCallback is for hooks', 0, '2026-04-09 17:33:38.243', '2026-04-09 17:33:38.243', 'cmnrra8ub001i2org6wj68fdx'),
('cmnrra8ub001l2orgfex34gos', 'They are exactly same', 0, '2026-04-09 17:33:38.243', '2026-04-09 17:33:38.243', 'cmnrra8ub001i2org6wj68fdx'),
('cmnrra8ui001q2orgduoj1037', 'HTTP/1.1', 0, '2026-04-09 17:33:38.250', '2026-04-09 17:33:38.250', 'cmnrra8ui001p2org14dtr9d5'),
('cmnrra8ui001r2org3fzbo81w', 'HTTP/2', 1, '2026-04-09 17:33:38.250', '2026-04-09 17:33:38.250', 'cmnrra8ui001p2org14dtr9d5'),
('cmnrra8ui001s2orgdwsln8wm', 'WebSockets', 0, '2026-04-09 17:33:38.250', '2026-04-09 17:33:38.250', 'cmnrra8ui001p2org14dtr9d5'),
('cmnrra8un001w2orgqhm3rg2i', 'Random Forest', 1, '2026-04-09 17:33:38.256', '2026-04-09 17:33:38.256', 'cmnrra8un001v2orgh7rcj2db'),
('cmnrra8un001x2org4umuqevq', 'XGBoost', 1, '2026-04-09 17:33:38.256', '2026-04-09 17:33:38.256', 'cmnrra8un001v2orgh7rcj2db'),
('cmnrra8un001y2orgir84ths6', 'Linear Regression', 0, '2026-04-09 17:33:38.256', '2026-04-09 17:33:38.256', 'cmnrra8un001v2orgh7rcj2db'),
('cmnrra8uz00252orgdgqt8rxb', 'Resource not found', 0, '2026-04-09 17:33:38.267', '2026-04-09 17:33:38.267', 'cmnrra8uz00242orgl0lmp3e1'),
('cmnrra8uz00262orghq87dsbs', 'Authentication successful but access denied', 1, '2026-04-09 17:33:38.267', '2026-04-09 17:33:38.267', 'cmnrra8uz00242orgl0lmp3e1'),
('cmnrra8uz00272org7en78jdv', 'Server error', 0, '2026-04-09 17:33:38.267', '2026-04-09 17:33:38.267', 'cmnrra8uz00242orgl0lmp3e1'),
('cmnrra8v5002b2orgl2c0uv8j', 'Increasing organic search visibility', 1, '2026-04-09 17:33:38.273', '2026-04-09 17:33:38.273', 'cmnrra8v5002a2orgin6phb40'),
('cmnrra8v5002c2org7ayd5xsb', 'Running paid ads', 0, '2026-04-09 17:33:38.273', '2026-04-09 17:33:38.273', 'cmnrra8v5002a2orgin6phb40'),
('cmnrra8v5002d2orgg8jwa0bm', 'Designing logos', 0, '2026-04-09 17:33:38.273', '2026-04-09 17:33:38.273', 'cmnrra8v5002a2orgin6phb40'),
('cmnrra8vb002h2orgxj25908y', 'Income Statement', 0, '2026-04-09 17:33:38.279', '2026-04-09 17:33:38.279', 'cmnrra8vb002g2orggtagpxqt'),
('cmnrra8vb002i2org7iqhc4ez', 'Balance Sheet', 1, '2026-04-09 17:33:38.279', '2026-04-09 17:33:38.279', 'cmnrra8vb002g2orggtagpxqt'),
('cmnrra8vb002j2org01slczo2', 'Cash Flow Statement', 0, '2026-04-09 17:33:38.279', '2026-04-09 17:33:38.279', 'cmnrra8vb002g2orggtagpxqt'),
('cmnrra8vg002n2orgcqshvu7v', 'Direct manager of developers', 0, '2026-04-09 17:33:38.284', '2026-04-09 17:33:38.284', 'cmnrra8vg002m2orgz191ddlx'),
('cmnrra8vg002o2orgfy8ex3b2', 'Servant leader', 1, '2026-04-09 17:33:38.284', '2026-04-09 17:33:38.284', 'cmnrra8vg002m2orgz191ddlx'),
('cmnrra8vg002p2orgnyiy7j29', 'Final decision maker for product vision', 0, '2026-04-09 17:33:38.284', '2026-04-09 17:33:38.284', 'cmnrra8vg002m2orgz191ddlx'),
('cmnrra8vl002t2orgsusf5bew', 'Kubernetes', 1, '2026-04-09 17:33:38.289', '2026-04-09 17:33:38.289', 'cmnrra8vl002s2orghbeorrj9'),
('cmnrra8vl002u2orgy6yezq02', 'Docker Swarm', 1, '2026-04-09 17:33:38.289', '2026-04-09 17:33:38.289', 'cmnrra8vl002s2orghbeorrj9'),
('cmnrra8vl002v2orgxit69p0o', 'VirtualBox', 0, '2026-04-09 17:33:38.289', '2026-04-09 17:33:38.289', 'cmnrra8vl002s2orghbeorrj9');

-- --------------------------------------------------------

--
-- Table structure for table `Question`
--

CREATE TABLE `Question` (
  `id` varchar(191) NOT NULL,
  `title` text NOT NULL,
  `type` enum('CHECKBOX','RADIO','TEXT') NOT NULL DEFAULT 'RADIO',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `examId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Question`
--

INSERT INTO `Question` (`id`, `title`, `type`, `createdAt`, `updatedAt`, `examId`) VALUES
('cmnrra8ub001i2org6wj68fdx', 'What is the difference between useMemo and useCallback?', 'RADIO', '2026-04-09 17:33:38.243', '2026-04-09 17:33:38.243', 'cmnrra8ub001h2org8hlym94k'),
('cmnrra8ub001m2org9rmxfxs9', 'Explain React Server Components.', 'TEXT', '2026-04-09 17:33:38.243', '2026-04-09 17:33:38.243', 'cmnrra8ub001h2org8hlym94k'),
('cmnrra8ui001p2org14dtr9d5', 'Which protocol is used for gRPC?', 'RADIO', '2026-04-09 17:33:38.250', '2026-04-09 17:33:38.250', 'cmnrra8ui001o2org513dze75'),
('cmnrra8un001v2orgh7rcj2db', 'Which of these are ensemble methods?', 'CHECKBOX', '2026-04-09 17:33:38.256', '2026-04-09 17:33:38.256', 'cmnrra8un001u2org16kpy9wm'),
('cmnrra8ut00212orgi3wx19ur', 'How do you handle conflict resolution between two team leads?', 'TEXT', '2026-04-09 17:33:38.262', '2026-04-09 17:33:38.262', 'cmnrra8ut00202orgiqpa0gzx'),
('cmnrra8uz00242orgl0lmp3e1', 'What does a 403 Forbidden error mean?', 'RADIO', '2026-04-09 17:33:38.267', '2026-04-09 17:33:38.267', 'cmnrra8uz00232orgkdqyxkf6'),
('cmnrra8v5002a2orgin6phb40', 'What is the primary goal of SEO?', 'RADIO', '2026-04-09 17:33:38.273', '2026-04-09 17:33:38.273', 'cmnrra8v500292orgkvhzp2tq'),
('cmnrra8vb002g2orggtagpxqt', 'Which statement shows a company\'s financial position at a point in time?', 'RADIO', '2026-04-09 17:33:38.279', '2026-04-09 17:33:38.279', 'cmnrra8va002f2orgr35ybtg1'),
('cmnrra8vg002m2orgz191ddlx', 'What is a characteristic of a Scrum Master?', 'RADIO', '2026-04-09 17:33:38.284', '2026-04-09 17:33:38.284', 'cmnrra8vg002l2orgi8c0y3vs'),
('cmnrra8vl002s2orghbeorrj9', 'Which of these are container orchestration tools?', 'CHECKBOX', '2026-04-09 17:33:38.289', '2026-04-09 17:33:38.289', 'cmnrra8vl002r2org1mm91wvs'),
('cmnrra8vq002y2orggdqedvpq', 'Write a compelling headline for a new organic coffee brand.', 'TEXT', '2026-04-09 17:33:38.295', '2026-04-09 17:33:38.295', 'cmnrra8vq002x2org1od8v7qs');

-- --------------------------------------------------------

--
-- Table structure for table `Submission`
--

CREATE TABLE `Submission` (
  `id` varchar(191) NOT NULL,
  `status` enum('ASSIGNED','PENDING','IN_PROGRESS','COMPLETED') NOT NULL DEFAULT 'PENDING',
  `score` double NOT NULL DEFAULT 0,
  `tabSwitches` int(11) NOT NULL DEFAULT 0,
  `fullscreenExits` int(11) NOT NULL DEFAULT 0,
  `startedAt` datetime(3) DEFAULT NULL,
  `submittedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `examId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Submission`
--

INSERT INTO `Submission` (`id`, `status`, `score`, `tabSwitches`, `fullscreenExits`, `startedAt`, `submittedAt`, `createdAt`, `updatedAt`, `userId`, `examId`) VALUES
('cmnrra8vv00302orgr4kckpf5', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.299', '2026-04-09 17:33:38.299', 'cmnrra88r00122org7cgcmec7', 'cmnrra8ub001h2org8hlym94k'),
('cmnrra8w000322orgyw28ffp5', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.304', '2026-04-09 17:33:38.304', 'cmnrra7no000p2orgd7vo0a07', 'cmnrra8ub001h2org8hlym94k'),
('cmnrra8w400342orgxgc5dusy', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.309', '2026-04-09 17:33:38.309', 'cmnrra72c000c2orgfks7tozb', 'cmnrra8ub001h2org8hlym94k'),
('cmnrra8w900362orgtdhxxer9', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.313', '2026-04-09 17:33:38.313', 'cmnrra75n000e2orgjega9sf0', 'cmnrra8ub001h2org8hlym94k'),
('cmnrra8wd00382org5kb5bmky', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.317', '2026-04-09 17:33:38.317', 'cmnrra87500112org25v5xifd', 'cmnrra8ub001h2org8hlym94k'),
('cmnrra8wi003a2orgkapiezrl', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.322', '2026-04-09 17:33:38.322', 'cmnrra8lv001a2orggbqutw9f', 'cmnrra8ub001h2org8hlym94k'),
('cmnrra8wn003c2orgmu7dml1k', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.327', '2026-04-09 17:33:38.327', 'cmnrra80q000x2org4sto1t09', 'cmnrra8ub001h2org8hlym94k'),
('cmnrra8ws003e2orgscbmip4j', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.332', '2026-04-09 17:33:38.332', 'cmnrra7c6000i2orgi6h2smg6', 'cmnrra8ub001h2org8hlym94k'),
('cmnrra8wx003g2org8g638eup', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.337', '2026-04-09 17:33:38.337', 'cmnrra6yx000a2orgezs6hje2', 'cmnrra8ub001h2org8hlym94k'),
('cmnrra8x1003i2orglyhk8zjb', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.341', '2026-04-09 17:33:38.341', 'cmnrra6xb00092orgaz0zinn2', 'cmnrra8ub001h2org8hlym94k'),
('cmnrra8x6003k2orglyju8lfl', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.346', '2026-04-09 17:33:38.346', 'cmnrra8f900162orggia7ai5r', 'cmnrra8ui001o2org513dze75'),
('cmnrra8xa003m2orgar5j8zdn', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.351', '2026-04-09 17:33:38.351', 'cmnrra72c000c2orgfks7tozb', 'cmnrra8ui001o2org513dze75'),
('cmnrra8xf003o2org180csckb', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.355', '2026-04-09 17:33:38.355', 'cmnrra6lv00022orgx5l3gwmi', 'cmnrra8ui001o2org513dze75'),
('cmnrra8xj003q2org4f1cadax', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.360', '2026-04-09 17:33:38.360', 'cmnrra7ff000k2org06x4n90d', 'cmnrra8ui001o2org513dze75'),
('cmnrra8xo003s2orgivex0jrp', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.365', '2026-04-09 17:33:38.365', 'cmnrra8u4001f2org1bmst7ka', 'cmnrra8ui001o2org513dze75'),
('cmnrra8xt003u2orgql2dw3t0', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.369', '2026-04-09 17:33:38.369', 'cmnrra6xb00092orgaz0zinn2', 'cmnrra8ui001o2org513dze75'),
('cmnrra8xx003w2orgbn28ifff', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.374', '2026-04-09 17:33:38.374', 'cmnrra7z3000w2orgsar47a8i', 'cmnrra8ui001o2org513dze75'),
('cmnrra8y1003y2org540i0j7b', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.378', '2026-04-09 17:33:38.378', 'cmnrra6yx000a2orgezs6hje2', 'cmnrra8ui001o2org513dze75'),
('cmnrra8y600402orgh4o2y7u4', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.382', '2026-04-09 17:33:38.382', 'cmnrra6qu00052org7l8h16sr', 'cmnrra8ui001o2org513dze75'),
('cmnrra8ya00422orgndvegb6d', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.386', '2026-04-09 17:33:38.386', 'cmnrra77a000f2orgo26824py', 'cmnrra8ui001o2org513dze75'),
('cmnrra8ye00442org2iralbeq', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.391', '2026-04-09 17:33:38.391', 'cmnrra8se001e2org25chdwtr', 'cmnrra8un001u2org16kpy9wm'),
('cmnrra8yj00462org4pd04z6w', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.395', '2026-04-09 17:33:38.395', 'cmnrra7u6000t2orgpzd7xp9r', 'cmnrra8un001u2org16kpy9wm'),
('cmnrra8yn00482org9xe7r9cq', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.400', '2026-04-09 17:33:38.400', 'cmnrra6lv00022orgx5l3gwmi', 'cmnrra8un001u2org16kpy9wm'),
('cmnrra8yr004a2orgn38zaoed', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.404', '2026-04-09 17:33:38.404', 'cmnrra7c6000i2orgi6h2smg6', 'cmnrra8un001u2org16kpy9wm'),
('cmnrra8yv004c2org9x3wr4p6', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.407', '2026-04-09 17:33:38.407', 'cmnrra6nj00032orgsd1f39pu', 'cmnrra8un001u2org16kpy9wm'),
('cmnrra8yz004e2orgnp565ae4', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.412', '2026-04-09 17:33:38.412', 'cmnrra7ke000n2orgsbm5bcxl', 'cmnrra8un001u2org16kpy9wm'),
('cmnrra8z4004g2orgifo1nx1e', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.416', '2026-04-09 17:33:38.416', 'cmnrra8lv001a2orggbqutw9f', 'cmnrra8un001u2org16kpy9wm'),
('cmnrra8z9004i2orgu56ij83s', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.421', '2026-04-09 17:33:38.421', 'cmnrra7no000p2orgd7vo0a07', 'cmnrra8un001u2org16kpy9wm'),
('cmnrra8zd004k2orgn4ba9fre', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.425', '2026-04-09 17:33:38.425', 'cmnrra77a000f2orgo26824py', 'cmnrra8un001u2org16kpy9wm'),
('cmnrra8zi004m2org1t38gmrv', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.430', '2026-04-09 17:33:38.430', 'cmnrra7ds000j2orgm3tf9gqw', 'cmnrra8un001u2org16kpy9wm'),
('cmnrra8zn004o2orgwnfv9t3t', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.435', '2026-04-09 17:33:38.435', 'cmnrra8ni001b2orglnmumvrp', 'cmnrra8ut00202orgiqpa0gzx'),
('cmnrra8zr004q2org68wjiv1n', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.440', '2026-04-09 17:33:38.440', 'cmnrra7vu000u2orgec7kzv5l', 'cmnrra8ut00202orgiqpa0gzx'),
('cmnrra8zv004s2orgvn6wl47p', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.444', '2026-04-09 17:33:38.444', 'cmnrra75n000e2orgjega9sf0', 'cmnrra8ut00202orgiqpa0gzx'),
('cmnrra900004u2orgvk9ubjtj', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.448', '2026-04-09 17:33:38.448', 'cmnrra6lv00022orgx5l3gwmi', 'cmnrra8ut00202orgiqpa0gzx'),
('cmnrra904004w2orgxmk4f9tj', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.452', '2026-04-09 17:33:38.452', 'cmnrra6u300072orgv63e8nbw', 'cmnrra8ut00202orgiqpa0gzx'),
('cmnrra908004y2org8h00kbmi', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.457', '2026-04-09 17:33:38.457', 'cmnrra8qr001d2orgn486k9t4', 'cmnrra8ut00202orgiqpa0gzx'),
('cmnrra90c00502orgr22c3u37', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.461', '2026-04-09 17:33:38.461', 'cmnrra8u4001f2org1bmst7ka', 'cmnrra8ut00202orgiqpa0gzx'),
('cmnrra90h00522orgng8rflzx', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.465', '2026-04-09 17:33:38.465', 'cmnrra8f900162orggia7ai5r', 'cmnrra8ut00202orgiqpa0gzx'),
('cmnrra90l00542org3qf1arb3', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.469', '2026-04-09 17:33:38.469', 'cmnrra8bz00142orgcfqyefza', 'cmnrra8ut00202orgiqpa0gzx'),
('cmnrra90p00562orgypiboo9e', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.473', '2026-04-09 17:33:38.473', 'cmnrra6nj00032orgsd1f39pu', 'cmnrra8ut00202orgiqpa0gzx'),
('cmnrra90t00582orgq5sgln8n', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.478', '2026-04-09 17:33:38.478', 'cmnrra6p800042orgyddbe60i', 'cmnrra8uz00232orgkdqyxkf6'),
('cmnrra90x005a2org6ryx1br5', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.482', '2026-04-09 17:33:38.482', 'cmnrra7u6000t2orgpzd7xp9r', 'cmnrra8uz00232orgkdqyxkf6'),
('cmnrra911005c2org2d7p5w0w', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.486', '2026-04-09 17:33:38.486', 'cmnrra6vo00082org6daimdj7', 'cmnrra8uz00232orgkdqyxkf6'),
('cmnrra915005e2orgiux0wgfw', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.490', '2026-04-09 17:33:38.490', 'cmnrra7c6000i2orgi6h2smg6', 'cmnrra8uz00232orgkdqyxkf6'),
('cmnrra919005g2orgeqxi15kh', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.494', '2026-04-09 17:33:38.494', 'cmnrra6yx000a2orgezs6hje2', 'cmnrra8uz00232orgkdqyxkf6'),
('cmnrra91e005i2orgjwvtionk', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.498', '2026-04-09 17:33:38.498', 'cmnrra8qr001d2orgn486k9t4', 'cmnrra8uz00232orgkdqyxkf6'),
('cmnrra91i005k2orgqqnue39k', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.502', '2026-04-09 17:33:38.502', 'cmnrra6nj00032orgsd1f39pu', 'cmnrra8uz00232orgkdqyxkf6'),
('cmnrra91m005m2org65ob5s90', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.506', '2026-04-09 17:33:38.506', 'cmnrra7al000h2org481nvg78', 'cmnrra8uz00232orgkdqyxkf6'),
('cmnrra91q005o2orgu425toct', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.510', '2026-04-09 17:33:38.510', 'cmnrra7ds000j2orgm3tf9gqw', 'cmnrra8uz00232orgkdqyxkf6'),
('cmnrra91u005q2orgty6szx6n', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.514', '2026-04-09 17:33:38.514', 'cmnrra7qx000r2orgx8biag27', 'cmnrra8uz00232orgkdqyxkf6'),
('cmnrra91y005s2orgpn68gpne', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.518', '2026-04-09 17:33:38.518', 'cmnrra80q000x2org4sto1t09', 'cmnrra8v500292orgkvhzp2tq'),
('cmnrra922005u2orgyv9hcwvl', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.523', '2026-04-09 17:33:38.523', 'cmnrra6xb00092orgaz0zinn2', 'cmnrra8v500292orgkvhzp2tq'),
('cmnrra927005w2orgq0c0j7sn', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.527', '2026-04-09 17:33:38.527', 'cmnrra7z3000w2orgsar47a8i', 'cmnrra8v500292orgkvhzp2tq'),
('cmnrra92b005y2orgwsjoh7yo', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.531', '2026-04-09 17:33:38.531', 'cmnrra6lv00022orgx5l3gwmi', 'cmnrra8v500292orgkvhzp2tq'),
('cmnrra92f00602orgwit47ch9', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.535', '2026-04-09 17:33:38.535', 'cmnrra8se001e2org25chdwtr', 'cmnrra8v500292orgkvhzp2tq'),
('cmnrra92j00622orgyv48dex7', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.539', '2026-04-09 17:33:38.539', 'cmnrra87500112org25v5xifd', 'cmnrra8v500292orgkvhzp2tq'),
('cmnrra92n00642orgozko0xxn', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.544', '2026-04-09 17:33:38.544', 'cmnrra73z000d2orgsm04xgxi', 'cmnrra8v500292orgkvhzp2tq'),
('cmnrra92r00662orgzs1e3esq', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.548', '2026-04-09 17:33:38.548', 'cmnrra8ad00132orgmzw4yp43', 'cmnrra8v500292orgkvhzp2tq'),
('cmnrra92v00682orgchfc2piu', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.552', '2026-04-09 17:33:38.552', 'cmnrra7c6000i2orgi6h2smg6', 'cmnrra8v500292orgkvhzp2tq'),
('cmnrra930006a2orgtfdtjrmz', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.556', '2026-04-09 17:33:38.556', 'cmnrra7ir000m2orgxsl6e4mi', 'cmnrra8v500292orgkvhzp2tq'),
('cmnrra934006c2orgxcx365nb', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.560', '2026-04-09 17:33:38.560', 'cmnrra87500112org25v5xifd', 'cmnrra8va002f2orgr35ybtg1'),
('cmnrra938006e2orgxhh52xz5', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.564', '2026-04-09 17:33:38.564', 'cmnrra82c000y2orgfwucunco', 'cmnrra8va002f2orgr35ybtg1'),
('cmnrra93b006g2orgf4eliyfl', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.567', '2026-04-09 17:33:38.567', 'cmnrra88r00122org7cgcmec7', 'cmnrra8va002f2orgr35ybtg1'),
('cmnrra93e006i2orgup6r0vym', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.571', '2026-04-09 17:33:38.571', 'cmnrra7u6000t2orgpzd7xp9r', 'cmnrra8va002f2orgr35ybtg1'),
('cmnrra93i006k2orgxqy2myta', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.575', '2026-04-09 17:33:38.575', 'cmnrra8qr001d2orgn486k9t4', 'cmnrra8va002f2orgr35ybtg1'),
('cmnrra93m006m2orgdmovfai4', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.579', '2026-04-09 17:33:38.579', 'cmnrra77a000f2orgo26824py', 'cmnrra8va002f2orgr35ybtg1'),
('cmnrra93q006o2org7uidcpiw', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.583', '2026-04-09 17:33:38.583', 'cmnrra8f900162orggia7ai5r', 'cmnrra8va002f2orgr35ybtg1'),
('cmnrra93u006q2orggpj42ltf', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.587', '2026-04-09 17:33:38.587', 'cmnrra7ir000m2orgxsl6e4mi', 'cmnrra8va002f2orgr35ybtg1'),
('cmnrra93z006s2orgljsdikdr', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.591', '2026-04-09 17:33:38.591', 'cmnrra70m000b2org4cl980vz', 'cmnrra8va002f2orgr35ybtg1'),
('cmnrra942006u2orgjr8x7vbz', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.594', '2026-04-09 17:33:38.594', 'cmnrra8bz00142orgcfqyefza', 'cmnrra8va002f2orgr35ybtg1'),
('cmnrra946006w2org2w5gem7l', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.598', '2026-04-09 17:33:38.598', 'cmnrra6qu00052org7l8h16sr', 'cmnrra8vg002l2orgi8c0y3vs'),
('cmnrra94a006y2orgndtdalel', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.602', '2026-04-09 17:33:38.602', 'cmnrra87500112org25v5xifd', 'cmnrra8vg002l2orgi8c0y3vs'),
('cmnrra94e00702org4upntxih', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.606', '2026-04-09 17:33:38.606', 'cmnrra75n000e2orgjega9sf0', 'cmnrra8vg002l2orgi8c0y3vs'),
('cmnrra94i00722orgs0zgu941', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.611', '2026-04-09 17:33:38.611', 'cmnrra8bz00142orgcfqyefza', 'cmnrra8vg002l2orgi8c0y3vs'),
('cmnrra94m00742orgb1y1q2t4', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.615', '2026-04-09 17:33:38.615', 'cmnrra6yx000a2orgezs6hje2', 'cmnrra8vg002l2orgi8c0y3vs'),
('cmnrra94q00762org7l5574e9', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.619', '2026-04-09 17:33:38.619', 'cmnrra6xb00092orgaz0zinn2', 'cmnrra8vg002l2orgi8c0y3vs'),
('cmnrra94u00782org68sbhp0f', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.623', '2026-04-09 17:33:38.623', 'cmnrra6sg00062orgw5gstk5s', 'cmnrra8vg002l2orgi8c0y3vs'),
('cmnrra94y007a2orgjseq2jev', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.627', '2026-04-09 17:33:38.627', 'cmnrra7xg000v2orghvl1fhr2', 'cmnrra8vg002l2orgi8c0y3vs'),
('cmnrra953007c2orgp684mvn5', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.631', '2026-04-09 17:33:38.631', 'cmnrra7al000h2org481nvg78', 'cmnrra8vg002l2orgi8c0y3vs'),
('cmnrra957007e2orgmyp6oate', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.635', '2026-04-09 17:33:38.635', 'cmnrra83y000z2orgznmlqgsp', 'cmnrra8vg002l2orgi8c0y3vs'),
('cmnrra95b007g2orgi62hm2qf', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.639', '2026-04-09 17:33:38.639', 'cmnrra8p5001c2orgg1xjfvqu', 'cmnrra8vl002r2org1mm91wvs'),
('cmnrra95f007i2org0cqt6v8x', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.643', '2026-04-09 17:33:38.643', 'cmnrra6lv00022orgx5l3gwmi', 'cmnrra8vl002r2org1mm91wvs'),
('cmnrra95j007k2orgp3zp795x', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.647', '2026-04-09 17:33:38.647', 'cmnrra6nj00032orgsd1f39pu', 'cmnrra8vl002r2org1mm91wvs'),
('cmnrra95n007m2orge4cewulq', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.652', '2026-04-09 17:33:38.652', 'cmnrra8f900162orggia7ai5r', 'cmnrra8vl002r2org1mm91wvs'),
('cmnrra95r007o2orgvv7cys5l', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.656', '2026-04-09 17:33:38.656', 'cmnrra7ke000n2orgsbm5bcxl', 'cmnrra8vl002r2org1mm91wvs'),
('cmnrra95v007q2orglxl9ix8w', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.660', '2026-04-09 17:33:38.660', 'cmnrra7al000h2org481nvg78', 'cmnrra8vl002r2org1mm91wvs'),
('cmnrra960007s2orgjl3rlsz3', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.664', '2026-04-09 17:33:38.664', 'cmnrra6u300072orgv63e8nbw', 'cmnrra8vl002r2org1mm91wvs'),
('cmnrra963007u2org8r26vtzh', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.668', '2026-04-09 17:33:38.668', 'cmnrra8ni001b2orglnmumvrp', 'cmnrra8vl002r2org1mm91wvs'),
('cmnrra967007w2orgzci7wqbl', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.672', '2026-04-09 17:33:38.672', 'cmnrra7vu000u2orgec7kzv5l', 'cmnrra8vl002r2org1mm91wvs'),
('cmnrra96b007y2org0gltelj3', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.675', '2026-04-09 17:33:38.675', 'cmnrra73z000d2orgsm04xgxi', 'cmnrra8vl002r2org1mm91wvs'),
('cmnrra96f00802orgcvvkwdjx', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.679', '2026-04-09 17:33:38.679', 'cmnrra7al000h2org481nvg78', 'cmnrra8vq002x2org1od8v7qs'),
('cmnrra96j00822orgibisay55', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.683', '2026-04-09 17:33:38.683', 'cmnrra8p5001c2orgg1xjfvqu', 'cmnrra8vq002x2org1od8v7qs'),
('cmnrra96n00842orgwbh0myk7', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.687', '2026-04-09 17:33:38.687', 'cmnrra87500112org25v5xifd', 'cmnrra8vq002x2org1od8v7qs'),
('cmnrra96s00862orgqjftqae9', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.692', '2026-04-09 17:33:38.692', 'cmnrra8bz00142orgcfqyefza', 'cmnrra8vq002x2org1od8v7qs'),
('cmnrra96w00882orgtlt00wzg', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.696', '2026-04-09 17:33:38.696', 'cmnrra7ff000k2org06x4n90d', 'cmnrra8vq002x2org1od8v7qs'),
('cmnrra970008a2orgzadhv6w5', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.701', '2026-04-09 17:33:38.701', 'cmnrra6lv00022orgx5l3gwmi', 'cmnrra8vq002x2org1od8v7qs'),
('cmnrra974008c2orggi5ss25b', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.705', '2026-04-09 17:33:38.705', 'cmnrra85k00102orgxgo3zlc5', 'cmnrra8vq002x2org1od8v7qs'),
('cmnrra978008e2orgeldw3cur', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.709', '2026-04-09 17:33:38.709', 'cmnrra7ds000j2orgm3tf9gqw', 'cmnrra8vq002x2org1od8v7qs'),
('cmnrra97c008g2orgp75chvzz', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.713', '2026-04-09 17:33:38.713', 'cmnrra7xg000v2orghvl1fhr2', 'cmnrra8vq002x2org1od8v7qs'),
('cmnrra97h008i2orgujenfwyg', 'ASSIGNED', 0, 0, 0, NULL, NULL, '2026-04-09 17:33:38.717', '2026-04-09 17:33:38.717', 'cmnrra8f900162orggia7ai5r', 'cmnrra8vq002x2org1od8v7qs');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` enum('ADMIN','EMPLOYER','CANDIDATE') NOT NULL DEFAULT 'CANDIDATE',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `name` varchar(191) DEFAULT '',
  `image` longtext DEFAULT NULL,
  `gender` enum('MALE','FEMALE','OTHER') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `email`, `password`, `role`, `createdAt`, `updatedAt`, `name`, `image`, `gender`) VALUES
('cmnrra6ig00002orgh60pihhh', 'superadmin@akij.work', '$2b$10$SVCp72ryseVzg2tE6NGxBOyF9cGDQL1ubhQX9GKVfsJJ/GUt4c686', 'ADMIN', '2026-04-09 17:33:35.224', '2026-04-09 17:33:35.224', 'Super Admin', NULL, 'MALE'),
('cmnrra6k500012orgpz98yrgx', 'employer@akij.work', '$2b$10$mdMJvd4VVdi0OoTIUVTwhO/aIeXSthEFzcotlFVvlz2iSMnL9YQEu', 'EMPLOYER', '2026-04-09 17:33:35.286', '2026-04-09 17:33:35.286', 'Employer At Akij', NULL, 'MALE'),
('cmnrra6lv00022orgx5l3gwmi', 'fahim.patwary.789@dhakabank.com.bd', '$2b$10$mdMJvd4VVdi0OoTIUVTwhO/aIeXSthEFzcotlFVvlz2iSMnL9YQEu', 'CANDIDATE', '2026-04-09 17:33:35.348', '2026-04-09 17:33:35.348', 'Fahim Patwary', 'https://i.pravatar.cc/150?u=fahim.patwary.789@dhakabank.com.bd', 'MALE'),
('cmnrra6nj00032orgsd1f39pu', 'mehedi.patwary.81@yahoo.com', '$2b$10$kHjGp3lMwQjCQ22Vuc1Jj.WWCb8nVP37xvskUoXkc9JAm6FgPTJgC', 'CANDIDATE', '2026-04-09 17:33:35.408', '2026-04-09 17:33:35.408', 'Mehedi Patwary', 'https://i.pravatar.cc/150?u=mehedi.patwary.81@yahoo.com', 'MALE'),
('cmnrra6p800042orgyddbe60i', 'bakul.munshi.505@outlook.com', '$2b$10$XYEQaRcx.zP8yU9ZsmSVy.Xd9TQRC6HkwduYraj9abNKTnOJMbqtm', 'CANDIDATE', '2026-04-09 17:33:35.468', '2026-04-09 17:33:35.468', 'Bakul Munshi', 'https://i.pravatar.cc/150?u=bakul.munshi.505@outlook.com', 'MALE'),
('cmnrra6qu00052org7l8h16sr', 'sajid.islam.942@yahoo.com', '$2b$10$eEWrsh88WtYkLg70rjpGgewrFSCe67Z50AgzBk78vmGdqeCK7RZf.', 'CANDIDATE', '2026-04-09 17:33:35.527', '2026-04-09 17:33:35.527', 'Sajid Islam', 'https://i.pravatar.cc/150?u=sajid.islam.942@yahoo.com', 'MALE'),
('cmnrra6sg00062orgw5gstk5s', 'zahid.chowdhury.665@gmail.com', '$2b$10$WAjQhjs6onIictRBrrIGaehG.bZxhsATG0Bbuk5e8EHOIV6kfdP6C', 'CANDIDATE', '2026-04-09 17:33:35.584', '2026-04-09 17:33:35.584', 'Zahid Chowdhury', 'https://i.pravatar.cc/150?u=zahid.chowdhury.665@gmail.com', 'MALE'),
('cmnrra6u300072orgv63e8nbw', 'arif.chowdhury.372@outlook.com', '$2b$10$EjTB1tFb5VV/fv7IthWtbO4cw/WwutCwn2QU56sNGAHXA4kyVGqJy', 'CANDIDATE', '2026-04-09 17:33:35.643', '2026-04-09 17:33:35.643', 'Arif Chowdhury', 'https://i.pravatar.cc/150?u=arif.chowdhury.372@outlook.com', 'MALE'),
('cmnrra6vo00082org6daimdj7', 'fahim.bhuiyan.68@yahoo.com', '$2b$10$cGDEP3.N.8WwRKDHknlzeeX0WYQ7VbeaQN4oK8AiD1gvXMEw0ZY7.', 'CANDIDATE', '2026-04-09 17:33:35.701', '2026-04-09 17:33:35.701', 'Fahim Bhuiyan', 'https://i.pravatar.cc/150?u=fahim.bhuiyan.68@yahoo.com', 'MALE'),
('cmnrra6xb00092orgaz0zinn2', 'rakib.islam.656@akij.work', '$2b$10$vnABhpY4/LJfHiKWuPxI7uDq5EEnclYf.6J5p97ymR2OrlDY5WDwG', 'CANDIDATE', '2026-04-09 17:33:35.760', '2026-04-09 17:33:35.760', 'Rakib Islam', 'https://i.pravatar.cc/150?u=rakib.islam.656@akij.work', 'MALE'),
('cmnrra6yx000a2orgezs6hje2', 'sabbir.sharif.452@gmail.com', '$2b$10$vlE11ewcFSFCM7/vKic5Ze5jx/qaGUuefVyKI9JS5t5Nvk72jq2K2', 'CANDIDATE', '2026-04-09 17:33:35.817', '2026-04-09 17:33:35.817', 'Sabbir Sharif', 'https://i.pravatar.cc/150?u=sabbir.sharif.452@gmail.com', 'MALE'),
('cmnrra70m000b2org4cl980vz', 'sadat.biswas.311@outlook.com', '$2b$10$B6mGzs8UDPQmo3FqBUYbnOJHNh.0R4FB5TPygeT2DQ4g7TwGs1dxG', 'CANDIDATE', '2026-04-09 17:33:35.878', '2026-04-09 17:33:35.878', 'Sadat Biswas', 'https://i.pravatar.cc/150?u=sadat.biswas.311@outlook.com', 'MALE'),
('cmnrra72c000c2orgfks7tozb', 'sabbir.miah.343@yahoo.com', '$2b$10$ZwvlQILjjYvUzVmDbTLNG.rfbdu2B7CTDRWCrhhPsAQq7v3bZOAlu', 'CANDIDATE', '2026-04-09 17:33:35.940', '2026-04-09 17:33:35.940', 'Sabbir Miah', 'https://i.pravatar.cc/150?u=sabbir.miah.343@yahoo.com', 'MALE'),
('cmnrra73z000d2orgsm04xgxi', 'moin.bhuiyan.802@gmail.com', '$2b$10$/CRlrMCPUKwZIFNmyG77J.lnyU9LGSA82Gw4l/FOZD.MGCRuo7b7O', 'CANDIDATE', '2026-04-09 17:33:35.999', '2026-04-09 17:33:35.999', 'Moin Bhuiyan', 'https://i.pravatar.cc/150?u=moin.bhuiyan.802@gmail.com', 'MALE'),
('cmnrra75n000e2orgjega9sf0', 'sadat.sharif.154@yahoo.com', '$2b$10$Ft5adhHAwwAOqKbXM5FuJezy11nLb00F3ESKEqy7vNmYMgBavQNrS', 'CANDIDATE', '2026-04-09 17:33:36.059', '2026-04-09 17:33:36.059', 'Sadat Sharif', 'https://i.pravatar.cc/150?u=sadat.sharif.154@yahoo.com', 'MALE'),
('cmnrra77a000f2orgo26824py', 'emon.biswas.628@akij.work', '$2b$10$RbsynNt85pdiO5YF1C/APuKNE0FVrRLIxOskg/Kr4d0pUjjjJnSom', 'CANDIDATE', '2026-04-09 17:33:36.118', '2026-04-09 17:33:36.118', 'Emon Biswas', 'https://i.pravatar.cc/150?u=emon.biswas.628@akij.work', 'MALE'),
('cmnrra78y000g2org20co05y6', 'tanvir.rahman.415@akij.work', '$2b$10$T4zcMZONNT1poqqxOpDQquY7bHeVq6mTgBejedxUFdaOj0rD5VXe2', 'CANDIDATE', '2026-04-09 17:33:36.178', '2026-04-09 17:33:36.178', 'Tanvir Rahman', 'https://i.pravatar.cc/150?u=tanvir.rahman.415@akij.work', 'MALE'),
('cmnrra7al000h2org481nvg78', 'zahid.munshi.639@outlook.com', '$2b$10$RAuZEmgJI9CUk8Msys9MQuU0HUTzlpaSrV9TP7a3e8c9SYsIO4Ejm', 'CANDIDATE', '2026-04-09 17:33:36.237', '2026-04-09 17:33:36.237', 'Zahid Munshi', 'https://i.pravatar.cc/150?u=zahid.munshi.639@outlook.com', 'MALE'),
('cmnrra7c6000i2orgi6h2smg6', 'aditya.siddique.617@dhakabank.com.bd', '$2b$10$ZHqdwo7qvR1PbiEpv3fQFerZrt5cjTGVpVtcW3NGsP6K0W49NBDte', 'CANDIDATE', '2026-04-09 17:33:36.295', '2026-04-09 17:33:36.295', 'Aditya Siddique', 'https://i.pravatar.cc/150?u=aditya.siddique.617@dhakabank.com.bd', 'MALE'),
('cmnrra7ds000j2orgm3tf9gqw', 'tarek.patwary.374@dhakabank.com.bd', '$2b$10$REc0f/A5/JzmBFIYF7t4ee3Hfw4EdT/9YjHsH7lclJyX6DDaV5tUG', 'CANDIDATE', '2026-04-09 17:33:36.353', '2026-04-09 17:33:36.353', 'Tarek Patwary', 'https://i.pravatar.cc/150?u=tarek.patwary.374@dhakabank.com.bd', 'MALE'),
('cmnrra7ff000k2org06x4n90d', 'shohag.dewan.896@gmail.com', '$2b$10$N0.in09HLbVDH3xCbt3cJuFxfskkI32ffqVp4iJm2Ndejtab4VQ1q', 'CANDIDATE', '2026-04-09 17:33:36.412', '2026-04-09 17:33:36.412', 'Shohag Dewan', 'https://i.pravatar.cc/150?u=shohag.dewan.896@gmail.com', 'MALE'),
('cmnrra7h2000l2org68b68hlt', 'nabil.patwary.29@dhakabank.com.bd', '$2b$10$Qyk/EOFHWrJeGanKCn1lAOCa3g4BoqWxiHKSC.3ixmIuYy3BJ3caW', 'CANDIDATE', '2026-04-09 17:33:36.471', '2026-04-09 17:33:36.471', 'Nabil Patwary', 'https://i.pravatar.cc/150?u=nabil.patwary.29@dhakabank.com.bd', 'MALE'),
('cmnrra7ir000m2orgxsl6e4mi', 'rumman.talukder.221@gmail.com', '$2b$10$EPxSnwnP8htCd35jIK2.4OJnUFMxQUpf3FbP3RM.r.tLtHFVt7xhW', 'CANDIDATE', '2026-04-09 17:33:36.532', '2026-04-09 17:33:36.532', 'Rumman Talukder', 'https://i.pravatar.cc/150?u=rumman.talukder.221@gmail.com', 'MALE'),
('cmnrra7ke000n2orgsbm5bcxl', 'moin.rahman.121@gmail.com', '$2b$10$fkjLT5SRmaPBEg69LbVe9eoy4S5zOhAPX0GSdbBBpeAc3dnM.d6ny', 'CANDIDATE', '2026-04-09 17:33:36.590', '2026-04-09 17:33:36.590', 'Moin Rahman', 'https://i.pravatar.cc/150?u=moin.rahman.121@gmail.com', 'MALE'),
('cmnrra7m0000o2orgjgjm4k7u', 'bakul.sharif.995@akij.work', '$2b$10$3xpKO44Q4dyrTUhmNzaLUuX/5WreGXKvz/f4v5xKX4ILpgKIesyai', 'CANDIDATE', '2026-04-09 17:33:36.649', '2026-04-09 17:33:36.649', 'Bakul Sharif', 'https://i.pravatar.cc/150?u=bakul.sharif.995@akij.work', 'MALE'),
('cmnrra7no000p2orgd7vo0a07', 'sadat.miah.315@gmail.com', '$2b$10$x/LIlwYpvYpUXzICDhKM2eYTf1xY/2M3WshR0ftA7sarqw9AmsLbW', 'CANDIDATE', '2026-04-09 17:33:36.708', '2026-04-09 17:33:36.708', 'Sadat Miah', 'https://i.pravatar.cc/150?u=sadat.miah.315@gmail.com', 'MALE'),
('cmnrra7pb000q2orgfj0dygix', 'bakul.miah.124@dhakabank.com.bd', '$2b$10$1eL2qH819CoPI6krF.JXDOvJR45uRyn5pbZ7l174RYwxSScARcv0S', 'CANDIDATE', '2026-04-09 17:33:36.767', '2026-04-09 17:33:36.767', 'Bakul Miah', 'https://i.pravatar.cc/150?u=bakul.miah.124@dhakabank.com.bd', 'MALE'),
('cmnrra7qx000r2orgx8biag27', 'farhana.siddique.692@gmail.com', '$2b$10$e9ZGswHUcbjgPxFdN4Lrw.IRK4HRJXXPXl3hvLflD3ysNyuID7mNa', 'CANDIDATE', '2026-04-09 17:33:36.825', '2026-04-09 17:33:36.825', 'Farhana Siddique', 'https://i.pravatar.cc/150?u=farhana.siddique.692@gmail.com', 'FEMALE'),
('cmnrra7si000s2org4cw1rvwm', 'sumi.haque.557@outlook.com', '$2b$10$g5oTiQdp6Q8JKQApk3EuEuLzQFELhCWEL7xItLRW7d88GY9GHxGvK', 'CANDIDATE', '2026-04-09 17:33:36.882', '2026-04-09 17:33:36.882', 'Sumi Haque', 'https://i.pravatar.cc/150?u=sumi.haque.557@outlook.com', 'FEMALE'),
('cmnrra7u6000t2orgpzd7xp9r', 'jebin.chowdhury.145@akij.work', '$2b$10$GcM6Oa5IR.K.GpM./4Yczu9oWjQoba8lhZhBhFalE.mzmus6f7qdm', 'CANDIDATE', '2026-04-09 17:33:36.942', '2026-04-09 17:33:36.942', 'Jebin Chowdhury', 'https://i.pravatar.cc/150?u=jebin.chowdhury.145@akij.work', 'FEMALE'),
('cmnrra7vu000u2orgec7kzv5l', 'mim.sharif.994@akij.work', '$2b$10$eTJb.7tEtQdOv/Cdc8NfoOLJI6I1ogmEWTH3KnmheFz4kV9sHTuPm', 'CANDIDATE', '2026-04-09 17:33:37.002', '2026-04-09 17:33:37.002', 'Mim Sharif', 'https://i.pravatar.cc/150?u=mim.sharif.994@akij.work', 'FEMALE'),
('cmnrra7xg000v2orghvl1fhr2', 'anika.miah.89@outlook.com', '$2b$10$yILP6IuEDQZl49xeALiT9e3OE9bth3u1InSP.4e7ml8W1uHaacIT2', 'CANDIDATE', '2026-04-09 17:33:37.061', '2026-04-09 17:33:37.061', 'Anika Miah', 'https://i.pravatar.cc/150?u=anika.miah.89@outlook.com', 'FEMALE'),
('cmnrra7z3000w2orgsar47a8i', 'jebin.khan.587@yahoo.com', '$2b$10$ld0hhuugMTRqtRhiGbkjf.DeNle8eN39afDROct6GE0tPqgVUFUbm', 'CANDIDATE', '2026-04-09 17:33:37.119', '2026-04-09 17:33:37.119', 'Jebin Khan', 'https://i.pravatar.cc/150?u=jebin.khan.587@yahoo.com', 'FEMALE'),
('cmnrra80q000x2org4sto1t09', 'priya.patwary.709@dhakabank.com.bd', '$2b$10$n0eTvkkVoZlBhTjwQ86AWOO5KeBFkDiOLlFgEjWJpi/h/NAe1z2MG', 'CANDIDATE', '2026-04-09 17:33:37.179', '2026-04-09 17:33:37.179', 'Priya Patwary', 'https://i.pravatar.cc/150?u=priya.patwary.709@dhakabank.com.bd', 'FEMALE'),
('cmnrra82c000y2orgfwucunco', 'tahmina.khan.175@akij.work', '$2b$10$VO6hLz2SMPwJGlwskAC3QOnRIoHCcVz.mErjfZeEMGNf3d0JnMPgC', 'CANDIDATE', '2026-04-09 17:33:37.236', '2026-04-09 17:33:37.236', 'Tahmina Khan', 'https://i.pravatar.cc/150?u=tahmina.khan.175@akij.work', 'FEMALE'),
('cmnrra83y000z2orgznmlqgsp', 'tasneem.sarkar.256@dhakabank.com.bd', '$2b$10$m/F9pHFNpdl01loi486RceMbiQbRFyUgGfwTMlgZB33JOCyriHd6q', 'CANDIDATE', '2026-04-09 17:33:37.295', '2026-04-09 17:33:37.295', 'Tasneem Sarkar', 'https://i.pravatar.cc/150?u=tasneem.sarkar.256@dhakabank.com.bd', 'FEMALE'),
('cmnrra85k00102orgxgo3zlc5', 'ishrat.ali.593@dhakabank.com.bd', '$2b$10$Rd1PBH4ic/9cq5y/ewhSFua0RJfl.GvLDxFplYgwjHorEdAb9mHue', 'CANDIDATE', '2026-04-09 17:33:37.352', '2026-04-09 17:33:37.352', 'Ishrat Ali', 'https://i.pravatar.cc/150?u=ishrat.ali.593@dhakabank.com.bd', 'FEMALE'),
('cmnrra87500112org25v5xifd', 'sumi.ali.955@dhakabank.com.bd', '$2b$10$OWLCeLf0ypm5OZj5FIDu8OusEk2gBsVu0.lFZBpc/e5fsEJ83Lk1.', 'CANDIDATE', '2026-04-09 17:33:37.410', '2026-04-09 17:33:37.410', 'Sumi Ali', 'https://i.pravatar.cc/150?u=sumi.ali.955@dhakabank.com.bd', 'FEMALE'),
('cmnrra88r00122org7cgcmec7', 'maya.talukder.702@akij.work', '$2b$10$Iitdhr3PabyYd0MshVqdVusm5LPmZtVutp19AWmhQVH3Fu4S0Imx2', 'CANDIDATE', '2026-04-09 17:33:37.468', '2026-04-09 17:33:37.468', 'Maya Talukder', 'https://i.pravatar.cc/150?u=maya.talukder.702@akij.work', 'FEMALE'),
('cmnrra8ad00132orgmzw4yp43', 'aparna.ali.271@dhakabank.com.bd', '$2b$10$ePqRsCucY3/nrgpEyms6L.A3HE9eTkAXKURiPrB/KnkU3x9Nb4TuC', 'CANDIDATE', '2026-04-09 17:33:37.525', '2026-04-09 17:33:37.525', 'Aparna Ali', 'https://i.pravatar.cc/150?u=aparna.ali.271@dhakabank.com.bd', 'FEMALE'),
('cmnrra8bz00142orgcfqyefza', 'purnima.miah.837@dhakabank.com.bd', '$2b$10$32E4f/h6XykN7f2RrN48euypPT1JntxHlHdEHzS60hZMNGweOaJPq', 'CANDIDATE', '2026-04-09 17:33:37.584', '2026-04-09 17:33:37.584', 'Purnima Miah', 'https://i.pravatar.cc/150?u=purnima.miah.837@dhakabank.com.bd', 'FEMALE'),
('cmnrra8dm00152orgnw5rbkb2', 'tanjila.rahman.932@yahoo.com', '$2b$10$Wx1hZ6kd0p9Qge.OaX3AvuDJ2z/fmjZfaVFH/HVFtuBHsTcpvv2US', 'CANDIDATE', '2026-04-09 17:33:37.642', '2026-04-09 17:33:37.642', 'Tanjila Rahman', 'https://i.pravatar.cc/150?u=tanjila.rahman.932@yahoo.com', 'FEMALE'),
('cmnrra8f900162orggia7ai5r', 'purnima.uddin.208@outlook.com', '$2b$10$upk/peAXwZ0v.xTTgwJ9HuxFeaBtY3Vqa5xilFH9QIYiv2uYTUEyW', 'CANDIDATE', '2026-04-09 17:33:37.701', '2026-04-09 17:33:37.701', 'Purnima Uddin', 'https://i.pravatar.cc/150?u=purnima.uddin.208@outlook.com', 'FEMALE'),
('cmnrra8gv00172orgnvma6dme', 'maya.patwary.946@yahoo.com', '$2b$10$Wgdpx9blfCLHL.jYeTLRrOWl2MAJfreRIRG1JTuIOyIYv5VZ6RGry', 'CANDIDATE', '2026-04-09 17:33:37.760', '2026-04-09 17:33:37.760', 'Maya Patwary', 'https://i.pravatar.cc/150?u=maya.patwary.946@yahoo.com', 'FEMALE'),
('cmnrra8ii00182orgxrqy0gbv', 'sadia.islam.678@yahoo.com', '$2b$10$zZmgHwbyXfB.VtJUW542jeQAK.qvGF9szwK9DLEvHwRNlokamd43C', 'CANDIDATE', '2026-04-09 17:33:37.818', '2026-04-09 17:33:37.818', 'Sadia Islam', 'https://i.pravatar.cc/150?u=sadia.islam.678@yahoo.com', 'FEMALE'),
('cmnrra8k500192orgrn1w02gw', 'tahmina.khan.889@dhakabank.com.bd', '$2b$10$e.6dJWVwzNUJkYrCwZNpW.ciEM4ugsor6SSPf3IY1vWljW8cCw2bi', 'CANDIDATE', '2026-04-09 17:33:37.877', '2026-04-09 17:33:37.877', 'Tahmina Khan', 'https://i.pravatar.cc/150?u=tahmina.khan.889@dhakabank.com.bd', 'FEMALE'),
('cmnrra8lv001a2orggbqutw9f', 'riya.rahman.174@gmail.com', '$2b$10$6sL/aMRtx6W.xgLcv0lYHuGk6/Po8G.FF/1kb5anUiaRbGsRlUquS', 'CANDIDATE', '2026-04-09 17:33:37.940', '2026-04-09 17:33:37.940', 'Riya Rahman', 'https://i.pravatar.cc/150?u=riya.rahman.174@gmail.com', 'FEMALE'),
('cmnrra8ni001b2orglnmumvrp', 'anika.patwary.593@outlook.com', '$2b$10$y/wIWGA3QD6M6xzy0fXbO.Sh0yAZxpsnWQvvmMxSaJCHj5lX6pLBS', 'CANDIDATE', '2026-04-09 17:33:37.998', '2026-04-09 17:33:37.998', 'Anika Patwary', 'https://i.pravatar.cc/150?u=anika.patwary.593@outlook.com', 'FEMALE'),
('cmnrra8p5001c2orgg1xjfvqu', 'sumi.ahmed.696@gmail.com', '$2b$10$wLiVzHlEj6Rx7a9YF7Q4TOjTiwhkwkHhfPdsbJLg74XeHWAQY0MjO', 'CANDIDATE', '2026-04-09 17:33:38.057', '2026-04-09 17:33:38.057', 'Sumi Ahmed', 'https://i.pravatar.cc/150?u=sumi.ahmed.696@gmail.com', 'FEMALE'),
('cmnrra8qr001d2orgn486k9t4', 'farhana.patwary.854@gmail.com', '$2b$10$U2XRVM/e0.cmGi5KhOZhEuTDUZ08OMsXoWGYLMhjaMbHfH11Qrf6K', 'CANDIDATE', '2026-04-09 17:33:38.116', '2026-04-09 17:33:38.116', 'Farhana Patwary', 'https://i.pravatar.cc/150?u=farhana.patwary.854@gmail.com', 'FEMALE'),
('cmnrra8se001e2org25chdwtr', 'mou.patwary.11@gmail.com', '$2b$10$PVpQ3rnQskhAsW5DtmInP.TwmXkgpCxKYbQJnuToLuDnfasL5zQEi', 'CANDIDATE', '2026-04-09 17:33:38.174', '2026-04-09 17:33:38.174', 'Mou Patwary', 'https://i.pravatar.cc/150?u=mou.patwary.11@gmail.com', 'FEMALE'),
('cmnrra8u4001f2org1bmst7ka', 'purnima.chowdhury.841@yahoo.com', '$2b$10$tDjSQhcCH1lG3f.WmjoBTOAxkqWxO6az/MOyB.pQbb1qaxVCBDHQG', 'CANDIDATE', '2026-04-09 17:33:38.237', '2026-04-09 17:33:38.237', 'Purnima Chowdhury', 'https://i.pravatar.cc/150?u=purnima.chowdhury.841@yahoo.com', 'FEMALE');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('965116b8-7c24-4f52-a3da-a8846d0c14c8', 'ec29347c2993eeb3f5774b5d513151ee109d0477a402ddd6ba5ad4a09b603e65', '2026-04-09 15:26:43.068', '20260409152643_add_name_to_user', NULL, NULL, '2026-04-09 15:26:43.040', 1),
('dc9926b2-7e6d-4183-9e27-d871a64cd4c4', '8908fa73483b2d8c657dfc9ea39911536e46eb0b876b337d2bfd3aa8c570c31b', '2026-04-09 14:40:53.727', '20260409144053_init', NULL, NULL, '2026-04-09 14:40:53.325', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Exam`
--
ALTER TABLE `Exam`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Exam_employerId_fkey` (`employerId`);

--
-- Indexes for table `Option`
--
ALTER TABLE `Option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Option_questionId_fkey` (`questionId`);

--
-- Indexes for table `Question`
--
ALTER TABLE `Question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Question_examId_fkey` (`examId`);

--
-- Indexes for table `Submission`
--
ALTER TABLE `Submission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Submission_userId_examId_key` (`userId`,`examId`),
  ADD KEY `Submission_examId_fkey` (`examId`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Exam`
--
ALTER TABLE `Exam`
  ADD CONSTRAINT `Exam_employerId_fkey` FOREIGN KEY (`employerId`) REFERENCES `User` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Option`
--
ALTER TABLE `Option`
  ADD CONSTRAINT `Option_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Question`
--
ALTER TABLE `Question`
  ADD CONSTRAINT `Question_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Submission`
--
ALTER TABLE `Submission`
  ADD CONSTRAINT `Submission_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Submission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
