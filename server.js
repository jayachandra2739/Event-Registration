const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());


app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


const dataFolder = path.join(__dirname, 'registrations');


if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
}


app.post('/register', (req, res) => {
    const { name, email, phone } = req.body;

    
    console.log('Request received:', req.body);

    
    if (!name || !email || !phone) {
        console.log('Validation failed: Missing fields');
        return res.status(400).json({ error: 'All fields are required.' });
    }

  
    const fileName = `${Date.now()}_${name.replace(/\s+/g, '_')}.json`;
    const filePath = path.join(dataFolder, fileName);

    
    const registrationData = { name, email, phone };

    fs.writeFile(filePath, JSON.stringify(registrationData, null, 2), (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return res.status(500).json({ error: 'Failed to save data.' });
        }

        console.log('File saved successfully:', filePath);
        res.status(200).json({ message: 'Registration saved successfully!' });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

