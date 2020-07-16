
/* récupére la dernière connexion d'un utilisateur
select dateConnexion from connexion where idUtilisateur='4'
order by  dateConnexion desc
limit 1
*/

/*récupére toutes les candidature d'un utilisateur
select * from Candidature join Offre on Offre.id=Candidature.idOffre  where idUtilisateur='8'
*/

/*récupére le delai fixe d'un utilisateur
select * from Utilisateur join DelaiFixe on DelaiFixe.idUtilisateur=Utilisateur.id
where idUtilisateur='4'
*/

/*récupére les compétences recherchées d'une offre
select * from CompOff join Competence on Competence.id=CompOff.idCompetence 
join Offre on Offre.id=CompOff.idOffre 
where idOffre='1a71489e9da93bb69fe1d0a84d471627'
*/