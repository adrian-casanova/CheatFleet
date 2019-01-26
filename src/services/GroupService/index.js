import firebase from "firebase";

export const createGroup = body =>
  new Promise((resolve, reject) => {
    const { groupName, description, teacherName, subject, schoolName } = body;
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection(schoolName)
      .doc("groups")
      .update({
        [groupName]: {
          groupName,
          description,
          teacherName,
          subject
        }
      })
      .then(resp => resolve(resp))
      .catch(e => reject(e));
  });

export const checkUserGroups = uid =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection("users")
      .doc(uid)
      .get()
      .then(resp => {
        resolve(resp);
      })
      .catch(e => reject(e));
  });
export const addGroupsToUser = (uid, group) =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection("users")
      .doc(uid)
      .update({
        groups: group
      })
      .then(resp => resolve(resp))
      .catch(e => reject(e));
  });

export const getAllGroups = schoolName =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection(schoolName)
      .doc("groups")
      .get()
      .then(resp => resolve(resp))
      .catch(e => reject(e));
  });
