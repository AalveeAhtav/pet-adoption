USE AnimalShelter;

-- --------------------
-- PET DATA
-- --------------------
INSERT INTO Pet (petName, species, breed, age, arrivalDate, status, gender, shelterLocation, purpose)
VALUES 
('Buddy', 'Dog', 'Golden Retriever', 3, '2026-01-10', 'Sheltered', 'Male', 'Dallas Shelter', 'adoption'),
('Luna', 'Cat', 'Siamese', 2, '2026-02-05', 'Sheltered', 'Female', 'Plano Shelter', 'adoption'),
('Max', 'Dog', 'German Shepherd', 5, '2026-03-01', 'Sheltered', 'Male', 'Richardson Shelter', 'adoption'),
('Bella', 'Cat', 'Persian', 4, '2026-02-20', 'Sheltered', 'Female', 'Dallas Shelter', 'adoption'),
('Charlie', 'Dog', 'Bulldog', 6, '2026-01-25', 'Sheltered', 'Male', 'Plano Shelter', 'foster');


-- --------------------
-- CUSTOMER DATA
-- --------------------
INSERT INTO Customer (Fname, Lname, email, address, phoneNumber)
VALUES
('John', 'Doe', 'john.doe@email.com', '123 Main St, Dallas, TX', '2145551234'),
('Sarah', 'Smith', 'sarah.smith@email.com', '456 Oak Ave, Plano, TX', '9725555678'),
('Michael', 'Brown', 'michael.brown@email.com', '789 Pine Rd, Richardson, TX', '4695559012'),
('Emily', 'Davis', 'emily.davis@email.com', '321 Cedar Ln, Dallas, TX', '2145553456');


-- --------------------
-- ADOPTION APPLICATIONS
-- --------------------
INSERT INTO AppliesForAdoption (petID, customerID, status, applicationType)
VALUES
(1, 1, 'Pending', 'adoption'),
(2, 2, 'Approved', 'adoption'),
(3, 3, 'Pending', 'adoption'),
(4, 4, 'Rejected', 'adoption');


-- --------------------
-- ADOPTIONS
-- --------------------
INSERT INTO Adoption (petID, customerID, feePaid, adoptionDate)
VALUES
(2, 2, 150.00, '2026-03-10 14:30:00'),
(4, 4, 120.00, '2026-03-15 11:00:00');


-- --------------------
-- FOSTER RECORDS
-- --------------------
INSERT INTO Foster (petID, customerID, startDate, endDate)
VALUES
(5, 1, '2026-03-01', NULL),
(3, 3, '2026-03-05', '2026-04-01');