import firebase from "firebase";
const uuidv1 = require("uuid/v1");

const cache = {
  groups: [],
  usersGroup: []
};
export const createGroup = body =>
  new Promise((resolve, reject) => {
    const {
      name,
      description,
      teacherName,
      subject,
      school,
      tags,
      groupColor
    } = body;
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    const groupId = uuidv1();
    database
      .collection("Groups")
      .doc(groupId)
      .set({
        name,
        groupId,
        description,
        teacherName,
        subject,
        school,
        tags,
        groupColor
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

export const getAllSchoolGroups = school =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    console.log("school: ", school);
    database
      .collection("Groups")
      .where("school", "==", school)
      .get()
      .then(resp => resolve(resp))
      .catch(e => reject(e));
  });

export const getAllGroups = () =>
  new Promise((resolve, reject) => {
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database
      .collection("Groups")
      .get()
      .then(resp => {
        resolve(resp);
      })
      .catch(e => reject(e));
  });
