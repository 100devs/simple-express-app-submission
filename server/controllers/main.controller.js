const BASE_API = 'https://dbapidb.herokuapp.com/api';

// api landing response. return a summary of commands available.
const baseLanding = async (req, res) => {
  res.redirect('/api');
};

// api landing response. return a summary of commands available.
const apiLanding = async (req, res) => {
  const resource = {
    'GET all characters': `${BASE_API}/character`,
    'GET character by ID': `${BASE_API}/character/ID/:id`,
    'GET character by name': `${BASE_API}/character/:name`,
    'POST add character by ID': `${BASE_API}/character/add`,
    'PUT update character by ID': `${BASE_API}/character/update/:id`,
    'DELETE character by ID': `${BASE_API}/character/delete/:id`,
  };
  res.status(200).json(resource);
};

module.exports = { apiLanding, baseLanding };
