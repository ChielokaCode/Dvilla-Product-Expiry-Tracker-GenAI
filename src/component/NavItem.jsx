import React from "react";

const NavItem = (name, href) => {
  return (
    <a
      href={href}
      className="k-fab-item-text block px-3 py-2 bg-white rounded-md shadow-md hover:bg-gray-100"
    >
      {name}
    </a>
  );
};

export default NavItem;
