drop table if exists "Utilisateurs"  cascade;
drop table if exists "DelaiFixes" cascade;
drop table if exists "Offres" cascade;
drop table if exists "Candidatures" cascade;
drop table if exists "Competences" cascade;
drop table if exists "CompOffs" cascade;
drop table if exists "Connexions" cascade;
drop table if exists "Entretiens" cascade;

create table "Utilisateurs" (
id serial primary key,
nom text not null,
email text not null unique,
delaiFixe boolean not null,
motDePasse text not null	
);

create table "DelaiFixes"(
	id serial primary key,
	idUtilisateur int not null unique,
	foreign key (idUtilisateur) references "Utilisateurs"(id),
	duree int not null
	
);

create table "Offres"(
	id text primary key,
	poste text not null,
	nomEntreprise text not null,
	url text not null,
	nomContact text,
	fonctionContact text,
	telContact text,
	emailContact text
);

create table "Candidatures"(
	idUtilisateur int not null,
	idOffre text not null,
	dateCandidature date not null,
	dateRelance date,
	dureeRelance int,
	statut text not null,
	relance boolean default false,
	foreign key (idUtilisateur) references "Utilisateurs"(id),
	foreign key(idOffre) references "Offres"(id),
	primary key(idUtilisateur, idOffre)
);

create table "Competences"(
	id serial primary key,
	intitule text not null
);

create table "CompOffs"(
	idCompetence int not null,
	idOffre text not null,
	niveau text not null,
	foreign key(idOffre) references "Offres"(id),
	foreign key(idCompetence) references "Competences"(id),
	primary key(idCompetence, idOffre)
);
create table "Connexions"(
	idConnexion serial primary key,
	idUtilisateur int,
	dateConnexion date not null,
	foreign key(idUtilisateur) references "Utilisateurs"(id)
);

create table "Entretiens"(
	idEntretien serial primary key,
	idUtilisateur int,
	idOffre text,
	dateEntretien date not null,
	typeEntretien text not null,
	foreign key(idUtilisateur,idOffre) references "Candidatures"(idUtilisateur,idOffre)
);



INSERT INTO "Utilisateurs"(nom, email, delaiFixe, motDePasse) VALUES  
 ('Dorothée Pottier', 'marcel.mahe@noos.fr', '0', '9UR>q&SUzZxxG&LN}'), 
 ('Noémi Guichard-Meunier', 'ballain@laporte.com', '0', '=s.4cw8jnYToa2y)6j='), 
 ('Bertrand Joubert', 'rodriguez.christelle@sfr.fr', '0', '=vnR]-X}XCO'), 
 ('Dominique Torres', 'dasilva.gregoire@tele2.fr', '1', 'YB$$w2b(jo<eS.4K)[:'), 
 ('Sylvie de la Letellier', 'pbegue@collet.fr', '1', 'F!-NU1%=|nKd5?H$e7'), 
 ('Augustin Salmon', 'droussel@lucas.net', '0', 'FF:|\cAaErp\y($T'), 
 ('Grégoire Colas-Cousin', 'alphonse.grondin@dupont.fr', '0', 'YygP>=ENm'), 
 ('Olivie Charrier', 'susan.olivier@garcia.com', '0', 'sbV&iyNui8]>i&8<oV8'), 
 ('Rémy Le Wagner', 'antoine.turpin@allard.fr', '0', 'oZ=79n#\=7F|$j[r2`C9'), 
 ('Patrick de Delattre', 'dallain@mercier.fr', '1', 'lvTweO[CK=WOGc:Qrf');


INSERT INTO "DelaiFixes" (idUtilisateur,duree) VALUES  
('5','10'), 
('10','15'), 
('4','10') ;


INSERT INTO "Offres" VALUES
('8208c06de074317f97759a8a89273594', 'Etancheur', 'Albert', 'http://chauvet.org/consecteturmolestiaeetoptiodistinctio.html','andré simon','Directeur des ressources humaines','0708091011','andre.simon@chauvet.org');


INSERT INTO "Offres" (id, poste, nomEntreprise, url) VALUES  
 ('97eb48793051342b86ef121e022c037e', 'Chef des ventes', 'Lejeune', 'http://www.rolland.fr/'), 
 ('170730306317311d81b9d16c7aa2b1fe', 'Plasticien', 'Lefebvre SA', 'https://www.marin.com/commodilaboriosamautetutetmollitiaautnulla'), 
 ('742fef19d5d431c2b79475b1289444ce', 'Testeur informatique', 'Fleury Gilbert SARL', 'http://www.michaud.fr/optiominusetautincidunt'), 
 ('c6510dff479433b5a38ed0c8b6726466', 'Jointeur de placage', 'Lefort', 'http://mendes.fr/utilloofficiisutdolorin'), 
 ('76cbd453440a35ce897c7d1b5c75a758', 'Conseiller relooking', 'Lecoq S.A.', 'http://www.leblanc.org/inexpeditaquidemsuscipitquisquamvoluptas'), 
 ('e8c25b092da530769aecd00dadbf0a5b', 'Médiateur judiciaire', 'Couturier', 'http://blondel.fr/consecteturexcepturiutaperiamodiomaximerecusandae.html'), 
 ('d6e28e24f24437f2a05460a92cf34171', 'Vendeur en épicerie', 'Coste', 'https://guyot.com/quiasequiconsequaturrerumasperioresab.html'), 
 ('e188b8b7fc9c369ab587021222d6a6ed', 'Logistique', 'Vaillant SA', 'http://faure.com/eumcorruptidelectusquaeveritatis'), 
 ('ea1031b6b55234efbcad0797793ae733', 'Régleur funéraire', 'Lefebvre', 'http://antoine.com/adharumofficiissoluta.html'), 
 ('4362b4ba3eb03afbb503a69d0c58547d', 'Quincaillier', 'Guillot', 'https://www.vallet.com/cupiditateprovidenteteainciduntautsedautsoluta'), 
 ('4e79f1a27f93384d83a1a3ac302b2ae6', 'Scénariste', 'Guichard', 'https://barthelemy.com/possimusetipsummaximenesciunteosquiutet.html'), 
 ('794ac3f6ce1e34bbac05d972fe15c736', 'Défloqueur d amiante', 'Gimenez', 'http://merle.com/hicdeserunteacorruptiaut.html'), 
 ('c1afd373bfb43056b533e6c8601830dc', 'Fraiseur', 'Pelletier S.A.R.L.', 'http://www.jourdan.fr/etrerumquibusdamdoloreminullamsintet'), 
 ('cf6c8f6440e53bd0b27bec58ce9ee974', 'Ravaleurragréeur', 'Pinto', 'https://www.lefebvre.com/incumquelaboreipsafaciliseum'), 
 ('03bbca69e2aa3706af1e8ff65f5f2ac9', 'Radio chargeur', 'Hernandez SAS', 'http://rousseau.fr/officiisquisquammolestiasiureexpeditanisicommodisit'), 
 ('1c8dd4e0d1b73df194e53afc97237320', 'Toiliste', 'Huet et Fils', 'http://www.turpin.com/sintverobeataecommodisolutamaioresnesciunt'), 
 ('0243624531f93d689ba5aa9f7bd6d08d', 'Bruiteur', 'Robin', 'https://mahe.com/doloremexplicaboquasest.html'), 
 ('53e32cd4ae673aecacdb3a036ac9a51b', 'Gérant de tutelle', 'Remy SA', 'http://chretien.com/doloremolestiaesequivitaesequivoluptate.html'), 
 ('c67b771e65d3357d86a18c60b43ee496', 'Coffreur béton armé', 'Pichon Dupuis S.A.R.L.', 'http://www.jean.fr/porromolestiaeconsectetureos'), 
 ('c317ee5bd5ee393ca91dec37ece5ffac', 'Ramasseur d endives', 'Gregoire Arnaud S.A.R.L.', 'https://aubry.org/quianequesitoditenim.html'), 
 ('da880b73d6cb3e8591566066d72692b5', 'Artificier spectacle', 'Leduc Fouquet et Fils', 'http://www.ferreira.com/fugiatminimafacilisdictaetrerumrerum.html'), 
 ('6235744cfcd6334a8bbc7fcb57fd3b89', 'Lexicographe', 'Vasseur Alexandre SAS', 'http://paris.com/verototamsedrepudiandaeipsamteneturdoloremoptio.html'), 
 ('50af718490043517928f3ae2fe355582', 'Costumierhabilleur', 'Alexandre S.A.S.', 'https://morvan.fr/suntasperioresnihildignissimosat.html'), 
 ('a7776fbd8a3f31539293f6c98c8c03e0', 'Costumierhabilleur', 'Rousset Lefort et Fils', 'http://rossi.com/hicvoluptasfugiatatdelenitiassumendaplaceat.html'), 
 ('e9b63c93acc73afdb6fd825516dbc362', 'Elagueurbotteur', 'Perrin S.A.R.L.', 'https://martin.org/cumveritatisadofficiasimiliquequisimiliquenamharum.html'), 
 ('cb2f695671e33bb09e408603d0fb57c7', 'Pontonnier', 'Collet SAS', 'http://www.herve.fr/adipiscioccaecatietin'), 
 ('e07adfb76d4138039d5d66d36a7d361b', 'Chef des ventes', 'Guichard', 'http://regnier.fr/etetnostrumsedqui'), 
 ('6fa9d852f5753563ad05110be3397c9b', 'Etiqueteur', 'Gallet', 'http://guichard.com/quiarationevoluptasplaceatenimutvel'), 
 ('5772784b2f953e31a84d019a4e31ddac', 'Ingénieur bâtiment', 'Fournier', 'http://www.dijoux.com/'), 
 ('ef577ba2a3cb3db49a61311ebb3546f1', 'Assurance', 'Lecomte Jacquet SARL', 'https://lombard.org/distinctioipsumetetqui.html'), 
 ('da7285f4ea4435018e035329c09525bc', 'Etainier', 'Hoareau SARL', 'http://www.lefevre.com/'), 
 ('5b45631dd7583303b06c519d57b0f612', 'Facteur de clavecins', 'Mallet SARL', 'http://pires.fr/'), 
 ('5c6c3ddcfb9b3c17aa670e31a8e8b485', 'Danse', 'Gallet SAS', 'http://reynaud.fr/etoptioeosfacilisquiveniammagni'), 
 ('3fb7c09478c1323d81b71f934cf56241', 'Plisseur', 'Simon Rousseau SA', 'http://www.fernandes.fr/recusandaevoluptatesnequeconsequaturdoloremvoluptatumautodit'), 
 ('ae2c7c37e62734abbd5e1dd0e5ac09ed', 'Monteurtruquiste', 'Delaunay', 'http://www.barthelemy.org/eumtotamrerumquas'), 
 ('a1e9fdb836543a238a4a98af4189b980', 'Hydrothérapie', 'Chauvet', 'http://auger.net/'), 
 ('6ba093cfda3835f88579e370886394da', 'Gérant de tutelle', 'Rey', 'http://www.monnier.fr/ducimusrepudiandaequoseuminventoreeaquemagnam'), 
 ('1a6680cb58103c718e01b97c755e39f0', 'Armurier spectacle', 'Marie S.A.S.', 'http://www.andre.net/'), 
 ('eb13d12a49a13afea4c6959e6b4a4a12', 'Gynécologue', 'Dias', 'http://www.guillot.com/animidolorvelitquorerumcorruptietcorrupti'), 
 ('a901820a73d931ab95d482cb86dc1a0f', 'Flaconneur', 'Gros', 'http://www.lefebvre.fr/dolorharumveleaquelaudantiumconsecteturet'), 
 ('9d3855ad249331a8afc8636bf5e46bd1', 'Percepteur', 'Dos Santos Letellier S.A.S.', 'http://lelievre.fr/sintdoloresrerumsequisoluta.html'), 
 ('1b3746ec558838c9bd89903b18a6e88c', 'Conseiller funéraire', 'Guerin S.A.S.', 'http://www.guerin.fr/avoluptateautnonetsuscipiteaqueut'), 
 ('51476e5e2b4d3dc3b2aba822cb6ab958', 'Animateur d écomusée', 'Benard S.A.R.L.', 'http://petit.fr/quaeeumlaudantiumundeporronecessitatibusdoloresmagni'), 
 ('7cdfa0f9586f393cb8f4164cfba8a269', 'Plaquiste enduiseur', 'Salmon', 'http://www.guibert.fr/ipsumnonautvoluptatibusqui'), 
 ('c22f761a78343c549f39c919ce024a70', 'Palefrenier', 'Cohen', 'http://joseph.net/consequaturquosdoloremrepellatest'), 
 ('288ce19379333478ac98d60e607df7a8', 'Coffreurferrailleur', 'Michel', 'http://www.courtois.com/nihilhicdolorumtotamea.html'), 
 ('cb97dc452f1536b9bd398cfab896232d', 'Monteur audiovisuel', 'Thierry Lombard et Fils', 'http://www.potier.com/beataebeataereiciendiserrorestnonsitdistinctiomagni'), 
 ('87ca8a1039173ecb8106dc561ef419f8', 'Chef du personnel', 'Vallee', 'https://www.leduc.fr/estillumprovidentcorporiseosautemsequidolorevel'), 
 ('96b9bb0384c33a7d836eb43becf5569d', 'Coffreur béton armé', 'Lebreton', 'http://www.blanchard.fr/autfacilisutdoloresprovidentrerumdoloremperferendis'), 
 ('79f447c48e463480982c0a5f22b17af7', 'Porteur de journaux', 'Leveque', 'https://rodrigues.fr/quimaioresomnisveritatisdoloribusprovidentdignissimos.html'), 
 ('1a71489e9da93bb69fe1d0a84d471627', 'Bruiteur', 'Laurent Tessier SA', 'https://jacquet.net/voluptatibusestveniamporroeosvoluptatumquaeratliberolaudantium.html'), 
 ('9051c0a5107f38d3b236848a56960312', 'Ingénieur du son', 'Fernandez SARL', 'http://www.allain.org/veniamquieoslaborum'), 
 ('76623a37020e312dac4ededef88d93ae', 'Choréologue', 'Garnier et Fils', 'http://laporte.fr/eaqueitaquenullatotamnumquamvoluptatemquae'), 
 ('68dea6e33a7735788963dbc12b9ab074', 'Endivier', 'Etienne SAS', 'http://www.ribeiro.com/molestiasexplicaboconsequaturfacilisvoluptates'), 
 ('a302e461d6853af68266a96216e4deee', 'Pédologue', 'Le Roux', 'http://www.ribeiro.com/quaeratadipiscitemporeautetveroest'), 
 ('cfc54e516b773fe697bedd2d771a0f09', 'Dégustateur', 'Philippe', 'https://ferreira.net/doloresipsamnatusvoluptasblanditiisaspernaturanimidistinctio.html'), 
 ('84a1c6bd33f53f73be57a66a2d3bd7db', 'Brigadier', 'Chauveau SA', 'http://renard.fr/'), 
 ('90c470ac8ceb35909b2ff0329e2a6bfc', 'Services funéraires', 'Auger SAS', 'http://remy.fr/voluptasasperioreseumoccaecatidoloretiureexplicabo'), 
 ('625ba15995d0349dad2a51cffb67ddc7', 'Aide couvreur', 'Lesage Perez SA', 'http://www.jacques.com/sintearumsuscipitremodioprovidenteum'), 
 ('59be4cff8d8538fa93f9ba883436d2ce', 'Opérateur du son', 'Delahaye', 'https://brunel.fr/quiadelectuslaborumnonfugitplaceatsequisuntid.html'), 
 ('0ec821c8005b3be58c5e31cc10f85161', 'Artificier spectacle', 'Leger', 'https://fleury.org/doloressuscipitnamquisquampraesentium.html'), 
 ('0948801f475d355693ac1d86d276d533', 'Second de cuisine', 'Noel', 'http://www.pineau.fr/'), 
 ('604dfa93a663354aaee5013fb85c3139', 'Etainier', 'Foucher', 'http://munoz.net/'), 
 ('2ef6196262663bb99f9230d4294213c2', 'Assistant des ventes', 'Peltier Poirier SAS', 'http://www.bertrand.com/faceresuscipitsedhicdolorem.html'), 
 ('488cbc7e454c3de4a7d69d586660402b', 'Ambassadeur', 'Jean', 'http://www.alves.fr/'), 
 ('d59e5b60860b3540a9d145a2a656dd7b', 'Géologue prospecteur', 'Techer', 'https://www.berger.com/nihilquiquisetodit'), 
 ('950a0a29b22a3def907154f33e03edc5', 'Miroitier', 'Goncalves S.A.R.L.', 'http://www.maillot.net/dolorsuntsuntquaerataut'), 
 ('16878f923af8355097de7c9cd5b21493', 'Chargé de recherche', 'Baron', 'http://seguin.fr/voluptatumteneturharumquouteos.html'), 
 ('73861280a46a3d38a2d8bc4db2c16a54', 'Topographe', 'Voisin', 'https://arnaud.com/maioresetidcorruptiquosequicorporisdolorumquis.html'), 
 ('28847043141c3f3aa898fdd68d854453', 'Ouvrier sidérurgiste', 'Benoit Leveque SARL', 'http://bertrand.org/voluptasquisequiomnisestquasisimiliquequam'), 
 ('1896f85ee6b430d881ffc2d53bf8fc9b', 'Soliermoquettiste', 'Carpentier', 'http://roy.fr/estexercitationemeumsuscipit'), 
 ('fcaba369782e31e3982e415849399f74', 'Dégustateur', 'Pereira et Fils', 'https://potier.com/magnammodiminimaautdoloremmodilaboreaperiamet.html'), 
 ('e35335506eb13a7a846f2def4a964c56', 'Employé d étage', 'Leclercq Schmitt et Fils', 'http://boucher.fr/sedipsamsolutaabaperiamvoluptatemautem.html'), 
 ('65721bba11c73af28b83457296931835', 'Chef des ventes', 'Herve', 'http://www.remy.com/quisestquorerumeligendi.html'), 
 ('ab3568bfd05f331c83a208ca1830e462', 'Turbinier', 'Baudry SARL', 'http://blanchet.net/sequiexcepturiipsumetvelitetminima'), 
 ('c585e3f77f1c3f35b5a95cba15a9aab9', 'Essayeurretoucheur', 'Lemonnier Becker S.A.R.L.', 'http://chauvin.net/quiatqueinutasperioresexpeditaneque'), 
 ('b46d1dd4df023b0c994825c75a2267ab', 'Tôliertraceur', 'Tessier SA', 'http://www.delattre.com/'), 
 ('198057f8214735029aca5251b069c1dd', 'Recherche', 'Da Silva Dumont SAS', 'https://marchal.fr/distinctiosolutacupiditateconsequaturodit.html'), 
 ('9f270ec4214b38629058ef01d87504f9', 'Opérateur piquage', 'Fernandez', 'http://clement.fr/'), 
 ('61b81235829230829ed825ecd05f30a9', 'Turbinier', 'Faivre Bonnet S.A.R.L.', 'http://www.giraud.fr/'), 
 ('6227e41a495f3f6cb2627332c49e7509', 'Opérateur du son', 'Ferreira', 'http://www.gilles.fr/faceresintnatusaliquidomnisvel'), 
 ('10ec41e9584f304d8912e8ee1ad75495', 'Galeriste', 'Sanchez SAS', 'https://www.laporte.fr/doloresdistinctioexpeditaoccaecatiestabad'), 
 ('48f24fc0a44230728ec69ee39827e05f', 'Monteur prototypiste', 'Boulay', 'http://www.valentin.net/assumendaadipiscimolestiaevoluptatemvoluptatibussapientesed.html'), 
 ('42902aa6b95f3644a8728c33b7aac561', 'Poseur de granit', 'Gaillard', 'http://www.pierre.net/ipsamofficiisnobisabquidemcorporis'), 
 ('ffeeddf44c4a39f79b01693a0bc06dd8', 'Contrebassiste', 'Huet', 'http://duhamel.fr/corruptitemporaodiosimiliquevelitexomnisculpa'), 
 ('a0a717558b743125bc5da7b90abe3291', 'Ouvrier d abattoir', 'Gomes SAS', 'https://www.neveu.net/debitisetnonvoluptasducimusetminima'), 
 ('f1242eef9a11332693ad4537695f16ed', 'Assistant logistique', 'Dupre', 'http://peltier.com/'), 
 ('cfb4b2e9b6063c449985d44ec5919d4e', 'Opérateur vidéo', 'Perrin', 'http://www.mace.fr/doloremveniamautvoluptatem.html'), 
 ('72604b2945d532df8449bd85b8af4063', 'Chef du personnel', 'Descamps', 'http://www.laroche.fr/oditaccusamusipsamblanditiisest'), 
 ('f6ed95255fa9307090412a743fc15721', 'Maître de ballet', 'Boulanger Noel SA', 'http://www.rodriguez.com/'), 
 ('d14ffb2e5afe38a3af2dec85737ed052', 'Jointeur de placage', 'Paris', 'http://marty.com/'), 
 ('5e435ebb42aa35ba8b834f79cae43878', 'Pédicure pour bovin', 'Vincent Nguyen S.A.R.L.', 'http://www.chevalier.com/seddoloresexplicaboautiusto.html'), 
 ('8d14260db0233aeeb7f9e72036c14e30', 'Secrétaire juridique', 'Seguin', 'http://www.noel.net/doloresofficiisconsequaturcorruptiutfugiatminima'), 
 ('0c751ec161273ce4aeae48ed39ea42f2', 'Ingénieur bâtiment', 'Lefebvre', 'https://lemaire.com/voluptatehicquimodialiasducimusaspernaturlaboriosam.html'), 
 ('77db2d5929e43ce18bfe6a3deeb88e88', 'Verrier à la main', 'Bouchet', 'http://www.lopes.fr/doloremvoluptatemquibusdamdoloressedaliquidutmaxime.html'), 
 ('5fb527bfed9d3076a5cb1d1148b4ab42', 'Maître de ballet', 'Poulain', 'https://guichard.fr/consecteturnobisvoluptatibusquiadipiscimolestiae.html'), 
 ('4c5d3c37a95432c89931f14760b4be23', 'Pilote automobile', 'Dupre Mendes SAS', 'http://www.guyon.fr/numquamidnequedoloremquequasioptiopraesentiumminus.html'), 
 ('8ae296f8529c3108b33ec90f7eba508c', 'Monteur prototypiste', 'Marion', 'http://picard.fr/'), 
 ('5e84fe13ca9d36f18b43512c080aa30a', 'Diététicien conseil', 'Aubry Joseph SAS', 'http://www.jourdan.com/repellatdictaveritatisenimprovidentofficianonreiciendis');


Insert into "Competences"(intitule) Values
( 'Gestion de trésorerie '),
( 'Gestion de stock '),
( 'Gestions de projets '),
( 'Utiliser les outils CRM '),
( 'Maitrise de excell '),
( 'Autonomie ');

Insert into "CompOffs"(idCompetence,idOffre,niveau) Values
('2','1a71489e9da93bb69fe1d0a84d471627','expert'),
( '5 ', '61b81235829230829ed825ecd05f30a9','débutant'),
( '3', 'a7776fbd8a3f31539293f6c98c8c03e0' ,'confirmé'),
( '4 ','f1242eef9a11332693ad4537695f16ed', 'débutant');

Insert into "Candidatures"(idUtilisateur,idOffre,dateCandidature,dateRelance,dureeRelance,Statut) Values
('5','1a71489e9da93bb69fe1d0a84d471627','14/07/2020','24/07/2020','10','en attente'),
('2','61b81235829230829ed825ecd05f30a9','8/07/2020','23/07/2020','15','accepté'),
('4','61b81235829230829ed825ecd05f30a9','6/07/2020','16/07/2020','10','refusé'),
('8','a7776fbd8a3f31539293f6c98c8c03e0','18/07/2020','28/07/2020','10','en attente'),
('8','f1242eef9a11332693ad4537695f16ed','13/06/2020','28/06/2020','15','refusé');


INSERT INTO "Connexions"(idUtilisateur,dateConnexion) values
('1','25/06/2020'),
('1','16/07/2020'),
('4','15/07/2020');

INSERT INTO "Entretiens"(idUtilisateur,idOffre,dateEntretien,typeEntretien) values
('8','f1242eef9a11332693ad4537695f16ed','29/06/2020','telephonique'),
('2','61b81235829230829ed825ecd05f30a9','25/07/2020','individuel');

/* supprime la ligne d'un utilisateur dans delai fixe si il passe d'un delai fixe a un delai flexible*/


create or replace function change_delai_fixe() returns trigger as $change_delai_fixe$
begin 
if new.delaiFixe=false then
delete from "DelaiFixes"
where idUtilisateur= new.id;
end if;
return null;
end;
$change_delai_fixe$ language plpgsql;

create trigger change_delai_fixe after update on "Utilisateurs" for each row 
execute procedure change_delai_fixe();



/*change les dates de relance + durée de relance des candidatures d'un utilisteur quand il change son delai fixe*/
drop trigger if exists change_duree_delai_fixe on "delaiFixes";
drop function if exists change_duree_delai_fixe();

create or replace function change_duree_delai_fixe() returns trigger as $change_duree_delai_fixe$
begin 
update  "Candidatures"
set dureeRelance=new.duree , dateRelance= dateCandidature+(new.duree* interval '1 day')
where idUtilisateur=new.idUtilisateur;
return null;
end;
$change_duree_delai_fixe$ language plpgsql;

create trigger change_duree_delai_fixe after insert or update on "DelaiFixes" for each row 
execute procedure change_duree_delai_fixe();

/* calcule la date de relance selon la durée de la relance*/

create or replace function calc_date_relance() returns trigger as $calc_date_relance$
begin 
if 
/* si je n'ai pas de duree de relance cela prend notre durée de relance fixe*/
new.dureeRelance is null then
new.dureeRelance:=(select duree from "delaiFixes" where idUtilisateur= new.idUtilisateur);
end if;
new.dateRelance:= new.dateCandidature+(new.DureeRelance*interval'1 day');
return new;
end;
$calc_date_relance$ language plpgsql;

create trigger calc_date_relance before insert  on "Candidatures" for each row 
execute procedure calc_date_relance();