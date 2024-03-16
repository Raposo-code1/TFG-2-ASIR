import { NavigationContainer } from "@react-navigation/native"
import { NativeBaseProvider } from "native-base";
import {HandlerNavigation} from "./src/navigations";

export default function App() {
  return (
    <NavigationContainer>
    <NativeBaseProvider>
      <HandlerNavigation />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}