import firebase from "firebase";

export const AddComment = (comment, cheat, user, schoolName, date) =>
  new Promise((resolve, reject) => {
    const { cheatId } = cheat;
    cheat.comments.push({ comment, postedBy: user, postedTimeMs: date });
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection(schoolName)
      .doc("Cheats")
      .update({
        [cheatId]: { ...cheat }
      })
      .then(resp => resolve(resp))
      .catch(e => reject(e));
  });
