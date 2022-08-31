
CREATE TABLE MasterLogin
(
    MasterLoginId INT NOT NULL PRIMARY KEY , -- primary key column
    email_Username VARCHAR(50),
    password [NVARCHAR](50) NOT NULL,
    isActive BIT
    -- specify more columns here
);
GO


CREATE TABLE login
(
    loginId INT NOT NULL PRIMARY KEY, -- primary key column
    username_email [NVARCHAR](50) NOT NULL,
    password [NVARCHAR](50) NOT NULL,isActive bit,masterId int
    -- specify more columns here
);
GO



