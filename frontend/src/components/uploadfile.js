import React, {useState} from 'react';
import { IconEdit } from '../lib/icons';
function Uploadfile({  setSelectedFile,setPreviewPicture}){

	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
		
		// Preview de l'image 
	
		const reader = new FileReader();
		reader.onloadend = () => {
		  const base64String = reader.result
		  //   .replace('data:', '')
		  //   .replace(/^.+,/, '');
		  console.log(base64String)
		  setPreviewPicture(base64String);
		};
		reader.readAsDataURL(file);
	};

	const selectCoverPicture = (selectfile) => {
		// Selection du fichier de l'image à sauvegarder 
	
	
	  }
	

	return(
   <div   className="m-[-20px]"  >
			<input className='d-none' type="file" name="file" onChange={changeHandler} />
			<IconEdit onClick={(e) =>{ e.target.previousSibling.click()   } } /> 
		</div>
	)
}


export default Uploadfile;