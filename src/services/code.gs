/**
 * Google Apps Script - Backend SEF (Version Production)
 * Formulaire de collecte des données personnelles des membres STAR
 * 
 * INSTALLATION :
 * 1. Remplacez votre code actuel par celui-ci
 * 2. Enregistrez (Ctrl+S)
 * 3. C'est prêt !
 */

// Configuration
const SHEET_NAME = 'Membres SEF';
const ADMIN_EMAIL = 'naby.kakonde@secoursevangeliquedefrance.com';

/**
 * Fonction appelée lors d'une requête POST
 */
function doPost(e) {
  try {
    // Parser les données JSON
    const data = JSON.parse(e.postData.contents);
    
    // Obtenir la feuille de calcul
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Créer la feuille si elle n'existe pas
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      setupHeaders(sheet);
    }
    
    // Ajouter les données
    addMemberData(sheet, data);
    
    // Envoyer une notification email
    sendNotificationEmail(data);
    
    // Retourner une réponse de succès
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Données enregistrées avec succès'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Erreur: ' + error.toString());
    
    // Retourner une erreur
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Configurer les en-têtes de colonnes
 */
function setupHeaders(sheet) {
  const headers = [
    'Date de soumission',
    'Prénom',
    'Nom',
    'Date de naissance',
    'Adresse postale',
    'Email',
    'Téléphone',
    'Situation familiale',
    'Enfants',
    'Nombre d\'enfants',
    'Âges des enfants',
    'Date d\'arrivée à ICC',
    'Baptisé',
    'Lieu de baptême',
    'Formations',
    'Autres formations',
    'Ministères passé',
    'Autres ministères passé',
    'Ministères actuel',
    'Autres ministères actuel',
    'Famille de disciples',
    'Nom de la famille',
    'Raison non intégration',
    'Services actuels SEF',
    'Autres services',
    'Situation personnelle',
    'Sujets de prière'
  ];
  
  // Définir les en-têtes
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Formater les en-têtes
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#667eea')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  
  // Figer la première ligne
  sheet.setFrozenRows(1);
  
  // Ajuster la largeur des colonnes
  sheet.autoResizeColumns(1, headers.length);
  
  // Définir la hauteur de la ligne d'en-tête
  sheet.setRowHeight(1, 40);
}

/**
 * Ajouter les données d'un membre
 */
function addMemberData(sheet, data) {
  const row = [
    data.dateSubmission || new Date().toISOString(),
    data.prenom || '',
    data.nom || '',
    data.dateNaissance || '',
    data.adressePostale || '',
    data.email || '',
    data.telephone || '',
    data.situationFamiliale || '',
    data.enfants || '',
    data.nombreEnfants || '',
    data.agesEnfants || '',
    data.dateArriveeICC || '',
    data.baptise || '',
    data.lieuBapteme || '',
    data.formations || '',
    data.autresFormations || '',
    data.ministeresPassé || '',
    data.autresMinisteresPassé || '',
    data.ministeresActuel || '',
    data.autresMinisteresActuel || '',
    data.familleDisciples || '',
    data.nomFamille || '',
    data.raisonNonIntegration || '',
    data.serviceActuel || '',
    data.autresServices || '',
    data.situationPersonnelle || '',
    data.sujetsPreire || ''
  ];
  
  // Ajouter la ligne à la fin
  sheet.appendRow(row);
  
  // Appliquer un style alterné pour la lisibilité
  const lastRow = sheet.getLastRow();
  
  if (lastRow % 2 === 0) {
    sheet.getRange(lastRow, 1, 1, row.length).setBackground('#f9fafb');
  }
  
  // Ajouter des bordures
  sheet.getRange(lastRow, 1, 1, row.length)
    .setBorder(true, true, true, true, true, true, '#e0e0e0', SpreadsheetApp.BorderStyle.SOLID);
  
  // Ajuster automatiquement la hauteur de ligne
  sheet.autoResizeRows(lastRow, 1);
}

/**
 * Envoyer une notification email à la responsable
 */
function sendNotificationEmail(data) {
  try {
    const subject = `[SEF] Nouveau membre enregistré : ${data.prenom} ${data.nom}`;
    
    const htmlBody = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
              <h2 style="color: white; margin: 0;">Nouveau membre SEF enregistré</h2>
            </div>
            
            <!-- Content -->
            <div style="padding: 20px; background: #ffffff;">
              
              <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px;">
                Informations personnelles
              </h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px; font-weight: bold; width: 40%;">Nom complet :</td>
                  <td style="padding: 8px;">${data.prenom} ${data.nom}</td>
                </tr>
                <tr style="background: #f9fafb;">
                  <td style="padding: 8px; font-weight: bold;">Email :</td>
                  <td style="padding: 8px;">${data.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Téléphone :</td>
                  <td style="padding: 8px;">${data.telephone}</td>
                </tr>
                <tr style="background: #f9fafb;">
                  <td style="padding: 8px; font-weight: bold;">Date de naissance :</td>
                  <td style="padding: 8px;">${data.dateNaissance || 'Non renseignée'}</td>
                </tr>
              </table>
              
              <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px;">
                Ministères et Services
              </h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px; font-weight: bold; width: 40%;">Ministères actuels :</td>
                  <td style="padding: 8px;">${data.ministeresActuel || 'Aucun'}</td>
                </tr>
                ${data.autresMinisteresActuel ? `
                <tr style="background: #f9fafb;">
                  <td style="padding: 8px; font-weight: bold;">Autres ministères :</td>
                  <td style="padding: 8px;">${data.autresMinisteresActuel}</td>
                </tr>
                ` : ''}
                <tr ${data.autresMinisteresActuel ? '' : 'style="background: #f9fafb;"'}>
                  <td style="padding: 8px; font-weight: bold;">Services actuels :</td>
                  <td style="padding: 8px;">${data.serviceActuel || 'Aucun'}</td>
                </tr>
                ${data.autresServices ? `
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Autres services :</td>
                  <td style="padding: 8px;">${data.autresServices}</td>
                </tr>
                ` : ''}
              </table>
              
              ${data.sujetsPreire ? `
              <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px;">
                Sujets de prière
              </h3>
              <div style="padding: 12px; background: #fff5e6; border-left: 4px solid #ff9800; margin-bottom: 20px;">
                ${data.sujetsPreire}
              </div>
              ` : ''}
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
              
              <p style="text-align: center; margin-bottom: 20px;">
                <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}" 
                   style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  📊 Voir la feuille de calcul
                </a>
              </p>
              
            </div>
            
            <!-- Footer -->
            <div style="padding: 20px; background: #f5f5f5; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                © SEF 2026 - Secours Évangélique de France<br>
                Email automatique - Merci de ne pas y répondre
              </p>
            </div>
            
          </div>
        </body>
      </html>
    `;
    
    // Envoyer l'email
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    
  } catch (error) {
    Logger.log('Erreur envoi email: ' + error.toString());
    // Ne pas bloquer l'enregistrement si l'email échoue
  }
}

/**
 * Fonction de test (à exécuter manuellement pour tester)
 */
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        prenom: 'Jean',
        nom: 'Test',
        email: 'jean.test@example.com',
        telephone: '0612345678',
        dateNaissance: '1990-01-15',
        adressePostale: '123 Rue Test, 75001 Paris',
        situationFamiliale: 'Marié(e)',
        enfants: 'oui',
        nombreEnfants: '2',
        agesEnfants: '5 ans, 8 ans',
        dateArriveeICC: '2020-03-15',
        baptise: 'ICC',
        formations: 'BDR, 101, 201',
        autresFormations: '',
        ministeresPassé: 'MINISTÈRE DE LA LOUANGE',
        autresMinisteresPassé: '',
        ministeresActuel: 'MINISTÈRE DE L\'ACCUEIL, STAFF PASTORAL',
        autresMinisteresActuel: 'Ministère jeunesse locale',
        familleDisciples: 'oui',
        nomFamille: 'Famille Alpha',
        serviceActuel: 'Communication Relations Publiques et Marketing, Digital Informatique et Numérique',
        autresServices: 'Aide aux devoirs communautaire',
        situationPersonnelle: 'Situation stable',
        sujetsPreire: 'Prière pour la famille',
        dateSubmission: new Date().toISOString()
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log('Résultat du test: ' + result.getContent());
}

/**
 * Fonction pour créer un rapport mensuel
 * Peut être configurée pour s'exécuter automatiquement chaque mois
 */
function generateMonthlyReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    Logger.log('Aucune donnée disponible');
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1);
  
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  // Compter les nouveaux membres ce mois-ci
  let monthCount = 0;
  rows.forEach(row => {
    const dateSubmission = new Date(row[0]);
    if (dateSubmission >= firstDayOfMonth) {
      monthCount++;
    }
  });
  
  // Envoyer un email de rapport
  const subject = `[SEF] Rapport mensuel - ${monthCount} nouveaux membres`;
  const body = `
    Bonjour,
    
    Voici le rapport mensuel du formulaire SEF :
    
    - Nouveaux membres ce mois : ${monthCount}
    - Total de membres : ${rows.length}
    
    Consultez la feuille de calcul : ${ss.getUrl()}
    
    Cordialement,
    Système SEF
  `;
  
  MailApp.sendEmail(ADMIN_EMAIL, subject, body);
}