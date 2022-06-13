import { Link } from "react-router-dom";
import "./Sent.scss";

function Sent() {
  return (
    <div className="sent">
      <div className="messageContainer">
        <div className="finalMessage">
          Congratulations, you just bought some books!
        </div>
        <Link className="goToHomepage" role="button" to="/">
          Homepage
        </Link>
      </div>
    </div>
  );
}

export default Sent;
