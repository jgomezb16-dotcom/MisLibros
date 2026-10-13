import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import { RootStackParamList } from "./types";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  session: Session | null;
}

export default function AppNavigator({ session }: Props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Mis Libros" }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Iniciar sesión" }}
            />
            <Stack.Screen
              name="Registro"
              component={RegisterScreen}
              options={{ title: "Crear cuenta" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}