import React, { useEffect } from "react";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native-gesture-handler";
import AsyncStorageManager from "../common/AsyncStroageManager";
import RestApiManager from "../common/RestApiManager";
import { ActivityIndicator } from "react-native";
import ErrorManager from "../common/ErrorManager";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import Color from "../constant/Color";
import { Text } from "react-native";
import CommonToolsManager from "../common/CommonToolManager";
import axios from "axios";

export const BlogPage = ({ navigation }) => {
  const [blogList, setBloglist] = useState([]);
  const [enlargeIdx, setEnlargeIndex] = useState(0);
  const [enlargeViewVisible, setEnlargeViewVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stopToLoad, setStopToLoad] = useState(false);
  const [role, setRole] = useState();
  const [doctor, setDoctor] = useState([]);
  console.log("doctor:", doctor)
  useEffect(() => {
    AsyncStorageManager.get("role").then((res) => {
      setRole(res);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://clinic-app-cs8e.onrender.com/user/doctors`
      );
      setDoctor(response?.data.resMsg);
      // console.log("re", response?.data.resMsg)
      // if (response?.data.length !== 0) {
      //   // setSelectedValue(response?.data[0].cid)
      // };
    };
    fetchData();
  }, []);

  function updateList(entireNewList) {
    setIsLoading(true);
    if (entireNewList) {
      setStopToLoad(false);
      setBloglist([]);
    }
    RestApiManager.getAllBlog((res) => {
      setIsLoading(false);
      console.log("res", res);
      if (res.resCode == 1) {
        if (entireNewList) {
          setBloglist([...blogList, ...res.resMsg]);
        } else {
          setBloglist(res.resMsg);
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
  function refresh() {
    updateList(true);
  }

  function addRecord() {
    updateList(false);
  }

  function renderRecord(item, idx) {
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
        {/* <Text style={{ fontSize: 16 }}>
          {CommonToolsManager.praseTime(item.time, "DD/MM/YYYY HH:mm")}{" "}
        </Text> */}
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text style={{ fontSize: 18 }}>By: {item.doctorName}</Text>
        
        {role === "Patient" && (
          <Button title="Cancel" onPress={() => WarningModal(item.id)}>
            {" "}
          </Button>
        )}
      </TouchableOpacity>
    );
  }
  return (
    //   <ViewBase style={styles.container}>
    <View style={{ flex: 1, backgroundColor: Color.lightGrey, width: "100%" }}>
      <FlatList
        data={blogList}
        renderItem={({ item, index }) => renderRecord(item, index)}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => refresh()} />
        }
        ListFooterComponent={
          isLoading ? (
            // <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading nè</Text>
          ) : blogList.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 50 }}>
              No record for this time period
            </Text>
          ) : !stopToLoad ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Text style={{ textAlign: "center", marginVertical: 25 }}>
              No more Blog
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
