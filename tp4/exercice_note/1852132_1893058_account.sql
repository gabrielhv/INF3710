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
ISOLATION LEVEL READ COMMITTED;
SELECT balance - 500 as bal into balanceb
FROM Accounts WHERE acctID = 101;
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
\set AUTCOMMIT 'off';
BEGIN;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SELECT balance -200 as bal into balancea
-- on rajoute FOR UPDATE pour vérrouiller le tuple
FROM Accounts WHERE acctID = 101 FOR UPDATE;
SELECT bal FROM balancea;

-- TRANSACTION B
\set AUTCOMMIT 'off';
BEGIN;
SET TRANSACTION
ISOLATION LEVEL READ COMMITTED;
SELECT balance - 500 as bal into balanceb
-- on rajoute FOR UPDATE pour vérrouiller le tuple
FROM Accounts WHERE acctID = 101 FOR UPDATE;
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


-- Q2-a

-- Le niveau d’isolation étant à READ COMMITTED, la session A  ne verra pas les modifications
-- apportées par la session B avant le COMMIT de celle-ci.
-- Cela pourrait porter problème si les deux transaction sont exécutées en même temps.

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
SET TRANSACTION ISOLATION ISOLATION LEVEL READ COMMITTED;
-- ISOLATION LEVEL REPEATABLE READ;
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

-- Il n’y aura aucune différence puisque REPEATABLE READ ne voit que les modifications 
-- qui sont apportées dans la même transaction et puisques ces modifications sont faites 
-- dans la transaction B, le problème trouvé en a) reste inchangé.


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
ISOLATION LEVEL REPEATABLE READ COMMITTED;
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

--- Q2-c

-- Le niveau d’isolation de la transaction A est en REPEATBLE READ 
-- et ne voit donc pas les modifications qui n’ont pas été COMMIT 
-- par les autres transactions. Ainsi, toutes les modification apportées 
-- par la transaction B sont ignorées puisqu’elles ne sont jamais COMMIT.
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
INSERT INTO Accounts (acctID, balance) VALUES (301,3000);

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

DROP TABLE if EXISTS balancea CASCADE;
DROP TABLE if EXISTS balanceb CASCADE;
DELETE FROM Accounts;
INSERT INTO Accounts (acctID, balance) VALUES (101, 1000);
INSERT INTO Accounts (acctID, balance) VALUES (202, 2000);
SELECT * FROM Accounts;


-- TRANSACTION A
\set AUTCOMMIT 'off';
BEGIN;

-- TRANSACTION B
\set AUTCOMMIT 'off';
BEGIN;

-- TRANSACTION A
UPDATE Accounts SET balance = 9999 WHERE acctID = 101;

-- TRANSACTION B
UPDATE Accounts SET balance = 3333 WHERE acctID = 202;

-- TRANSACTION A
UPDATE Accounts SET balance = 2222 WHERE acctID = 202;

-- TRANSACTION B
UPDATE Accounts SET balance = 1111 WHERE acctID = 101;


