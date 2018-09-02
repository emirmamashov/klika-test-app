const express = require('express');
const router = express.Router();

module.exports = (app, db) => {
  const MasterQuery = app.get('masterQuery');
  const config = app.get('config');


  router.get('/genres', async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        msg: 'ok',
        data: await MasterQuery.getAll(config.Models.genre.model, { limit: 50 })
      });
    } catch(e) {
      console.log(e);
        res.status(200).json({
            success: false,
            code: 500,
            msg: 'something wrong!'
        });
    }
  });

  router.get('/executers', async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        msg: 'ok',
        data: await MasterQuery.getAll(config.Models.executer.model, { limit: 50 })
      });
    } catch(e) {
      console.log(e);
        res.status(200).json({
            success: false,
            code: 500,
            msg: 'something wrong!'
        });
    }
  });

  /* GET songs. */
  router.get('/', async (req, res, next) => {
    try {
        console.log('/songs', req.query);
        let data = req.body || {};
        if (req.query) {
            data.query = {};
            if (req.query.text) {
            const regex = new RegExp('^' + req.query.text, 'i'); // ищет только начальное совпадение
            const regex2 = new RegExp('\\ ' + req.query.text, 'i'); // ищет слова с пробелСлова = \ слова/i
            data.query = {
                $or: [
                    { name: regex },
                    { name: regex2 }
                ]
            }
            }

            if (req.query.page && Number(req.query.page)) {
                data.page = req.query.page;
            }
            if (req.query.limit && Number(req.query.limit)) {
                data.limit = req.query.limit;
            }

            if (req.query.executerId) {
                data.query.executerId = req.query.executerId;
            }
            if (req.query.genreId) {
                data.query.genreId = req.query.genreId;
            }
            if (req.query.year && Number(req.query.year)) {
                data.query.year = req.query.year;
            }
        }
        data.populate = [
            { path: 'executerId' },
            { path: 'genreId' }
        ];
        data.sort = {
            createdAt: -1
        };

        res.status(200).json({
            success: true,
            msg: 'ok',
            code: 200,
            data: await MasterQuery.getAll(config.Models.song.model, data)
        });
    } catch(e) {
      console.log(e);
        res.status(200).json({
            success: false,
            code: 500,
            msg: 'something wrong!'
        });
    }
  });

  app.use('/songs', router);
};
