import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

/*
  Normally I would use environment variables or some other mechanism so this config isn't committed to a public repository,
  but for the sake of saving time I'll just hardcode it.
*/
const firebaseConfig = {
  apiKey: "AIzaSyD7NUVfrImccSo8FuCBG7bXVk0oLFqgE-k",
  authDomain: "yardzen-demo.firebaseapp.com",
  databaseURL: "https://yardzen-demo.firebaseio.com",
  projectId: "yardzen-demo",
  storageBucket: "yardzen-demo.appspot.com",
  messagingSenderId: "509183652730",
  appId: "1:509183652730:web:ba2208f7d8e0882f009cc3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getFormattedPrice = (price) => (price / 100).toFixed(2);

export async function getItems() {
  const itemsCol = collection(db, 'items');
  const itemSnapshot = await getDocs(itemsCol);

  const itemList = itemSnapshot.docs.map(doc => doc.data())
    .map(item => (
      {
        ...item,
        lowPrice: getFormattedPrice(item.lowPrice),
        highPrice: getFormattedPrice(item.highPrice)
      }
    ));

  return itemList;
}
