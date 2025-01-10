import EmailList from "../EmailList/Index.jsx";
import NewEmail from "../NewEmail/index.jsx";

const Inbox = ({isOpen}) => {

  const openNewEmail = isOpen ? "" : "hidden";

  return (
    <div className="w-full">
      <div className={openNewEmail}><NewEmail /></div>
      <EmailList />
    </div>
  );
};

export default Inbox;
