import { Link } from "react-router-dom";
import "./styles.css";
import { useState } from "react";
import EmailList from "../EmailList/Index";

const NewEmail = ({toggleMenu}) => {
  const [receiverName, setReceiverName] = useState(null);
  const [recieverEmail, setRecieverEmail] = useState(null);
  const [emailSubject, setEmailSubject] = useState(null);
  const [emailContent, setEmailContent] = useState(null);
  const [displayMessage, setDisplayMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValid, setEmailValid] = useState(null);

  const NameChange = (e) => {
    setReceiverName(e.target.value);
  };

  const EmailChange = (e) => {
    setRecieverEmail(e.target.value);
  };

  const SubjectChange = (e) => {
    setEmailSubject(e.target.value);
  };

  const ContentChange = (e) => {
    setEmailContent(e.target.value);
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(recieverEmail)) {
      setEmailValid(false);
      setErrorMessage("Please enter a valid email.");
      return;
    }

    if (
      !receiverName ||
      receiverName == "" ||
      !recieverEmail ||
      recieverEmail == "" ||
      !emailSubject ||
      emailSubject == "" ||
      !emailContent ||
      emailContent != ""
    ) {
      setDisplayMessage("Unable to send email.");
    }

    if (
      receiverName &&
      receiverName != "" &&
      recieverEmail &&
      recieverEmail != "" &&
      emailSubject &&
      emailSubject != "" &&
      emailContent &&
      emailContent != ""
    ) {
      const response = await fetch(
        `https://email-client-api.dev.io-academy.uk/emails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: receiverName,
            email: recieverEmail,
            subject: emailSubject,
            body: emailContent,
          }),
        }
      );

      const data = await response.json();
      console.dir(data);

      setDisplayMessage("Email Sent");
    }
  };


  return (
    <div className="z-0">
      <div className="modal w-2/4 h-3/4 flex flex-col items-stretch bg-white border border-gray-300 p-10">
        <form>
          <div>
            <label htmlFor="name" className="sr-only"></label>
            <input
              onChange={NameChange}
              type="text"
              id="name"
              placeholder="To"
              className="w-full rounded border border-gray-300 p-1 my-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only"></label>
            <input
              onChange={EmailChange}
              type="email"
              id="email"
              placeholder="someone@example.com"
              className="w-full rounded border border-gray-300 p-1 my-2"
            />
            {errorMessage !== "" && (
              <p className="text-sm text-red">{errorMessage}</p>
            )}
          </div>
          <div>
            <label htmlFor="subject" className="sr-only"></label>
            <input
              onChange={SubjectChange}
              type="text"
              id="subject"
              placeholder="Subject"
              className="w-full rounded border border-gray-300 p-1 my-2"
            />
          </div>
          <div>
            <label htmlFor="content" className="sr-only"></label>
            <textarea
              onChange={ContentChange}
              id="content"
              className="w-full rounded border border-gray-300 p-1 my-2"
            />
          </div>
          <div className="flex justify-end mt-3">
            <button
              className="px-2 py-1 m-1 text-white bg-gray-500 rounded"
            >
              Cancel
            </button>
            <button
            onClick={sendEmail}
              className="px-2 py-1 m-1 text-white bg-green-600 rounded"
            >
              Send
            </button>
          </div>
          <p>{displayMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default NewEmail;
