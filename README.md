# Configuration de GitHub Actions avec Vercel

Ce guide vous explique comment configurer GitHub Actions pour déployer automatiquement votre projet sur Vercel.

---

## Étape 1 : Configuration côté GitHub

1. **Accéder aux paramètres du dépôt** :
   - Rendez-vous sur votre dépôt GitHub.
   - Cliquez sur l'onglet **Settings**.

2. **Créer les secrets nécessaires** :
   - Allez dans **Secrets and variables > Actions** sous la section **Security**.
   - Cliquez sur le bouton **New repository secret** et ajoutez les clés suivantes :
     - **`VERCEL_ORG_ID`** : L'ID de votre organisation Vercel (disponible dans les paramètres de votre organisation sur Vercel).
     - **`VERCEL_PROJECT_ID`** : L'ID de votre projet Vercel (trouvable dans les paramètres du projet sur Vercel).
     - **`VERCEL_TOKEN`** : Un token d'accès personnel que vous pouvez générer dans votre compte Vercel :
       - Connectez-vous à Vercel.
       - Allez dans **Settings > Tokens**.
       - Cliquez sur **Create Token**, copiez-le, puis ajoutez-le comme secret GitHub.

3. **Créer un workflow GitHub Actions** :
   - Dans votre dépôt, créez un fichier sous le chemin `.github/workflows/vercel-deploy.yml`.
   - Ajoutez le contenu suivant :

     ```yaml
     name: Vercel Preview Deployment
     env:
       VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
       VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
     on:
       push:
         branches-ignore:
           - main
     jobs:
       Deploy-Preview:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v2
           - name: Install Vercel CLI
             run: npm install --global vercel@latest
           - name: Pull Vercel Environment Information
             run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
           - name: Build Project Artifacts
             run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
           - name: Deploy Project Artifacts to Vercel
             run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }} .
     ```

---

## Étape 2 : Configuration côté Vercel

1. **Accéder aux paramètres du projet** :
   - Connectez-vous à votre tableau de bord Vercel.
   - Sélectionnez votre projet.

2. **Vérifier les variables d'environnement** :
   - Dans l'onglet **Settings > Environment Variables**, ajoutez toutes les variables nécessaires pour votre projet.

3. **Lier le projet GitHub** :
   - Si ce n’est pas déjà fait, connectez votre projet Vercel à votre dépôt GitHub :
     - Allez dans l'onglet **Git**.
     - Cliquez sur **Connect Git Repository**.
     - Sélectionnez votre dépôt GitHub.

4. **Activer les builds de prévisualisation** :
   - Dans les paramètres Git, vérifiez que l’option **Preview Deployments** est activée.

---

## Étape 3 : Tester la configuration

1. Poussez un commit sur une branche autre que `main`.
2. Vérifiez que le workflow **Vercel Preview Deployment** est déclenché sur GitHub :
   - Allez dans l'onglet **Actions** de votre dépôt.
   - Assurez-vous que toutes les étapes du workflow s'exécutent correctement.
3. Une fois terminé, vérifiez sur votre tableau de bord Vercel que le déploiement de prévisualisation est actif.

---

## Résultat attendu

- À chaque fois que vous poussez un commit sur une branche autre que `main`, GitHub Actions déclenche un déploiement de prévisualisation sur Vercel.
- Vous pouvez accéder au lien de déploiement de prévisualisation fourni par Vercel.
