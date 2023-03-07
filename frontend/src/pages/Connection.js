
import { useState } from 'react';
import './Connection.css'





let minLenght = document.getElementById('lenght');
let upperCase = document.getElementById('upper');
let lowerCase = document.getElementById('lower');
let number = document.getElementById('digit');
let specialChar = document.getElementById('special');

const checkPassword = (data)=>{
  const lenght = new RegExp('(?=.{8,})');
  const upper =new RegExp('(?=.*[A-Z])');
  const lower =new RegExp('(?=.*[a-z])');
  const digit =new RegExp('(?=.*[0-9])');
  const special =new RegExp('(?=.*[!@#\$%\^&\*])');

  if (lenght.test(data)){
    minLenght.classList.add('valid')
  }else{
    minLenght.classList.remove('valid')
  };

  if (upper.test(data)){
    upperCase.classList.add('valid')
  }else{
    upperCase.classList.remove('valid')
  };

  if (lower.test(data)){
    lowerCase.classList.add('valid')
  }else{
    lowerCase.classList.remove('valid')
  };

  if (digit.test(data)){
    number.classList.add('valid')
  }else{
    number.classList.remove('valid')
  };

  if (special.test(data)){
    specialChar.classList.add('valid')
  }else{
    specialChar.classList.remove('valid')
  };

}

// show hide passord
const toggle = () =>{
  const password = document.getElementById('password');
  const eye = document.getElementById('toggle');

  if(password.type === 'password'){
    password.setAttribute("type","text");
    eye.classList.add('hide');
  }else{
    password.setAttribute("type","password");
    eye.classList.remove('hide');
  }
}


function Connection() {
  const [msgEmailError, setMsgEmailError] = useState("");
  const [msgPasswordError, setMsgPasswordError] = useState("");

  const verificationEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  function verificationPassword(password) {
    var Reg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/);
    return Reg.test(password);
  }


  const signUp = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const allergies1 = document.getElementById('allergies1').value;
    const allergies2 = document.getElementById('allergies2').value;
    setMsgEmailError("");
    setMsgPasswordError("");

    if (!verificationEmail(email)) {
      setMsgEmailError('Saisissez une adresse mail valide');
      return;
    }

    if (!verificationPassword(password)) {
      setMsgPasswordError('Saisissez un mot de passe valide');
      return;
    }

    if (password !== password2) {
      setMsgPasswordError('Les deux mots de passe doivent correspondre');
      return;
    }
    // verification completer
    alert('inscription complete');
  };


  const [inscriptionExist, setInscriptionExist] = useState(true);

  return (<>{inscriptionExist ?
    <form className='form'>
      <h1>S’identifier</h1>
      <div className='container_input'>
        <label htmlFor="email">Veuillez saisir votre adresse email</label>
        <input className='input' type="text" id="email" name="email" />
        <h6 className='text-danger '>{msgEmailError} </h6>
      </div>
      <div className='container_input'>
        <label htmlFor="password">Mot de passe</label>
        <div className='input_eye'>
          <input className='input' type="password" id="password" name="password" />
          {/* <span id="toggle" onClick={toggle}>
                  <svg  className="eye" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" clasName="bi bi-eye" viewBox="0 0 16 16">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                  </svg>
                </span> */}
        </div>
        <h6 className='text-danger '>{msgPasswordError} </h6>
      </div>
      <div>
        <button type="button" className='btn_form'>S’identifier</button>
      </div>
      <div>
        <p className='noveau_client'>Vous etes un noveau client ?</p>
        <button type="button" onClick={() => setInscriptionExist(false)} className='btn_form'>Créer un compte</button>
      </div>
    </form>

    :

    <form className='form'>
      <h1>S’inscrire</h1>
      <div className='container_input'>
        <label htmlFor="email">Veuillez saisir votre adresse email</label>
        <input className='input' type="text" id="email" name="email" />
        <h6 className='text-danger '>{msgEmailError} </h6>
      </div>
      <div className='container_input'>
        <label htmlFor="password">Mot de passe</label>
        <input className='input' type="password" id="password" name="password" onKeyUp={checkPassword} />
        <span id="toggle" onClick={toggle}></span>
        <h6 className='text-danger '>{msgPasswordError} </h6>
        <div className='validation'>
        <ul className='liste_vaidationCheck' id="validation">
          <li id="lenght">Minimum de 8 caractères</li>
          <li id="upper">Au moins une lettre majuscule</li>
          <li id="lower">Au moins une lettre minuscule.</li>
          <li id="digit">Au moins un chiffre.</li>
          <li id="special"> Au moins un caractère spécial.</li>
        </ul>
      </div>
      <div className='container_input'>
        <label htmlFor="password">Confirmer le mot de passe</label>
        <input className='input' type="password" id="password2" name="password2" />
        
      </div>


      </div>


      <div className='container_allergies'>
        <p>COMMENTAIRES , ALLERGIES  ET HABITUDES ALIMENTAIRES</p>
        <div className='container_inputAllergies'>
          <label htmlFor="password">Pour Moi</label>
          <textarea className='input' type="text" id="allergies1" name="allergies1" />
          <label htmlFor="password">Autre</label>
          <textarea className='input' type="text" id="allergies2" name="allergies2" />
        </div>
      </div>
      <div>
        <button type="button" onClick={signUp} className='btn_form'>S’inscrire</button>
      </div>
    </form>}</>
  );
}

export default Connection;


// Formé d'un minimum de 8 caractères. Ajustez-le en modifiant {8,}

// Au moins une lettre majuscule. Vous pouvez supprimer cette condition en supprimant (?=.* ?[A-Z])

// Au moins une lettre minuscule. Vous pouvez supprimer cette condition en supprimant (?=.* ?[a-z])

// Au moins un chiffre. Vous pouvez supprimer cette condition en supprimant (?=.* ?[0-9])

// Au moins un caractère spécial, Vous pouvez supprimer cette condition en supprimant (?=.* ?[#?!@$%^&*-])