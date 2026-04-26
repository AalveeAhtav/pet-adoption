# Database Contract (Team Managed SQL)

This project expects a MySQL database managed by a teammate.  
The backend should only rely on this contract.

## Connection settings
- `DB_HOST`
- `DB_PORT` (default `3306`)
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

## App ports
- Frontend: `5173`
- Backend API: `5000`

## Required tables and columns

### `pet`
- `pet_id` (PK, int)
- `pet_name` (string)
- `species` (string)
- `breed` (string)
- `age` (int, nullable allowed)
- `arrival_date` (date)
- `status` (string)

### `customer`
- `customer_id` (PK, int)
- `fname` (string)
- `lname` (string)
- `email` (string, unique recommended)
- `address` (string, nullable)
- `phone_number` (string, nullable)

### `foster`
- `foster_id` (PK, int)
- `pet_id` (FK -> `pet.pet_id`)
- `customer_id` (FK -> `customer.customer_id`)
- `start_date` (date)
- `end_date` (date, nullable)

### `adoption`
- `adoption_id` (PK, int)
- `pet_id` (FK -> `pet.pet_id`)
- `customer_id` (FK -> `customer.customer_id`)
- `fee_paid` (decimal)
- `adoption_date` (datetime)

### `application_status`
- `status_id` (PK, int)
- `status_name` (string, e.g. `Pending`, `Approved`, `Rejected`)

### `applies_for_adoption`
- `application_id` (PK, int)
- `pet_id` (FK -> `pet.pet_id`)
- `customer_id` (FK -> `customer.customer_id`)
- `status_id` (FK -> `application_status.status_id`)
- `applied_at` (datetime)

## Foreign key behavior (recommended)
- Use `ON DELETE RESTRICT` for:
  - `foster.pet_id`
  - `foster.customer_id`
  - `adoption.pet_id`
  - `adoption.customer_id`
  - `applies_for_adoption.pet_id`
  - `applies_for_adoption.customer_id`
  - `applies_for_adoption.status_id`

## Integration checklist
1. Teammate shares DB credentials + host.
2. Add values to backend `.env` from `.env.example`.
3. Confirm table/column names match this file exactly.
4. Test one read query and one insert query from backend.
