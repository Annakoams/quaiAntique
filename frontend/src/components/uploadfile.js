import React, {useState} from 'react';
import { IconEdit } from '../lib/icons';

function Uploadfile({ setSelectedFile, setPreviewPicture }) {

  const [isFilePicked, setIsFilePicked] = useState(false); // Hook d'état pour vérifier si un fichier a été sélectionné

  const changeHandler = (event) => { // Fonction qui est appelée lorsqu'un fichier est sélectionné
    const file = event.target.files[0]; // Obtient le fichier sélectionné
    setSelectedFile(file); // Envoie le fichier sélectionné à la fonction parent qui le manipule

    // Prévisualisation de l'image
    const reader = new FileReader(); // Crée un objet FileReader pour lire le contenu du fichier
    reader.onloadend = () => { // La fonction qui est appelée lorsque la lecture du fichier est terminée
      const base64String = reader.result // Obtient le contenu du fichier sous forme d'une chaîne de caractères codée en base64
      setPreviewPicture(base64String); // Envoie la chaîne de caractères codée en base64 à la fonction parent pour la prévisualisation de l'image
    };
    reader.readAsDataURL(file); // Lit le contenu du fichier en tant que chaîne de caractères codée en base64
  };

  const selectCoverPicture = (selectfile) => {
    // Fonction qui gère la sélection d'une image de couverture
  }
  const id = "input" + Date.now();

  return (
    <div className="m-[-20px]">
      <input id ={id} className='d-none' type="file" name="file" onChange={changeHandler} /> {/* Input pour sélectionner un fichier */}
      <IconEdit onClick={(e) =>{ document.getElementById(id).click() } } /> {/* Bouton d'édition qui déclenche la sélection de fichier */}
    </div>
  );

  
}

export default Uploadfile;


