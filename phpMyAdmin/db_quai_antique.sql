-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 18 mars 2023 à 11:37
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_quai_antique`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

CREATE TABLE `articles` (
  `article_id` bigint(20) NOT NULL,
  `url_picture` text NOT NULL,
  `title` text NOT NULL,
  `content` text DEFAULT NULL,
  `target` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`article_id`, `url_picture`, `title`, `content`, `target`) VALUES
(1, 'images/image_acceuil1.jpg\r\n', ' Une cuisine Gastronomique savoyarde\nmoderne et généreuse.', NULL, 'acceuil'),
(2, 'images/cuisine_savoyarde.jpg', 'Cuisine savoyarde qui fait reve ! ', 'La cuisine savoyarde naît et se développe à l’époque médiévale, alors que la Famille de Savoie démontre sa grandeur, entre autre, au travers de son art de vivre.\r\n\r\nC’est principalement la situation géographique des Pays de Savoie qui explique la diversité de sa gastronomie. D’abord point de passage d’Est en Ouest, le Duché de Savoie bénéficie des épices d’Orient telles que le poivre, la muscade, le clou de girofle et le safran. Ensuite, à cheval sur les Alpes, son développement culinaire est principalement composé de pâtes, de polenta, mais aussi des pommes de terre et des fromages savoyards. Enfin, les recettes savoyardes se sont diversifiées et enrichies grâce à la charcuterie, les fruits secs, les noix, les pruneaux, ou encore les raisins secs.', 'edito'),
(3, 'images\\image_carte.jpg', 'NOTRE CARTE', NULL, 'carte'),
(4, 'images/image_menu.jpg', 'NOS MENUS', NULL, 'menu');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `categorie_id` bigint(20) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`categorie_id`, `name`) VALUES
(1, 'Entrées'),
(2, 'Plat'),
(3, 'Dessert'),
(4, 'Spécialites regionales');

-- --------------------------------------------------------

--
-- Structure de la table `illustrations`
--

CREATE TABLE `illustrations` (
  `illustration_id` bigint(20) NOT NULL,
  `url_picture` text NOT NULL,
  `title` text NOT NULL,
  `position` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `illustrations`
--

INSERT INTO `illustrations` (`illustration_id`, `url_picture`, `title`, `position`, `active`) VALUES
(1, 'images/card_1.jpg', 'Lapin farci à la Tomme ', 1, 1),
(2, 'images/card_2.jpg', 'Mini hamburgers', 2, 1),
(3, 'images/card_3.jpg', 'Tania Courchevel', 3, 1),
(4, 'images/card_4.jpg', 'La polente', 4, 1),
(5, 'images/card_5.webp', 'Fondue savoyarde', 5, 1);

-- --------------------------------------------------------

--
-- Structure de la table `menus`
--

CREATE TABLE `menus` (
  `menu_id` bigint(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `position` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `menus`
--

INSERT INTO `menus` (`menu_id`, `name`, `description`, `price`, `position`, `active`) VALUES
(1, 'MENU SYMPHONIE ', 'AMUSE-BOUCHE+ENTREES + PLATS + DESSERT', '79.00', 1, 1),
(2, 'MENU DIAMANT ', 'AMUSE-BOUCHE + ENTREES + PLATS  OU AMUSE-BOUCHE + PLATS + DESSERT', '49.00', 2, 1),
(3, 'MENU SPÉCIAL ENFANT', 'Le chef  vous propose dans le menu enfant un véritable steack haché frais 100 % pur muscle\r\n de bœuf, haché par nos soins à la commande.', '15.00', 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `pictures`
--

CREATE TABLE `pictures` (
  `picture_id` bigint(20) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `taille` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `bin` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `plats`
--

CREATE TABLE `plats` (
  `plat_id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `categorie_id` bigint(20) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `position` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `plats`
--

INSERT INTO `plats` (`plat_id`, `name`, `description`, `categorie_id`, `price`, `position`, `active`) VALUES
(1, 'L’œuf bio cuisson parfaite à 62° ', 'Sur un lit de morilles au vin jaune et copeau de foie gras, servi en suspension de verren', 1, '19.00', 1, 1),
(2, 'Noix de Saint Jacques coquilles de nos côtes bretonnes ', 'juste saisies à la plancha, beurre aux agrumes et mousseline de cerfeuil tubéreux', 1, '29.00', 2, 1),
(3, 'Escalopes de foie gras de canard poêlées ', 'Au caramel de Banyules, mousseline de patates douces fumées, figues de solliès et polenta au Beaufort', 1, '19.00', 3, 1),
(4, 'Le Lapin farci à la Tomme de Savoie et crème de cèpes. ', 'Au mousseline de patates douces fumées', 2, '48.00', 1, 1),
(5, 'Mini-hamburgers au reblochon ', 'Servi avec frites et salade', 2, '35.00', 2, 1),
(6, 'Cœur de filet de bœuf Charolais ', 'Sauce Mondeuse réduction de Mondeuse d’Arbin', 2, '39.00', 3, 1),
(7, 'Crème brûlée à la vanille Bourbon ', 'Caramélisée au sucre cassonade, servie avec une tuile aux amandes', 3, '12.00', 1, 1),
(8, 'Délice au chocolat noir Valhrona coulant à cœur  ', 'Servi avec une glace à la vanille « maison»', 3, '12.00', 2, 1),
(9, 'Tarte Tatin au pommes de Savoies  ', 'Caramélisées à la vanille Bourbon, servie avec une double crème fouettée et une glace vanille « maison »', 3, '12.00', 3, 1),
(10, 'Fondue savoyarde au Beaufort ', 'Servie avec une salade verte', 4, '26.00', 1, 1),
(11, 'Fondue savoyarde des montagnards aux cèpes\r\nbouchons extra  ', 'Servie avec des charcuteries et une salade verte', 4, '34.00', 2, 1),
(12, 'Véritable reblochonnade fermière au feu de bois ', 'Reblochon fermier fondu à la braise sur des pommes de terre accompagné d’un assortiment de charcuteries et d’une salade verten', 4, '33.00', 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `reservation_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `nb_guests` int(11) NOT NULL,
  `reservation_date` date NOT NULL,
  `allergies` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `schedules`
--

CREATE TABLE `schedules` (
  `schedule_id` bigint(20) NOT NULL,
  `day` varchar(10) NOT NULL,
  `open_time` time NOT NULL,
  `close_time` time NOT NULL,
  `nb_max_clients` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `schedules`
--

INSERT INTO `schedules` (`schedule_id`, `day`, `open_time`, `close_time`, `nb_max_clients`) VALUES
(1, 'lundi ', '12:00:00', '14:00:00', 35),
(2, 'lundi', '19:00:00', '22:00:00', 35),
(3, 'mardi ', '12:00:00', '14:00:00', 35),
(4, 'mardi', '19:00:00', '22:00:00', 35),
(5, 'mercredi', '00:00:00', '00:00:00', 0),
(6, 'jeudi', '12:00:00', '14:00:00', 35),
(7, 'jeudi', '19:00:00', '22:00:00', 35),
(8, 'vendredi', '12:00:00', '14:00:00', 35),
(9, 'vendredi', '19:00:00', '22:00:00', 35),
(10, 'samedi', '12:00:00', '14:00:00', 35),
(11, 'Dimanche', '12:00:00', '14:00:00', 35);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `user_type` text DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `name` varchar(100) NOT NULL,
  `nb_guests` int(11) NOT NULL,
  `allergies` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `user_type`, `email`, `password`, `name`, `nb_guests`, `allergies`) VALUES
(1, 'Administrator', '', '', '', 0, NULL),
(14, 'admin', 'annanis06@hotmail.com', '$2b$10$TexkiosUxXdin7SrbrZBNuHhM2npjReps9CXUvl0DrEYc5wD5V9da', 'anna', 0, 'ble , gluten');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`article_id`),
  ADD UNIQUE KEY `target` (`target`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categorie_id`);

--
-- Index pour la table `illustrations`
--
ALTER TABLE `illustrations`
  ADD PRIMARY KEY (`illustration_id`);

--
-- Index pour la table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`menu_id`);

--
-- Index pour la table `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`picture_id`);

--
-- Index pour la table `plats`
--
ALTER TABLE `plats`
  ADD PRIMARY KEY (`plat_id`),
  ADD KEY `categorie_id` (`categorie_id`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `article_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `categorie_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `illustrations`
--
ALTER TABLE `illustrations`
  MODIFY `illustration_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `menus`
--
ALTER TABLE `menus`
  MODIFY `menu_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `pictures`
--
ALTER TABLE `pictures`
  MODIFY `picture_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `plats`
--
ALTER TABLE `plats`
  MODIFY `plat_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `reservation_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `schedule_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `plats`
--
ALTER TABLE `plats`
  ADD CONSTRAINT `plats_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`categorie_id`);

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
