import firebase from "firebase";
const uuidv1 = require("uuid/v1");

export const AddCheat = body =>
  new Promise((resolve, reject) => {
    const { schoolName, groupName, userId, cheatTitle, cheatBody } = body;
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    const postId = uuidv1();
    database
      .collection(schoolName)
      .doc("Cheats")
      .get()
      .then(resp => {
        if (resp.exists) {
          database
            .collection(schoolName)
            .doc("Cheats")
            .update({
              [postId]: {
                schoolName,
                groupName,
                postedBy: userId,
                cheatTitle,
                cheatBody,
                comments: [],
                postDateMs: new Date().getTime(),
                postDataString: new Date().toLocaleString(),
                likes: 0
              }
            })
            .then(resp => resolve(resp))
            .catch(e => reject(e));
        } else {
          database
            .collection(schoolName)
            .doc("Cheats")
            .set({
              [postId]: {
                schoolName,
                groupName,
                postedBy: userId,
                cheatTitle,
                cheatBody,
                comments: [],
                postDateMs: new Date().getTime(),
                postDateString: new Date().toLocaleString(),
                likes: 0
              }
            })
            .then(resp => resolve(resp))
            .catch(e => reject(e));
        }
      });
  });

export const handleGetAllCheats = body =>
  new Promise((resolve, reject) => {
    const { schoolName } = body;
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection(schoolName)
      .doc("Cheats")
      .get()
      .then(resp => {
        resolve(resp);
      })
      .catch(e => reject(e));
  });
