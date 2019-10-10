// Import the screens
import Main from './component/Main';
import UploadImg from './component/UploadImg';
import React from "react";
// Import React Navigation
import { createSwitchNavigator, createAppContainer} from "react-navigation";

// Create the navigator
const AppSwitchNavigator = createSwitchNavigator({
  Main: { screen: Main },
  UploadImg: { screen: UploadImg },
});

const AppNavigator = createAppContainer(AppSwitchNavigator)

// Export it as the root component
export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
