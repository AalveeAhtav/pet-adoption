CREATE DATABASE IF NOT EXISTS AnimalShelter;
USE AnimalShelter;

CREATE TABLE Pet (
    petID INT(6) NOT NULL AUTO_INCREMENT,
    petName CHAR(20) NOT NULL,
    species CHAR(10) NOT NULL,
    breed CHAR(50) DEFAULT 'Mixed Breed',
    age INT(2) DEFAULT NULL,
    arrivalDate DATE NOT NULL,
    status CHAR(10) DEFAULT 'Sheltered',

    PRIMARY KEY (petID)
);


CREATE TABLE Customer (
    customerID INT(6) NOT NULL AUTO_INCREMENT,
    Fname VARCHAR(20) NOT NULL,
    Lname VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    phoneNumber VARCHAR(15),

    PRIMARY KEY (customerID)
);


CREATE TABLE AppliesForAdoption (
    applicationID INT(6) NOT NULL AUTO_INCREMENT,
    petID INT(6) NOT NULL,
    customerID INT(6) NOT NULL,
    status CHAR(10) DEFAULT 'Pending',

    PRIMARY KEY (applicationID),

    CONSTRAINT fk_application_pet
        FOREIGN KEY (petID)
        REFERENCES Pet(petID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_application_customer
        FOREIGN KEY (customerID)
        REFERENCES Customer(customerID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE Adoption (
    adoptionID INT(6) NOT NULL AUTO_INCREMENT,
    petID INT(6) NOT NULL,
    customerID INT(6) NOT NULL,
    feePaid DECIMAL(10,2) NOT NULL,
    adoptionDate DATETIME NOT NULL,

    PRIMARY KEY (adoptionID),

    CONSTRAINT fk_adoption_pet
        FOREIGN KEY (petID)
        REFERENCES Pet(petID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_adoption_customer
        FOREIGN KEY (customerID)
        REFERENCES Customer(customerID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE Foster (
    fosterID INT(6) NOT NULL AUTO_INCREMENT,
    petID INT(6) NOT NULL,
    customerID INT(6) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE,

    PRIMARY KEY (fosterID),

    CONSTRAINT fk_foster_pet
        FOREIGN KEY (petID)
        REFERENCES Pet(petID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_foster_customer
        FOREIGN KEY (customerID)
        REFERENCES Customer(customerID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);