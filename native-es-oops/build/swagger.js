import swaggerAutogen from 'swagger-autogen';

swaggerAutogen('./swagger-output.json', [
    './../index.js', 
    './../controller/api/companies.js',
    './../controller/api/files.js'
]);