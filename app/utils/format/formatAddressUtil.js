export const formatAddress = (address) => {
  if (!address) return "No address available";
  const text = [
    address?.name,
    address?.villageOrTown,
    address?.landmark,
    address?.postOffice,
    address?.policeStation,
    address?.dist,
    address?.state,
    address?.country,
  ]
    .filter((item) => item?.trim())
    .join(", ");
  return text;
};
