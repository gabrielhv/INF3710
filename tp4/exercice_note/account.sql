SET search_path = public;
CREATE TABLE Accounts (
acctID INTEGER NOT NULL PRIMARY KEY,
balance INTEGER NOT NULL,
CONSTRAINT remains_nonnegative CHECK (balance >= 0)
);

--  data
DROP TABLE if EXISTS balancea CASCADE;
DROP TABLE if EXISTS balanceb CASCADE;
DELETE FROM Accounts;
INSERT INTO Accounts (acctID, balance) VALUES (101, 1000);
INSERT INTO Accounts (acctID, balance) VALUES (202, 2000);
SELECT * FROM Accounts;


--Q1 a
-- Réponse
-- Le problème est qu’une donnée est modifiée en concurrence,
-- mais l’instruction de modification de la session A est commit alors que la session B a accédé à la vieille version de la donnée pour y effectuer sa modification.
-- Ainsi, la modification de la session B efface celle de la session A.

-- TRANSACTION A
\set AUTCOMMIT 'off';
BEGIN;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SELECT balance -200 as bal into balancea
FROM Accounts WHERE acctID = 101;
SELECT bal FROM balancea;

-- TRANSACTION B
\set AUTCOMMIT 'off';
BEGIN;
SET TRANSACTION
ISOLATION LEVEL READ
COMMITTED;
SELECT balance - 500 as bal
into balanceb
FROM Accounts WHERE acctID =
101;
SELECT bal from balanceb;

-- TRANSACTION A
UPDATE Accounts
SET balance = (select bal
from balancea)
WHERE acctID = 101;


-- TRANSACTION B
UPDATE Accounts
SET balance = (select bal
from balanceb)
WHERE acctID = 101;

-- TRANSACTION A
SELECT acctID, balance
FROM Accounts
WHERE acctID = 101;
COMMIT;

-- TRANSACTION B
SELECT acctID, balance
FROM Accounts
WHERE acctID = 101;
COMMIT;

--  data
DROP TABLE if EXISTS balancea CASCADE;
DROP TABLE if EXISTS balanceb CASCADE;
DELETE FROM Accounts;
INSERT INTO Accounts (acctID, balance) VALUES (101, 1000);
INSERT INTO Accounts (acctID, balance) VALUES (202, 2000);
SELECT * FROM Accounts;

--- Q1 b

-- TRANSACTION A


-- TRANSACTION B


-- TRANSACTION A


-- TRANSACTION B


-- TRANSACTION A


-- TRANSACTION B


-- Q2-a

--  data
DROP TABLE if EXISTS balancea CASCADE;
DROP TABLE if EXISTS balanceb CASCADE;
DELETE FROM Accounts;
INSERT INTO Accounts (acctID, balance) VALUES (101, 1000);
INSERT INTO Accounts (acctID, balance) VALUES (202, 2000);
SELECT * FROM Accounts;

-- Transaction A
\set AUTCOMMIT 'off';
BEGIN;
SET TRANSACTION
ISOLATION LEVEL READ
COMMITTED;
--ISOLATION LEVEL
REPEATABLE READ;
SELECT * FROM Accounts
WHERE balance > 500;

-- Transaction B
\set AUTCOMMIT 'off';
BEGIN;
UPDATE Accounts
SET balance = balance - 500
WHERE acctID = 101;
UPDATE Accounts
SET balance = balance + 500
WHERE acctID = 202;
SELECT * FROM Accounts;
COMMIT;

-- Transaction A
SELECT * FROM Accounts
WHERE balance > 500;
-- Q2-b

--  data
DROP TABLE if EXISTS balancea CASCADE;
DROP TABLE if EXISTS balanceb CASCADE;
DELETE FROM Accounts;
INSERT INTO Accounts (acctID, balance) VALUES (101, 1000);
INSERT INTO Accounts (acctID, balance) VALUES (202, 2000);
SELECT * FROM Accounts;

-- Transaction A
\set AUTCOMMIT 'off';
BEGIN;
SET TRANSACTION
ISOLATION LEVEL REPEATABLE READ
COMMITTED;
--ISOLATION LEVEL
REPEATABLE READ;
SELECT * FROM Accounts
WHERE balance > 500;

-- Transaction B
\set AUTCOMMIT 'off';
BEGIN;
UPDATE Accounts
SET balance = balance - 500
WHERE acctID = 101;
UPDATE Accounts
SET balance = balance + 500
WHERE acctID = 202;
SELECT * FROM Accounts;
COMMIT;

-- Transaction A
SELECT * FROM Accounts
WHERE balance > 500;
--- Q3 
--  data
DROP TABLE if EXISTS balancea CASCADE;
DROP TABLE if EXISTS balanceb CASCADE;
DELETE FROM Accounts;
INSERT INTO Accounts (acctID, balance) VALUES (101, 1000);
INSERT INTO Accounts (acctID, balance) VALUES (202, 2000);
SELECT * FROM Accounts;

-- Transaction A
\set AUTCOMMIT 'off';
BEGIN;
SET TRANSACTION
ISOLATION LEVEL REPEATABLE
READ READ ONLY;
-- Transaction B
\set AUTCOMMIT 'off';
BEGIN;
INSERT INTO Accounts
(acctID,
balance) VALUES (301,3000);

-- Transaction A
SELECT * FROM Accounts
WHERE balance > 1000;
-- Transaction B
INSERT INTO Accounts
(acctID,
balance) VALUES (302,3000);


-- Transaction A
SELECT * FROM Accounts
WHERE balance > 1000;
COMMIT;

-- Q4- Deadlock

--- Transaction A


-- Transaction B

--- Transaction A


