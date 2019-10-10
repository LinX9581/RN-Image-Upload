import * as React from "react";
import { Button, Image, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export default class uploadImg extends React.Component {
  state = {
    image: null,
    name: null,
    userProfileImage: null,
  };

  componentDidMount() {
    this.getPermissionAsync();
    this.getProfilePhoto();
  }


  render() {
    let { image } = this.state;
    let { userProfileImage } = this.state;

    // const willFocusSubscription = this.props.navigation.addListener(
    //     "UploadImg",
    //     () => {

    //         const thing = this.props.navigation.getParam("thing");
    //         const thing2 = this.props.navigation.getParam("thing2");
    //         this.setState({thing, thing2});
    //         console.log(thing)
    //     }
    // );
    let username = this.props.navigation.state.params.name;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Button onPress={this._takePhoto} title="Take a photo" />

        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        <Text>{username}</Text>

        <Image source={{ uri: userProfileImage }} style={{ width: 200, height: 200 }} />
      </View>
    );
  }


  getProfilePhoto = async () => {
    let username = this.props.navigation.state.params.name;
    fetch("https://2ecc21b3.ngrok.io/getProfileImg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account: username,
      }),
    })
      .then(res => res.json())
      .then(userInfo => {
          console.log(userInfo.userProfileImgUrl)
          this.setState({ userProfileImage: userInfo.userProfileImgUrl });
        })
      .catch(function(error) {
        console.log(
          "There has been a problem with your fetch operasdation: " +
            error.message
        );
      });
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _takePhoto = async () => {
    console.log(this.props.navigation.state.params.name);
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this.setState({ image: pickerResult.uri });
      let username = this.props.navigation.state.params.name;
      uploadImageAsync(pickerResult.uri, username);
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      let username = this.props.navigation.state.params.name;
      uploadImageAsync(result.uri, username);
    }
  };
}

async function uploadImageAsync(uri, username) {
  console.log(username);
  let fileType = uri.substring(uri.lastIndexOf(".") + 1);

  let formData = new FormData();

  formData.append("myImage", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  formData.append("account", username);

  fetch("https://2ecc21b3.ngrok.io/uploadphoto", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  }).catch(function(error) {
    console.log(
      "There has been a problem with your fetch operasdation: " + error.message
    );
  });

  // console.log(formData);
}
