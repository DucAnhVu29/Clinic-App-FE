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
import { TextInput } from "react-native";
import { Modal } from "react-native";
import { Alert } from "react-native";

export const BlogPage = ({ navigation }) => {
  const [blogList, setBloglist] = useState([]);
  const [enlargeIdx, setEnlargeIndex] = useState(0);
  const [enlargeViewVisible, setEnlargeViewVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stopToLoad, setStopToLoad] = useState(false);
  const [role, setRole] = useState();
  const [doctor, setDoctor] = useState([]);
  console.log("doctor:", doctor);

  console.log("role", role);

  //post blog
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [email, setEmail] = useState();
  const [id, setCId] = useState();
  const [doctorName, setDoctorName] = useState();
  console.log("id", id);
  console.log("title", title);
  console.log("description", description);
  console.log("email", email);
  console.log("doctor:", doctorName);

  useEffect(() => {
    AsyncStorageManager.get("role").then((res) => {
      setRole(res);
    });

    AsyncStorageManager.get("email").then((res) => {
      setEmail(res);
    });

    AsyncStorageManager.get("cid").then((res) => {
      setCId(res);
    });

    AsyncStorageManager.get("clinicName").then((res) => {
      setDoctorName(res);
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

  const submitPost = () => {
    RestApiManager.getPostBlog(
      id,
      doctorName,
      email,
      title,
      description,
      (res) => {
        console.log("post thành công", res), setModalVisible(false), refresh();
      }
    );
  };

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


  const handleUpdate = (item) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles1.modalContainer}>
          <View style={styles1.modalContent}>
            <Text style={styles1.modalTitle}>Post Blog</Text>
            <TextInput
              style={styles1.feedbackInput}
              placeholder="Enter your Title"
              onChangeText={(text) => setTitle(text)}
              value={title}
            />
            <TextInput
              style={styles1.feedbackInput}
              placeholder="Enter your feedback"
              onChangeText={(text) => setDescription(text)}
              value={description}
              multiline
            />
            <View style={styles1.fixToText}>
              <Button
                style={styles1.submitButton}
                onPress={() => {
                  setModalVisible(false);
                }}
                title="cancel"
              ></Button>
              <Button
                style={styles1.submitButton}
                onPress={updatePost(item)}
                title="Update"
              >
                {/* <Text style={styles1.submitButtonText}>Submit</Text> */}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const updatePost = (item) => {
    RestApiManager.UpdatePost(item, title, description, (res) => {
        console.log("update thành công". res), refresh()
    })
  }

  const handleDelete = (item) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => performDeletion(item) },
      ],
      { cancelable: true }
    );
  };

  const performDeletion = (item) => {
    RestApiManager.deletePost(item, (res) => {
      console.log("delete thành công", res), refresh();
    });
  };

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

        {role === "Doctor" && (
          <View style={styles1.fixToText}>
            <Button title="Update" onPress={() => handleUpdate(item.id)}>
              {" "}
            </Button>
            <Button title="Delete" onPress={() => handleDelete(item.id)}>
              {" "}
            </Button>
          </View>
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
      {role === "Doctor" && (
        <View>
          <Button
            style={styles1.addButton}
            title="Post"
            onPress={() => setModalVisible(true)}
          >
            {/* <Text style={styles1.plusSign}>+</Text> */}
          </Button>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles1.modalContainer}>
              <View style={styles1.modalContent}>
                <Text style={styles1.modalTitle}>Post Blog</Text>
                <TextInput
                  style={styles1.feedbackInput}
                  placeholder="Enter your Title"
                  onChangeText={(text) => setTitle(text)}
                  value={title}
                />
                <TextInput
                  style={styles1.feedbackInput}
                  placeholder="Enter your feedback"
                  onChangeText={(text) => setDescription(text)}
                  value={description}
                  multiline
                />
                <View style={styles1.fixToText}>
                  <Button
                    style={styles1.submitButton}
                    onPress={() => {
                      setModalVisible(false);
                    }}
                    title="cancel"
                  ></Button>
                  <Button
                    style={styles1.submitButton}
                    onPress={submitPost}
                    title="submit"
                  >
                    {/* <Text style={styles1.submitButtonText}>Submit</Text> */}
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
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

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#999999",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
  },
  plusSign: {
    fontSize: 30,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 5,
    height: 100,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#0066FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },

  fixToText: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
  },
});
