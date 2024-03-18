import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../Utils";
import { styles } from "./LoginScreen.styles";


export function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screens.auth.registerScreen);
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Entra y empieza a chatear</Text>
    
    {/* TODO: LoginForm */}
    <Text style={{color: "#fff"}}>LoginForm</Text>
    
    <Text style={styles.register} onPress={goToRegister}>
      Registrarse
    </Text>

    <Text style={styles.info}>
      Debes tener al menos 16 años de edad para registrarse. Más
      información sobre cómo trabaja chatApp en las políticas.
    </Text>
    </View>
  );
}