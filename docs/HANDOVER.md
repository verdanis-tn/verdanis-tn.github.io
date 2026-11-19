# Guide de transfert et d'administration

Objectif : que **l'entreprise** soit propriétaire de chaque compte (code, hébergement, CMS, domaine, facturation), et non une personne extérieure.

## 1. Comptes à créer au nom de l'entreprise

Utiliser une adresse e-mail professionnelle de l'entreprise (pas une adresse personnelle).

| Service | Rôle | Coût |
|---|---|---|
| GitHub (organisation) | Code source **et hébergement** (GitHub Pages) | Gratuit (dépôt public) |
| Formspree | Réception du formulaire de contact | Gratuit (50 messages/mois) |
| Sanity | Administration du contenu | Gratuit (offre Free) |
| Registrar `.tn` (ATI, revendeur agréé) | Nom de domaine (facultatif) | Annuel |

## 2. Organisation GitHub et hébergement

Même principe que le site ETB Ouaret : une organisation GitHub, un dépôt public `<organisation>.github.io`, et un site servi à l'adresse `https://<organisation>.github.io/`.

Procédure détaillée, pas à pas : **[DEPLOY_GITHUB_PAGES.md](DEPLOY_GITHUB_PAGES.md)**. En résumé :

1. github.com → **New organization** (offre **Free**) → créer le dépôt **public** vide `<organisation>.github.io`.
2. Pousser le code : `git remote add origin https://github.com/<organisation>/<organisation>.github.io.git` puis `git push -u origin main`.
3. **Settings → Pages → Source : GitHub Actions**. Le site se reconstruit automatiquement à chaque modification.
4. Garder au moins **deux Owners** dans l'organisation (dont Rabeh), pour ne jamais perdre l'accès.

## 3. Hébergement alternatif (Vercel)

Le projet fonctionne aussi sur un serveur (Vercel) : le formulaire passe alors par la route intégrée `/api/contact` (SMTP, pièces jointes acceptées). Voir le README.

## 4. Administration du contenu (Sanity)

1. Créer le projet sur sanity.io/manage avec le compte de l'entreprise, puis suivre le README (section CMS).
2. Inviter Rabeh comme **Administrator**.
3. Dans l'administration, Rabeh peut :
   - modifier les textes FR / AR / EN (chaque champ affiche les trois langues côte à côte) ;
   - téléverser des photos, en décochant « Image d'illustration » pour une vraie photo de chantier ;
   - ajouter et modifier des réalisations (avec un registre interne des marchés, jamais publié) ;
   - ajouter des expertises et publier des actualités ;
   - mettre à jour les coordonnées publiques et les mentions légales ;
   - enregistrer des **brouillons**, invisibles sur le site tant qu'il n'a pas cliqué sur *Publish*.

## 5. Mise en ligne

1. Compléter et signer le rapport de vérification (`private/VERIFICATION_REPORT.md`, conservé hors du dépôt public).
2. Remplacer les images d'illustration par de vraies photos autorisées (recommandé).
3. GitHub → Settings → Secrets and variables → Actions → Variables : `LAUNCH_APPROVED` = `true`, puis relancer le workflow.
