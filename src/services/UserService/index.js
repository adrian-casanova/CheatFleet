import firebase from "firebase";

export const createUser = body =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    const { email, password, firstName, lastName, school } = body;
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
              .doc(uid)
              .set({
                uid,
                email: email.toLowerCase(),
                firstName,
                lastName,
                school
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
