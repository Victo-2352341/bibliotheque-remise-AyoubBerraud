-- ============================================================
-- Script de création de la base de données
-- Système de gestion de prêt pour les bibliothèques
-- Services Web - Hiver 2026
-- ============================================================

-- Créer la base de données (exécuter séparément si nécessaire)
-- CREATE DATABASE bibliotheque_db;
-- \c bibliotheque_db;

-- ============================================================
-- Table: bibliotheque
-- Contient les informations de chaque bibliothèque et sa clé API
-- ============================================================
CREATE TABLE IF NOT EXISTS bibliotheque (
    id       SERIAL PRIMARY KEY,
    nom      VARCHAR(100) NOT NULL,
    courriel VARCHAR(255) NOT NULL UNIQUE,
    cle_api  VARCHAR(30),
    password VARCHAR(100) NOT NULL
);

-- ============================================================
-- Table: livres
-- Contient les livres appartenant à chaque bibliothèque
-- ============================================================
CREATE TABLE IF NOT EXISTS livres (
    id              SERIAL PRIMARY KEY,
    bibliotheque_id INTEGER      NOT NULL REFERENCES bibliotheque(id) ON DELETE CASCADE,
    titre           VARCHAR(100) NOT NULL,
    auteur          VARCHAR(100) NOT NULL,
    isbn            VARCHAR(20)  NOT NULL,
    description     TEXT,
    date_ajout      DATE         DEFAULT CURRENT_DATE,
    disponible      BOOLEAN      DEFAULT TRUE
);

-- ============================================================
-- Table: prets
-- Contient les prêts associés à chaque livre
-- ============================================================
CREATE TABLE IF NOT EXISTS prets (
    id          SERIAL PRIMARY KEY,
    livre_id    INTEGER      NOT NULL REFERENCES livres(id) ON DELETE CASCADE,
    emprunteur  VARCHAR(100) NOT NULL,
    date_debut  DATE         DEFAULT CURRENT_DATE,
    date_retour DATE
);
