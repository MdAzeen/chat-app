
export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(' ');

  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }

  return splitName[0][0];
}

// export function transformToArr(snapVal) {
//   return snapVal ? Object.keys(snapVal) : [];
// }

export function transformToArrWithId(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId], id: roomId };
      })
    : [];
}

export async function getUserUpdates(userId, keyToUpdate, value, db) {
  const updates = {};


  // Actual value updation
  updates[`/profiles/${userId}/${keyToUpdate}`] = value;



  // Getting the msgs for the updated user
  const getMsgs = db
    .ref('/messages')
    .orderByChild('author/uid')
    .equalTo(userId)
    .once('value');


  // Getting rooms for the updated user
  const getRooms = db
    .ref('/rooms')
    .orderByChild('lastMessage/author/uid')
    .equalTo(userId)
    .once('value');


  // Resolving the promises at one shot
  const [mSnap, rSnap] = await Promise.all([getMsgs, getRooms]);


  // For Messages object
  mSnap.forEach(msgSnap => {
    // FEtching the message object key to update all the references for the updated user
    updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
  });


  // For Rooms object
  rSnap.forEach(roomSnap => {
    // FEtching the message object key to update all the references for the updated user
    updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });


  return updates;
}

// export function groupBy(array, groupingKeyFn) {
//   return array.reduce((result, item) => {
//     const groupingKey = groupingKeyFn(item);

//     if (!result[groupingKey]) {
//       result[groupingKey] = [];
//     }

//     result[groupingKey].push(item);

//     return result;
//   }, {});
// }

// export const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//     // [::1] is the IPv6 localhost address.
//     window.location.hostname === '[::1]' ||
//     // 127.0.0.0/8 are considered localhost for IPv4.
//     window.location.hostname.match(
//       /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//     )
// );