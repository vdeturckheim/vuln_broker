'use strict';
const App = require('./lib/app');

const port = process.env.PORT || 8080;
App.listen(port, () => {

    console.log(`App listening on port ${port}`);
});
