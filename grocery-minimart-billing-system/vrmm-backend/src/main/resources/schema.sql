create table product
(
code BIGINT(15) not null,
name varchar(255) not null,
cost double not null,
mrp double not null,
retailPrice double not null,
wholesalerPrice double not null,
sgst double not null,
cgst double not null,
igst double not null,
category varchar(255) not null,
manufacturer varchar(255) not null,
unitDesc varchar(255) not null,
stockLocation varchar(255) not null,
hsnacs INT(15) not null,
active BOOLEAN not null,
primary key(code)
) ;

CREATE SEQUENCE PRODUCT_ID_SEQ
  MINVALUE 100000000001
  MAXVALUE 9999999999999999
  INCREMENT BY 1
  CACHE 10;	