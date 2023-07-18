import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";

import Dimension from "../constant/Dimension";
import Color from "../constant/Color";
import AsyncStorageManager from "../common/AsyncStroageManager";
// import { TouchableOpacity } from 'react-native-web';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LoginPage({ navigation }) {
  const [address, setAddress] = useState();
  const [clinicName, setClinicName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    AsyncStorageManager.get("address").then((res) => setAddress(res));
    AsyncStorageManager.get("clinicName").then((res) => setClinicName(res));
    AsyncStorageManager.get("phoneNo").then((res) => setPhoneNo(res));
    AsyncStorageManager.get("email").then((res) => setEmail(res));
    AsyncStorageManager.get("role").then((res) => setRole(res));
  }, []);

  const LogoutHandle = async () => {
    AsyncStorageManager.clearAll, navigation.navigate("LoginPage");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 30, marginTop: 20 }}>{clinicName}</Text>
      <Image
        source={require("../../img/clinic.png")}
        style={{
          maxHeight: Dimension.width * 0.3,
          aspectRatio: 1 / 1,
          marginVertical: 50,
        }}
        resizeMode="contain"
      />
      <Grid>
        <Col size={0.4} style={{ marginRight: 10, height: 250 }}>
          <Row>
            <Text style={styles.labelText}>Email:</Text>
          </Row>
          <Row>
            <Text style={styles.labelText}>Phone:</Text>
          </Row>
          <Row>
            <Text style={styles.labelText}>Address:</Text>
          </Row>
          <Row>
            <Text style={styles.labelText}>Role:</Text>
          </Row>
        </Col>
        <Col size={0.8} style={{ marginRight: 10, height: 250 }}>
          <Row>
            <Text style={styles.contentText}>{email}</Text>
          </Row>
          <Row>
            <Text style={styles.contentText}>{phoneNo}</Text>
          </Row>
          <Row>
            <Text style={styles.contentText}>{address}</Text>
          </Row>
          <Row>
            <Text style={styles.contentText}>{role}</Text>
          </Row>
        </Col>
      </Grid>
      <TouchableOpacity style={styles.logoutButton} onPress={LogoutHandle}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.lightGrey,
    alignItems: "center",
    justifyContent: "center",
    padding: Dimension.height * 0.04,
  },
  labelText: {
    fontSize: 20,
  },
  contentText: {
    fontSize: 18,
  },
  submitBtn: {
    backgroundColor: "white",
    width: Dimension.width * 0.7,
    paddingHorizontal: Dimension.width * 0.1,
    height: 50,
    borderRadius: 25,
    fontSize: 26,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    backgroundColor: "#0066FF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
