import parseIds from '../utils/parse-ids.js';

export default function registerTattooRoutes(app, tattooService) {
  app
    .route('/tattoos')
    .get((req, res, next) => {
      try {
        const ids = parseIds(req.query['estilosIds[]']);
        const artistaIdRaw = req.query.artistaId;
        const artistaId = typeof artistaIdRaw !== 'undefined' ? parseInt(String(artistaIdRaw), 10) : undefined;
        const items = tattooService.list(ids, isNaN(artistaId) ? undefined : artistaId);
        res.status(200).json(items);
      } catch (err) {
        next(err);
      }
    })
    .post((req, res, next) => {
      try {
        const created = tattooService.create(req.body);
        res.status(201).json(created);
      } catch (err) {
        next(err);
      }
    });

  app
    .route('/tattoos/:id')
    .get((req, res, next) => {
      try {
        const item = tattooService.getById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.status(200).json(item);
      } catch (err) {
        next(err);
      }
    })
    .put((req, res, next) => {
      try {
        const updated = tattooService.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
      } catch (err) {
        next(err);
      }
    })
    .delete((req, res, next) => {
      try {
        const ok = tattooService.remove(req.params.id);
        if (!ok) return res.status(404).json({ error: 'Not found' });
        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });
}
