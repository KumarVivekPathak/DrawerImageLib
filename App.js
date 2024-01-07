import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import { FontAwesome } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerCenter: () => (
            <FontAwesome name={"home"} size={24} color="black" />
          ),
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name={focused ? "home" : "bars"}
              size={size}
              color="black"
            />
          ),
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
// function App() {
//   return (
//     <View>
//       <Text>Hello</Text>
//     </View>
//   );
// }

// export default App;
