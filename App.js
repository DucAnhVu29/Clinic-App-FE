import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "./src/app/page/LoginPage";
import RegisterPage from "./src/app/page/RegisterPage";
import AfterLoginMain from "./src/app/page/AfterLoginMain";
import DetailScreen from "./src/app/page/DetailScreen";
import BlogDetail from "./src/app/page/BlogDetail";
import CreateRecordPage from "./src/app/page/CreateRecordPage";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="AfterLoginMain" component={AfterLoginMain} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="BlogDetail" component={BlogDetail}/>
        <Stack.Screen name="CreateRecordPage" component={CreateRecordPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
