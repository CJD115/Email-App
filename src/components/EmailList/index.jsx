import EmailItem from "../EmailItem";
import { useEffect, useState } from "react";
import EmailView from "../EmailView";

function EmailList() {
  const [emailArray, setEmailArray] = useState(false);
  const [refreshJson, setRefreshJson] = useState(false);
  const [currentID, setCurrentID] = useState(0);

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

  return (
    <div className="flex-1 bg-gray-100 overflow-y-scroll">
      {emailArray ? (
        <div>
          {emailArray.data.map((email) => (
            <EmailItem
              data={email}
              key={email.id}
              setCurrentId={setCurrentID}
              setRead={setRead}
            />
          ))}
        </div>
      ) : (
        <p className="text-center p-4">Loading emails...</p>
      )}
    </div>
  );
}

export default EmailList;
