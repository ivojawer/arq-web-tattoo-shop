export default function registerArtistaRoutes(app, artistaService) {
  app
    .route('/artistas')
    .get((req, res, next) => {
      try {
        const items = artistaService.list();
        res.status(200).json(items);
      } catch (err) {
        next(err);
      }
    })
    .post((req, res, next) => {
      try {
        const created = artistaService.create(req.body);
        res.status(201).json(created);
      } catch (err) {
        next(err);
      }
    });

  app
    .route('/artistas/:id')
    .get((req, res, next) => {
      try {
        const item = artistaService.getById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.status(200).json(item);
      } catch (err) {
        next(err);
      }
    })
    .put((req, res, next) => {
      try {
        const updated = artistaService.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
      } catch (err) {
        next(err);
      }
    })
    .delete((req, res, next) => {
      try {
        const ok = artistaService.remove(req.params.id);
        if (!ok) return res.status(404).json({ error: 'Not found' });
        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });
}
