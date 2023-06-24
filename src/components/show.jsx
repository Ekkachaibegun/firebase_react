import React from 'react';
import { db } from '../firebase';
import { useState,useEffect } from 'react';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

import './show.css';

const Show = () => {

  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [arrayKey, setArrayKey] = useState([]);



  const handleFetchData = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, selectedValue));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setAllData(data);
    setIsLoading(false);

  };

  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };

  useEffect(() => {
   
    const keys = allData.reduce((keysArray, dataItem) => {
      const itemKeys = Object.keys(dataItem);
      return [...keysArray, ...itemKeys];
    }, []);

    // Remove duplicates keys array
    const uniqueKeys = [...new Set(keys)];

    setArrayKey(uniqueKeys);
  }, [allData]);


  return (
    <div>
      <div className='Detail'>
      <label>Select name collection:</label>
      <select id="dropdown" value={selectedValue} onChange={handleSelectChange}>
        <option value="">COLLECTION</option>
        <option value="users">users</option>
        <option value="quizzes">quizzes</option>
        <option value="students">students</option>
        <option value="teachers">teachers</option>
        <option value="roles">roles</option>
        <option value="schools">schools</option>
        <option value="permissions">permissions</option>
        <option value="positions">positions</option>
      </select>
      <button className='btnshow' type="button"
        value={selectedValue}
         onClick={handleFetchData}>Show Data</button>
        
      </div>


      {isLoading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <React.Fragment>
          {allData.length === 0 ? (
            <div></div>
          ) : (


            <table>
              <thead>
                <tr>
                <th>No.</th>
                {arrayKey.map(key => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
              {allData.map((data, index) => (
                  <tr key={data.id}>
                    <td>{index + 1}</td>
                    {arrayKey.map(key => {
                      let cellData = data[key];
                      if (typeof cellData === 'object' && cellData !== null) {
                        cellData = JSON.stringify(cellData); 
                      } else if (cellData === undefined) {
                        cellData = '';
                      }
                      return <td key={key}>{cellData.toString()}</td>;
                    })}
                  </tr>

                ))}
              </tbody>

            </table>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Show;