CREATE TABLE calculator(
	id SERIAL PRIMARY KEY,
	type VARCHAR (20) NOT NULL,
	operation VARCHAR (5),
	number VARCHAR (5)
);

INSERT INTO calculator (type, operation, number) VALUES
('add', '+', 'null'),
('subtract', '-', 'null'),
('multiply', 'x', 'null'),
('divide', '÷', 'null'),
('equals', '=', 'null'),
('clear', 'C', 'null'),
('decimal', '.', 'null'),
('mPlus', 'M+', 'null'),
('mMinus', 'M-', 'null'),
('mClear', 'MRC', 'null'),
('0', 'null', '0'),
('1', 'null', '1'),
('2', 'null', '2'),
('3', 'null', '3'),
('4', 'null', '4'),
('5', 'null', '5'),
('6', 'null', '6'),
('7', 'null', '7'),
('8', 'null', '8'),
('9', 'null', '9');
