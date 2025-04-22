// On importe la fonction qui permet de sauvegarder les tâches dans le localStorage
import { sauvegarderTaches } from './stockage.js';

// On récupère les éléments HTML avec lesquels on va interagir
let boutonAjouter = document.getElementById('ajouterBtn');     // Le bouton "Ajouter"
let inputTache = document.getElementById('nouvelleTache');     // Le champ où l'utilisateur écrit sa tâche
let liste = document.getElementById('listeTaches');            // La liste qui affichera les tâches
let template = document.getElementById('template-tache');      // Le modèle invisible pour créer une tâche

// Fonction appelée au démarrage pour initialiser les événements
export function initialiserTaches() {
  // On écoute le clic sur le bouton "Ajouter"
  boutonAjouter.addEventListener('click', ajouterTache);
}

// Fonction qui ajoute une nouvelle tâche à la liste
function ajouterTache() {
  // On récupère le texte saisi par l'utilisateur et on enlève les espaces inutiles
  let texte = inputTache.value.trim();

  // Vérification : si l'utilisateur a bien écrit quelque chose
  if (texte !== "") {
    // On clone le contenu du template pour créer une nouvelle tâche
    let clone = template.content.cloneNode(true);

    // On insère le texte de la tâche dans l'élément cloné
    clone.querySelector('.texte').textContent = texte;

    // On ajoute un événement sur le bouton ❌ pour pouvoir supprimer la tâche quand on clique dessus
    clone.querySelector('.supprimer').addEventListener('click', (e) => {
      e.target.parentElement.remove();   // On supprime l'élément <li> correspondant
      sauvegarderTaches();               // On met à jour le stockage après suppression
    });

    // On ajoute la nouvelle tâche à la liste affichée sur la page
    liste.appendChild(clone);

    // On vide le champ input pour permettre d'ajouter une nouvelle tâche facilement
    inputTache.value = "";

    // On sauvegarde la liste mise à jour dans le localStorage
    sauvegarderTaches();
  } else {
    // Si l'utilisateur n'a rien écrit, on affiche une alerte
    alert("Veuillez entrer une tâche !");
  }
}