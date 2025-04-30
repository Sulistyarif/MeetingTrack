import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import MeetingListPage from "./src/screens/MeetingListPage";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateMeetingPage from "./src/screens/CreateMeetingPage";
import EditMeetingPage from "./src/screens/EditMeetingPage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: "#E0F7FA" }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MeetingList" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MeetingList" component={MeetingListPage} />
            <Stack.Screen name="CreateMeeting" component={CreateMeetingPage} />
            <Stack.Screen name="EditMeeting" component={EditMeetingPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </PaperProvider>
  )
};

export default App