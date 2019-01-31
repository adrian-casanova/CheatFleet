import firebase from "firebase";

export const uploadCheatFile = body =>
  new Promise((resolve, reject) => {
    const { email, blob, fileName } = body;
    const currentTime = new Date().getTime();
    const storage = firebase.storage();
    const storageRef = storage
      .ref()
      .child(`${email}/${currentTime}/${fileName}`);

    storageRef
      .put(blob)
      .then(snapshot => {
        const url = snapshot.ref.getDownloadURL();
        resolve(url);
      })
      .catch(e => reject(e));
  });
