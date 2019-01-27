import firebase from "firebase";
const uuidv1 = require("uuid/v1");

const cache = {
  cheatsList: []
};
export const AddCheat = body =>
  new Promise((resolve, reject) => {
    const {
      schoolName,
      groupName,
      userId,
      cheatTitle,
      cheatBody,
      postedByName
    } = body;
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
                cheatId: postId,
                postedBy: userId,
                cheatTitle,
                postedByName,
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
                postedByName,
                postedBy: userId,
                cheatId: postId,
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

export const handleGetAllCheats = (body, reload) =>
  new Promise((resolve, reject) => {
    if (!reload && cache.cheatsList.length) {
      resolve(cache.cheatsList[0]);
    }
    cache.cheatsList = [];
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
        cache.cheatsList.push(resp);
        resolve(resp);
      })
      .catch(e => reject(e));
  });
