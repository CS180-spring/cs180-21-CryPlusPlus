const convertTimeToString = (timeT) => {
    const date = new Date(timeT * 1000); // Convert time_t to milliseconds
  
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const year = date.getFullYear();
  
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
  
    const ampm = hour >= 12 ? 'pm' : 'am';
    const hour12 = (hour % 12 || 12).toString();
  
    const formattedDate = `${month}/${day}/${year}`;
    const formattedTime = `${hour12}:${minute}:${second} ${ampm}`;
  
    return `${formattedDate} ${formattedTime}`;
}

const addToLog = (response, setConsoleLogs) => {
    console.log("Adding to log");
    const { message, time } = response;
    const newLog = { message, time };
    setConsoleLogs(prevConsoleLogs => [...prevConsoleLogs, newLog]);
}

const updateTable = (data, setTableData) => {
    console.log("Updating table");
    setTableData(data);
}

export { convertTimeToString, addToLog, updateTable };