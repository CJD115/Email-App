function EmailItem({
  data,
  setCurrentId,
  setRead,
  setEmailViewWidth,
  setEmailItemWidth,
  emailItemWidth,
  setButtonClass,
}) {
  const dateObj = new Date(data.date_created).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const readClassNames =
    data.read === "1"
      ? "bg-slate-100 text-black"
      : "bg-gray-100 font-bold text-black";

  const tagStyles = {
    social: "bg-blue-100 text-blue-600",
    work: "bg-gray-100 text-gray-600",
    inspiration: "bg-green-100 text-green-600",
    photos: "bg-red-100 text-red-600",
    default: "bg-gray-100 text-gray-600",
  };

  const tagClass = tagStyles[data.tag?.toLowerCase() || "default"];

  const handleClick = () => {
    setCurrentId(data.id);
    setRead(data.id);
    setEmailItemWidth("w-0");
    setEmailViewWidth("w-full");
    setButtonClass("block");
  };

  return (
    <button
      id={data.id}
      onClick={handleClick}
      aria-label={`Open email from ${data.name}`}
      data-id={data.id}
      className={`${emailItemWidth} md:w-full`}
    >
      <div className={`${readClassNames} p-4 border-b border-gray-200 hover:bg-blue-100`}>
        <div className="flex items-center justify-between">
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold truncate">{data.name || "Unknown Sender"}</p>
          </div>
          {data.tag && (
            <span className={`px-2 py-1 ml-2 text-xs rounded-full ${tagClass}`}>
              {data.tag}
            </span>
          )}
          <div className="text-sm text-gray-500 whitespace-nowrap ml-4">{dateObj}</div>
        </div>
        <p className="mt-1 text-sm text-gray-700 truncate">{data.subject || "No Subject"}</p>
        <p className="mt-1 text-xs text-gray-500 truncate">{data.body || "No Preview Available"}</p>
      </div>
    </button>
  );
}

export default EmailItem;
