/**
 * Implémentation Google Sheets du Backend Service
 */

import { BackendService, formatMemberData } from './backendService';

export class GoogleSheetsService extends BackendService {
  constructor() {
    super();
    // URL de votre Google Apps Script déployé
    this.scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'VOTRE_URL_GOOGLE_APPS_SCRIPT';
    
    // Credentials admin (à configurer dans .env.local)
    this.adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'responsable@secours-evangelique.fr';
    this.adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'changeme';
  }

  /**
   * Soumettre un nouveau membre
   */
  async submitMember(memberData) {
    try {
      const formattedData = formatMemberData(memberData);
      
      // Log pour debug (à retirer en production)
      console.log('Données formatées à envoyer:', formattedData);
      
      const response = await fetch(this.scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Important pour Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        // ⚠️ CORRECTION : Envoyer directement les données, pas dans un wrapper
        body: JSON.stringify(formattedData)
      });

      // En mode no-cors, on ne peut pas lire la réponse
      // On suppose que c'est réussi si pas d'erreur
      return {
        success: true,
        message: 'Données enregistrées avec succès'
      };
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      return {
        success: false,
        message: error.message || 'Erreur lors de l\'enregistrement'
      };
    }
  }

  /**
   * Authentification admin
   * Note: Pour Google Sheets, on utilise une authentification simple côté client
   * Pour plus de sécurité, implémentez l'auth dans le Google Apps Script
   */
  async login(email, password) {
    try {
      // Vérification simple côté client
      if (email === this.adminEmail && password === this.adminPassword) {
        const token = btoa(`${email}:${password}:${Date.now()}`);
        const user = {
          email: email,
          nom: 'Responsable SEF'
        };
        
        // Stocker dans localStorage
        localStorage.setItem('sef_token', token);
        localStorage.setItem('sef_user', JSON.stringify(user));
        
        return {
          success: true,
          token,
          user,
          message: 'Connexion réussie'
        };
      } else {
        return {
          success: false,
          message: 'Email ou mot de passe incorrect'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors de la connexion'
      };
    }
  }

  /**
   * Récupérer tous les membres
   * Note: Pour Google Sheets, on appelle le script avec action=getMembers
   */
  async getMembers(token) {
    try {
      // Vérifier le token
      const isValid = await this.verifyToken(token);
      if (!isValid) {
        return {
          success: false,
          message: 'Token invalide ou expiré',
          data: []
        };
      }

      // Pour Google Sheets en mode no-cors, on ne peut pas faire de GET
      // Une alternative est d'utiliser un Google Sheet public en lecture
      // Ou implémenter un endpoint GET dans le script
      
      // Pour l'instant, on retourne un message
      return {
        success: true,
        data: [],
        message: 'Consultez directement votre Google Sheet pour voir les données'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: []
      };
    }
  }

  /**
   * Vérifier la validité du token
   */
  async verifyToken(token) {
    try {
      const storedToken = localStorage.getItem('sef_token');
      if (!storedToken || storedToken !== token) {
        return false;
      }

      // Décoder et vérifier l'expiration (24h)
      const decoded = atob(token);
      const parts = decoded.split(':');
      const timestamp = parseInt(parts[2]);
      const now = Date.now();
      const hoursDiff = (now - timestamp) / (1000 * 60 * 60);

      return hoursDiff < 24; // Token valide 24h
    } catch (error) {
      return false;
    }
  }

  /**
   * Déconnexion
   */
  async logout(token) {
    localStorage.removeItem('sef_token');
    localStorage.removeItem('sef_user');
  }
}
