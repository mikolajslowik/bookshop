import { NavLink } from "react-router-dom";
import "./Navigation.scss";

function Navigation() {
  const navigationComponents = [
    {
      path: "/",
      name: "homepage",
    },
    {
      path: "/cart",
      name: "cart",
    },
    {
      path: "/deliveryform",
      name: "deliveryform",
    },
  ];

  return (
    <div className="navigation">
      <div className="logo">HTMElo</div>
      <div className="paths">
        {navigationComponents.map((navEl) => {
          return (
            <NavLink
              to={navEl.path}
              key={navEl.path}
              className={`path ${navEl.name}`}
            >
              <p>{navEl.name}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Navigation;
