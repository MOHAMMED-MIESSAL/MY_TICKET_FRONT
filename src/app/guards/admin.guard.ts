import {CanActivateFn, Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import {inject} from "@angular/core";


// Guard qui vérifie si l'utilisateur est ADMIN ou SUPER_ADMIN
export const adminGuard: CanActivateFn = (route, state) => {

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
      if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
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
