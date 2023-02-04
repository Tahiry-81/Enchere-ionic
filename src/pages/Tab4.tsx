import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import "./Tab4.css";
import Test from "./Test";

interface UserDetailPageProps
  extends RouteComponentProps<{
    client: string;
  }> {}
const Tab4: React.FC<UserDetailPageProps> = ({ match }) => {
  const id=sessionStorage.getItem("id");
  const nom=sessionStorage.getItem("name");
  console.log(id);
  const [tableau1, setTableau1] = useState([]);
  const [tableau2, setTableau2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response1 = await axios.get(
        "https://deployement-production.up.railway.app/propreenchere/propreencours/" + id
      );
      setTableau1(response1.data);
      const response2 = await axios.get(
        "https://deployement-production.up.railway.app/propreenchere/proprefait/" + id
      );
      setTableau2(response2.data);
    };
    fetchData();
    console.log(tableau2);
  }, []);

  if (!tableau1) {
    return <h5>il n'y a rien </h5>;
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title">LISTE DE PROPRE ENCHERE</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonTitle>DEJA FAIT</IonTitle>
          {tableau1.map(
            (element: {
              enchere_name: string;
              enchere_date: string;
              enchere_desc: string;
              client_id_enchere: string;
              enchere_prix_depart: number;
              enchere_status: number;
              duree: number;
            }) => {
              return (
                <IonCard className="cardnonfait">
                  <IonItem> Client : </IonItem>
                  <IonCardHeader>
                    <IonItem> Nom produit : {element.enchere_name}</IonItem>
                    <IonItem> Description : {element.enchere_desc}</IonItem>
                    <IonItem> Duree : {element.duree}</IonItem>
                    <IonItem> Date enchere : {element.enchere_date}</IonItem>
                  </IonCardHeader>
                  <IonCardContent></IonCardContent>
                </IonCard>
              );
            }
          )}

          <IonTitle>ENCHERE DEJA TERMINER</IonTitle>
          {tableau2.map(
            (element: {
              enchere_name: string;
              enchere_date: string;
              enchere_desc: string;
              client_id_enchere: string;
              enchere_prix_depart: number;
              enchere_status: number;
              duree: number;
              rencherir: number;
              client_name: string;
            }) => {
              return (
                <IonCard className="cardnonfait">
                  <IonItem> Client : </IonItem>
                  <IonCardHeader>
                    <IonItem> Nom produit : {element.enchere_name}</IonItem>
                    <IonItem> Description : {element.enchere_desc}</IonItem>
                    <IonItem> Duree : {element.duree}</IonItem>
                    <IonItem> Date enchere : {element.enchere_date}</IonItem>
                    <IonItem>
                      {" "}
                      Client qui la obtenu : {element.client_name}
                    </IonItem>
                    <IonItem> montant final : {element.rencherir}</IonItem>
                  </IonCardHeader>
                  <IonCardContent></IonCardContent>
                </IonCard>
              );
            }
          )}
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab4;
