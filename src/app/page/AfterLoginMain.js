import React, { useEffect, useState } from "react";
import { Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedbackPage from "./FeedBackPage";
import CreateRecordPage from "./CreateRecordPage";
import AccountPage from "./AccountPage";
import ConsultationListingPage from "./ConsultationListingPage";
import BookingPage from "./BookingPage";
import AsyncStorageManager from "../common/AsyncStroageManager";

export default function AfterLoginMainStack() {
  const ClinicStack = createBottomTabNavigator();
  const Tab = createBottomTabNavigator();
  // const

  const [role, setRole] = useState();
  console.log("role", role);

  useEffect(() => {
    AsyncStorageManager.get("role").then((res) => setRole(res));
  }, []);

  if (!role) {
    return <Text> Loading</Text>;
  } else if (role === "Patient") {
    return(<ClinicStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <ClinicStack.Screen
          name="ConsultationListingPage"
          component={ConsultationListingPage}
          options={({ navigation, route }) => ({
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "blue" : "black" }}>Record</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../img/record.png")}
                style={{
                  maxHeight: 25,
                  aspectRatio: 1 / 1,
                  tintColor: focused ? "blue" : "black",
                }}
                resizeMode="contain"
              />
            ),
          })}
        /> */}
        {/* <ClinicStack.Screen
          name="CreateRecordPage"
          component={CreateRecordPage}
          options={({ navigation, route }) => ({
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "blue" : "black" }}>Create</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../img/create.png")}
                style={{
                  maxHeight: 25,
                  aspectRatio: 1 / 1,
                  tintColor: focused ? "blue" : "black",
                }}
                resizeMode="contain"
              />
            ),
          })}
        /> */}
      <ClinicStack.Screen
        name="FeedBackPage"
        component={FeedbackPage}
        options={({ navigation, route }) => ({
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "blue" : "black" }}>FeedBack</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../img/hospital.png")}
              style={{
                maxHeight: 25,
                aspectRatio: 1 / 1,
                tintColor: focused ? "blue" : "black",
              }}
              resizeMode="contain"
            />
          ),
        })}
      />
      <ClinicStack.Screen
        name="BookingPage"
        component={BookingPage}
        options={({ navigation, route }) => ({
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "blue" : "black" }}>Booking</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../img/hospital.png")}
              style={{
                maxHeight: 25,
                aspectRatio: 1 / 1,
                tintColor: focused ? "blue" : "black",
              }}
              resizeMode="contain"
            />
          ),
        })}
      />
      <ClinicStack.Screen
        name="AccountPage"
        component={AccountPage}
        options={({ navigation, route }) => ({
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "blue" : "black" }}>Clinic</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../img/hospital.png")}
              style={{
                maxHeight: 25,
                aspectRatio: 1 / 1,
                tintColor: focused ? "blue" : "black",
              }}
              resizeMode="contain"
            />
          ),
        })}
      />
    </ClinicStack.Navigator>)
  } else if (role === "Doctor") {
    return (
      <ClinicStack.Navigator screenOptions={{ headerShown: false }}>
        <ClinicStack.Screen
          name="ConsultationListingPage"
          component={ConsultationListingPage}
          options={({ navigation, route }) => ({
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "blue" : "black" }}>Record</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../img/record.png")}
                style={{
                  maxHeight: 25,
                  aspectRatio: 1 / 1,
                  tintColor: focused ? "blue" : "black",
                }}
                resizeMode="contain"
              />
            ),
          })}
        />
        <ClinicStack.Screen
          name="CreateRecordPage"
          component={CreateRecordPage}
          options={({ navigation, route }) => ({
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "blue" : "black" }}>Create</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../img/create.png")}
                style={{
                  maxHeight: 25,
                  aspectRatio: 1 / 1,
                  tintColor: focused ? "blue" : "black",
                }}
                resizeMode="contain"
              />
            ),
          })}
        />
        {/* <ClinicStack.Screen
          name="FeedBackPage"
          component={FeedbackPage}
          options={({ navigation, route }) => ({
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "blue" : "black" }}>FeedBack</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../img/hospital.png")}
                style={{
                  maxHeight: 25,
                  aspectRatio: 1 / 1,
                  tintColor: focused ? "blue" : "black",
                }}
                resizeMode="contain"
              />
            ),
          })}
        /> */}
        {/* <ClinicStack.Screen
          name="BookingPage"
          component={BookingPage}
          options={({ navigation, route }) => ({
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "blue" : "black" }}>Booking</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../img/hospital.png")}
                style={{
                  maxHeight: 25,
                  aspectRatio: 1 / 1,
                  tintColor: focused ? "blue" : "black",
                }}
                resizeMode="contain"
              />
            ),
          })}
        /> */}
        <ClinicStack.Screen
          name="AccountPage"
          component={AccountPage}
          options={({ navigation, route }) => ({
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "blue" : "black" }}>Clinic</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../img/hospital.png")}
                style={{
                  maxHeight: 25,
                  aspectRatio: 1 / 1,
                  tintColor: focused ? "blue" : "black",
                }}
                resizeMode="contain"
              />
            ),
          })}
        />
      </ClinicStack.Navigator>
    );
  }
}
