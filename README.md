# bloxmove
## React Native

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [axios](https://github.com/axios/axios) for networking.
- [prop-types](https://github.com/facebook/prop-types) to type-check our components exposed properties.
- [react-native-config](https://github.com/luggit/react-native-config) to manage envionments.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [redux](https://redux.js.org/) for state management.
- [redux-persist](https://github.com/rt2zz/redux-persist) as persistance layer.
- [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.

### Using scripts from console

- Go to your project's root folder and run `npm install` or `yarn install`.
- If you are using Xcode 12.5 or higher got to /ios and execute `pod install --`repo-update`
  Setting up the development environment
  1. Android development environment
    https://reactnative.dev/docs/environment-setup?guide=native&platform=android
  2. iOS development enviroment
    https://reactnative.dev/docs/environment-setup?guide=native&platform=ios
- Run `npm run ios` or `npm run android` to start your application!
  (Using yarn: `yarn ios` or `yarn android`)
  - `npm run android`
    Like npm start, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see React Native docs(https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of adb available to Create React Native App:

    Using Android Studio's adb
      1. Make sure that you can run adb from your terminal.
      2. Open Genymotion and navigate to Settings -> ADB. Select “Use custom Android SDK tools” and update with your Android SDK directory(https://stackoverflow.com/questions/25176594/android-sdk-location).
      
    Using a physical device
      If you have a physical Android device, you can use it for development in place of an AVD by plugging it in to your computer using a USB cable and following the instructions here(https://reactnative.dev/docs/running-on-device).


## Folder structure

- `App.js`: Main component that starts your whole app.
- `index.js`: Entry point of your application as per React-Native standards.
- `src`: This folder is the main container of all the code inside your application.
  - `components`: Folder to store any common component that you use through your app (such as a generic button)
  - `lib`: Folder to store any kind of constant that you have.
    - `config.js`: File to store GoogleAPIKey, SERVER_URL, and testnet.
      export const GoogleAPIKey = `Your own key`;
      export const SERVER_URL = `PRODUCT/UAT Server url`;
      export const testnet = `Main/Testnet Celo url`;
        If the server url is product version, please use Main Celo Net url(https://forno.celo.org).
        If not, please use Celo Test Net url.
  - `navigators`: Folder to store the navigators.
  - `reducers`: This folder should have all your reducers, and expose the combined result using its `index.js`
  - `actions`: This folder contains all actions that can be dispatched to redux.
  - `screens`: Folder that contains all your application screens/features.
    - `HomeScreens`: Screen that users can see after sign in.
    - `Onboarding`: Screen that users can see before sign up.
    - `NonConnectedScreens`: Screen that we built to approve app on App Store - Can be removed.
- `assets`: Asset folder to store all images, vectors, etc.

## Generate production version

### Android

1. Generate an upload key
2. Setting up gradle variables
3. Go to the android folder
4. Execute `./gradlew assemble[Env][BuildType]`

Note: You have three options to execute the project
`assemble:` Generates an apk that you can share with others.
`install:` When you want to test a release build on a connected device.
`bundle:` When you are uploading the app to the Play Store.

For more info please go to https://reactnative.dev/docs/signed-apk-android

### iOS

1. Go to the Xcode
2. Select the schema
3. Select 'Any iOS device' as target
4. Product -> Archive

For more info please go to https://reactnative.dev/docs/publishing-to-app-store

## Styleguide

For coding styling, we decided to go with ESLint and [React Native community's styleguide](https://github.com/facebook/react-native/tree/master/packages/eslint-config-react-native-community#readme).

## Redux

Once the components are defined, they are tied to the management of information through the application. For this, Redux is implemented with the store-reducer-action structure as usual, however, not only the data is handled through the actions but the success and error responses are also defined by the same form.

### Redux folders

4 folders divide the redux work

- Store: Here you define the store shape and you can configure the persistReducer and middlewares.
- Actions: Remember to create the file and the corresponding test for each action classification. Here you define actions for success and error scenarios.
- Reducers: You have the error and success reducers by default. Create the other classifications and try to keep simple each file. Here you modify the store.
- Selectors: Create one file for each action classification. Here you define what part of the store you need to see in your interface.

### Additonal Features

We are using Firebase for the Push Notification and Dynamic Links.
Link: https://console.firebase.google.com/u/0/project/bloxmoveng-fc8e2/overview

1. Push Notification - https://rnfirebase.io/messaging/usage
  We use push notifications to send updates on requests and payments.
2. Dynamic Links - https://rnfirebase.io/dynamic-links/usage
  With Dynamic Links, we open the application after verifying the email and the payment is successful in Fincra.
