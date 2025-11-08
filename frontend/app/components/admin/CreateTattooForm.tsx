import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { api } from "../../api";

type Estilo = { id: number; name: string; tagColor: string };
type Artista = { id: number; name: string };

export default function CreateTattooForm() {
  const navigate = useNavigate();
  const [estilos, setEstilos] = useState<Array<Estilo>>([]);
  const [artistas, setArtistas] = useState<Array<Artista>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get<Array<Estilo>>('/estilos').then((res) => setEstilos(res.data)).catch(() => setEstilos([]));
    api.get<Array<Artista>>('/artistas').then((res) => setArtistas(res.data)).catch(() => setArtistas([]));
  }, []);

  return (
    <div>
      <Formik
        initialValues={{ name: '', image: '', description: '', estilosIds: [] as Array<number | string>, artistaId: '' }}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) errors.name = 'Required';
          if (!values.image) errors.image = 'Required';
          if (!values.artistaId) errors.artistaId = 'Required';
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          try {
            const payload = {
              name: values.name,
              image: values.image,
              description: values.description,
              estilosIds: (values.estilosIds || []).map((v: any) => Number(v)),
              artistaId: Number(values.artistaId),
            };
            await api.post('/tattoos', payload);
            navigate(-1);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="max-w-2xl">
            <label className="block mb-2">
              <div className="font-medium">Name</div>
              <Field name="name" className="w-full p-2 rounded border" />
              <div className="text-red-600 text-sm"><ErrorMessage name="name" /></div>
            </label>

            <label className="block mb-2">
              <div className="font-medium">Image URL</div>
              <Field name="image" className="w-full p-2 rounded border" />
              <div className="text-red-600 text-sm"><ErrorMessage name="image" /></div>
            </label>

            <label className="block mb-4">
              <div className="font-medium">Description</div>
              <Field as="textarea" name="description" className="w-full p-2 rounded border h-32" />
            </label>

            <div className="block mb-4">
              <div className="font-medium mb-2">Estilos</div>
              <div className="flex flex-wrap gap-2">
                {estilos.map((e) => (
                  <label key={e.id} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="estilosIds"
                      value={String(e.id)}
                      checked={values.estilosIds.includes(String(e.id)) || values.estilosIds.includes(e.id)}
                      onChange={(ev) => {
                        const checked = ev.target.checked;
                        const val = String(e.id);
                        const current = values.estilosIds.map((v: any) => String(v));
                        if (checked) {
                          setFieldValue('estilosIds', [...current, val]);
                        } else {
                          setFieldValue('estilosIds', current.filter((x) => x !== val));
                        }
                      }}
                    />
                    <span style={{ backgroundColor: e.tagColor }} className="px-2 py-1 rounded text-white">{e.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="block mb-4">
              <div className="font-medium mb-2">Artista</div>
              <div className="flex gap-3">
                <Field as="select" name="artistaId" className="w-full p-2 rounded border">
                  <option value="">-- Seleccionar Artista --</option>
                  {artistas.map((a) => (
                    <option key={a.id} value={String(a.id)}>{a.name}</option>
                  ))}
                </Field>
                <button className="bg-blue-700 rounded-3xl" onClick={() => navigate('/admin/create-artist')}>O crea uno</button>
              </div>
              <div className="text-red-600 text-sm"><ErrorMessage name="artistaId" /></div>
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={isSubmitting || loading} className="px-4 py-2 bg-blue-600 text-white rounded">
                {loading ? 'Creando...' : 'Crear tattoo'}
              </button>
              <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
