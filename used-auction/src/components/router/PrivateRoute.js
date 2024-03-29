import { useRecoilState } from "recoil";
import { accessToken } from "../../recoil/accessToken";
import { Outlet, Navigate, useLocation } from "react-router-dom";
const PrivateRoute = () => {
  const auth = useRecoilState(accessToken)[0];
  console.log("로그인이 필요한 기능입니다.", auth);
  const location = useLocation();

  if (auth === null) {
    alert("로그인이 필요한 기능입니다.", auth);
  }
  return auth ? <Outlet /> : <Navigate to="/"></Navigate>;
};
export default PrivateRoute;
