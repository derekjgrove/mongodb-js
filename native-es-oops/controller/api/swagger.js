export default function(router, swaggerSL) {
    router.use('/api-docs', swaggerSL.swaggerUi.serve);
    router.get('/api-docs', swaggerSL.swaggerUi.setup(swaggerSL.swaggerDocument));
}