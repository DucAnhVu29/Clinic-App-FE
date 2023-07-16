import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from "axios";
import { Picker } from "@react-native-community/picker";
import moment from "moment";
import RestApiManager from "../common/RestApiManager";
import CommonToolsManager from "../common/CommonToolManager";
import ErrorManager from "../common/ErrorManager";
import AsyncStorageManager from "../common/AsyncStroageManager";

export default function BookingPage({navigation}) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [displayDatePicker, setDisplayDatePicker] = useState(false);
  const [displayTimePicker, setDisplayTimePicker] = useState(false);

  const [doctor, setDoctor] = useState([]);
  // const [selected, setSelected] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [time, changeTime] = useState(Date.now());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [role, setRole] = useState();
  console.log("role", role);

  useEffect(() => {
    AsyncStorageManager.get("role").then((res) => setRole(res));
  }, []);

  // console.log("doctor", doctor)
  console.log("select", selectedValue);
  console.log("time", time);

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

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setDisplayDatePicker(false);
    }
  };

  const handleTimeChange = (event, time) => {
    if (time) {
      const selectedHour = new Date(time).getHours();
      const selectedDateTime = new Date(selectedDate);
      selectedDateTime.setHours(selectedHour, 0, 0); // Set minutes and seconds to 0
      setSelectedTime(selectedDateTime);
      setDisplayTimePicker(false);
    }
  };

  const showDatePicker = () => {
    setDisplayDatePicker(true);
  };

  const showTimePicker = () => {
    setDisplayTimePicker(true);
  };

  const bookAppointment = () => {
    

    RestApiManager.createAppointment(selectedValue, time, (res) => {
      if (res.resCode === 1) {
        navigation.navigate('AppointmentPage')
        // Alert.alert(
        //   "Create Appointment Success",
        //   [
        //     {
        //       text: "ok",
        //       style: "cancel",
        //     },
        //   ],
        //   {
        //     cancelable: false,
        //   }
        // );
      } else {
        ErrorManager.solve(res.resCode, navigation, Alert);
      }
    });
  };

  const handleConfirmation = async () => {

    // const formData = new FormData();
    // formData.append("DoctorId", selectedValue);
    // formData.append("Time", time);

    // try{
    //   await axios.put("https://clinic-app-cs8e.onrender.com/appointment/create", formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    //   );
    //   oncancel();
    //   console.log("data:", formData);
    // } catch (error) {
    //   console.log("má ưi")
    // }

    console.log("Booking confirmed!");
    console.log("Doctor:", selectedDoctor);
    console.log("Date:", selectedDate);
    console.log("Time:", selectedTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Booking Page</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Doctor:</Text>

        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {doctor &&
            doctor.map((doctor) => (
              <Picker.Item
                key={doctor.cid}
                label={doctor.clinicName}
                value={doctor.cid}
              >
                {/* <Text style={styles.doctorButtonText}>{doctor.name}</Text> */}
              </Picker.Item>
            ))}
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Date:</Text>
        {/* <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
          <Text>
            {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* {displayDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          
        />
      )} */}

      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Time:</Text>
        <TouchableOpacity onPress={showTimePicker} style={styles.dateButton}>
          <Text>
            {selectedTime
              ? selectedTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Select Time"}
          </Text>
        </TouchableOpacity>
      </View> */}
      <DateTimePicker
        mode="datetime"
        isVisible={openDatePicker}
        onConfirm={(date) => {
          setOpenDatePicker(false);
          changeTime(new Date(date).getTime());
          // console.log(changeTime)
        }}
        onCancel={() => setOpenDatePicker(false)}
        minimumDate={moment().add(1, "day").startOf("day").toDate()}
      />
      <View>
        {/* <Text style={{ color: "white", fontSize: 18 }}>{"Time"}:</Text> */}
        <TouchableOpacity
          // style={{ ...styles.textInput, justifyContent: "center" }}
          onPress={() => {
            setOpenDatePicker(true);
          }}
        >
          <Text style={{ fontSize: 20 }}>
            {time ? CommonToolsManager.praseTime(time, "DD/MM/YY hh:mm") : ""}
          </Text>
        </TouchableOpacity>
      </View>

      {/* {displayTimePicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          display="default"
          minuteInterval={60} // Set minuteInterval to 60 to restrict minutes selection
          onChange={handleTimeChange}
        />
      )} */}

      <TouchableOpacity style={styles.button} onPress={bookAppointment}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  doctorButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedDoctorButton: {
    backgroundColor: "blue",
  },
  doctorButtonText: {
    color: "black",
  },
  dateButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
