const db = firebase.firestore()

db.collection('banco').get().then(snapshot => {
    console.log(snapshot.docs)
})
   