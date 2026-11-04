---
ai_project: null
status: en cours
---

## Attentes
- Site du Mouvement Le Cercle (mouvementlecercle.com), hébergé chez Hostinger.
- Inscriptions à la newsletter envoyées par Hostinger (`src/envoi.php`) vers contact@mouvementlecercle.com ; jusqu'ici l'envoi était simulé et aucune inscription n'était transmise (en PR).

## Blocages
- Aucun

## Prochaines étapes
- Créer les secrets GitHub du déploiement (`FTP_SERVER` = nom d'hôte du serveur Hostinger, `FTP_USERNAME`, `FTP_PASSWORD`) et, si besoin, la variable `FTP_SERVER_DIR`, puis merger la PR.
- Après le premier déploiement : s'inscrire à la newsletter depuis le site et vérifier la réception sur contact@mouvementlecercle.com (indésirables compris).
- `src/old/` (ancienne version, avec EmailJS et SmtpJS) : exclu du déploiement ; à supprimer du serveur s'il y est encore, et du dépôt si Jean le décide.
- Lien `ai_project` du projet Claude à renseigner.
