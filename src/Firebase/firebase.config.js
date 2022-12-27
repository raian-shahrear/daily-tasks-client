import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyApcrgpE8xHUDm2hWZydmV6NRg_Du1FX2k",
  authDomain: "daily-tasks-416ff.firebaseapp.com",
  projectId: "daily-tasks-416ff",
  storageBucket: "daily-tasks-416ff.appspot.com",
  messagingSenderId: "1096074284587",
  appId: "1:1096074284587:web:52ac90bb0732c69847a46e"
};

const app = initializeApp(firebaseConfig);

export default app;