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
      postedByName,
      downloadUrl,
      fileName
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
                fileName,
                downloadUrl,
                cheatBody,
                upVotesList: [],
                dislikeList: [],
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
                fileName,
                downloadUrl,
                upVotesList: [],
                dislikeList: [],
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

export const upVoteCheat = (schoolName, cheat, userId) =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    const { cheatId } = cheat;
    const newUpVotesList = [...cheat.upVotesList, userId];
    const indexOfDislike = cheat.dislikeList
      ? cheat.dislikeList.indexOf(userId)
      : -1;
    if (indexOfDislike >= 0) {
      cheat.dislikeList.splice(indexOfDislike, 1);
    }
    const newCheat = Object.assign(cheat, {
      likes: cheat.likes + 1,
      upVotesList: newUpVotesList
    });
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection(schoolName)
      .doc("Cheats")
      .update({
        [cheatId]: { ...newCheat }
      })
      .then(resp => resolve(resp))
      .catch(e => reject(e));
  });
export const downVoteCheat = (schoolName, cheat, userId) =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    const { cheatId } = cheat;
    const newDislikeList = [...cheat.dislikeList, userId];
    const indexOfLike = cheat.upVotesList
      ? cheat.upVotesList.indexOf(userId)
      : -1;
    if (indexOfLike >= 0) {
      cheat.upVotesList.splice(indexOfLike, 1);
    }
    const newCheat = Object.assign(cheat, {
      likes: cheat.likes - 1,
      dislikeList: newDislikeList
    });
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection(schoolName)
      .doc("Cheats")
      .update({
        [cheatId]: { ...newCheat }
      })
      .then(resp => resolve(resp))
      .catch(e => reject(e));
  });
