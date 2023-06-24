import axios from 'axios';
import { useState, useEffect } from 'react';

const Fib = () => {

   const [seenIndexes, setSeenIndexes] = useState([]);
   const [values, setValues] = useState({});
   const [index, setIndex] = useState("")

   useEffect(() => {
      async function fetchValues() {
        try {
          const response = await axios.get('/api/values/current');
          setValues(response.data);
        } catch (error) {
          // Handle error
          console.log(error);
        }
      }
  
      async function fetchIndexes() {
        try {
          const response = await axios.get('/api/values/all');
          setSeenIndexes(response.data);
        } catch (error) {
          // Handle error
          console.log(error);
        }
      }
  
      fetchValues();
      fetchIndexes();
    }, []);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        await axios.post('/api/values', {
          index: index,
        });
        setIndex('');
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };
  
    const renderSeenIndexes = () => {
      return seenIndexes.map(({ number }) => number).join(', ');
    };
  
   const renderValues = () => {
      const entries = [];
  
      for (let key in values) {
        entries.push(
          <div key={key}>
            For index {key} I calculated {values[key]}
          </div>
        );
      }
  
      return entries;
    }
  
 
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <label>Enter your index:</label>
            <input
              value={index}
              onChange={(event) => setIndex(event.target.value)}
            />
            <button>Submit</button>
          </form>
  
          <h3>Indexes I have seen:</h3>
          {renderSeenIndexes()}
  
          <h3>Calculated Values:</h3>
          {renderValues()}
        </div>
      );
    
  }
  
  export default Fib;