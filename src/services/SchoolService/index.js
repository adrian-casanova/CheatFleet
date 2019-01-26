import firebase from "firebase";

export const checkUsersSchool = schoolName =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection(schoolName)
      .get()
      .then(doc => {
        if (!doc.empty) {
          console.log("docExists");
          resolve(doc);
        } else {
          resolve(createSchoolEntry(schoolName));
        }
      })
      .catch(e => reject(e));
  });

export const getUsersSchool = email =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    console.log("email: ", email);
    database
      .collection("users")
      .where("email", "==", email)
      .get()
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(e => reject(e));
  });

export const createSchoolEntry = schoolName =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection(schoolName)
      .doc("groups")
      .set({
        school: schoolName
      })
      .then(resp => resolve(resp));
  });
