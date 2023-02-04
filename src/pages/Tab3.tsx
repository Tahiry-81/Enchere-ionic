import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelectOption,
  IonSelect,
} from "@ionic/react";
import { useEffect } from "react";
import axios from "axios";
import internal from "stream";

const NewEnchere: React.FC = () => {
  const [enchereName, setEnchereName] = useState("");
  const [enchereDesc, setEnchereDesc] = useState("");
  const [clientIdEnchere, setClientIdEnchere] = useState("");
  const [encherePrixDepart, setEncherePrixDepart] = useState(0);
  const [dureeIdEnchere, setDureeIdEnchere] = useState(0);
  const [duree_id, setDuree_Id] = useState("");
  const [duree, setDuree] = useState(""); 
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const id=sessionStorage.getItem("id");
  const nom=sessionStorage.getItem("name");

  useEffect(() => {
    // Fetch the list of id + count from the function
    const getOptions = async () => {
      const response = await axios.get("https://deployement-production.up.railway.app/getallduree");
      setOptions(response.data);
    };
    getOptions();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      enchere_name: enchereName,
      enchere_desc: enchereDesc,
      client_id_enchere: id,
      enchere_prix_depart: encherePrixDepart,
      duree_id_enchere: dureeIdEnchere,
    };
    try {
      await axios.get("");
      await axios.post("https://deployement-production.up.railway.app/enregistrer/enregistrerenchere", data);
      alert("Une enchere a ete ajoutee");
    } catch (error) {
      alert("Une erreur s'est produit");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nouvelle Enchere</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Objet a encherir:</IonLabel>
              <IonInput
                type="text"
                value={enchereName}
                onIonChange={(e) => setEnchereName(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Description:</IonLabel>
              <IonInput
                type="text"
                value={enchereDesc}
                onIonChange={(e) => setEnchereDesc(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Starting Price:</IonLabel>
              <IonInput
                type="number"
                value={encherePrixDepart}
                onIonChange={(e) =>
                  setEncherePrixDepart(parseFloat(e.detail.value!))
                }
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Duration : </IonLabel>
              <IonInput
                type="number"
                value={dureeIdEnchere}
                onIonChange={(e) =>
                  setDureeIdEnchere(parseFloat(e.detail.value!))
                }
                required
               />
              {/* <IonSelect
                value={selectedOption}
                onIonChange={(e) => setSelectedOption(e.detail.value)}
              >
                {options.map(
                  (element:{ duree_id : number , duree : number }) => {
                    return(
                  <IonSelectOption key={element.duree_id} value={element.duree_id}>
                    {`${element.duree_id} heure`}
                  </IonSelectOption>
                  
                  );
                    })}
              </IonSelect> */}
              
            </IonItem>
          </IonList>
          <IonButton type="submit">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default NewEnchere;
