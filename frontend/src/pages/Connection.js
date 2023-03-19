
import { useEffect, useState } from 'react';
import './Connection.css'
import  * as fa  from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { postData } from '../lib/api';
import { useNavigate } from 'react-router-dom';

function Connection({setUser}) {
const navigate = useNavigate();

  const [msgEmailError, setMsgEmailError] = useState("");
  const [msgPasswordError, setMsgPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)


  const [lengthError, setLengthError] = useState(false)
  const [upperError, setUpperError] = useState(false)
  const [lowerError, setLowerError] = useState(false)
  const [digitError, setDigitError] = useState(false)
  // const [specialError, setSpecialError] = useState(false)

  const verificationPassword = (data)=>{
    const length = new RegExp('(?=.{6,})');
    const upper =new RegExp('(?=.*[A-Z])');
    const lower =new RegExp('(?=.*[a-z])');
    const digit =new RegExp('(?=.*[0-9])');
  
  
    let blnError = false;

    if (length.test(data)){
      setLengthError (false);
    }else{
      setLengthError (true);
      blnError= true ;
    }
  
    if (upper.test(data)){
      setUpperError (false);
    }else{
      setUpperError (true);
      blnError= true ;
    }
  
    if (lower.test(data)){
      setLowerError (false);
    }else{
      setLowerError (true);
      blnError= true ;
    }
  
    if (digit.test(data)){
      setDigitError (false);
    }else{
      setDigitError (true);
      blnError= true ;
    }
  
    return blnError;
  
  }

  const verificationEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  
  const signUp  = async() => {
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

    if (verificationPassword(password)) {
      setMsgPasswordError('Saisissez un mot de passe valide');
      return;
    }

    if (password !== password2) {
      setMsgPasswordError('Les deux mots de passe doivent correspondre');
      return;
    }
    // verification completer
    const allergies= allergies1 + ", " +allergies2
    const result = await postData('signup',{email,password,allergies});

    if(result === 'OK'){
      setInscriptionExist (true)
    }
    else{
      alert('inscription echoue');
    }
  };

  const signIn = async () =>{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const result = await postData('signin',{email,password});

if(  result.token)
{
    // Stockage du token dans localStorage
     localStorage.setItem("token",result.token)
     localStorage.setItem("user", JSON.stringify(result.user) )
     setUser(result.user);
     navigate("/" );
}
    


  }

  const [inscriptionExist, setInscriptionExist] = useState(true);
  const [autentificationExist, setAutentificationExist] = useState(true)

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
        <input className='input' type={showPassword ? 'text' : "password"} id="password" name="password" onKeyUp={(event)=>verificationPassword(event.target.value)} />
        <FontAwesomeIcon  className="eye" icon={ fa.faEye} onClick={()=>{setShowPassword(!showPassword)}} />
        </div>
        <h6 className='text-danger '>{msgPasswordError} </h6>
       
      </div>
      <div>
        <button type="button" onClick={signIn} className='btn_form'>S’identifier</button>
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
        {/* operation ternaire */}
        <div className='flex flex-row'>
        <input className='input' type={showPassword ? 'text' : "password"} id="password" name="password" onKeyUp={(event)=>verificationPassword(event.target.value)} />
        <FontAwesomeIcon  className="eye" icon={ fa.faEye} onClick={()=>{setShowPassword(!showPassword)}} />
        </div>

        <h6 className='text-danger '>{msgPasswordError} </h6>
        <div className='validation'>
        <ul className='liste_vaidationCheck text-danger' id="validation">
          { lengthError && <li className='valid'>Minimum de 8 caractères</li>}
          { upperError &&  <li className='valid'>Au moins une lettre majuscule</li>}
          { lowerError &&  <li className='valid'>Au moins une lettre minuscule.</li>}
          { digitError &&  <li className='valid'>Au moins un chiffre.</li>}
          
        </ul>
      </div>
      <div className='container_input'>
        <label htmlFor="password">Confirmer le mot de passe</label>
        <div className='flex flex-row'>
        <input className='input' type={showPassword2 ? 'text' : "password2"} id="password2" name="password2" />
        <FontAwesomeIcon  className="eye" icon={ fa.faEye} onClick={()=>{setShowPassword2(!showPassword2)}} />
        
        </div>
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


// Formé d'un minimum de 8 caractères. Ajustez-le en modifiant {6,}

// Au moins une lettre majuscule. Vous pouvez supprimer cette condition en supprimant (?=.* ?[A-Z])

// Au moins une lettre minuscule. Vous pouvez supprimer cette condition en supprimant (?=.* ?[a-z])

// Au moins un chiffre. Vous pouvez supprimer cette condition en supprimant (?=.* ?[0-9])

