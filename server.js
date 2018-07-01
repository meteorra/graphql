const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');

const port = process.env.PORT || 9000;

const typeDefs = `
    type Query {
        product(id: ID!): Product 
        products: [Product]
    }
    
    type Product {
        id: ID!
        title: String
        description: String
    }
`;

const products = [
    {
        id: '1',
        title: 'Product 1',
        description: 'Description of product 1'
    },
    {
        id: '2',
        title: 'Product 2',
        description: 'Descrition of product 2'
    }
];

const product = {
    id: '2',
    title: 'Product 2',
    description: 'Descrition of product 2'
};

const resolvers = {
    Query: {
        products: () => products,
        product: (root, { id }) => product
    }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(cors(), bodyParser.json());
app.use('/graphql', graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: 'graphql'}));
app.listen(port, () => console.log(`Server is running on port ${port}`));
