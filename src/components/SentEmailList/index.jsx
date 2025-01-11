import React, { useState, useEffect } from "react";
import SentEmailItem from "../SentEmailItem";
import SentEmailView from "../SentEmailView";

function SentEmailList() {
  const [sentEmailArray, setSentEmailArray] = useState([]);
  const [refreshJson, setRefreshJson] = useState(false);
  const [sentCurrentID, setSentCurrentID] = useState(null);
  const [emailViewWidth, setEmailViewWidth] = useState("w-0");
  const [emailItemWidth, setEmailItemWidth] = useState("w-full");
  const [buttonClass, setButtonClass] = useState("hidden");

  useEffect(() => {
    fetch("https://email-client-api.dev.io-academy.uk/emails/sent")
      .then((response) => response.json())
      .then((data) => {
        setSentEmailArray(data.data);
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
    setSentCurrentID(null);
    setEmailItemWidth("w-full");
    setEmailViewWidth("w-0");
    setButtonClass("hidden");
  };

  return (
    <div className="flex">
      <div className={`${emailItemWidth} md:w-2/2`}>
        {sentEmailArray.length > 0 ? (
          <div>
            {sentEmailArray.map((email) => (
              <SentEmailItem
                data={email}
                key={email.id}
                setSentCurrentId={setSentCurrentID}
                setRead={setRead}
                setEmailViewWidth={setEmailViewWidth}
                setEmailItemWidth={setEmailItemWidth}
                emailItemWidth={emailItemWidth}
                setButtonClass={setButtonClass}
              />
            ))}
          </div>
        ) : (
          <p className="text-center p-4">Loading sent emails...</p>
        )}
      </div>
      <div className={`${emailViewWidth} md:w-2/2`}>
        {sentCurrentID && (
          <SentEmailView
            id={sentCurrentID}
            closeEmail={closeEmail}
            buttonClass={buttonClass}
          />
        )}
      </div>
    </div>
  );
}

export default SentEmailList;
