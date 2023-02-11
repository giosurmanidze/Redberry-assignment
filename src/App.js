import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./animation/AnimatedRoutes";
import StoreContextProvider from "./context/appContext";

const App = () => {
  return (
    <div>
      <StoreContextProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </StoreContextProvider>
    </div>
  );
};

export default App;
