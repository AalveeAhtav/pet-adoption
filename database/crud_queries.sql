USE AnimalShelter;


-- pet 
-- CREATE
INSERT INTO Pet (petName, species, breed, age, arrivalDate, status)
VALUES (?, ?, ?, ?, ?, ?);

-- READ
SELECT * FROM Pet;

SELECT * FROM Pet
WHERE petID = ?;

-- UPDATE
UPDATE Pet
SET petName = ?, species = ?, breed = ?, age = ?, status = ?
WHERE petID = ?;

-- DELETE
DELETE FROM Pet
WHERE petID = ?;


-- customer 
-- CREATE
INSERT INTO Customer (Fname, Lname, email, address, phoneNumber)
VALUES (?, ?, ?, ?, ?);

-- READ
SELECT * FROM Customer;

SELECT * FROM Customer
WHERE customerID = ?;

-- UPDATE
UPDATE Customer
SET Fname = ?, Lname = ?, email = ?, address = ?, phoneNumber = ?
WHERE customerID = ?;

-- DELETE
DELETE FROM Customer
WHERE customerID = ?;



-- applies for adoption

-- CREATE
INSERT INTO AppliesForAdoption (petID, customerID, status)
VALUES (?, ?, ?);

-- READ
SELECT * FROM AppliesForAdoption;

SELECT * FROM AppliesForAdoption
WHERE applicationID = ?;

-- UPDATE
UPDATE AppliesForAdoption
SET status = ?
WHERE applicationID = ?;

-- DELETE
DELETE FROM AppliesForAdoption
WHERE applicationID = ?;



-- adoption 
-- CREATE
INSERT INTO Adoption (petID, customerID, feePaid, adoptionDate)
VALUES (?, ?, ?, ?);

-- READ
SELECT * FROM Adoption;

SELECT * FROM Adoption
WHERE adoptionID = ?;

-- UPDATE
UPDATE Adoption
SET feePaid = ?, adoptionDate = ?
WHERE adoptionID = ?;

-- DELETE
DELETE FROM Adoption
WHERE adoptionID = ?;


--foster
-- CREATE
INSERT INTO Foster (petID, customerID, startDate, endDate)
VALUES (?, ?, ?, ?);

-- READ
SELECT * FROM Foster;

SELECT * FROM Foster
WHERE fosterID = ?;

-- UPDATE
UPDATE Foster
SET startDate = ?, endDate = ?
WHERE fosterID = ?;

-- DELETE
DELETE FROM Foster
WHERE fosterID = ?;