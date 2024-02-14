import { State } from "../lib/actions";

type PRODUCT_COLUMNS_ERROR = 'nombre' | 'descripcion' | 'vencimiento' | 'stock' | 'precio' | 'sector'
type PROVIDER_COLUMNS_ERROR = 'nombre'| 'producto' | 'descripcion' | 'cantidad' | 'entrega' | 'precio'
type LOSS_COLUMNS_ERROR = 'cantidad' | 'mes';

type AllColumns = PRODUCT_COLUMNS_ERROR | PROVIDER_COLUMNS_ERROR | LOSS_COLUMNS_ERROR

const productColumnsError: PRODUCT_COLUMNS_ERROR[] = ['nombre', 'descripcion', 'vencimiento', 'stock', 'precio', 'sector'];
const providerColumnsError: PROVIDER_COLUMNS_ERROR[] = ['nombre', 'producto', 'descripcion', 'cantidad', 'entrega', 'precio'];
const lossColumnsError: LOSS_COLUMNS_ERROR[] = ['cantidad', 'mes']

export default function ErrorMessage({
  state,
  id,
  field,
  table
}: {
  state: State;
  id: string;
  field: AllColumns;
  table: 'productos' | 'proveedores' | 'perdida'
}) {
  if (state.errors) {
    if (
      (table === 'productos' && productColumnsError.includes(field as PRODUCT_COLUMNS_ERROR))
      ||
      (table === 'proveedores' && providerColumnsError.includes(field as PROVIDER_COLUMNS_ERROR))
      ||
      (table === 'perdida' && lossColumnsError.includes(field as LOSS_COLUMNS_ERROR))
    ) {
      return (
        <div id={id} aria-live="polite" aria-atomic='true'>
          {state.errors[field]?.map((issue) => (
            <p className="text-red-600 text-sm" key={issue}>{issue}</p>
          ))}
        </div>
      )
    }
  }
}