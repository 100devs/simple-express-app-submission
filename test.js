<p>""</p>
</div>
<div class="hero-items ordtak">
    <% for(var i = 0; i < ordtak-collection.length; i++) {%>
        <p class="ordtak">  <%= ordtak-collection[i].ordtak %></p>:
        <!-- Output quote from the iterated quote object -->                       
    <% } %>
    <div/>
    <button id="update-button" class="buttenStyle">NESTE</button>
</div>

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$sample': {
      'size': 1
    }
  }
];

MongoClient.connect(
  '',
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db('ORDTAK2').collection('ordtak');
    coll.aggregate(agg, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  });