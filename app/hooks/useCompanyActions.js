import { showToast } from "../components/toast";
import { useDispatch, useSelector } from "react-redux";
import { selectSavedCompanyIdSet } from "../redux/company/companySelector";
import { toggleSavedCompany } from "../redux/company/companySlice";
import { showMessage } from "../utils/customMsgUtil";

const useCompanyActions = (company) => {
  const dispatch = useDispatch();
  const savedCompanyIdSet = useSelector(selectSavedCompanyIdSet);

  const isSaved = savedCompanyIdSet.has(company.id);

  const handleCompanySave = () => {
    const nextSaved = !isSaved;

    dispatch(toggleSavedCompany(company));
    // if(nextSaved){
    //   showMessage("Saved")
    // } else {
    //   showMessage("Unsaved")
    // }
  };

  return { isSaved, handleCompanySave };
};

export default useCompanyActions;
