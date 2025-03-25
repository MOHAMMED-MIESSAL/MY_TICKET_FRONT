import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';


export const organizerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // Récupérer le token depuis le localStorage
  const token = localStorage.getItem('token');

  if (token) {
    try {
      // Décoder le token pour obtenir le rôle
      const decodedToken: { role?: string; sub?: string } = jwtDecode(token);

      const userRole = decodedToken.role; // Récupérer le rôle de l'utilisateur

      console.log('User role:', userRole); // Pour le débogage

      // Vérifier si le rôle de l'utilisateur est ADMIN ou SUPER_ADMIN
      if (userRole === 'ORGANIZER') {
        return true; // L'utilisateur peut accéder à la route
      }
    } catch (e) {
      console.error('Erreur lors du décodage du token:', e);
    }
  }

  // Si le token ou le rôle ne correspond pas, rediriger vers la page de connexion
  // Empêcher l'accès et rediriger vers la page de connexion ou page d'erreur
  router.navigate(['/dashboard']);
  return false;
};
