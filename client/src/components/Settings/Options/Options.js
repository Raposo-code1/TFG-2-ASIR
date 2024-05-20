import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { User } from "../../../api";
import {imageExpoFormat, screens } from "../../../Utils";
import { styles } from "./Options.styles";

const userController = new User();

export function Options(props) {
    const { accessToken, logout, updateUser } = props;
    const navigation = useNavigation();

    const openGallery = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if(!result.canceled) {
        const file = imageExpoFormat(result.assets[0].uri);
        updateUserData(file);
      }
    };

    const updateUserData = async (userData) => {
      try {
        const response  = await userController.updateUser(accessToken, userData);
        console.log(response);
      } catch (error) {
          console.log(error);
      }
    };

    const goChangeFirstName = () => {
      navigation.navigate(screens.tab.settings.changeFirstnameScreen);
    }

    const goChangeLastName = () => {
      navigation.navigate(screens.tab.settings.changeLastnameScreen);
    }

  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.item} onPress={openGallery}>
        <Text style={styles.text}>Cambiar foto de perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={goChangeFirstName}>
        <Text style={styles.text}>Cambiar nombre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={goChangeLastName}>
        <Text style={styles.text}>Cambiar Apellidos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.item, styles.itemClose]} onPress={logout}>
        <Text style={styles.textClose}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}