import { FloatingActionButton } from "@progress/kendo-react-buttons";
import { Avatar } from "@progress/kendo-react-layout";
import { cancelIcon, homeIcon } from "@progress/kendo-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

const ChatbotFloatingButton = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const CustomItem = (props) => {
    return (
      <Link
        to={props.item.href}
        className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded"
      >
        <span className="k-fab-item-text">{props.item.name}</span>
        <Avatar
          type="image"
          style={{
            cursor: "pointer",
          }}
        >
          <img src={props.item.image} alt="KendoReact Buttons Contacts" />
        </Avatar>
      </Link>
    );
  };
  const navLinks = [
    {
      name: "Chatbot",
      href: "/chatbot",
      image:
        "https://img.freepik.com/premium-vector/chatbot-icon-concept-chat-bot-chatterbot-robot-virtual-assistance-website_123447-1615.jpg?w=1380",
    },
    {
      name: "Profile",
      href: "/profile",
      image:
        "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 print:hidden">
      <FloatingActionButton
        svgIcon={open ? cancelIcon : homeIcon} // Use simple text/icons
        items={navLinks}
        item={CustomItem} // Fix the item rendering
        positionMode="absolute"
        modal={true}
        onOpen={handleOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default ChatbotFloatingButton;
