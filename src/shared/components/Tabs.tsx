import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantsScreen } from "../../features/restaurants/screens/RestaurantsScreen";
import { MapScreen } from "../../features/map/screens/MapScreen";
import { SettingsScreen } from "../../features/restaurants/screens/SettingsScreen";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const RestaurantIcon = () => <MaterialIcons name="restaurant" size={32} />;

const MapIcon = () => <MaterialIcons name="map" size={32} />;

const SettingsIcon = () => <MaterialIcons name="settings" size={32} />;

export const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Restaurants"
      component={RestaurantsScreen}
      options={{
        tabBarIcon: RestaurantIcon,
      }}
    />
    <Tab.Screen
      name="Map"
      component={MapScreen}
      options={{
        tabBarIcon: MapIcon,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: SettingsIcon,
      }}
    />
  </Tab.Navigator>
);
