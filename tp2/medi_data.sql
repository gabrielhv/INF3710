SET search_path = medi_schema;

INSERT INTO medi_schema.doctor(doctorID, doctorName, addressNumber, street, postalCode, phoneNumber, DOB , salary)
								VALUES ('D002', 'Mario', '213','Die street', 'J5E1A9','7825492648','19800327', 777777.777);
INSERT INTO medi_schema.doctor(doctorID, doctorName, addressNumber, street, postalCode, phoneNumber,DOB, salary)
								VALUES ('D001', 'Nightingale', '384','Die street', 'j8h0i7','1234567890','27390810', 666666.666);	
INSERT INTO medi_schema.doctor(doctorID, doctorName, addressNumber, street, postalCode, phoneNumber,DOB, salary)
								VALUES ('D003', 'Pablo Escobar', '2783','Coke Boulevard', 'l1l1l1','8462930175','09800625', 999999.999);	
								

INSERT INTO medi_schema.medicaldoctor(doctorID, overTimeRate)
								VALUES ('D002', 2.125);
INSERT INTO medi_schema.specialistdoctor(doctorID, fieldArea)
								VALUES ('D001', 'Oncology');
INSERT INTO medi_schema.specialistdoctor(doctorID, fieldArea)
								VALUES ('D003', 'Nose Job');						
								
INSERT INTO medi_schema.patient(patientNo, patientName, addressnumber, street, postalCode, phoneNumber,DOB, NAS)
								VALUES ('63289', 'littlemac', '38423','locker room street', 'k8j7h9','82935629','19500101','999999999');
								
INSERT INTO medi_schema.patient(patientNo, patientName, addressnumber, street, postalCode, phoneNumber,DOB, NAS)
								VALUES ('239259', 'BigMac', '6302','locker room road', 'k9g3h8','5149119111','18590713','000000001');
	
INSERT INTO medi_schema.payment(paymentNo, details, paymentMethod, patientNo)
								VALUES ('8389389', 'Poor with no health insurance', 'Visa','63289');
								
INSERT INTO medi_schema.payment(paymentNo, details, paymentMethod, patientNo)
								VALUES ('98237', 'bourgeois', 'Mastercard','239259');

INSERT INTO medi_schema.bill(billNo, total, doctorID)
								VALUES ('146987473', 987345.888, 'D001');
								
INSERT INTO medi_schema.bill(billNo, total, doctorID)
								VALUES ('674839283', 720672.620, 'D002');

INSERT INTO medi_schema.appointment(ApptNo, ApptDate, ApptTime, PatientNo, DoctorID)
								VALUES ('2828492', DATE'2019-07-18', '13:23:44', '63289', 'D001' );

INSERT INTO medi_schema.appointment(ApptNo, ApptDate, ApptTime, PatientNo, DoctorID)
								VALUES ('739361', DATE'2020-07-13', '13:23:44', '239259', 'D001' );
