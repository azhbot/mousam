import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  Feather,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { Image } from "react-native";

const Icon = ({
  name,
  color,
  size = 24,
  library,
  style,
  source,
  borderRadius = 5,
}) => {
  if (source) {
    return (
      <Image
        source={source}
        style={{ height: size, width: size, borderRadius }}
      />
    );
  }
  if (library === "feather") {
    return <Feather name={name} color={color} size={size} style={style} />;
  } else if (library === "entypo") {
    return <Entypo name={name} color={color} size={size} style={style} />;
  } else if (library === "antDesign") {
    return <AntDesign name={name} color={color} size={size} style={style} />;
  } else if (library === "fontAwesome") {
    return <FontAwesome name={name} color={color} size={size} style={style} />;
  } else if (library === "ionicons") {
    return <Ionicons name={name} color={color} size={size} style={style} />;
  } else if (library === "materialIcons") {
    return (
      <MaterialIcons name={name} color={color} size={size} style={style} />
    );
  } else if (library === "octicons") {
    return <Octicons name={name} color={color} size={size} style={style} />;
  } else {
    return (
      <MaterialCommunityIcons
        name={name}
        color={color}
        size={size}
        style={style}
      />
    );
  }
};

export default Icon;
