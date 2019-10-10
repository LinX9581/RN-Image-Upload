import * as React from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export default class app extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Button onPress={this._takePhoto} title="Take a photo" />

        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    this.getProfilePhoto();
  }

  getProfilePhoto = async () => {
    fetch("https://b3c84cad.ngrok.io/getProfileImg", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    }).then(response => {
        console.log(response.url);
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
      uploadImageAsync(pickerResult.uri);
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
      uploadImageAsync(result.uri);
    }
  };
}

async function uploadImageAsync(uri) {
  let fileType = uri.substring(uri.lastIndexOf(".") + 1);
  let formData = new FormData(); //圖片傳輸格式
  formData.append("myImage", {
    //圖片 (Key,Data)
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  fetch("https://b3c84cad.ngrok.io/uploadphoto", {
    method: "POST",
    headers: {
      Accept: "application/json",
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
