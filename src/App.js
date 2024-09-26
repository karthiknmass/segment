import React, { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(schemaOptions);

  const handleOpenPopup = () => setShowPopup(true);

  const handleAddSchema = (selectedValue) => {
    const selectedSchema = availableOptions.find(
      (option) => option.value === selectedValue
    );

    if (selectedSchema) {
      setSelectedSchemas((prevSchemas) => {
        const updatedSchemas = [...prevSchemas, selectedSchema];
        return updatedSchemas;
      });

      setAvailableOptions((prevOptions) =>
        prevOptions.filter((opt) => opt.value !== selectedValue)
      );
    }
  };

  const handleSaveSegment = () => {
    const schemaData = selectedSchemas.map((schema) => ({
      [schema.value]: schema.label,
    }));

    const payload = {
      segment_name: segmentName,
      schema: schemaData,
    };

    console.log("Data to send to server: ", payload);
    setShowPopup(false);
  };

  const handleAddSchemaBtn = (data) => {
    setSelectedSchemas((prevSchemas) => [...prevSchemas, { label: "Select Schema", value: "select_schema" }]);
    console.log(selectedSchemas);
  }

  return (
    <div className="App">
      <h1>Segment Creator</h1>
      <button className="btn btn-success" onClick={handleOpenPopup}>Save Segment</button>

      {showPopup && (
        <div className="popup">
          <div>
            <h2>Save Segment</h2>
            <div className="segment-name">
              <label>
                Segment Name:
              </label>
              <input
                type="text"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </div>
            <div className="schema-dropdowns">
              <div className="segment-name">
                <label>
                  Add schema to segment:
                </label>
                <select
                  onChange={(e) => handleAddSchema(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select schema
                  </option>
                  {availableOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-primary" style={{ marginBottom: '5px' }} onClick={() => handleAddSchemaBtn(selectedSchemas)}>
                +Add new schema
              </button>
            </div>
            {selectedSchemas.length > 0 && (

              <div className="blue-box">
                {selectedSchemas.map((schema, index) => (
                  <div style={{ margin: '5px' }} key={index}>
                    <select
                      value={schema.value}
                      onChange={(e) => handleAddSchema(e.target.value)}
                    >
                      {schemaOptions
                        .filter(
                          (option) =>
                            option.value === schema.value ||
                            !selectedSchemas.some((s) => s.value === option.value)
                        )
                        .map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>
                  </div>
                ))}
              </div>
            )}
            <button className="btn btn-success" style={{ marginRight: '5px' }} onClick={handleSaveSegment}>Save the Segment</button>
            <button className="btn btn-light" onClick={() => { setShowPopup(false) }}>cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
