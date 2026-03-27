/**
 * Configuration du Backend
 * 
 * POUR CHANGER DE BACKEND :
 * 1. Importez le service voulu
 * 2. Changez l'export de apiService
 * 
 * C'est tout ! Le reste de l'application fonctionne sans modification.
 */

// Importez les différents backends disponibles
import { GoogleSheetsService } from './googleSheetsService';
// import { AirtableService } from './airtableService'; // À implémenter si besoin
// import { SupabaseService } from './supabaseService'; // À implémenter si besoin
// import { FirebaseService } from './firebaseService'; // À implémenter si besoin

// ============================================
// CONFIGURATION : Choisissez votre backend ici
// ============================================

// Option 1 : Google Sheets (actuel)
export const apiService = new GoogleSheetsService();

// Option 2 : Airtable (décommentez pour utiliser)
// export const apiService = new AirtableService();

// Option 3 : Supabase (décommentez pour utiliser)
// export const apiService = new SupabaseService();

// Option 4 : Firebase (décommentez pour utiliser)
// export const apiService = new FirebaseService();

// ============================================
// Configuration des endpoints (pour référence)
// ============================================

export const BACKEND_CONFIG = {
  name: 'Google Sheets',
  type: 'google_sheets',
  
  // Endpoints (si applicable)
  endpoints: {
    submit: import.meta.env.VITE_GOOGLE_SCRIPT_URL,
    get: import.meta.env.VITE_GOOGLE_SCRIPT_URL,
    auth: 'client-side' // Auth côté client pour Google Sheets
  },
  
  // Credentials admin
  admin: {
    email: import.meta.env.VITE_ADMIN_EMAIL,
    password: import.meta.env.VITE_ADMIN_PASSWORD
  }
};

/**
 * Pour ajouter un nouveau backend :
 * 
 * 1. Créez un nouveau fichier (ex: customService.js)
 * 2. Implémentez la classe BackendService :
 * 
 *    export class CustomService extends BackendService {
 *      constructor() {
 *        super();
 *        this.apiUrl = 'https://your-api.com';
 *      }
 *      
 *      async submitMember(memberData) {
 *        // Votre implémentation
 *      }
 *      
 *      async login(email, password) {
 *        // Votre implémentation
 *      }
 *      
 *      async getMembers(token) {
 *        // Votre implémentation
 *      }
 *      
 *      async verifyToken(token) {
 *        // Votre implémentation
 *      }
 *    }
 * 
 * 3. Importez et utilisez :
 *    import { CustomService } from './customService';
 *    export const apiService = new CustomService();
 * 
 * C'est tout ! L'application s'adapte automatiquement.
 */
