const express_lib = require('express');
const app = express_lib();
const PORT = 10000;

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const {lang} = req.query;


    res.send(`User ID : ${id}, Language : ${lang}`);
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}/user/10?lang=en`);
});