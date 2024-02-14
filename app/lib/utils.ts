import { ReadonlyURLSearchParams } from "next/navigation";
import { State } from "./actions";
import { sql } from '@vercel/postgres'
import type { Product, Proveedor } from "./definitions";

type OrderByType = {
  query: string,
  currentPage: number,
  column: string,
  mode: 'ASC' | 'DESC';
}

export const ITEMS_PER_PAGE = 6;

export const formatDateToLatam = (date: Date) => {
  const nowDate = new Date(date);
  return nowDate.toLocaleDateString()
}

export const sectores = [
  { value: 1, label: 'Lácteos' },
  { value: 2, label: 'Bebidas' },
  { value: 3, label: 'Limpiezas' },
  { value: 4, label: 'Golosinas' },
  { value: 5, label: 'Comestibles' },
]

export const initialState: State = {
  message: null,
  errors: {},
  success: null
}

export const MESES: readonly [string, ...string[]] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

export const formatMoney = (price: number) => {
  return price * Math.pow(10, -2)
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const handleChangeOrderBy = (value: string, searchParams: ReadonlyURLSearchParams) => {
  const params = new URLSearchParams(searchParams);
  const order = [
    value.split("-")[0] || "nombre",
    (value.split("-")[1] || "ASC").toUpperCase(),
  ];

  if (value) {
    params.set('orderBy', order[0])
    params.set('mode', order[1])
  }

  return params.toString()
}

export const orderByProduct = async ({
  query,
  currentPage,
  column,
  mode
}: OrderByType) => {

  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  switch (column) {
    case 'nombre':
      if (mode === 'ASC') {
        return await sql<Product>`
          SELECT
            productos.id,
            productos.nombre,
            productos.descripcion,
            productos.vencimiento,
            productos.stock,
            productos.precio,
            categorias.sector
          FROM productos
          JOIN categorias ON productos.sector_id = categorias.id
          WHERE
            unaccent(productos.nombre) ILIKE unaccent(${`%${query}%`}) OR
            productos.descripcion ILIKE ${`%${query}%`} OR
            productos.vencimiento::text ILIKE ${`%${query}%`} OR
            productos.stock::text ILIKE ${`%${query}%`} OR
            productos.precio::text ILIKE ${`%${query}%`} OR
            unaccent(categorias.sector) ILIKE unaccent(${`%${query}%`})
          ORDER BY
            productos.nombre ASC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `
      }
      return await sql<Product>`
          SELECT
            productos.id,
            productos.nombre,
            productos.descripcion,
            productos.vencimiento,
            productos.stock,
            productos.precio,
            categorias.sector
          FROM productos
          JOIN categorias ON productos.sector_id = categorias.id
          WHERE
            unaccent(productos.nombre) ILIKE unaccent(${`%${query}%`}) OR
            productos.descripcion ILIKE ${`%${query}%`} OR
            productos.vencimiento::text ILIKE ${`%${query}%`} OR
            productos.stock::text ILIKE ${`%${query}%`} OR
            productos.precio::text ILIKE ${`%${query}%`} OR
            unaccent(categorias.sector) ILIKE unaccent(${`%${query}%`})
          ORDER BY
            productos.nombre DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `

    case 'vencimiento':
      if (mode === 'ASC') {
        return await sql<Product>`
          SELECT
            productos.id,
            productos.nombre,
            productos.descripcion,
            productos.vencimiento,
            productos.stock,
            productos.precio,
            categorias.sector
          FROM productos
          JOIN categorias ON productos.sector_id = categorias.id
          WHERE
            unaccent(productos.nombre) ILIKE unaccent(${`%${query}%`}) OR
            productos.descripcion ILIKE ${`%${query}%`} OR
            productos.vencimiento::text ILIKE ${`%${query}%`} OR
            productos.stock::text ILIKE ${`%${query}%`} OR
            productos.precio::text ILIKE ${`%${query}%`} OR
            unaccent(categorias.sector) ILIKE unaccent(${`%${query}%`})
          ORDER BY
            productos.vencimiento ASC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `
      }
      return await sql<Product>`
          SELECT
            productos.id,
            productos.nombre,
            productos.descripcion,
            productos.vencimiento,
            productos.stock,
            productos.precio,
            categorias.sector
          FROM productos
          JOIN categorias ON productos.sector_id = categorias.id
          WHERE
            unaccent(productos.nombre) ILIKE unaccent(${`%${query}%`}) OR
            productos.descripcion ILIKE ${`%${query}%`} OR
            productos.vencimiento::text ILIKE ${`%${query}%`} OR
            productos.stock::text ILIKE ${`%${query}%`} OR
            productos.precio::text ILIKE ${`%${query}%`} OR
            unaccent(categorias.sector) ILIKE unaccent(${`%${query}%`})
          ORDER BY
            productos.vencimiento DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `

    case 'stock':
      if (mode === 'ASC') {
        return await sql<Product>`
          SELECT
            productos.id,
            productos.nombre,
            productos.descripcion,
            productos.vencimiento,
            productos.stock,
            productos.precio,
            categorias.sector
          FROM productos
          JOIN categorias ON productos.sector_id = categorias.id
          WHERE
            unaccent(productos.nombre) ILIKE unaccent(${`%${query}%`}) OR
            productos.descripcion ILIKE ${`%${query}%`} OR
            productos.vencimiento::text ILIKE ${`%${query}%`} OR
            productos.stock::text ILIKE ${`%${query}%`} OR
            productos.precio::text ILIKE ${`%${query}%`} OR
            unaccent(categorias.sector) ILIKE unaccent(${`%${query}%`})
          ORDER BY
            productos.stock ASC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `
      }

      return await sql<Product>`
          SELECT
            productos.id,
            productos.nombre,
            productos.descripcion,
            productos.vencimiento,
            productos.stock,
            productos.precio,
            categorias.sector
          FROM productos
          JOIN categorias ON productos.sector_id = categorias.id
          WHERE
            unaccent(productos.nombre) ILIKE unaccent(${`%${query}%`}) OR
            productos.descripcion ILIKE ${`%${query}%`} OR
            productos.vencimiento::text ILIKE ${`%${query}%`} OR
            productos.stock::text ILIKE ${`%${query}%`} OR
            productos.precio::text ILIKE ${`%${query}%`} OR
            unaccent(categorias.sector) ILIKE unaccent(${`%${query}%`})
          ORDER BY
            productos.stock DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `

    case 'precio':
      if (mode === 'ASC'){
        return await sql<Product>`
          SELECT
            productos.id,
            productos.nombre,
            productos.descripcion,
            productos.vencimiento,
            productos.stock,
            productos.precio,
            categorias.sector
          FROM productos
          JOIN categorias ON productos.sector_id = categorias.id
          WHERE
            unaccent(productos.nombre) ILIKE unaccent(${`%${query}%`}) OR
            productos.descripcion ILIKE ${`%${query}%`} OR
            productos.vencimiento::text ILIKE ${`%${query}%`} OR
            productos.stock::text ILIKE ${`%${query}%`} OR
            productos.precio::text ILIKE ${`%${query}%`} OR
            unaccent(categorias.sector) ILIKE unaccent(${`%${query}%`})
          ORDER BY
            productos.precio ASC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `
      }

      return await sql<Product>`
          SELECT
            productos.id,
            productos.nombre,
            productos.descripcion,
            productos.vencimiento,
            productos.stock,
            productos.precio,
            categorias.sector
          FROM productos
          JOIN categorias ON productos.sector_id = categorias.id
          WHERE
            unaccent(productos.nombre) ILIKE unaccent(${`%${query}%`}) OR
            productos.descripcion ILIKE ${`%${query}%`} OR
            productos.vencimiento::text ILIKE ${`%${query}%`} OR
            productos.stock::text ILIKE ${`%${query}%`} OR
            productos.precio::text ILIKE ${`%${query}%`} OR
            unaccent(categorias.sector) ILIKE unaccent(${`%${query}%`})
          ORDER BY
            productos.precio DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `

    default:
      return await sql<Product>`
          SELECT
            productos.id,
            productos.nombre,
            productos.descripcion,
            productos.vencimiento,
            productos.stock,
            productos.precio,
            categorias.sector
          FROM productos
          JOIN categorias ON productos.sector_id = categorias.id
          WHERE
            unaccent(productos.nombre) ILIKE unaccent(${`%${query}%`}) OR
            productos.descripcion ILIKE ${`%${query}%`} OR
            productos.vencimiento::text ILIKE ${`%${query}%`} OR
            productos.stock::text ILIKE ${`%${query}%`} OR
            productos.precio::text ILIKE ${`%${query}%`} OR
            unaccent(categorias.sector) ILIKE unaccent(${`%${query}%`})
          ORDER BY
            productos.nombre ASC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `
  }

}

export const orderByProviders = async ({
  query,
  currentPage,
  column,
  mode
}: OrderByType) => {

  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  switch(column) {
    case 'nombre':
      if (mode === 'ASC') {
        return await sql<Proveedor>`
          SELECT
            proveedores.id,
            proveedores.nombre,
            proveedores.producto,
            proveedores.descripcion,
            proveedores.cantidad,
            proveedores.entrega,
            proveedores.precio
          FROM proveedores
          WHERE
            unaccent(proveedores.nombre) ILIKE unaccent(${`%${query}%`}) OR
            unaccent(proveedores.producto) ILIKE unaccent(${`%${query}%`}) OR
            proveedores.descripcion ILIKE ${`%${query}%`} OR
            proveedores.cantidad::text ILIKE ${`%${query}%`} OR
            proveedores.entrega::text ILIKE ${`%${query}%`} OR
            proveedores.precio::text ILIKE ${`%${query}%`}
          ORDER BY
            proveedores.nombre ASC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `
      }
      return await sql<Proveedor>`
        SELECT
          proveedores.id,
          proveedores.nombre,
          proveedores.producto,
          proveedores.descripcion,
          proveedores.cantidad,
          proveedores.entrega,
          proveedores.precio
        FROM proveedores
        WHERE
          unaccent(proveedores.nombre) ILIKE unaccent(${`%${query}%`}) OR
          unaccent(proveedores.producto) ILIKE unaccent(${`%${query}%`}) OR
          proveedores.descripcion ILIKE ${`%${query}%`} OR
          proveedores.cantidad::text ILIKE ${`%${query}%`} OR
          proveedores.entrega::text ILIKE ${`%${query}%`} OR
          proveedores.precio::text ILIKE ${`%${query}%`}
        ORDER BY
          proveedores.nombre DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

    case 'producto':
      if (mode === 'ASC') {
        return await sql<Proveedor>`
          SELECT
            proveedores.id,
            proveedores.nombre,
            proveedores.producto,
            proveedores.descripcion,
            proveedores.cantidad,
            proveedores.entrega,
            proveedores.precio
          FROM proveedores
          WHERE
            unaccent(proveedores.nombre) ILIKE unaccent(${`%${query}%`}) OR
            unaccent(proveedores.producto) ILIKE unaccent(${`%${query}%`}) OR
            proveedores.descripcion ILIKE ${`%${query}%`} OR
            proveedores.cantidad::text ILIKE ${`%${query}%`} OR
            proveedores.entrega::text ILIKE ${`%${query}%`} OR
            proveedores.precio::text ILIKE ${`%${query}%`}
          ORDER BY
            proveedores.producto ASC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `
      }
      return await sql<Proveedor>`
          SELECT
            proveedores.id,
            proveedores.nombre,
            proveedores.producto,
            proveedores.descripcion,
            proveedores.cantidad,
            proveedores.entrega,
            proveedores.precio
          FROM proveedores
          WHERE
            unaccent(proveedores.nombre) ILIKE unaccent(${`%${query}%`}) OR
            unaccent(proveedores.producto) ILIKE unaccent(${`%${query}%`}) OR
            proveedores.descripcion ILIKE ${`%${query}%`} OR
            proveedores.cantidad::text ILIKE ${`%${query}%`} OR
            proveedores.entrega::text ILIKE ${`%${query}%`} OR
            proveedores.precio::text ILIKE ${`%${query}%`}
          ORDER BY
            proveedores.producto DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `

    case 'cantidad':
      if (mode === 'ASC') {
        return await sql<Proveedor>`
          SELECT
            proveedores.id,
            proveedores.nombre,
            proveedores.producto,
            proveedores.descripcion,
            proveedores.cantidad,
            proveedores.entrega,
            proveedores.precio
          FROM proveedores
          WHERE
            unaccent(proveedores.nombre) ILIKE unaccent(${`%${query}%`}) OR
            unaccent(proveedores.producto) ILIKE unaccent(${`%${query}%`}) OR
            proveedores.descripcion ILIKE ${`%${query}%`} OR
            proveedores.cantidad::text ILIKE ${`%${query}%`} OR
            proveedores.entrega::text ILIKE ${`%${query}%`} OR
            proveedores.precio::text ILIKE ${`%${query}%`}
          ORDER BY
            proveedores.cantidad ASC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `
      }
      return await sql<Proveedor>`
          SELECT
            proveedores.id,
            proveedores.nombre,
            proveedores.producto,
            proveedores.descripcion,
            proveedores.cantidad,
            proveedores.entrega,
            proveedores.precio
          FROM proveedores
          WHERE
            unaccent(proveedores.nombre) ILIKE unaccent(${`%${query}%`}) OR
            unaccent(proveedores.producto) ILIKE unaccent(${`%${query}%`}) OR
            proveedores.descripcion ILIKE ${`%${query}%`} OR
            proveedores.cantidad::text ILIKE ${`%${query}%`} OR
            proveedores.entrega::text ILIKE ${`%${query}%`} OR
            proveedores.precio::text ILIKE ${`%${query}%`}
          ORDER BY
            proveedores.cantidad DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `

      case 'entrega':
        if (mode === 'ASC') {
          return await sql<Proveedor>`
            SELECT
              proveedores.id,
              proveedores.nombre,
              proveedores.producto,
              proveedores.descripcion,
              proveedores.cantidad,
              proveedores.entrega,
              proveedores.precio
            FROM proveedores
            WHERE
              unaccent(proveedores.nombre) ILIKE unaccent(${`%${query}%`}) OR
              unaccent(proveedores.producto) ILIKE unaccent(${`%${query}%`}) OR
              proveedores.descripcion ILIKE ${`%${query}%`} OR
              proveedores.cantidad::text ILIKE ${`%${query}%`} OR
              proveedores.entrega::text ILIKE ${`%${query}%`} OR
              proveedores.precio::text ILIKE ${`%${query}%`}
            ORDER BY
              proveedores.entrega ASC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
          `
        }

        return await sql<Proveedor>`
            SELECT
              proveedores.id,
              proveedores.nombre,
              proveedores.producto,
              proveedores.descripcion,
              proveedores.cantidad,
              proveedores.entrega,
              proveedores.precio
            FROM proveedores
            WHERE
              unaccent(proveedores.nombre) ILIKE unaccent(${`%${query}%`}) OR
              unaccent(proveedores.producto) ILIKE unaccent(${`%${query}%`}) OR
              proveedores.descripcion ILIKE ${`%${query}%`} OR
              proveedores.cantidad::text ILIKE ${`%${query}%`} OR
              proveedores.entrega::text ILIKE ${`%${query}%`} OR
              proveedores.precio::text ILIKE ${`%${query}%`}
            ORDER BY
              proveedores.entrega DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
          `

    case 'precio':
      if (mode === 'ASC') {
        return await sql<Proveedor>`
            SELECT
              proveedores.id,
              proveedores.nombre,
              proveedores.producto,
              proveedores.descripcion,
              proveedores.cantidad,
              proveedores.entrega,
              proveedores.precio
            FROM proveedores
            WHERE
              unaccent(proveedores.nombre) ILIKE unaccent(${`%${query}%`}) OR
              unaccent(proveedores.producto) ILIKE unaccent(${`%${query}%`}) OR
              proveedores.descripcion ILIKE ${`%${query}%`} OR
              proveedores.cantidad::text ILIKE ${`%${query}%`} OR
              proveedores.entrega::text ILIKE ${`%${query}%`} OR
              proveedores.precio::text ILIKE ${`%${query}%`}
            ORDER BY
              proveedores.precio ASC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
          `
      }

      return await sql<Proveedor>`
            SELECT
              proveedores.id,
              proveedores.nombre,
              proveedores.producto,
              proveedores.descripcion,
              proveedores.cantidad,
              proveedores.entrega,
              proveedores.precio
            FROM proveedores
            WHERE
              unaccent(proveedores.nombre) ILIKE unaccent(${`%${query}%`}) OR
              unaccent(proveedores.producto) ILIKE unaccent(${`%${query}%`}) OR
              proveedores.descripcion ILIKE ${`%${query}%`} OR
              proveedores.cantidad::text ILIKE ${`%${query}%`} OR
              proveedores.entrega::text ILIKE ${`%${query}%`} OR
              proveedores.precio::text ILIKE ${`%${query}%`}
            ORDER BY
              proveedores.precio DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
          `

    default:
      return await sql<Proveedor>`
          SELECT
            proveedores.id,
            proveedores.nombre,
            proveedores.producto,
            proveedores.descripcion,
            proveedores.cantidad,
            proveedores.entrega,
            proveedores.precio
          FROM proveedores
          WHERE
            unaccent(proveedores.nombre) ILIKE unaccent(${`%${query}%`}) OR
            unaccent(proveedores.producto) ILIKE unaccent(${`%${query}%`}) OR
            proveedores.descripcion ILIKE ${`%${query}%`} OR
            proveedores.cantidad::text ILIKE ${`%${query}%`} OR
            proveedores.entrega::text ILIKE ${`%${query}%`} OR
            proveedores.precio::text ILIKE ${`%${query}%`}
          ORDER BY
            proveedores.nombre ASC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `
  }

}