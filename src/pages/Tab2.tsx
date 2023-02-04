import React, { useState, useEffect, ReactNode } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonRouterLink,
  IonCard,
  IonCardHeader,
} from "@ionic/react";
import axios from "axios";

const WelcomePage: React.FC = () => {
  const [money, setMoney] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const id=sessionStorage.getItem("id");
  const nom=sessionStorage.getItem("name");

  useEffect(() => {
    const fetchData = async () => {
      const reponse = await axios.get("https://deployement-production.up.railway.app/Solde/"+id
      );
      setMoney(reponse.data);
      const table = await axios.get(
        "https://deployement-production.up.railway.app/notif/getMessage/"+id
      );
      setNotifications(table.data);
    };
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>
          <h1>Welcome!</h1>
        </IonText>
        <IonList>
          <IonItem>
            <IonLabel>Current Money:</IonLabel>
            <IonText>{money} Ar</IonText>
          </IonItem>
        </IonList>
        <IonList>
          <IonLabel>Latest Notifications:</IonLabel>
          {notifications.map(
            (element: { date_notif: string; message: string }) => {
              return (
                <IonCardHeader>
                  <IonItem> Date et heure : {element.date_notif}</IonItem>
                  <IonItem> Message : {element.message}</IonItem>
                </IonCardHeader>
              );
            }
          )}
        </IonList>
        <IonList>
          <IonItem>
            <IonRouterLink href="/Tab3">Ajouter un enchere</IonRouterLink>
          </IonItem>
          <IonItem>
            <IonRouterLink href="/Tab4">
              Voir la liste des enchere
            </IonRouterLink>
          </IonItem>
          <IonItem>
            <IonRouterLink href="/Tab5">Recharger son compte</IonRouterLink>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
