'use server'
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { MESES } from './utils'
import { Loss } from './definitions'

const SECTORES = [
  'Lácteos',
  'Bebidas',
  'Limpiezas',
  'Golosinas',
  'Comestibles'
]

const CreateProductSchema = z.object({
  id: z.string(),
  nombre: z.string({
    required_error: 'Se necesita un nombre.',
    invalid_type_error: 'Se necesita un nombre válido.'  
  }).min(3),
  descripcion: z.string({
    required_error: 'Se necesita una pequeña descripción.',
    invalid_type_error: 'Se necesita una descripción válida.'
  }).min(5),
  vencimiento: z.coerce.date({
    invalid_type_error: 'Seleccione un fecha válida.',
    required_error: 'Seleccione un fecha válida.'
  }),
  stock: z.coerce.number().gt(0, {
    message: 'Ingrese un valor de stock válido.'
  }),
  precio: z.coerce.number().gt(0, {
    message: 'Ingrese un precio válido.'
  }),
  sector: z.enum([
    'Lácteos',
    'Bebidas',
    'Limpiezas',
    'Golosinas',
    'Comestibles'
  ], {
    invalid_type_error: 'Seleccione un sector válido.'
  })
})

const CreateProviderSchema = z.object({
  id: z.string(),
  nombre: z.string({
    required_error: 'Se necesita el nombre del proveedor.',
    invalid_type_error: 'Se necesita un nombre válido'
  }).min(3),
  producto: z.string({
    required_error: 'Se necesita un nombre.',
    invalid_type_error: 'Se necesita un nombre válido.'  
  }).min(3),
  descripcion: z.string({
    required_error: 'Se necesita una pequeña descripción.',
    invalid_type_error: 'Se necesita una descripción válida.'
  }).min(5),
  cantidad: z.coerce.number().gt(0, {
    message: 'Ingrese una cantidad válida'
  }),
  entrega: z.coerce.date({
    invalid_type_error: 'Seleccione un fecha válida.',
    required_error: 'Seleccione un fecha válida.'
  }),
  precio: z.coerce.number().gt(0, {
    message: 'Ingrese un precio válido.'
  })
})

const CreateLossSchema = z.object({
  cantidad: z.coerce.number().gt(0, {
    message: 'Ingrese una cantidad válida.'
  }),
  mes: z.enum(MESES, {
    invalid_type_error: 'Selecciones un més válido.',
    required_error: 'Se necesita que selecciones un més.'
  })
})

const ProductForm = CreateProductSchema.omit({
  id: true
})

const ProviderForm = CreateProviderSchema.omit({
  id: true
})

export type State = {
  errors?: {
    //Productos
    nombre?: string[],
    descripcion?: string[],
    vencimiento?: string[],
    stock?: string[],
    precio?: string[],
    sector?: string[],
    
    //Proveedores
    producto?: string[],
    cantidad?: string[],
    entrega?: string[],

    //Perdida
    mes?: string[]
  };
  message?: string | null;
  success?: boolean | null;
  timer?: boolean | null;
}

const revalidateAll = () => {
  revalidatePath('/reportes')
  revalidatePath('/productos')
  revalidatePath('/productos/create/[id]/broken', 'page')
  revalidatePath('/productos/[id]/edit', 'page')
}

// ---------------------------------- Productos ------------------------------------------

export async function createProduct(prevState: State, formData: FormData): Promise<State> {

  const validation = ProductForm.safeParse(Object.fromEntries(formData.entries()))  

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Faltan campos para crear el producto.',
      success: false
    }
  }
  
  const { nombre, descripcion, vencimiento, stock, precio, sector } = validation.data;
  
  const priceInCents = precio * 100;
  const vencimientoFormated = new Date(vencimiento).toISOString().split('T')[0]
  const sector_id = SECTORES.indexOf(sector) + 1

  try {

    await sql`
      INSERT INTO productos (nombre, descripcion, vencimiento, stock, precio, sector_id)
      VALUES (${nombre}, ${descripcion}, ${vencimientoFormated}, ${stock}, ${priceInCents}, ${sector_id})
    `

  }catch (e) {

    console.log('Server Action Error: ', e)

    return {
      message: 'Database error: Failed to create product.',
      success: false
    }
  }

  revalidatePath('/productos');
  //redirect('/productos')

  return {
    message: 'Producto creado!',
    success: true
  }

}

export async function deleteProduct(id: string): Promise<State> {
  try {
    await sql`
      DELETE FROM productos WHERE id = ${id}
    `;
  }catch (e) {

    console.log('Server Action Error: ', e)

    return {
      message: 'Database Error: Failed to delete product.',
      success: false
    }
  }
  
  revalidateAll()

  return {
    message: 'Producto borrado con exito!',
    success: true
  }

}

export async function updateProduct(id: string, prevState: State, formData: FormData): Promise<State> {
  
  const validation = ProductForm.safeParse(Object.fromEntries(formData.entries()));

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Faltan campos para editar el producto.',
      success: false
    }
  }

  const { nombre, descripcion, vencimiento, stock, precio, sector } = validation.data;
  const sector_id = SECTORES.indexOf(sector) + 1;
  const priceInCents = precio * 100;
  const vencimientoFormated = new Date(vencimiento).toISOString().split('T')[0];

  try {

    await sql`
      UPDATE productos
      SET nombre = ${nombre}, descripcion = ${descripcion}, vencimiento = ${vencimientoFormated}, stock = ${stock}, precio = ${priceInCents}, sector_id = ${sector_id}
      WHERE id = ${id}
    `

  }catch (e) {

    console.log('Server Action Error: ', e)

    return {
      message: 'Database error: Failed to edit product.',
      success: false
    }
  }

  revalidateAll()

  return {
    message: 'Producto editado con exito!',
    success: true
  }

}


// ---------------------------------- Proveedores ------------------------------------------

export async function createProvider(prevState: State, formData: FormData): Promise<State> {
  
  const validation = ProviderForm.safeParse(Object.fromEntries(formData.entries()));

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Faltan campos para añadir el proveedor',
      success: false
    }
  }

  const { nombre, producto, descripcion, cantidad, entrega, precio } = validation.data;

  const entregaFormated = new Date(entrega).toISOString().split('T')[0];
  const priceInCents = precio * 100;

  try {

    await sql`
      INSERT INTO proveedores (nombre, producto, descripcion, cantidad, entrega, precio)
      VALUES (${nombre}, ${producto}, ${descripcion}, ${cantidad}, ${entregaFormated}, ${priceInCents})
    `

  }catch (error) {
    console.log('Server Action Error: ', error);
    return {
      message: 'Database Error: Failed to create provider.',
      success: false
    }
  }

  revalidatePath('/proveedores');

  return {
    message: 'Proveedor creado con exito!',
    success: true
  }

}

export async function updateProvider(id: string, prevState: State, formData: FormData): Promise<State> {
  
  const validation = ProviderForm.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validation.success){
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Faltan campos para editar el proveedor.',
      success: false
    }
  }

  const { nombre, producto, descripcion, cantidad, entrega, precio } =
    validation.data;

  const priceInCents = precio * 100;
  const entregaFormated = new Date(entrega).toISOString().split('T')[0];

  try {

    await sql`
      UPDATE proveedores
      SET nombre = ${nombre}, producto = ${producto}, descripcion = ${descripcion}, cantidad = ${cantidad}, entrega = ${entregaFormated}, precio = ${priceInCents}
      WHERE id = ${id}
    `

  }catch (e) {
    console.log('Server Action Error: ', e);
    return {
      message: 'Database error: Failed to update the provider.',
      success: false
    }
  }
  
  revalidatePath('/proveedores');

  return {
    message: 'El proveedor ha sido editado con exito!',
    success: true
  }

}

export async function deleteProvider(id: string): Promise<State> {
  try {
    await sql`
      DELETE FROM proveedores WHERE id = ${id}
    `
  }catch (e) {
    console.log('Server Action Error: ', e);
    return {
      message: 'Database error: Failed to delete provider',
      success: false
    }
  }

  revalidatePath('/proveedores');

  return {
    message: 'El proveedor ha sido eliminado con exito!',
    success: true
  }

}


// ------------------------------------- Pérdidas -----------------------------------

export async function createLoss({id, totalProducts, perdida}: { id: string, totalProducts: number, perdida: Loss | null }, prevState: State, formData: FormData): Promise<State> {
  const validation = CreateLossSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validation.success){
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Faltan campos para cargar la pérdida.',
      success: false
    }
  }

  const { cantidad, mes } = validation.data;

  const mesToNumber = MESES.indexOf(mes)+1 || 1;

  const total = totalProducts - cantidad
  const resto = total >= -1 ? total : null

  if(resto === null) {
    return {
      errors: {
        cantidad: [`No puedes perder ${cantidad} productos si tienes ${totalProducts}`]
      },
      message: 'Revisa bien lo que pones.',
      success: false
    }
  }

  const perdidaTotal = perdida ? (Number(perdida.cantidad) + cantidad) : cantidad;

  const queryLoss = perdida?.mes === mesToNumber ? sql`
    UPDATE perdidas
    SET cantidad = ${perdidaTotal}
    WHERE producto_id = ${id}
  ` : sql`
    INSERT INTO perdidas (producto_id, cantidad, mes)
    VALUES (${id}, ${cantidad}, ${mesToNumber})
  `

  try {

    await queryLoss;
    await sql`
      UPDATE productos
      SET stock = ${resto}
      WHERE id = ${id}
    `

  }catch (e) {
    console.log('Server Action Error: ', e);
    return {
      message: 'Database error: Failed to create loss',
      success: false
    }
  }

  revalidateAll()

  return {
    message: perdida?.mes === mesToNumber ? 'Debido a que el producto ya estaba registrado en ese més, solo se actualizará la cantidad' : `La pérdida ha sido registrada con exito!`,
    success: true,
    timer: perdida?.mes === mesToNumber ? false : true
  }

}