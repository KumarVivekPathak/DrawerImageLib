import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

const Home = () => {
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetch(
  //         "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s"
  //       );
  //       const responseData = await response.json();
  //       const photos = responseData.photos.photo;
  //       const photoObj = photos.map((photo, index) => {
  //         const image = photo.url_s;
  //         const height = photo.height_s;
  //         const width = photo.width_s;
  //         const imgObj = {
  //           id: index,
  //           imageUrl: image,
  //           height: height,
  //           width: width,
  //         };
  //         return imgObj;
  //       });
  //       setList(photoObj);
  //     };
  //     fetchData();
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("photos");
        if (savedData !== null) {
          setList(JSON.parse(savedData));
        } else {
          const response = await fetch(
            "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s"
          );
          const responseData = await response.json();
          const photos = responseData.photos.photo;
          const photoObj = photos.map((photo, index) => {
            const image = photo.url_s;
            const height = photo.height_s;
            const width = photo.width_s;
            const imgObj = {
              id: index,
              imageUrl: image,
              height: height,
              width: width,
            };
            return imgObj;
          });
          setList(photoObj);
          await AsyncStorage.setItem("photos", JSON.stringify(photoObj));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const renderAlbum = (item) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setSelectedImage(item);
          setModalVisible(true);
        }}
      >
        <Image source={{ uri: item.imageUrl + "" }} style={styles.imageStyle} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderAlbum(item)}
        numColumns={3}
        contentContainerStyle={styles.columnStyle}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.Opacity}
        >
          <TouchableWithoutFeedback>
            <Image
              source={{ uri: selectedImage.imageUrl }}
              resizeMode="contain"
              style={{
                height: selectedImage.height,
                width: selectedImage.width,
              }}
            />
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginVertical: 3,
  },
  imageStyle: {
    height: 125,
    width: 125,
    borderWidth: 0.25,
    borderColor: "transparent",
  },
  columnStyle: {
    justifyContent: "center",
    paddingHorizontal: 5,
    marginTop: 5,
  },
  Opacity: {
    backgroundColor: "#F5FAF9",
    transparent: true,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
