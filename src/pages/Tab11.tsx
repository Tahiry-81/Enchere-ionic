import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { connect } from 'http2';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const connect = () => {
    // Code pour envoyer les informations d'identification à l'API et gérer la réponse
  };

  return (
    <IonPage className='page'>
    <IonHeader>
      <IonToolbar>
        <IonTitle className='title'>CONNEXION</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className='ioncontent'>
    <div className='content'>
      <IonItem className='input1'>
        <IonLabel position="floating" className='label'>Nom d'utilisateur</IonLabel>
        <IonInput type="text" value={username} onIonChange={e => setUsername(e.detail.value!)} />
      </IonItem>
      <IonItem className='input1'>
        <IonLabel position="floating" className='label'>Mot de passe</IonLabel>
        <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
      </IonItem >
      <IonButton  onClick={connect} className='input1'>Se connecter</IonButton>
    </div>
    </IonContent>
    
  </IonPage>
  
  );
};

export default Tab1;
