import React, { useState } from 'react';
import { apiService } from './services/config';
import logoSEF from '/logosef.jpeg'


export default function FormulaireSEF() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    dateNaissance: '',
    adressePostale: '',
    email: '',
    telephone: '',
    membreCiteRoyale: '',
    egliseLocale: '',
    situationProfessionnelle: '',
    secteurProfessionnel: '',
    entrepriseOrganisme: '',
    moyenTransport: '',
    situationFamiliale: '',
    enfants: '',
    nombreEnfants: '',
    agesEnfants: '',
    dateArriveeICC: '',
    baptise: '',
    lieuBapteme: '',
    formations: [],
    autresFormations: '',
    ministeresPassé: [],
    autresMinisteresPassé: '',
    ministeresActuel: [],
    autresMinisteresActuel: '',
    familleDisciples: '',
    nomFamille: '',
    raisonNonIntegration: '',
    familleImpact: '',
    nomFamilleImpact: '',
    raisonNonIntegrationImpact: '',
    serviceActuel: [],
    autresServices: '',
    viePreiereMeditation: '',
    niveauDiscipolat: '',
    presenceEglise: '',
    autrePresence: '',
    attentesMinistere: '',
    suggestionsAmeliorations: '',
    situationPersonnelle: '',
    sujetPriereMajeur: '',
    commentairesObservations: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formationsOptions = [
    'BDR', '001', '101', '102', '201', '202', '203', 'IEBI', 'RTT'
  ];

  const ministeresOptions = [
    'MINISTÈRE DE LA COMMUNICATION',
    'MINISTÈRE DES MÉDIAS',
    'MINISTÈRE DE LA CAPTATION AUDIOVISUELLE ET DE LA DIFFUSION',
    'MINISTÈRE DE LA RÉDACTION ET CONCEPTION PÉDAGOGIQUE',
    'STAFF PASTORAL',
    'MINISTERE DES SOINS PASTORAUX',
    'MINITÈRE DE LA PRIÈRE ET DE L\'INTERCESSION',
    'SAINTE-CÈNE',
    'MINISTÈRE DE L\'INTÉGRATION',
    'MINISTÈRE DE LA FORMATION',
    'MINISTÈRE DE LA LOUANGE ET DE L\'ADORATION',
    'COORDINATION ÉVÉNEMENTIELLE',
    'MINISTÈRE DE LA COMPASSION ET DES SOLIDARITÉS',
    'IMPACT SANTÉ',
    'MINISTÈRE DU DÉPLOIEMENT DES S.T.A.R',
    'MINISTÈRE DES FINANCES',
    'MINISTÈRE DES HOMMES D\'IMPACT',
    'MINISTÈRE DES FEMMES D\'IMPACT',
    'MINISTÈRE DE L\'ENFANCE',
    'ÉGLISE JEUNES PRODIGES',
    'MINISTÈRE DE LA FAMILLE',
    'CÉLIBATAIRES ÉPANOUIS ET PRODUCTIFS',
    'MINISTÈRE DE L\'ACCUEIL',
    'MINISTÈRE DU PROTOCOLE',
    'MINISTÈRE DE L\'ORDRE ET DE LA SÉCURITÉ',
    'IMPACT SANS FRONTIÈRES',
    'RESTAURATION',
    'COORDINATION DES ÉGLISES',
    'DÉCORATION',
    'ENTRETIEN',
    'MAINTENANCE & LOGISTIQUE',
    'MINISTÈRE DE LA CONQUÊTE',
    'MINISTÈRE MULTILINGUES'
  ];

  // NOUVEAU : Liste des services basée sur l'organigramme
  const servicesOptions = [
    'Communication, Relations Publiques et Marketing',
    'Logistique et Transport',
    'Digital, Informatique et Numérique',
    'Opérations de Solidarité et de Proximité',  // CORRIGÉ
    'Juridique et Conformité',
    'Audit, Contrôle de gestion',
    'Projets RH et Recrutement',
    'Partenariats et Stratégies de Financement',
    'Relation et Déploiement des Antennes et du SEM',
    'Accueil Général & Administration',
    'Finances et Comptabilité',
    'Gestion des opérations',
    'JESS - Jeunesse',
    'SSV - Santé Soins et Vie',
    'ARE - Accompagnement Réussite Éducative',
    'FAME - Famille et Enfants',
    'AAHL - Accès Hébergement et Logement',
    'NOUBES - Nourriture et Besoins Essentiels',
    'REIF - Réinsertion Emploi Insertion Formation',
    'AVITR - Animation Villes et Territoires',
    'SER - Seniors et Retraités',
    'CAS - Culture Art Sport'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'formations') {
        const updatedFormations = checked
          ? [...formData.formations, value]
          : formData.formations.filter(f => f !== value);
        setFormData({ ...formData, formations: updatedFormations });
      } else if (name === 'ministeresPassé') {
        const updatedMinisteres = checked
          ? [...formData.ministeresPassé, value]
          : formData.ministeresPassé.filter(m => m !== value);
        setFormData({ ...formData, ministeresPassé: updatedMinisteres });
      } else if (name === 'ministeresActuel') {
        const updatedMinisteres = checked
          ? [...formData.ministeresActuel, value]
          : formData.ministeresActuel.filter(m => m !== value);
        setFormData({ ...formData, ministeresActuel: updatedMinisteres });
      } else if (name === 'serviceActuel') {
        const updatedServices = checked
          ? [...formData.serviceActuel, value]
          : formData.serviceActuel.filter(s => s !== value);
        setFormData({ ...formData, serviceActuel: updatedServices });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Utiliser le service API configuré
      const result = await apiService.submitMember(formData);
      
      if (result.success) {
        setSubmitted(true);
        
        // Réinitialiser après 3 secondes
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            prenom: '',
            nom: '',
            dateNaissance: '',
            adressePostale: '',
            email: '',
            telephone: '',
            membreCiteRoyale: '',
            egliseLocale: '',
            situationProfessionnelle: '',
            secteurProfessionnel: '',
            entrepriseOrganisme: '',
            moyenTransport: '',
            situationFamiliale: '',
            enfants: '',
            nombreEnfants: '',
            agesEnfants: '',
            dateArriveeICC: '',
            baptise: '',
            lieuBapteme: '',
            formations: [],
            autresFormations: '',
            ministeresPassé: [],
            autresMinisteresPassé: '',
            ministeresActuel: [],
            autresMinisteresActuel: '',
            familleDisciples: '',
            nomFamille: '',
            raisonNonIntegration: '',
            familleImpact: '',
            nomFamilleImpact: '',
            raisonNonIntegrationImpact: '',
            serviceActuel: [],
            autresServices: '',
            viePreiereMeditation: '',
            niveauDiscipolat: '',
            presenceEglise: '',
            autrePresence: '',
            attentesMinistere: '',
            suggestionsAmeliorations: '',
            situationPersonnelle: '',
            sujetPriereMajeur: '',
            commentairesObservations: ''
          });
        }, 3000);
      } else {
        alert(result.message || 'Une erreur est survenue lors de l\'enregistrement.');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Une erreur est survenue. Veuillez réessayer ou contacter l\'administrateur.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '"Crimson Pro", "Georgia", serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        padding: '60px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        animation: 'slideIn 0.6s ease-out'
      }}>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
            
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            .form-section {
              margin-bottom: 48px;
              padding-bottom: 32px;
              border-bottom: 2px solid #f0f0f0;
              animation: fadeIn 0.8s ease-out;
            }
            
            .form-section:last-child {
              border-bottom: none;
            }
            
            .section-title {
              font-size: 24px;
              font-weight: 700;
              color: #667eea;
              margin-bottom: 24px;
              font-family: 'Crimson Pro', Georgia, serif;
            }
            
            .form-group {
              margin-bottom: 24px;
            }
            
            label {
              display: block;
              font-size: 15px;
              font-weight: 600;
              color: #333;
              margin-bottom: 8px;
              font-family: 'Inter', sans-serif;
            }
            
            input[type="text"],
            input[type="email"],
            input[type="tel"],
            input[type="date"],
            textarea,
            select {
              width: 100%;
              padding: 14px 16px;
              font-size: 16px;
              border: 2px solid #e0e0e0;
              border-radius: 8px;
              font-family: 'Inter', sans-serif;
              transition: all 0.3s ease;
              box-sizing: border-box;
            }
            
            input[type="text"]:focus,
            input[type="email"]:focus,
            input[type="tel"]:focus,
            input[type="date"]:focus,
            textarea:focus,
            select:focus {
              outline: none;
              border-color: #667eea;
              box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }
            
            textarea {
              min-height: 120px;
              resize: vertical;
            }
            
            .radio-group,
            .checkbox-group {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
            
            .radio-option,
            .checkbox-option {
              display: flex;
              align-items: center;
              gap: 10px;
            }
            
            .checkbox-option:hover {
              background: rgba(102, 126, 234, 0.05);
              padding: 4px;
              margin: -4px;
              border-radius: 4px;
            }
            
            input[type="radio"],
            input[type="checkbox"] {
              width: 20px;
              height: 20px;
              cursor: pointer;
              accent-color: #667eea;
            }
            
            /* Style pour les scrollbars des listes de ministères */
            *::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            
            *::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 4px;
            }
            
            *::-webkit-scrollbar-thumb {
              background: #667eea;
              border-radius: 4px;
            }
            
            *::-webkit-scrollbar-thumb:hover {
              background: #5568d3;
            }
            
            .checkbox-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
              gap: 12px;
            }
            
            button[type="submit"] {
              width: 100%;
              padding: 18px;
              font-size: 18px;
              font-weight: 600;
              color: white;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border: none;
              border-radius: 12px;
              cursor: pointer;
              font-family: 'Inter', sans-serif;
              transition: all 0.3s ease;
              margin-top: 32px;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            }
            
            button[type="submit"]:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
            }
            
            button[type="submit"]:active {
              transform: translateY(0);
            }
            
            .success-message {
              background: #10b981;
              color: white;
              padding: 20px;
              border-radius: 12px;
              text-align: center;
              font-size: 18px;
              font-weight: 600;
              margin-top: 24px;
              animation: fadeIn 0.5s ease-out;
            }
            
            .header-badge {
              display: inline-block;
              background: #fef3c7;
              color: #92400e;
              padding: 6px 14px;
              border-radius: 20px;
              font-size: 13px;
              font-weight: 600;
              margin-bottom: 16px;
              font-family: 'Inter', sans-serif;
            }
          `}
        </style>

        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <img 
            src={logoSEF} 
            alt="Logo SEF" 
            style={{
              maxWidth: '200px',
              height: 'auto',
              marginBottom: '24px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          />
          <div className="header-badge">🔒 CONFIDENTIEL</div>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '12px',
            fontFamily: '"Crimson Pro", Georgia, serif',
            lineHeight: '1.2'
          }}>
            Données Personnelles des STAR
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#666',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500'
          }}>
            Membres du Secours Évangélique de France
          </p>
          <p style={{
            fontSize: '14px',
            color: '#999',
            marginTop: '12px',
            fontFamily: 'Inter, sans-serif'
          }}>
            Données uniquement consultables par la responsable
          </p>
        </div>

        <div style={{
          marginBottom: '40px',
          padding: '24px',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: '12px',
          border: '2px solid #667eea',
          fontFamily: 'Inter, sans-serif'
        }}>
          <p style={{
            fontSize: '15px',
            color: '#1a1a1a',
            lineHeight: '1.7',
            margin: 0,
            textAlign: 'justify'
          }}>
            Ce formulaire a vocation à me permettre de recueillir vos informations et ainsi, de prendre soin au mieux de chacun des membres de notre ministère. 
            Il est personnel et confidentiel, moi seule aurai accès à vos informations.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Informations personnelles */}
          <div className="form-section">
            <h2 className="section-title">1. Informations Personnelles</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label htmlFor="prenom">Prénom *</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="nom">Nom *</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dateNaissance">Date de naissance *</label>
              <input
                type="date"
                id="dateNaissance"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="adressePostale">Adresse postale *</label>
              <textarea
                id="adressePostale"
                name="adressePostale"
                value={formData.adressePostale}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label htmlFor="email">Adresse e-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="telephone">Téléphone *</label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Église et Vie Professionnelle */}
          <div className="form-section">
            <h2 className="section-title">2. Église et Vie Professionnelle</h2>
            
            <div className="form-group">
              <label>Es-tu membre de la Cité royale ? *</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    id="membreCiteOui"
                    name="membreCiteRoyale"
                    value="oui"
                    checked={formData.membreCiteRoyale === 'oui'}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="membreCiteOui" style={{ marginBottom: 0 }}>Oui</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="membreCiteNon"
                    name="membreCiteRoyale"
                    value="non"
                    checked={formData.membreCiteRoyale === 'non'}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="membreCiteNon" style={{ marginBottom: 0 }}>Non</label>
                </div>
              </div>
            </div>

            {formData.membreCiteRoyale === 'non' && (
              <div className="form-group">
                <label htmlFor="egliseLocale">Précise ton église locale</label>
                <input
                  type="text"
                  id="egliseLocale"
                  name="egliseLocale"
                  value={formData.egliseLocale}
                  onChange={handleChange}
                  placeholder="Nom de ton église locale..."
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="situationProfessionnelle">Situation professionnelle *</label>
              <select
                id="situationProfessionnelle"
                name="situationProfessionnelle"
                value={formData.situationProfessionnelle}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '2px solid #040404',
                  borderRadius: '8px',
                  background: 'dark',
                  cursor: 'pointer',
                  color: 'white'
                }}
              >
                <option value="" >-- Sélectionner --</option>
                <option value="Étudiant(e)">Étudiant(e)</option>
                <option value="Salarié(e)">Salarié(e)</option>
                <option value="Fonctionnaire">Fonctionnaire</option>
                <option value="Auto-entrepreneur">Auto-entrepreneur</option>
                <option value="Chef d'entreprise">Chef d'entreprise</option>
                <option value="En recherche d'emploi">En recherche d'emploi</option>
                <option value="Retraité(e)">Retraité(e)</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="secteurProfessionnel">Dans quel secteur travailles-tu ?</label>
              <input
                type="text"
                id="secteurProfessionnel"
                name="secteurProfessionnel"
                value={formData.secteurProfessionnel}
                onChange={handleChange}
                placeholder="Ex: Santé, Finance, Éducation, Commerce..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="entrepriseOrganisme">Dans quelle entreprise, quel organisme, travailles-tu ?</label>
              <input
                type="text"
                id="entrepriseOrganisme"
                name="entrepriseOrganisme"
                value={formData.entrepriseOrganisme}
                onChange={handleChange}
                placeholder="Nom de l'entreprise ou de l'organisme..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="moyenTransport">Comment te rends-tu à l'église ? *</label>
              <select
                id="moyenTransport"
                name="moyenTransport"
                value={formData.moyenTransport}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  background: 'dark',
                  cursor: 'pointer',
                  color: 'white'
                }}
              >
                <option value="">-- Sélectionner --</option>
                <option value="Transport en commun">Transport en commun</option>
                <option value="Voiture personnelle">Voiture personnelle</option>
                <option value="Covoiturage">Covoiturage</option>
                <option value="À pied">À pied</option>
                <option value="Vélo / Trottinette">Vélo / Trottinette</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>

          {/* Section 3: Situation familiale */}
          <div className="form-section">
            <h2 className="section-title">3. Situation Familiale</h2>
            
            <div className="form-group">
              <label>Situation *</label>
              <div className="radio-group">
                {['Célibataire', 'En cheminement', 'Fiancé(e)', 'Marié(e)'].map(option => (
                  <div key={option} className="radio-option">
                    <input
                      type="radio"
                      id={option}
                      name="situationFamiliale"
                      value={option}
                      checked={formData.situationFamiliale === option}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor={option} style={{ marginBottom: 0 }}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Enfants */}
          <div className="form-section">
            <h2 className="section-title">4. Enfants</h2>
            
            <div className="form-group">
              <label>Avez-vous des enfants ? *</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    id="enfantsOui"
                    name="enfants"
                    value="oui"
                    checked={formData.enfants === 'oui'}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="enfantsOui" style={{ marginBottom: 0 }}>Oui</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="enfantsNon"
                    name="enfants"
                    value="non"
                    checked={formData.enfants === 'non'}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="enfantsNon" style={{ marginBottom: 0 }}>Non</label>
                </div>
              </div>
            </div>

            {formData.enfants === 'oui' && (
              <>
                <div className="form-group">
                  <label htmlFor="nombreEnfants">Combien d'enfants ?</label>
                  <input
                    type="text"
                    id="nombreEnfants"
                    name="nombreEnfants"
                    value={formData.nombreEnfants}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="agesEnfants">Âges des enfants</label>
                  <input
                    type="text"
                    id="agesEnfants"
                    name="agesEnfants"
                    value={formData.agesEnfants}
                    onChange={handleChange}
                    placeholder="Ex: 5 ans, 8 ans, 12 ans"
                  />
                </div>
              </>
            )}
          </div>

          {/* Section 5: Parcours à ICC */}
          <div className="form-section">
            <h2 className="section-title">5. Parcours à ICC</h2>
            
            <div className="form-group">
              <label htmlFor="dateArriveeICC">Date d'arrivée à ICC</label>
              <input
                type="date"
                id="dateArriveeICC"
                name="dateArriveeICC"
                value={formData.dateArriveeICC}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Baptisé(e) ?</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    id="baptiseICC"
                    name="baptise"
                    value="ICC"
                    checked={formData.baptise === 'ICC'}
                    onChange={handleChange}
                  />
                  <label htmlFor="baptiseICC" style={{ marginBottom: 0 }}>À ICC</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="baptiseAutre"
                    name="baptise"
                    value="autre"
                    checked={formData.baptise === 'autre'}
                    onChange={handleChange}
                  />
                  <label htmlFor="baptiseAutre" style={{ marginBottom: 0 }}>Dans une autre église</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="baptiseNon"
                    name="baptise"
                    value="non"
                    checked={formData.baptise === 'non'}
                    onChange={handleChange}
                  />
                  <label htmlFor="baptiseNon" style={{ marginBottom: 0 }}>Non baptisé(e)</label>
                </div>
              </div>
            </div>

            {formData.baptise === 'autre' && (
              <div className="form-group">
                <label htmlFor="lieuBapteme">Précisez le lieu du baptême</label>
                <input
                  type="text"
                  id="lieuBapteme"
                  name="lieuBapteme"
                  value={formData.lieuBapteme}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <label>Quelle(s) formation(s) avez-vous suivi au sein de l'église ?</label>
              <div className="checkbox-grid">
                {formationsOptions.map(formation => (
                  <div key={formation} className="checkbox-option">
                    <input
                      type="checkbox"
                      id={`formation-${formation}`}
                      name="formations"
                      value={formation}
                      checked={formData.formations.includes(formation)}
                      onChange={handleChange}
                    />
                    <label htmlFor={`formation-${formation}`} style={{ marginBottom: 0 }}>
                      {formation}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="autresFormations">Autres formations (préciser)</label>
              <input
                type="text"
                id="autresFormations"
                name="autresFormations"
                value={formData.autresFormations}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Section 6: Ministères et départements */}
          <div className="form-section">
            <h2 className="section-title">6. Ministères et Départements</h2>
            
            <div className="form-group">
              <label>Ministères et départements de service dans le passé</label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '12px',
                maxHeight: '400px',
                overflowY: 'auto',
                padding: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                background: '#fafafa'
              }}>
                {ministeresOptions.map(ministere => (
                  <div key={`passe-${ministere}`} className="checkbox-option">
                    <input
                      type="checkbox"
                      id={`ministerePasse-${ministere}`}
                      name="ministeresPassé"
                      value={ministere}
                      checked={formData.ministeresPassé.includes(ministere)}
                      onChange={handleChange}
                    />
                    <label 
                      htmlFor={`ministerePasse-${ministere}`} 
                      style={{ 
                        marginBottom: 0,
                        fontSize: '14px',
                        cursor: 'pointer',
                        userSelect: 'none'
                      }}
                    >
                      {ministere}
                    </label>
                  </div>
                ))}
              </div>
              
              {/* Champ Autre pour ministères passés */}
              <div style={{ marginTop: '16px' }}>
                <label htmlFor="autresMinisteresPassé" style={{ fontSize: '14px', fontWeight: '600' }}>
                  Autre (préciser si aucun ne correspond)
                </label>
                <input
                  type="text"
                  id="autresMinisteresPassé"
                  name="autresMinisteresPassé"
                  value={formData.autresMinisteresPassé}
                  onChange={handleChange}
                  placeholder="Précisez d'autres ministères..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    marginTop: '8px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Ministères et départements de service aujourd'hui</label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '12px',
                maxHeight: '400px',
                overflowY: 'auto',
                padding: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                background: '#fafafa'
              }}>
                {ministeresOptions.map(ministere => (
                  <div key={`actuel-${ministere}`} className="checkbox-option">
                    <input
                      type="checkbox"
                      id={`ministereActuel-${ministere}`}
                      name="ministeresActuel"
                      value={ministere}
                      checked={formData.ministeresActuel.includes(ministere)}
                      onChange={handleChange}
                    />
                    <label 
                      htmlFor={`ministereActuel-${ministere}`} 
                      style={{ 
                        marginBottom: 0,
                        fontSize: '14px',
                        cursor: 'pointer',
                        userSelect: 'none'
                      }}
                    >
                      {ministere}
                    </label>
                  </div>
                ))}
              </div>
              
              {/* Champ Autre pour ministères actuels */}
              <div style={{ marginTop: '16px' }}>
                <label htmlFor="autresMinisteresActuel" style={{ fontSize: '14px', fontWeight: '600' }}>
                  Autre (préciser si aucun ne correspond)
                </label>
                <input
                  type="text"
                  id="autresMinisteresActuel"
                  name="autresMinisteresActuel"
                  value={formData.autresMinisteresActuel}
                  onChange={handleChange}
                  placeholder="Précisez d'autres ministères..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    marginTop: '8px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 7: Famille de disciples */}
          <div className="form-section">
            <h2 className="section-title">7. Famille de Disciples</h2>
            
            <div className="form-group">
              <label>As-tu déjà intégré une famille de disciples ?</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    id="familleOui"
                    name="familleDisciples"
                    value="oui"
                    checked={formData.familleDisciples === 'oui'}
                    onChange={handleChange}
                  />
                  <label htmlFor="familleOui" style={{ marginBottom: 0 }}>Oui</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="familleNon"
                    name="familleDisciples"
                    value="non"
                    checked={formData.familleDisciples === 'non'}
                    onChange={handleChange}
                  />
                  <label htmlFor="familleNon" style={{ marginBottom: 0 }}>Non</label>
                </div>
              </div>
            </div>

            {formData.familleDisciples === 'oui' && (
              <div className="form-group">
                <label htmlFor="nomFamille">Laquelle ?</label>
                <input
                  type="text"
                  id="nomFamille"
                  name="nomFamille"
                  value={formData.nomFamille}
                  onChange={handleChange}
                />
              </div>
            )}

            {formData.familleDisciples === 'non' && (
              <div className="form-group">
                <label htmlFor="raisonNonIntegration">Pour quelle(s) raison(s) ?</label>
                <textarea
                  id="raisonNonIntegration"
                  name="raisonNonIntegration"
                  value={formData.raisonNonIntegration}
                  onChange={handleChange}
                />
              </div>
            )}

            <div style={{
              marginTop: '24px',
              padding: '20px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '12px',
              border: '2px solid #f5576c'
            }}>
              <p style={{
                fontSize: '14px',
                color: 'white',
                lineHeight: '1.6',
                margin: 0,
                marginBottom: '12px'
              }}>
                💫 <strong>Rejoindre "Les Passionnés"</strong>
              </p>
              <p style={{
                fontSize: '13px',
                color: 'white',
                lineHeight: '1.6',
                margin: 0,
                marginBottom: '12px'
              }}>
                Si tu souhaites être suivi(e), accompagné(e) et encadré(e) par Naby (famille de disciples « les passionnés », portée par Pasteure Rochelle B. PASSI, de la lignée de Pasteure Mode CASTANOU), tu peux rejoindre ce groupe :
              </p>
              <a 
                href="https://chat.whatsapp.com/CGyUpCz8LLGIqr2WR60R7e?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: 'white',
                  color: '#f5576c',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '13px',
                  transition: 'all 0.3s'
                }}
              >
                📱 Rejoindre le groupe WhatsApp
              </a>
            </div>
          </div>

          {/* Section 8: Famille d'Impact */}
          <div className="form-section">
            <h2 className="section-title">8. Famille d'Impact</h2>
            
            <div className="form-group">
              <label>Es-tu dans une Famille d'Impact ?</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    id="familleImpactOui"
                    name="familleImpact"
                    value="oui"
                    checked={formData.familleImpact === 'oui'}
                    onChange={handleChange}
                  />
                  <label htmlFor="familleImpactOui" style={{ marginBottom: 0 }}>Oui</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="familleImpactNon"
                    name="familleImpact"
                    value="non"
                    checked={formData.familleImpact === 'non'}
                    onChange={handleChange}
                  />
                  <label htmlFor="familleImpactNon" style={{ marginBottom: 0 }}>Non</label>
                </div>
              </div>
            </div>

            {formData.familleImpact === 'oui' && (
              <div className="form-group">
                <label htmlFor="nomFamilleImpact">Laquelle ?</label>
                <input
                  type="text"
                  id="nomFamilleImpact"
                  name="nomFamilleImpact"
                  value={formData.nomFamilleImpact}
                  onChange={handleChange}
                />
              </div>
            )}

            {formData.familleImpact === 'non' && (
              <div className="form-group">
                <label htmlFor="raisonNonIntegrationImpact">Pour quelle(s) raison(s) ?</label>
                <textarea
                  id="raisonNonIntegrationImpact"
                  name="raisonNonIntegrationImpact"
                  value={formData.raisonNonIntegrationImpact}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          {/* Section 9: Service et Mission au SEF */}
          <div className="form-section">
            <h2 className="section-title">9. Service et Mission au SEF</h2>
            
            <div className="form-group">
              <label>Service et/ou mission actuels au sein du SEF</label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '12px',
                maxHeight: '400px',
                overflowY: 'auto',
                padding: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                background: '#fafafa'
              }}>
                {servicesOptions.map(service => (
                  <div key={service} className="checkbox-option">
                    <input
                      type="checkbox"
                      id={`service-${service}`}
                      name="serviceActuel"
                      value={service}
                      checked={formData.serviceActuel.includes(service)}
                      onChange={handleChange}
                    />
                    <label 
                      htmlFor={`service-${service}`} 
                      style={{ 
                        marginBottom: 0,
                        fontSize: '14px',
                        cursor: 'pointer',
                        userSelect: 'none'
                      }}
                    >
                      {service}
                    </label>
                  </div>
                ))}
              </div>
              
              {/* Champ Autre pour services */}
              <div style={{ marginTop: '16px' }}>
                <label htmlFor="autresServices" style={{ fontSize: '14px', fontWeight: '600' }}>
                  Autre (préciser si aucun ne correspond)
                </label>
                <textarea
                  id="autresServices"
                  name="autresServices"
                  value={formData.autresServices}
                  onChange={handleChange}
                  placeholder="Précisez d'autres services ou missions..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    marginTop: '8px',
                    minHeight: '100px',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 10: Vie Spirituelle */}
          <div className="form-section">
            <h2 className="section-title">10. Vie Spirituelle</h2>
            
            <div className="form-group">
              <label htmlFor="viePreiereMeditation">En quelques mots, comment qualifies-tu ta vie de prière et de méditation ?</label>
              <textarea
                id="viePreiereMeditation"
                name="viePreiereMeditation"
                value={formData.viePreiereMeditation}
                onChange={handleChange}
                placeholder="Partage ton expérience personnelle..."
              />
            </div>

            <div className="form-group">
              <label>Où en es-tu concernant le Discipolat ?</label>
              <div className="radio-group" style={{ flexDirection: 'column', gap: '16px' }}>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="discipolatCroissance"
                    name="niveauDiscipolat"
                    value="croissance"
                    checked={formData.niveauDiscipolat === 'croissance'}
                    onChange={handleChange}
                  />
                  <label htmlFor="discipolatCroissance" style={{ marginBottom: 0, marginLeft: '8px' }}>
                    Je suis un disciple en croissance, j'ai besoin d'encadrement
                  </label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="discipolatAffermis"
                    name="niveauDiscipolat"
                    value="affermis"
                    checked={formData.niveauDiscipolat === 'affermis'}
                    onChange={handleChange}
                  />
                  <label htmlFor="discipolatAffermis" style={{ marginBottom: 0, marginLeft: '8px' }}>
                    Je suis un disciple affermis, je n'ai pas besoin d'être exhorté pour venir à l'église, servir et obéir à la parole de Dieu
                  </label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="discipolatFaiseur"
                    name="niveauDiscipolat"
                    value="faiseur"
                    checked={formData.niveauDiscipolat === 'faiseur'}
                    onChange={handleChange}
                  />
                  <label htmlFor="discipolatFaiseur" style={{ marginBottom: 0, marginLeft: '8px' }}>
                    Je suis un disciple et un faiseur de disciples. Je suis déjà plusieurs personnes
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 11: Présence à l'Église */}
          <div className="form-section">
            <h2 className="section-title">11. Présence à l'Église</h2>
            
            <div className="form-group">
              <label>Quel est ton niveau de présence à l'église ?</label>
              <div className="radio-group" style={{ flexDirection: 'column', gap: '12px' }}>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="presenceTousDimanches"
                    name="presenceEglise"
                    value="tous_dimanches"
                    checked={formData.presenceEglise === 'tous_dimanches'}
                    onChange={handleChange}
                  />
                  <label htmlFor="presenceTousDimanches" style={{ marginBottom: 0, marginLeft: '8px' }}>
                    Je viens tous les dimanches sauf cas de force majeure
                  </label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="presence1sur2"
                    name="presenceEglise"
                    value="1_sur_2"
                    checked={formData.presenceEglise === '1_sur_2'}
                    onChange={handleChange}
                  />
                  <label htmlFor="presence1sur2" style={{ marginBottom: 0, marginLeft: '8px' }}>
                    Je viens 1 dimanche sur 2
                  </label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="presence1mois"
                    name="presenceEglise"
                    value="1_mois"
                    checked={formData.presenceEglise === '1_mois'}
                    onChange={handleChange}
                  />
                  <label htmlFor="presence1mois" style={{ marginBottom: 0, marginLeft: '8px' }}>
                    Je viens 1 dimanche par mois
                  </label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="presencePriere"
                    name="presenceEglise"
                    value="temps_priere"
                    checked={formData.presenceEglise === 'temps_priere'}
                    onChange={handleChange}
                  />
                  <label htmlFor="presencePriere" style={{ marginBottom: 0, marginLeft: '8px' }}>
                    Je viens aux temps de prière
                  </label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="presenceAutre"
                    name="presenceEglise"
                    value="autre"
                    checked={formData.presenceEglise === 'autre'}
                    onChange={handleChange}
                  />
                  <label htmlFor="presenceAutre" style={{ marginBottom: 0, marginLeft: '8px' }}>
                    Autre
                  </label>
                </div>
              </div>
            </div>

            {formData.presenceEglise === 'autre' && (
              <div className="form-group">
                <label htmlFor="autrePresence">Précise ta présence à l'église</label>
                <input
                  type="text"
                  id="autrePresence"
                  name="autrePresence"
                  value={formData.autrePresence}
                  onChange={handleChange}
                  placeholder="Précise..."
                />
              </div>
            )}
          </div>

          {/* Section 12: Attentes et Suggestions */}
          <div className="form-section">
            <h2 className="section-title">12. Attentes et Suggestions</h2>
            
            <div className="form-group">
              <label htmlFor="attentesMinistere">Qu'attends-tu de ce ministère (service social) ? À quels besoins peut-il répondre ?</label>
              <textarea
                id="attentesMinistere"
                name="attentesMinistere"
                value={formData.attentesMinistere}
                onChange={handleChange}
                placeholder="Partage tes attentes et besoins..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="suggestionsAmeliorations">Comment peut-il fonctionner ? Des améliorations et suggestions ? Des projets à soumettre ?</label>
              <textarea
                id="suggestionsAmeliorations"
                name="suggestionsAmeliorations"
                value={formData.suggestionsAmeliorations}
                onChange={handleChange}
                placeholder="Partage tes idées et suggestions..."
              />
            </div>
          </div>

          {/* Section 13: Partage Personnel */}
          <div className="form-section">
            <h2 className="section-title">13. Partage Personnel</h2>
            
            <div className="form-group">
              <label htmlFor="situationPersonnelle">
                Souhaites-tu m'informer d'une situation ou d'un sujet personnel, professionnel, lié à l'église, la famille ?
              </label>
              <textarea
                id="situationPersonnelle"
                name="situationPersonnelle"
                value={formData.situationPersonnelle}
                onChange={handleChange}
                placeholder="Partage ici en toute confidentialité..."
              />
            </div>
          </div>

          {/* Section 14: Sujets de Prière */}
          <div className="form-section">
            <h2 className="section-title">14. Sujets de Prière</h2>
            
            <div className="form-group">
              <label htmlFor="sujetPriereMajeur">
                As-tu un sujet de prière majeur ? Ou une thématique de prière importante pour toi ?
              </label>
              <textarea
                id="sujetPriereMajeur"
                name="sujetPriereMajeur"
                value={formData.sujetPriereMajeur}
                onChange={handleChange}
                placeholder="Partage ton sujet de prière majeur..."
              />
            </div>
          </div>

          {/* Section 15: Commentaires et Observations */}
          <div className="form-section" style={{ borderBottom: 'none' }}>
            <h2 className="section-title">15. Commentaires et Observations</h2>
            
            <div className="form-group">
              <label htmlFor="commentairesObservations">
                As-tu un commentaire ou une observation que tu souhaiterais partager ?
              </label>
              <textarea
                id="commentairesObservations"
                name="commentairesObservations"
                value={formData.commentairesObservations}
                onChange={handleChange}
                placeholder="Partage tes commentaires ou observations..."
              />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '⏳ Envoi en cours...' : '✓ Envoyer le formulaire'}
          </button>

          {submitted && (
            <div className="success-message">
              ✓ Formulaire enregistré avec succès !
            </div>
          )}
        </form>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: '#f9fafb',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#666',
          fontFamily: 'Inter, sans-serif'
        }}>
          <p style={{ margin: 0 }}>
            🔒 <strong>Confidentialité</strong> : Toutes les informations saisies dans ce formulaire sont strictement confidentielles 
            et uniquement accessibles par la responsable du SEF.
          </p>
        </div>

        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#999',
          fontFamily: 'Inter, sans-serif'
        }}>
          <p style={{ margin: 0 }}>
            © SEF 2026 - Secours Évangélique de France
          </p>
          <p style={{ margin: '4px 0 0 0' }}>
            Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
}
