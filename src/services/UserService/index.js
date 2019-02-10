import firebase from "firebase";

export const signInWithGoogle = () =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(resp => {
            const { uid, displayName, email } = resp.user;
            const { isNewUser } = resp.additionalUserInfo;
            if (isNewUser) {
              database
                .collection("users")
                .doc(email.toLowerCase())
                .set({
                  uid,
                  email: email.toLowerCase(),
                  name: displayName
                })
                .then(() => resolve(resp));
            } else {
              resolve(resp);
            }
          });
      })
      .catch(e => reject(e));
  });

export const createUser = body =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    const { email, password, name } = body;
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(resp => {
            const { uid } = resp.user;
            database
              .collection("users")
              .doc(email.toLowerCase())
              .set({
                uid,
                email: email.toLowerCase(),
                name
              })
              .then(doc => resolve(doc));
          });
      })
      .catch(e => reject(e));
  });

export const loginUser = (email, password) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(resp => resolve(resp))
          .catch(e => reject(e));
      });
  });

export const getUser = email =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection("users")
      .where("email", "==", email)
      .get()
      .then(resp => resolve(resp))
      .catch(e => reject(e));
  });

export const patchUser = (body, email) =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection("users")
      .doc(email.toLowerCase())
      .update(body)
      .then(resp => resolve(resp))
      .catch(e => reject(e));
  });
