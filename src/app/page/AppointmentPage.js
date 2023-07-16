import React from "react";
import { useState } from "react";
import CommonToolsManager from "../common/CommonToolManager";
import RestApiManager from "../common/RestApiManager";
import { useEffect } from "react";
import AsyncStorageManager from "../common/AsyncStroageManager";
import {
  ActivityIndicator,
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  ViewBase,
} from "react-native";
import { Dimensions } from "react-native";
import Color from "../constant/Color";
// import { View } from "react-native-web";
import ErrorManager from "../common/ErrorManager";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { Pressable } from "react-native";

export const AppointmentPage = ({ navigation }) => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [enlargeIdx, setEnlargeIndex] = useState(0);
  const [enlargeViewVisible, setEnlargeViewVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [doctor, setDoctorName] = useState();
  const [stopToLoad, setStopToLoad] = useState(false);
  const [role, setRole] = useState();
  console.log("Doctor: ", doctor);
  console.log("apointmentList", appointmentList);

  useEffect(() => {
    AsyncStorageManager.get("role").then((res) => {
        setRole(res);
    })

    AsyncStorageManager.get("clinicName").then((res) => {
      setDoctorName(res);
    });
  }, []);
  function updateList(entireNewList) {
    setIsLoading(true);
    if (entireNewList) {
      setStopToLoad(false);
      setAppointmentList([]);
    }
    RestApiManager.getAppointmentListbyDoctor((res) => {
      setIsLoading(false);
      console.log("res", res);
      if (res.resCode == 1) {
        if (entireNewList) {
          setAppointmentList([...appointmentList, ...res.resMsg]);
        } else {
          setAppointmentList(res.resMsg);
        }

        if (res.resMsg.length < 10) {
          setStopToLoad(true);
        } else {
          changeUpdateTo(res.resMsg[9].time);
        }
      } else {
        ErrorManager.solve(res.resCode, navigation, Alert);
      }
    });
  }

  

  const cancelAppointment = (id) => {
    RestApiManager.cancelAppointment(id, (res) => {
        refresh();
    } )
  }

  function refresh() {
    updateList(true);
  }

  function addRecord() {
    updateList(false);
  }

  function renderRecord(item, idx) {

    const WarningModal = () => {
        Alert.alert(
          'Confirmation',
          'Are you sure?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress:() => cancelAppointment(item.id) },
          ],
          { cancelable: true }
        );
      };

    return (
      <TouchableOpacity
        key={idx}
        style={{
          paddingVertical: 15,
          marginHorizontal: 15,
          borderBottomWidth: 1,
        }}
        onPress={() => {
          setEnlargeIndex(idx);
          setEnlargeViewVisible(true);
        }}
      >
        <Text style={{ fontSize: 16 }}>
          {CommonToolsManager.praseTime(item.time, "DD/MM/YYYY HH:mm")}{" "}
        </Text>
        <Text style={{ fontSize: 18 }}>Doctor:{item.doctorName}</Text>
        <Text style={{ fontSize: 18 }}>PatientName:{item.patientName}</Text>
        {role === "Patient" && <Button title="Cancel" onPress={() => WarningModal(item.id)}> </Button>}        
      </TouchableOpacity>
    );
  }

  if (!doctor) {
    return <Text> Loading</Text>;
  } else {
    return (
      //   <ViewBase style={styles.container}>
      <View
        style={{ flex: 1, backgroundColor: Color.lightGrey, width: "100%" }}
      >
        <FlatList
          data={appointmentList}
          renderItem={({ item, index }) => renderRecord(item, index)}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => refresh()} />
          }
          ListFooterComponent={
            isLoading ? (
              // <ActivityIndicator size="large" color="#0000ff" />
              <Text>Loading nè</Text>
            ) : appointmentList.length === 0 ? (
              <Text style={{ textAlign: "center", marginTop: 50 }}>
                No record for this time period
              </Text>
            ) : !stopToLoad ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text style={{ textAlign: "center", marginVertical: 25 }}>
                No more record
              </Text>
            )
          }
          onEndReached={() => {
            stopToLoad ? null : addRecord();
          }}
          onEndReachedThreshold={0.01}
        />
      </View>

      
      //   </ViewBase>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Dimensions.height * 0.1,
    alignItems: "center",
    backgroundColor: Color.background,
  },
  header: {
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },
});
