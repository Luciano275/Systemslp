import { sql, db } from "@vercel/postgres";
import { Loss, Product, Proveedor, TotalLoss } from "./definitions";
import { formatMoney } from "./utils";
import { ITEMS_PER_PAGE, orderByProduct, orderByProviders } from "./utils";

const mesesTotales = [
  { mes: 'Enero', mes_id: 1 },
  { mes: 'Febrero', mes_id: 2 },
  { mes: 'Marzo', mes_id: 3 },
  { mes: 'Abril', mes_id: 4 },
  { mes: 'Mayo', mes_id: 5 },
  { mes: 'Junio', mes_id: 6 },
  { mes: 'Julio', mes_id: 7 },
  { mes: 'Agosto', mes_id: 8 },
  { mes: 'Septiembre', mes_id: 9 },
  { mes: 'Octubre', mes_id: 10 },
  { mes: 'Noviembre', mes_id: 11 },
  { mes: 'Diciembre', mes_id: 12 },
];

const ALLOWED_MODES = ['ASC', 'DESC']
const ALLOWED_PROVIDERS_ORDERBY = ['nombre', 'producto', 'cantidad', 'entrega', 'precio']

export async function fetchFilteredProducts(query: string, currentPage: number, orderBy?: string | null, mode?: string | null): Promise<Product[]> {

  try {

    console.log('Obteniendo productos...')
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const dataOrdered = await orderByProduct({
      query,
      column: orderBy || 'nombre',
      currentPage,
      mode: (mode as 'ASC' | 'DESC') || 'ASC'
    })

    console.log({
      status: 'Productos obtenidos!'
    })

    return dataOrdered.rows as Product[]

  }catch (e) {
    console.log('Database error: ', e);
    throw new Error('Failed to fetch products.')
  }
}

export async function fetchProductPages(query: string) {
  try {

    const count = await sql`SELECT COUNT(*)
      FROM productos
      JOIN categorias ON productos.sector_id = categorias.id
      WHERE
        productos.nombre ILIKE ${`%${query}%`} OR
        productos.descripcion ILIKE ${`%${query}%`} OR
        productos.vencimiento::text ILIKE ${`%${query}%`} OR
        productos.stock::text ILIKE ${`%${query}%`} OR
        productos.precio::text ILIKE ${`%${query}%`} OR
        categorias.sector ILIKE ${`%${query}%`}
    `

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)

    return totalPages

  }catch (e) {
    console.log('Database error: ', e);
    throw new Error('Failed to fetch product pages.')
  }
}

export async function fetchProductById(id: string) {

  const regexUUIDD = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!(regexUUIDD.test(id))) {
    return null;
  }

  try {

    const data = await sql<Product>`
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
        productos.id = ${id}
    `;

    const producto = data.rows.map((product) => ({
      ...product,
      precio: formatMoney(product.precio)
    }))

    return producto[0]

  }catch(e) {
    console.log('Database error: ', e);
    throw new Error('Failed to fetch product by ID')
  }
}

export async function fetchFilteredProviders(
  query: string,
  currentPage: number,
  orderBy?: string | null,
  mode?: string | null
): Promise<Proveedor[]> {
  try {

    console.log('Obteniendo proveedores...')
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const orderByValidated = ALLOWED_PROVIDERS_ORDERBY.includes(orderBy || '') ? orderBy as string : 'nombre';
    const modeValidated = ALLOWED_MODES.includes(mode || '') ? mode as 'ASC' | 'DESC' : 'ASC';

    console.log(query)

    const dataOrdered = await orderByProviders({
      query,
      currentPage,
      column: orderByValidated,
      mode: modeValidated
    })
    
    console.log({
      status: 'Proveedores obtenidos!'
    })
    return dataOrdered.rows as Proveedor[];

  }catch (e) {
    console.log('Database error: ', e);
    throw new Error('Failed to fetch "proveedores"')
  }
}

export async function fetchProvidersPages(query: string) {
  try {

    const count = await sql`SELECT COUNT(*)
      FROM proveedores
      WHERE
        unaccent(proveedores.nombre) ILIKE unaccent(${`%${query}%`}) OR
        proveedores.descripcion ILIKE ${`%${query}%`} OR
        proveedores.cantidad::text ILIKE ${`%${query}%`} OR
        proveedores.entrega::text ILIKE ${`%${query}%`} OR
        proveedores.precio::text ILIKE ${`%${query}%`}
    `

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)

    return totalPages

  }catch (e) {
    console.log('Database error: ', e);
    throw new Error('Failed to fetch  providers pages');
  }
}

export async function fetchProviderById(id: string) {
  const regexUUIDD = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!(regexUUIDD.test(id))) {
    return null;
  }

  try {

    const data = await sql<Proveedor>`
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
        proveedores.id = ${id}
    `

    const proveedor = data.rows.map((provider) => ({
      ...provider,
      precio: formatMoney(provider.precio)
    }))

    return proveedor[0]

  }catch (e) {
    console.log('Database error: ', e);
    throw new Error('Failed to fetch provider by ID')
  }

}

////

export async function deleteAllLoss() {
  try {
    await sql`DELETE FROM perdidas`;
    return true;
  }catch (e) {
    console.log('Database error: ', e);
    throw new Error('Failed to delete all loss')
  }
}

////

export async function fetchLossByProductId(id: string) {
  const regexUUIDD = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!(regexUUIDD.test(id))) {
    return null;
  }

  try {

    const data = await sql<Loss>`
      SELECT
        perdidas.producto_id,
        perdidas.cantidad,
        perdidas.mes
      FROM perdidas
      WHERE perdidas.producto_id = ${id}
    `

    return data.rows[0] || null;

  }catch (e) {
    console.log('Database error: ', e);
    throw new Error('Failed to fetch loss by id')
  }

}

export async function fetchTotalRevenueLost() {
  try {

    await new Promise((resolve) => setTimeout(resolve, 500))

    const data = await sql<TotalLoss['revenue']>`
      SELECT
        SUM(productos.precio) AS total_perdido
      FROM perdidas
      JOIN productos ON perdidas.producto_id = productos.id
    `

    const total = formatMoney(data.rows[0].total_perdido)

    return total

  }catch (e) {
    console.log('Database error: ', e)
    throw new Error('Failed to fetch total revenue loss')
  }
}

export async function fetchTotalProductLoss() {
  try {

    const data = await sql<TotalLoss['product']>`
      SELECT
        SUM(perdidas.cantidad) AS cantidad_total_perdida
      FROM perdidas
    `;

    return data.rows[0].cantidad_total_perdida

  }catch (e) {
    console.log('Database error: ', e);
    throw new Error('Failed to fetch total product loss')
  }
}

export async function fetchTotalProductLossBySector(sector_id: number) {

  const sector = sector_id > 5 || sector_id <= 0 ? 1 : sector_id

  try {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data = await sql<TotalLoss['product']>`
      SELECT
          SUM(perdidas.cantidad) AS cantidad_total_perdida
      FROM perdidas
      JOIN productos ON perdidas.producto_id = productos.id
      WHERE productos.sector_id = ${sector}
    `

    return Number(data.rows[0].cantidad_total_perdida) || 0;

  }catch (e) {
    console.log('Database error: ', e);
    throw new Error('Failed to fetch total products loss by sector.')
  }
}

export async function fetchTotalProductLossByMonth(){
  try {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data = await sql<TotalLoss['chartProduct']>`
      SELECT
          SUM(perdidas.cantidad) AS cantidad_total_perdida,
          meses.mes AS mes,
          meses.id AS mes_id
      FROM perdidas
      JOIN meses ON perdidas.mes = meses.id
      GROUP BY meses.mes, meses.id
    `

    const datosPorMesId = Object.fromEntries(
      data.rows.map(({ cantidad_total_perdida, mes, mes_id }) => [mes_id, { cantidad_total_perdida, mes }])
    )

    const datosCompletos = mesesTotales.map(({ mes, mes_id }) => ({
      cantidad_total_perdido: Number(datosPorMesId[mes_id]?.cantidad_total_perdida) || 0,
      mes,
      mes_id
    }))

    return datosCompletos;

  }catch (e) {
    console.log('Database error: ', e);
    throw new Error('Failed to fetch total products loss by month.')
  }
}

export async function fetchTotalProductLossBySectorAndMonth(sector_id: number) {
  const sector = sector_id > 5 || sector_id <= 0 ? 1 : sector_id

  try {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data = await sql<TotalLoss['chartSector']>`
      SELECT
          SUM(perdidas.cantidad) AS cantidad_total_perdida,
          categorias.sector,
          meses.mes,
          meses.id as mes_id
      FROM perdidas
      JOIN productos ON perdidas.producto_id = productos.id
      JOIN categorias ON productos.sector_id = categorias.id
      JOIN meses ON perdidas.mes = meses.id
      WHERE productos.sector_id = ${sector}
      GROUP BY categorias.sector, meses.mes, meses.id
      ORDER BY meses.id ASC
    `

    const datosPorMesId = Object.fromEntries(
      data.rows.map(({ cantidad_total_perdida, mes, mes_id, sector }) => [mes_id, {
        cantidad_total_perdida,
        mes,
        sector
      }])
    )

    const datosCompletos = mesesTotales.map(({ mes, mes_id }) => ({
      cantidad_total_perdida: Number(datosPorMesId[mes_id]?.cantidad_total_perdida) || 0,
      sector,
      mes,
      mes_id
    }))

    return datosCompletos;

  }catch (e) {
    console.log('Database error: ', e);
    throw new Error('Failed to fetch total products loss by sector and month.')
  }

}

// SELECT
//   productos.nombre,
//   perdidas.cantidad,
//   productos.precio,
//   categorias.sector,
//   meses.mes
// FROM perdidas
// JOIN productos ON perdidas.producto_id = productos.id
// JOIN categorias ON productos.sector_id = categorias.id
// JOIN meses ON perdidas.mes = meses.id

// ------------ CHART---------------------------------

// ------------ Perdida total por sectores por meses