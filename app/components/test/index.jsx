import { useEffect } from "react";
import { showConfirmation } from "../../utils/confirmationMsgUtil";

const TestScreen = () => {
  useEffect(() => {
    showConfirmation({
      title: "Test",
      msg: "Does this show up?",
      onConfirm: () => console.log("Confirmed!"),
    });
  }, []);

  return null;
};

export default TestScreen;
