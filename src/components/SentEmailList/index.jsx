import SentEmailItem from "../SentEmailItem";
import { useEffect, useState } from "react";
import SentEmailView from "../SentEmailView";

function SentEmailList() {
  const [sentEmailArray, setSentEmailArray] = useState(false);
  const [refreshJson, setRefreshJson] = useState(false);
  const [sentCurrentID, setSentCurrentID] = useState(0);

  useEffect(() => {
    fetch("https://email-client-api.dev.io-academy.uk/emails/sent")
      .then((response) => response.json())
      .then((data) => {
        setSentEmailArray(data);
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
      {sentEmailArray ? (
        <div>
          {sentEmailArray.data.map((email) => (
            <SentEmailItem
              data={email}
              key={email.id}
              setSentCurrentId={setSentCurrentID}
              setRead={setRead}
            />
          ))}
        </div>
      ) : (
        <p className="text-center p-4">Loading sent emails...</p>
      )}
    </div>
  );
}

export default SentEmailList;
