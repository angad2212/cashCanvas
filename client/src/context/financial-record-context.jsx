import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export const FinancialRecordsContext = createContext(undefined);
//It provides a way to pass data through the component tree 
//without having to pass props down manually at every level

export const FinancialRecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]); //will be used to perform CRUD operations on the records
  const { user } = useUser(); //getting the user

  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch(
      `http://localhost:3001/financial-records/getAllByUserID/${user.id}`
    );

    if (response.ok) {
      const records = await response.json();
      console.log(records);
      setRecords(records);
    }
  };

  //This ensures that financial records are fetched whenever the authenticated user changes.
  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record) => {
    const response = await fetch("http://localhost:3001/financial-records", {
      method: "POST",
      //This option is used to include data in the request body. JSON.stringify(record) converts 
      //the record object into a JSON string. This is necessary for POST requests where data 
      //needs to be sent to the server:-->
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
        //The syntax (prev) => [...prev, newRecord] creates a new array ([...prev, newRecord]) 
        //by spreading the previous state (prev) and adding newRecord at the end.
      }
    } catch (err) {}
  };

  const updateRecord = async (id, newRecord) => {
    const response = await fetch(
      `http://localhost:3001/financial-records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return newRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (err) {}
  };

  const deleteRecord = async (id) => {
    const response = await fetch(
      `http://localhost:3001/financial-records/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id)
        );
      }
    } catch (err) {}
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

//This allows components using useFinancialRecords to access the records, addRecord, updateRecord,
//and deleteRecord values provided by FinancialRecordsContext --->
export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordsContext);

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }

  return context;
};
