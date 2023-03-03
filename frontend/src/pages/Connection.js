
import { useState } from 'react';
import './Connection.css'

const Connection = () => {

  const [inscriptionExist, setInscriptionExist] = useState(true)

  return (<>{inscriptionExist ?
    <form className='form'>
      <h1 >S’identifier</h1>
      <div className='container_input'>
        <label htmlFor="email">Veuillez saisir votre adresse email</label>
        <input type="text" id="email" name="email" />
      </div>
      <div className='container_input'>
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" />
      </div>
      <div>
        <button className='btn_form'>S’identifier</button>
      </div>
      <div>
        <p className='noveau_client'>Vous etes un noveau client ?</p>
        <button onClick={() => setInscriptionExist(false)} className='btn_form'>Créer un compte</button>
      </div>
    </form>

    :

    <form className='form'>
      <h1 >S’inscrire</h1>
      <div className='container_input'>
        <label htmlFor="email">Veuillez saisir votre adresse email</label>
        <input type="text" id="email" name="email" />
      </div>
      <div className='container_input'>
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" />
      </div>
      <div className='container_input'>
        <label htmlFor="password">Confirmer le mot de passe</label>
        <input type="password" id="password2" name="password2" />
      </div>

      <div className='container_allergies'>
        <p>COMMENTAIRES , ALLERGIES  ET HABITUDES ALIMENTAIRES</p>
        <div className='container_inputAllergies'>
          <label htmlFor="password">Pour Moi</label>
          <textarea type="text" id="allergies" name="allergies" />
          <label htmlFor="password">Autre</label>
          <textarea type="text" id="allergies" name="allergies" />
        </div>
      </div>
      <div>
        <button className='btn_form'>S’inscrire</button>
      </div>
    </form>

  }</>
  );
};

export default Connection;
