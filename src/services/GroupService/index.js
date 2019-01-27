import firebase from "firebase";
const uuidv1 = require("uuid/v1");

const cache = {
  groups: [],
  usersGroup: []
};
export const createGroup = body =>
  new Promise((resolve, reject) => {
    const { groupName, description, teacherName, subject, schoolName } = body;
    console.log("body: ", body);
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    const groupId = uuidv1();
    database
      .collection(schoolName)
      .doc("groups")
      .update({
        [groupId]: {
          groupName,
          groupId,
          description,
          teacherName,
          subject
        }
      })
      .then(resp => resolve(resp))
      .catch(e => reject(e));
  });

export const checkUserGroups = (uid, reload) =>
  new Promise((resolve, reject) => {
    if (!reload && cache.usersGroup.length) {
      resolve(cache.usersGroup[0]);
    }
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection("users")
      .doc(uid)
      .get()
      .then(resp => {
        cache.usersGroup.push(resp);
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

export const getAllGroups = (schoolName, reload) =>
  new Promise((resolve, reject) => {
    if (!reload && cache.groups.length) {
      resolve(cache.groups[0]);
    }
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection(schoolName)
      .doc("groups")
      .get()
      .then(resp => {
        cache.groups.push(resp);
        resolve(resp);
      })
      .catch(e => reject(e));
  });
