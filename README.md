# Memo app

## Overview
Memo App is a personal project that allows you to take pictures and write notes about them. For example, do you find it hard to remember the name of the last good wine you enjoyed? Take a picture of the bottle and write down some notes. You can refer back to them later and easily check which wine it was.

## Features
- **Category Management**: Choose an existing category or add a new one.
- **Note Management**: Add, edit, and delete notes.
- **Image Management**: Take pictures and attach them to notes.

## Usage
1. **Take a picture**: Use the app's camera feature to take a picture.
2. **Write a note**: Add a note to the picture.
3. **Save**: Save the note and picture for later reference.

## Technologies
- **React**: For building the user interface
- **TypeScript**: For type safety
- **Vite**: For a fast development environment
- **Firebase**: For backend services

## Installation
1. **Clone the repository**:
    ```sh
    git clone https://github.com/username/memo-app.git
    cd memo-app
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```
    
3. **Configure Firebase**:
    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Add a new web app to the project and copy the Firebase configuration object.


4. **Add Firebase configuration to the project**:
    - Create a file named `firebaseConfig.tsx` in the `src` directory.
    - Add the Firebase configuration object to the file:
    ```ts
    // src/firebaseConfig.ts
    import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";
    import { getAuth } from "firebase/auth";
    import { getStorage } from "firebase/storage";

    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app);
    export const auth = getAuth(app);
    export const storage = getStorage(app);
    ```
5. **Start the development server**:
    ```sh
    npm run dev
    ```

## React + TypeScript + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
