// index.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 9999;

// Enable CORS
app.use(cors());

// Sample data route
const sampleData = require('./sample_data.json');

app.get('/api/sample-data', (req, res) => {
    const filteredData = sampleData;
    res.json(filteredData);
});

app.get('/api/sample-data/30min', (req, res) => {
    let filteredData = sampleData.slice(0, 1799); //==> (1799 + 1 = 1800 i.e data of first 30 mins)
    res.json(filteredData);
});

// Sample data route for 60min
app.get('/api/sample-data/60min', (req, res) => {
    const filteredData = sampleData.slice(0, 3599); //==> (1799 + 1 = 1800 i.e data of first 60 mins)
    res.json(filteredData);
});

app.get('/api/count1sAnd0s', (req, res) => {
    let count1 = 0;
    let count0 = 0;

    // Iterate through each entry in the sampleData array
    sampleData.forEach(entry => {
        // Check machine_status value
        if (entry.machine_status === 1) {
            // Increment count1 if machine_status is 1
            count1++;
        } else if (entry.machine_status === 0) {
            // Increment count0 if machine_status is 0
            count0++;
        }
    });

    // Send both counts in the response
    res.json({ count1, count0 });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
