import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorageManager from "../common/AsyncStroageManager";
import { ScrollView } from "react-native-gesture-handler";

export default function BlogDetail({ route }) {
  const { item } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigation = useNavigation();
  const [role, setRole] = useState();
  useEffect(() => {
    AsyncStorageManager.get("role").then((res) => {
      setRole(res);
    });
  }, []);
  const submitFeedback = () => {
    // Perform the feedback submission logic here
    console.log("Feedback submitted:", feedback);
    setModalVisible(false);
  };
  const clearFeedback = () => {
    setFeedback("");
    setModalVisible(false);
  };
  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackButton}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.content}>{item.description}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.author}>By: {item.doctorName}</Text>
          </View>
        </View>
        {role === "Patient" && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
          ></TouchableOpacity>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Submit Feedback</Text>
              <TextInput
                style={styles.feedbackInput}
                placeholder="Enter your feedback"
                onChangeText={(text) => setFeedback(text)}
                value={feedback}
                multiline={true}
                numberOfLines={10}
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={submitFeedback}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={clearFeedback}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      {role === "Patient" && (
        <TouchableOpacity
          style={styles.floatingAddButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 42,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
    marginTop: 10,
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
    width: "90%",
    maxHeight: "90%",
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
    height: 150,
    textAlignVertical: "top",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#0066FF",
  },
  cancelButton: {
    backgroundColor: "#0066FF",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
  },
  row: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
  },
  content: {
    fontSize: 18,
  },
  author: {
    fontSize: 22,
    fontWeight: "bold",
  },
  floatingAddButton: {
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
});
