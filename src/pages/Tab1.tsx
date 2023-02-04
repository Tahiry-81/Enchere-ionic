import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import axios from "axios";

const Tab1: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const ionRouter = useIonRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      `https://deployement-production.up.railway.app/Client/loginfrontoff?client_email=` +
        email +
        "&client_mdp=" +
        password,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ client_email: email, client_mdp: password }),
      }
    );
    const client_id = await axios.post(
      "https://deployement-production.up.railway.app/Client/getid?client_email=" +
        email +
        "&client_mdp=" +
        password
    );
    // console.log(client_id.data);

    {
      const data = client_id.data;
    }
    const result = await response.json();
    if (result) {
      ionRouter.push("/tab2");
      sessionStorage.setItem("id", client_id.data);
      const response1 = await axios.get(
        "https://Client/getClient/" + client_id.data
      );
      sessionStorage.setItem("name", response1.data);
    } else {
      setError("Incorrect email or password");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              placeholder="rara@gmail.com"
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              placeholder="rara"
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
          <IonButton type="submit" expand="block">
            Login
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
