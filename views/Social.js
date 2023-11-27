import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Loader from "../components/Loader";

const SocialComponent = () => {
  const { updateUser, user, authenticated } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [myFavorites, setMyFavorites] = useState([]);
  const [currentTab, setCurrentTab] = useState("AllUsers");
  const [isLoading, setIsLoading] = useState(true);

  const userId = user && user._id ? user._id : "";

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://caapp-server.onrender.com/users"
      );
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchMyFavorites = async () => {
    try {
      const response = await axios.get(
        `https://caapp-server.onrender.com/myFavorites/${userId}`
      );
      setMyFavorites(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
      fetchMyFavorites();
    } else {
      setUsers([]);
      setMyFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    if (authenticated) {
      fetchMyFavorites();
    }
  }, [authenticated]);

  const handleSearch = async (text) => {
    setSearchQuery(text); // Обновляем состояние searchQuery

    try {
      // Выполняем запрос на поиск только если текст не пустой
      if (text.trim() !== "") {
        const response = await axios.get(
          `https://caapp-server.onrender.com/searchUsers?query=${text}`
        );
        setUsers(response.data);
      } else {
        // Если поле поиска пустое, сбрасываем список пользователей
        fetchUsers();
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const addFavorites = async (userId, userFriendId) => {
    try {
      await axios.post(
        "https://caapp-server.onrender.com/addFavorites",
        { userId, userFriendId }
      );

      fetchMyFavorites();

      const updatedUserData = await axios.get(
        `https://caapp-server.onrender.com/user/${userId}`
      );
      updateUser(updatedUserData.data);

      // Можно добавить сообщение об успешной отправке запроса
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorites = async (userId, userFriendId) => {
    try {
      await axios.post(
        "https://caapp-server.onrender.com/removeFavorites",
        { userId, userFriendId }
      );
      setMyFavorites(myFavorites.filter((fav) => fav._id !== userFriendId));

      fetchMyFavorites();

      const updatedUserData = await axios.get(
        `https://caapp-server.onrender.com/user/${userId}`
      );
      updateUser(updatedUserData.data);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const renderUsersList = (userList) => {
    const filteredList = userList.filter(
      (userFromList) => userFromList._id !== userId
    );
    return (
      <View style={styles.insideContainer}>
        {currentTab === "AllUsers" && (
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => handleSearch(text)}
          />
        )}
        <>
          {isLoading && <Loader />}
          {!isLoading && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                ...styles.userList,
                paddingVertical: currentTab === "MyFavorites" ? 0 : 10,
              }}
            >
              {filteredList.length > 0 && (
                <>
                  {currentTab === "MyFavorites" && (
                    <Text style={styles.sectionTitle}>Favorites list</Text>
                  )}
                  {filteredList.map((userFromList, index) => (
                    <TouchableOpacity
                      key={userFromList._id}
                      style={[
                        styles.userItem,
                        { borderTopWidth: index === 0 ? 0 : 1 }, // Убрать верхнюю границу для первого элемента
                        {
                          borderBottomWidth:
                            index === filteredList.length - 1 ? 0 : 1,
                        }, // Убрать нижнюю границу для последнего элемента
                      ]}
                    >
                      <View>
                        <Text style={styles.username}>
                          {userFromList.username}
                        </Text>
                        {userFromList.showUserData && (
                          <Text>
                            {userFromList.firstName} {userFromList.lastName}
                          </Text>
                        )}
                      </View>
                      {myFavorites.find(
                        (fav) => fav._id === userFromList._id
                      ) ? (
                        <TouchableOpacity
                          onPress={() => removeFavorites(userId, userFromList._id)}
                        >
                          <AntDesign name="star" size={28} color="#29648a" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            addFavorites(userId, userFromList._id)
                          }
                        >
                          <AntDesign name="staro" size={28} color="#29648a" />
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </ScrollView>
          )}
        </>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            currentTab === "AllUsers" ? styles.activeTab : null,
          ]}
          onPress={() => setCurrentTab("AllUsers")}
        >
          <Text style={styles.tabText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            currentTab === "MyFavorites" ? styles.activeTab : null,
          ]}
          onPress={() => setCurrentTab("MyFavorites")}
        >
          <Text style={styles.tabText}>Favorites</Text>
        </TouchableOpacity>
      </View>

      {currentTab === "AllUsers" && renderUsersList(users)}
      {currentTab === "MyFavorites" && renderUsersList(myFavorites)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  insideContainer: {
    backgroundColor: "#fff",
    borderWidth: 2,
    flex: 1,
    borderColor: "#29648a",
    padding: 10,
    paddingTop: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#29648a",
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    color: "#555",
    fontSize: 20,
    marginTop: 10,
  },
  userList: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 3,
  },
  userItem: {
    width: "100%",
    height: 54,
    borderColor: "#29648a",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -1,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#29648a",
  },
  button: {
    color: "blue",
    fontSize: 14,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#29648a",
    gap: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: "#C0C0C0",
  },
  activeTab: {
    backgroundColor: "#29648a", // Цвет активной вкладки
  },
  tabText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
  },
  sectionTitle: {
    color: "#29648a",
    fontSize: 18,
    textAlign: "left",
    textTransform: "uppercase",
    marginVertical: 10,
  },
});

export default SocialComponent;
