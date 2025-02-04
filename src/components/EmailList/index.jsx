import EmailItem from "../EmailItem";
import { useEffect, useState } from "react";
import EmailView from "../EmailView";

function EmailList() {
  const [emailArray, setEmailArray] = useState(false);
  const [refreshJson, setRefreshJson] = useState(false);
  const [currentID, setCurrentID] = useState(0);
  const [emailViewWidth, setEmailViewWidth] = useState("w-0");
  const [emailItemWidth, setEmailItemWidth] = useState("w-full");
  const [buttonClass, setButtonClass] = useState("hidden");

  useEffect(() => {
    fetch("https://email-client-api.dev.io-academy.uk/emails")
      .then((response) => response.json())
      .then((data) => {
        setEmailArray(data);
        setRefreshJson(false);
      });
  }, [refreshJson]);

  function setRead(id) {
    fetch("https://email-client-api.dev.io-academy.uk/emails/" + id, {
      method: "PUT",
    });
    setRefreshJson(true);
  }

  const closeEmail = () => {
    setCurrentID(0);
    setEmailItemWidth("w-full");
    setEmailViewWidth("w-0");
    setButtonClass("hidden");
  };

  return (
    <div className="flex">
      <div className={`${emailItemWidth} md:w-2/2`}>
        {emailArray ? (
          <div>
            {emailArray.data.map((email) => (
              <EmailItem
                data={email}
                key={email.id}
                setCurrentId={setCurrentID}
                setRead={setRead}
                setEmailViewWidth={setEmailViewWidth}
                setEmailItemWidth={setEmailItemWidth}
                emailItemWidth={emailItemWidth}
                setButtonClass={setButtonClass}
              />
            ))}
          </div>
        ) : (
          <p className="text-center p-4">Loading emails...</p>
        )}
      </div>
      <div className={`${emailViewWidth} md:w-2/2`}>
        {currentID !== 0 && (
          <EmailView id={currentID} closeEmail={closeEmail} buttonClass={buttonClass} />
        )}
      </div>
    </div>
  );
}

export default EmailList;
