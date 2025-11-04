export default function registerEstiloRoutes(app, estiloService) {
  app
    .route('/estilos')
    .get((req, res, next) => {
      try {
        const items = estiloService.list();
        res.status(200).json(items);
      } catch (err) {
        next(err);
      }
    })
    .post((req, res, next) => {
      try {
        const created = estiloService.create(req.body);
        res.status(201).json(created);
      } catch (err) {
        next(err);
      }
    });

  app
    .route('/estilos/:id')
    .get((req, res, next) => {
      try {
        const item = estiloService.getById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.status(200).json(item);
      } catch (err) {
        next(err);
      }
    })
    .put((req, res, next) => {
      try {
        const updated = estiloService.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
      } catch (err) {
        next(err);
      }
    })
    .delete((req, res, next) => {
      try {
        const ok = estiloService.remove(req.params.id);
        if (!ok) return res.status(404).json({ error: 'Not found' });
        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });
}
