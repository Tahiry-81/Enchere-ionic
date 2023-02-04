import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import './Tab5.css';

const Tab5: React.FC = () => {
  const [response1, setResponse1] = useState([]);

  const [montant, setMontant] = useState('');
 
  const id=sessionStorage.getItem("id");
  const nom=sessionStorage.getItem("name");
  console.log(id);
  console.log(nom);

  const handleSubmit = async (e: React.FormEvent) => {
   
    e.preventDefault();
    const response = await axios.post(
      "https://deployement-production.up.railway.app/recharge/arecharger?client_id_recharge=" +
          id +
          "&recharge_montant=" +
          montant
    );
    
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='title'>RECHARGER</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       
              <IonItem >
                <IonLabel position="floating" className='label'> Nom  : {nom} </IonLabel>
                
              </IonItem>
          

      <form onSubmit={handleSubmit}>
      
      <IonItem >
     
        <IonLabel position="floating" className='label'>RECHARGER DE </IonLabel>
        <IonInput type="number" value={montant} onIonChange={e => setMontant(e.detail.value!)}/>
        </IonItem>
        <IonButton type="submit" expand="block">
           effectuer
          </IonButton>
    </form>  
      </IonContent>
    </IonPage>
  );
};

export default Tab5;
