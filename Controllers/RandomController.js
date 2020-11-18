var express = require('express');
var YAML = require('yamljs');

exports.healthCheck = (req, res) => {
    const swaggerDocument = YAML.load('./swagger/swagger.yml');
    res.status(200).send(
        {
            message:'耗子尾汁',
            version:swaggerDocument['info']['version']
        }
    )
};

exports.setAge = (req, res) => {
    console.log(req)
    var age = req.query.number
    res.status(200).send(`来骗，来偷袭，我${age}岁的老同志`)
};

exports.tricks = (req, res) => {
    var tricks = req.body.tricks
    var comment = req.body.comment

    var line = tricks.join(', ') + ', ' + comment
    res.status(200).send(line)
};
