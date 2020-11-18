var express = require('express');
var swaggerUi = require('swagger-ui-express');
var YAML = require('yamljs');
var OpenApiValidator = require('express-openapi-validator');

const swaggerDocument = YAML.load('./swagger/swagger.yml');
const RandomRouter = require('./Routes/RandomRouter');

var app = express();

app.use(express.urlencoded({extended: true}));  //解析json用
app.use(express.json()); //解析json用
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 新增，指定一下swagger文件
const spec = './swagger/swagger.yml';
app.use('/spec', express.static(spec));

// 将OpenApiValidator加入中间件
app.use(
  OpenApiValidator.middleware({
    apiSpec: './swagger/swagger.yml',
    validateRequests: true,
    //validateResponses: true, // 如果需要验证response，则设为true
  }),
);

app.use('/', RandomRouter)

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(5000, function() {
  console.log('App listening on port 5000...')
});