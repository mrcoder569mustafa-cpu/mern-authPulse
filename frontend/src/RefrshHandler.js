import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefrshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

 useEffect(() => {

  // Token check → user authenticated
  if (localStorage.getItem("token")) {
    setIsAuthenticated(true);

    // Redirect logic
    if (
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/signup"
    ) {
      navigate("/home", { replace: false });
    }
  }
},
 [location, navigate, setIsAuthenticated]);

  return(
    null
  )
}
 
export default RefrshHandler;
