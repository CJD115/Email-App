import SentEmailItem from "../SentEmailItem";
import { useEffect, useState } from "react";
import SentEmailView from "../SentEmailView";

function SentEmailList() {
  const [sentEmailArray, setSentEmailArray] = useState(false);
  const [refreshJson, setRefreshJson] = useState(false);
  const [sentCurrentID, setSentCurrentID] = useState(0);
  const [emailItemWidth, setEmailItemWidth] = useState("w-full");
  const [emailViewWidth, setEmailViewWidth] = useState("w-0");
  const [buttonClass, setButtonClass] = useState("hidden");

  useEffect(() => {
    fetch("https://email-client-api.dev.io-academy.uk/emails/sent")
      .then((response) => response.json())
      .then((data) => {
        setSentEmailArray(data);
        setRefreshJson(false);
        return sentEmailArray;
      });
  }, [refreshJson]);

  function closeEmail() {
    setSentCurrentID(0);
    setEmailItemWidth("w-full");
    setEmailViewWidth("w-0");
    setButtonClass("hidden");
  }

  function setRead(id) {
    fetch("https://email-client-api.dev.io-academy.uk/emails/" + id, {
      method: "PUT",
    });
    setRefreshJson(true);
  }

  return (
    <div>
      <div className="flex w-full justify-between">
        <div className="md:w-2/6 overflow-scroll max-h-screen">
          {sentEmailArray && (
            <div>
              {sentEmailArray.data.map((email) => {
                return (
                  <SentEmailItem
                    data={email}
                    key={email.id}
                    setSentCurrentId={setSentCurrentID}
                    setRead={setRead}
                    setEmailItemWidth={setEmailItemWidth}
                    setEmailViewWidth={setEmailViewWidth}
                    setButtonClass={setButtonClass}
                    emailItemWidth={emailItemWidth}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className={`${emailViewWidth} md:w-4/6`}>
          {sentCurrentID !== 0 && (
            <SentEmailView
              id={sentCurrentID}
              closeEmail={closeEmail}
              buttonClass={buttonClass}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SentEmailList;
