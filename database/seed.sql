USE AnimalShelter;

-- --------------------
-- CLEAR EXISTING DATA (avoid duplicates / FK errors)
-- --------------------
DELETE FROM adoption;
DELETE FROM foster;
DELETE FROM appliesforadoption;
DELETE FROM customer;
DELETE FROM pet;

-- --------------------
-- PET DATA (from your frontend)
-- --------------------
INSERT INTO pet 
(petID, petName, species, breed, age, arrivalDate, status, gender, location, image, description, purpose)
VALUES
(1, 'Max', 'Dog', 'Golden Retriever', 2, CURDATE(), 'Available', 'Male', 'Dallas, TX',
'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
'Max is a friendly and playful dog who loves long walks, attention, and spending time with families. He would make a great forever companion for an active home.',
'adoption'),

(2, 'Bella', 'Dog', 'Labrador', 1, CURDATE(), 'Available', 'Female', 'Plano, TX',
'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
'Bella is gentle, affectionate, and still adjusting to shelter life. She is currently looking for a safe foster home where she can feel comfortable and cared for.',
'foster'),

(3, 'Oliver', 'Cat', 'Tabby Cat', 3, CURDATE(), 'Available', 'Male', 'Richardson, TX',
'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=800&q=80',
'Oliver is a calm and curious cat who enjoys cozy naps and quiet afternoons. He is ready for a permanent home where he can settle in and be loved.',
'adoption'),

(4, 'Daisy', 'Dog', 'Beagle', 2, CURDATE(), 'Available', 'Female', 'Garland, TX',
'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80',
'Daisy is energetic, sweet, and always excited to meet new people. She would do well with a family that can give her playtime, attention, and a loving forever home.',
'adoption'),

(5, 'Rocky', 'Dog', 'German Shepherd', 4, CURDATE(), 'Available', 'Male', 'McKinney, TX',
'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
'Rocky is loyal and intelligent, but he needs a temporary foster placement while he continues his transition. He does best with structure, patience, and a calm environment.',
'foster'),

(6, 'Luna', 'Cat', 'Siamese Cat', 1, CURDATE(), 'Available', 'Female', 'Frisco, TX',
'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=800&q=80',
'Luna is affectionate, playful, and loves being near people. She is available for adoption and would be a wonderful fit for someone looking for a loving companion.',
'adoption'),

(7, 'Charlie', 'Dog', 'Poodle', 2, CURDATE(), 'Available', 'Male', 'Irving, TX',
'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
'Charlie is smart, friendly, and easy to bond with. He is currently looking for a foster home that can give him consistent care and a comfortable place to stay.',
'foster'),

(8, 'Milo', 'Cat', 'Orange Tabby', 0, CURDATE(), 'Available', 'Male', 'Dallas, TX',
'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80',
'Milo is a young and playful kitten full of energy and curiosity. He is available for adoption and would thrive in a home ready for a fun and lovable new addition.',
'adoption');

-- --------------------
-- CUSTOMER DATA (fake users)
-- --------------------
INSERT INTO customer (customerID, Fname, Lname, email, address, phoneNumber)
VALUES
(1, 'John', 'Doe', 'john@email.com', 'Dallas, TX', '2141111111'),
(2, 'Jane', 'Smith', 'jane@email.com', 'Plano, TX', '9722222222');

-- --------------------
-- SAMPLE APPLICATIONS
-- --------------------
INSERT INTO appliesforadoption (petID, customerID, status)
VALUES
(1, 1, 'Pending'),
(3, 2, 'Approved');

-- --------------------
-- SAMPLE ADOPTIONS
-- --------------------
INSERT INTO adoption (petID, customerID, feePaid, adoptionDate)
VALUES
(3, 2, 150.00, NOW());

-- --------------------
-- SAMPLE FOSTER RECORDS
-- --------------------
INSERT INTO foster (petID, customerID, startDate, endDate)
VALUES
(5, 1, CURDATE(), NULL);