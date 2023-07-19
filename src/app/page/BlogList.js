import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";

const PostItem = ({ item, navigator }) => {
  return (
    <Pressable
      style={styles.row}
      activeOpacity={0.6}
      onPress={() =>
        navigator.navigate({
          component: NewsDetailPage,
          passProps: { item: item },
        })
      }
    >
      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.description}>
        {item.body.length < 80 ? item.body : `${item.body.slice(0, 80)}...`}
      </Text>
    </Pressable>
  );
};
const BlogList = ({ items, navigator }) => {
  renderRow = (item, sId, rId) => {
    return <PostItem item={item} key={rId} navigator={navigator} />;
  };

  return (
    <FlatList
      dataSource={items}
      style={styles.listView}
      removeClippedSubviews={false}
      renderRow={this.renderRow}
      automaticallyAdjustContentInsets={false}
    />
  );
};

const styles = StyleSheet.create({
  listView: {
    paddingTop: 70,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  title: {
    margin: 15,
    marginBottom: 0,
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    margin: 15,
    marginTop: 7,
    textAlign: "justify",
    color: "#aaa",
  },
  row: {
    margin: 15,
    borderRadius: 3,
    backgroundColor: "#fff",
    shadowColor: "#303030",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
  },
  referenceContainer: {
    flexDirection: "row",
    borderTopColor: "#eaeaea",
    borderTopWidth: 1,
    padding: 15,
  },
  speakerContainer: {
    flex: 0.6,
    alignItems: "flex-end",
  },
  speakerText: {
    fontStyle: "italic",
    color: "#aaa",
    marginTop: 5,
  },
});

export default BlogList;
