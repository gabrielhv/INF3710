SET search_path = medi_schema;

SELECT * 
FROM medi_schema.doctor;

SELECT * 
FROM medi_schema.patient, medi_schema.payment 
WHERE patient.patientNo = payment.patientNo;

SELECT * 
FROM medi_schema.appointment 
WHERE appointment.doctorID = 'D001';

SELECT * 
FROM medi_schema.doctor, medi_schema.specialistdoctor 
WHERE specialistdoctor.doctorID = doctor.doctorID;

SELECT patientName, DOB 
FROM medi_schema.patient;