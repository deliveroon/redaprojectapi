INSERT INTO genre VALUES (1, 'homme');
INSERT INTO genre VALUES (2, 'femme');
INSERT INTO genre VALUES (3, 'none');

INSERT INTO question_type VALUES (1, 'information');
INSERT INTO question_type VALUES (2, 'recherche');

-- Question 1
INSERT INTO profile_question(id, name, typeId, optional) VALUES (1, 'Fumez-vous des cigarettes ?', 1, true);
INSERT INTO profile_answer (id, name, questionId) VALUES (1, 'Tous les jours', 1);
INSERT INTO profile_answer (id, name, questionId) VALUES (2, 'De temps en temps', 1);
INSERT INTO profile_answer (id, name, questionId) VALUES (3, 'Jamais', 1);

-- Question 2
INSERT INTO profile_question(id, name, typeId, optional) VALUES (2, 'Consommez-vous des boissons alcolisées ?', 1, true);
INSERT INTO profile_answer (id, name, questionId) VALUES (4, 'Tous les jours', 2);
INSERT INTO profile_answer (id, name, questionId) VALUES (5, 'De temps en temps', 2);
INSERT INTO profile_answer (id, name, questionId) VALUES (6, 'Jamais', 2);

-- Matching 1
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (1, 100, 1, 1);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (2, 50, 1, 2);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (3, 0, 1, 3);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (4, 50, 2, 1);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (5, 100, 2, 2);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (6, 70, 2, 3);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (7, 0, 3, 1);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (8, 70, 3, 2);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (9, 100, 3, 3);

-- Matching 2
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (10, 100, 4, 4);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (12, 50, 4, 5);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (13, 0, 4, 6);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (14, 100, 5, 4);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (15, 70, 5, 5);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (16, 40, 5, 6);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (17, 100, 6, 4);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (18, 100, 6, 5);
INSERT INTO matching_coeff(id, coefficient, firstAnswerId, secondAnswerId) VALUES (19, 100, 6, 6);
/* 
SELECT us2.id,
us2.username,
SUM(mc.coefficient)/2 as matching_point
FROM user us1, 
user us2, 
user_profile up1,
user_profile up2,
matching_coeff mc
WHERE us1.username = 'cherifoulefou'
AND us1.id != us2.id
AND us1.id = up1.userId
AND us2.id = up2.userId
AND mc.firstAnswerId = up1.answerId
AND mc.secondAnswerId = up2.answerId
ORDER BY matching_point DESC;
 */