/**
 * Service API Abstrait
 * 
 * Ce fichier définit l'interface pour tous les backends.
 * Pour changer de backend, il suffit de changer l'import dans config.js
 */

// Interface abstraite que tous les backends doivent implémenter
export class BackendService {
  /**
   * Soumettre un nouveau membre
   * @param {Object} memberData - Données du formulaire
   * @returns {Promise<Object>} - { success: boolean, message: string, data?: any }
   */
  async submitMember(memberData) {
    throw new Error('submitMember() must be implemented');
  }

  /**
   * Récupérer tous les membres (admin seulement)
   * @param {string} token - Token d'authentification
   * @returns {Promise<Object>} - { success: boolean, data: Array, message?: string }
   */
  async getMembers(token) {
    throw new Error('getMembers() must be implemented');
  }

  /**
   * Authentification admin
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} - { success: boolean, token?: string, user?: Object, message?: string }
   */
  async login(email, password) {
    throw new Error('login() must be implemented');
  }

  /**
   * Vérifier si un token est valide
   * @param {string} token
   * @returns {Promise<boolean>}
   */
  async verifyToken(token) {
    throw new Error('verifyToken() must be implemented');
  }

  /**
   * Déconnexion
   * @param {string} token
   * @returns {Promise<void>}
   */
  async logout(token) {
    // Optionnel, peut être vide pour certains backends
  }
}

/**
 * Utilitaires pour formater les données
 */
export const formatMemberData = (formData) => {
  return {
    prenom: formData.prenom,
    nom: formData.nom,
    dateNaissance: formData.dateNaissance,
    adressePostale: formData.adressePostale,
    email: formData.email,
    telephone: formData.telephone,
    situationFamiliale: formData.situationFamiliale,
    enfants: formData.enfants,
    nombreEnfants: formData.nombreEnfants,
    agesEnfants: formData.agesEnfants,
    dateArriveeICC: formData.dateArriveeICC,
    baptise: formData.baptise,
    lieuBapteme: formData.lieuBapteme,
    formations: Array.isArray(formData.formations) 
      ? formData.formations.join(', ') 
      : formData.formations,
    autresFormations: formData.autresFormations,
    ministeresPassé: Array.isArray(formData.ministeresPassé)
      ? formData.ministeresPassé.join(', ')
      : formData.ministeresPassé,
    autresMinisteresPassé: formData.autresMinisteresPassé || '',
    ministeresActuel: Array.isArray(formData.ministeresActuel)
      ? formData.ministeresActuel.join(', ')
      : formData.ministeresActuel,
    autresMinisteresActuel: formData.autresMinisteresActuel || '',
    familleDisciples: formData.familleDisciples,
    nomFamille: formData.nomFamille,
    raisonNonIntegration: formData.raisonNonIntegration,
    serviceActuel: Array.isArray(formData.serviceActuel)
      ? formData.serviceActuel.join(', ')
      : formData.serviceActuel,
    autresServices: formData.autresServices || '',
    situationPersonnelle: formData.situationPersonnelle,
    sujetsPreire: formData.sujetsPreire,
    dateSubmission: new Date().toISOString()
  };
};
