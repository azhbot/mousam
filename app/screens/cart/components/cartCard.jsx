import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

import CustomLabel from "../../../components/label";
import VerifiedCompanyName from "../../../components/verifiedCompany";
import Icon from "../../../components/icon";
import CustomImage from "../../../components/image";
import ConfirmationMsg from "../../../components/confirmation";

import { colors } from "../../../constant/colors";
import { showMessage } from "../../../utils/customMsgUtil";
import { removeItemFromCart } from "../../../redux/cart/cartSlice";
import {
  selectUser,
  selectUserVerifiedSamples,
} from "../../../redux/user/userSelector";
import { selectCompanyMap } from "../../../redux/company/companySelector";
import { selectAddress } from "../../../redux/address/addressSelector";

const { width } = Dimensions.get("screen");

const LOT_SIZE = 1000;

const CartCard = ({
  item: product,
  charges,
  handleQuantityChange,
  handleGrabProduct,
}) => {
  const dispatch = useDispatch();

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [lotNumbers, setLotNumbers] = useState(1);

  const user = useSelector(selectUser);
  const userVerifiedSamples = useSelector(selectUserVerifiedSamples);
  const companiesMap = useSelector(selectCompanyMap);
  const { selectedAddress } = useSelector(selectAddress);

  const userId = user?.id;

  const isSampleVerified = userVerifiedSamples?.[userId]?.[product.id] ?? false;

  useEffect(() => {
    console.log(product, "in cartCard......................................");
  }, [product]);

  const company = companiesMap.get(product?.companyId);

  // const company = {
  //   name: product?.companyName || "",
  //   logo: product?.companyLogo || "",
  // };

  const handleLotChange = useCallback(
    (newLot) => {
      if (newLot < 1) return;
      setLotNumbers(newLot);
      handleQuantityChange(product.id, newLot * LOT_SIZE);
    },
    [handleQuantityChange, product.id]
  );

  const handleGrabNow = useCallback(() => {
    // if (!isSampleVerified) {
    //   showMessage("You need to pass sample test");
    //   return;
    // }
    if (product?.sizes) {
      setConfirmationVisible(true);
    } else {
      showMessage("Sorry this product not abailable currently");
    }
  }, [isSampleVerified]);

  const onGrabConfirm = useCallback(
    (size) => {
      console.log(size, "in cartCard");
      const now = new Date();
      const orderDate = dayjs(now).format("MMMM D, YYYY, h:mm A");

      const grabbedProduct = {
        id: nanoid(10),
        createdAt: now.toDateString(),
        date: orderDate,
        status: "processing",
        productId: product?.id,
        productName: product?.name,
        productCost: product?.cost,
        productMfgCategory: product?.mfgCategory,
        productRawMaterials: product?.rawMaterials,
        productSize: size,
        productVariant: product?.variant,
        companyId: product?.companyId,
        companyName: product?.companyName,
        companyLogo: product?.companyLogo,
        quantity: LOT_SIZE * lotNumbers,
        userName: user?.name,
        userId: user?.id,
        userAddress: selectedAddress,
        pinNumber: user?.pinNumber,
        numberOfMachine: user?.numberOfMachine,
        charges,
        groupNumber: company?.nextOrderGroupNumber,
      };

      handleGrabProduct(grabbedProduct, company);
      setConfirmationVisible(false);
    },
    [charges, handleGrabProduct, product, user, company]
  );

  const handleRemove = useCallback(
    (id) => {
      dispatch(removeItemFromCart(id));
      showMessage("Removed");
    },
    [dispatch]
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cartLeft}>
            <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
              {product?.name || "Unnamed Product"}
            </CustomLabel>

            <View style={styles.priceContainer}>
              <CustomLabel fontFamily="poppinsRegular">
                Rs {product?.cost ?? 0}/Pcs
              </CustomLabel>
              <CustomLabel fontFamily="poppinsRegular" fontSize={12}>
                {(product?.mfgCategory ?? "N/A").toUpperCase()}
              </CustomLabel>
            </View>

            <View style={styles.quantityContainer}>
              <CustomLabel fontFamily="poppinsRegular" style={styles.qtyLabel}>
                Qty: {lotNumbers * LOT_SIZE} Pcs
              </CustomLabel>
            </View>

            <View style={styles.verifiedIconContainer}>
              <CustomLabel
                fontFamily="poppinsRegular"
                fontSize={12}
                color={!isSampleVerified ? "red" : undefined}
              >
                Sample Test
              </CustomLabel>
              {isSampleVerified && (
                <Icon
                  name="download-done"
                  library="materialIcons"
                  size={16}
                  color={colors.green}
                />
              )}
            </View>

            <View style={styles.total}>
              <CustomLabel fontFamily="poppinsRegular" fontSize={14}>
                Rs {lotNumbers * LOT_SIZE * (product?.cost ?? 0)}
              </CustomLabel>
            </View>
          </View>

          <View style={styles.cartRight}>
            <View style={styles.imageContainer}>
              <CustomImage
                source={product?.image || product?.images?.[0]}
                size={width * 0.2}
              />
            </View>
            <CustomLabel fontSize={12}>Delivery : Free</CustomLabel>

            <View style={styles.lotRow}>
              <Pressable
                onPress={() => handleLotChange(lotNumbers - 1)}
                style={styles.chevronButton}
                accessibilityLabel="Decrease lot number"
              >
                <Icon name="chevron-down" />
              </Pressable>

              <CustomLabel fontFamily="poppinsRegular" style={styles.lotLabel}>
                Lot: {lotNumbers}
              </CustomLabel>

              <Pressable
                onPress={() => handleLotChange(lotNumbers + 1)}
                style={styles.chevronButton}
                accessibilityLabel="Increase lot number"
              >
                <Icon name="chevron-up" />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          <VerifiedCompanyName companyNameSize="large" company={company} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => handleRemove(product?.id)}
          style={styles.button1}
        >
          <CustomLabel fontFamily="interBold">Remove</CustomLabel>
        </Pressable>
        <Pressable onPress={handleGrabNow} style={styles.button2}>
          <CustomLabel color="#fff" fontFamily="interBold">
            Grab it now
          </CustomLabel>
        </Pressable>
      </View>

      <ConfirmationMsg
        title="Request for Product"
        msg="Select SIZE & send request..."
        visible={confirmationVisible}
        list={product?.sizes}
        onConfirm={onGrabConfirm}
        onclose={() => setConfirmationVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  cardContainer: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: colors.LightGray,
  },
  card: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: "row",
    gap: 10,
  },
  cartLeft: {
    width: width * 0.45,
    gap: 4,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chevronButton: {
    padding: 4,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  lotLabel: {
    textAlign: "center",
  },
  qtyLabel: {},
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  cartRight: {
    width: width * 0.35,
    gap: 5,
    alignItems: "center",
  },
  lotRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.35,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    width: width * 0.3,
    alignItems: "center",
    justifyContent: "center", // Added for image centering
  },
  bottom: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    padding: 4,
    borderRadius: 8,
  },
  button1: {
    backgroundColor: "#fff",
    flex: 1,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginRight: 5,
  },
  button2: {
    backgroundColor: colors.primary,
    flex: 1,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default React.memo(CartCard);

// import React, { useState, useCallback } from "react";
// import { View, StyleSheet, Dimensions, Pressable } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { nanoid } from "nanoid";
// import dayjs from "dayjs";

// import CustomLabel from "../../../components/label";
// import VerifiedCompanyName from "../../../components/verifiedCompany";
// import Icon from "../../../components/icon";
// import CustomImage from "../../../components/image";
// import ConfirmationMsg from "../../../components/confirmation";

// import { colors } from "../../../constant/colors";
// import { showMessage } from "../../../utils/customMsgUtil";
// import { removeItemFromCart } from "../../../redux/cart/cartSlice";
// import {
//   selectUser,
//   selectUserVerifiedSamples,
// } from "../../../redux/user/userSelector";

// const { width } = Dimensions.get("screen");

// const LOT_SIZE = 1000; // Extract constant for clarity

// const CartCard = ({
//   item: product,
//   charges,
//   handleQuantityChange,
//   handleGrabProduct,
// }) => {
//   const dispatch = useDispatch();

//   const user = useSelector(selectUser);
//   const userVerifiedSamples = useSelector(selectUserVerifiedSamples);
//   const userId = user?.id;

//   const [confirmationVisible, setConfirmationVisible] = useState(false);
//   const [lotNumbers, setLotNumbers] = useState(1);

//   const isSampleVerified = userVerifiedSamples?.[userId]?.[product.id] ?? false;

//   const company = {
//     name: product?.companyName,
//     logo: product?.companyLogo,
//   };

//   const handleLotChange = useCallback(
//     (newLot) => {
//       if (newLot < 1) return; // Prevent lotNumbers below 1
//       setLotNumbers(newLot);
//       handleQuantityChange(product.id, newLot * LOT_SIZE);
//     },
//     [handleQuantityChange, product.id]
//   );

//   const handleGrabNow = useCallback(() => {
//     if (!isSampleVerified) {
//       showMessage("You need to pass sample test");
//       return;
//     }
//     setConfirmationVisible(true);
//   }, [isSampleVerified]);

//   const onGrabConfirm = useCallback(() => {
//     const now = new Date();
//     const orderDate = dayjs(now).format("MMMM D, YYYY, h:mm A");

//     const grabbedProduct = {
//       id: nanoid(10),
//       createdAt: now.toDateString(),
//       date: orderDate,
//       status: "processing",
//       productId: product?.id,
//       productName: product?.name,
//       productCost: product?.cost,
//       productMfgCategory: product?.mfgCategory,
//       productRawMaterials: product?.rawMaterials,
//       productSize: product?.size,
//       productVarient: product?.varient,
//       companyId: product?.companyId,
//       companyName: product?.companyName,
//       companyLogo: product?.companyLogo,
//       quantity: 1,
//       userName: user?.name,
//       userId: user?.id,
//       pinNumber: user?.pinNumber,
//       numberOfMachine: user?.numberOfMachine,
//       charges,
//     };

//     handleGrabProduct(grabbedProduct);
//     setConfirmationVisible(false);
//   }, [charges, handleGrabProduct, product, user]);

//   const handleRemove = useCallback(
//     (id) => {
//       dispatch(removeItemFromCart(id));
//       showMessage("Removed");
//     },
//     [dispatch]
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.cardContainer}>
//         <View style={styles.card}>
//           <View style={styles.cartLeft}>
//             <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
//               {product?.name}
//             </CustomLabel>

//             <View style={styles.priceContainer}>
//               <CustomLabel fontFamily="poppinsRegular">
//                 Rs {product?.cost}/Pcs
//               </CustomLabel>
//               <CustomLabel fontFamily="poppinsRegular" fontSize={12}>
//                 {product?.mfgCategory?.toUpperCase() || "Indoor"}
//               </CustomLabel>
//             </View>

//             <View style={styles.quantityContainer}>
//               <CustomLabel fontFamily="poppinsRegular" style={styles.qtyLabel}>
//                 Qty: {lotNumbers * LOT_SIZE} Pcs
//               </CustomLabel>
//             </View>
//             <View style={styles.verifiedIconContainer}>
//               <CustomLabel
//                 fontFamily="poppinsRegular"
//                 fontSize={12}
//                 color={!isSampleVerified ? "red" : undefined}
//               >
//                 Sample Test
//               </CustomLabel>
//               {isSampleVerified && (
//                 <Icon
//                   name="download-done"
//                   library="materialIcons"
//                   size={16}
//                   color={colors.green}
//                 />
//               )}
//             </View>

//             <CustomLabel fontFamily="poppinsRegular" fontSize={14}>
//               Rs {lotNumbers * LOT_SIZE * product?.cost}
//             </CustomLabel>
//           </View>

//           <View style={styles.cartRight}>
//             <View style={{ alignItems: "center" }}>
//               <View style={styles.imageContainer}>
//                 <CustomImage
//                   source={product?.image || product?.images?.[0]}
//                   size={width * 0.2}
//                 />
//               </View>
//               <CustomLabel fontSize={12}>Delivery : Free</CustomLabel>
//               <View style={styles.lotRow}>
//                 <Pressable
//                   onPress={() => handleLotChange(lotNumbers - 1)}
//                   style={styles.chevronButton}
//                   accessibilityLabel="Decrease lot number"
//                 >
//                   <Icon name="chevron-down" />
//                 </Pressable>

//                 <CustomLabel
//                   fontFamily="poppinsRegular"
//                   style={styles.lotLabel}
//                 >
//                   Lot: {lotNumbers}
//                 </CustomLabel>

//                 <Pressable
//                   onPress={() => handleLotChange(lotNumbers + 1)}
//                   style={styles.chevronButton}
//                   accessibilityLabel="Increase lot number"
//                 >
//                   <Icon name="chevron-up" />
//                 </Pressable>
//               </View>
//             </View>
//           </View>
//         </View>
//         <View style={styles.bottom}>
//           <VerifiedCompanyName
//             companyNameSize="large"
//             company={company}
//             companyWidth={width * 0.8}
//           />
//         </View>
//       </View>
//       <View style={styles.buttonContainer}>
//         <Pressable
//           onPress={() => handleRemove(product?.id)}
//           style={styles.button1}
//         >
//           <CustomLabel fontFamily="interBold">Remove</CustomLabel>
//         </Pressable>
//         <Pressable onPress={handleGrabNow} style={styles.button2}>
//           <CustomLabel color="#fff" fontFamily="interBold">
//             Grab it now
//           </CustomLabel>
//         </Pressable>
//       </View>
//       <ConfirmationMsg
//         title="Request for Product"
//         msg="Are you sure to send request?"
//         visible={confirmationVisible}
//         onConfirm={onGrabConfirm}
//         onclose={() => setConfirmationVisible(false)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginHorizontal: 10,
//     marginVertical: 6,
//     borderWidth: 1,
//     borderColor: colors.LightGray,
//   },
//   cardContainer: {
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: colors.LightGray,
//     margin: 10,
//   },
//   card: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignSelf: "center",
//     width: width * 0.85,
//   },
//   cartLeft: {
//     width: width * 0.45,
//     gap: 10,
//   },
//   priceContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   quantityContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   totalAndLot: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//   },

//   chevronButton: {
//     backgroundColor: "#e5e7eb",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//   },
//   lotLabel: {
//     width: 50,
//     textAlign: "center",
//     fontSize: 14,
//   },
//   qtyLabel: {
//     fontSize: 13,
//   },
//   verifiedIconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },
//   cartRight: {
//     width: width * 0.3,

//     gap: 5,
//   },
//   lotRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",

//     width: width * 0.3,
//   },
//   imageContainer: {
//     borderRadius: 8,
//     overflow: "hidden",
//     width: width * 0.3,
//     height: width * 0.3,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },

//   buttonContainer: {
//     flexDirection: "row",
//     gap: 10,
//     padding: 10,
//     paddingTop: 0,
//   },
//   button1: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: colors.primary,
//     paddingVertical: 6,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   button2: {
//     flex: 1,
//     backgroundColor: colors.primary,
//     paddingVertical: 6,
//     borderRadius: 8,
//     alignItems: "center",
//   },
// });

// export default React.memo(CartCard);
