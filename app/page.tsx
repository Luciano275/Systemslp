export default async function Home() {
  return (
    <>
      <section className="absolute top-0 left-0 w-full max-wull h-full max-h-full flex justify-center items-center p-4">
        <article className="w-full max-w-[500px] text-white bg-black bg-opacity-60 backdrop-blur-md py-4 px-6 md:p-10 overflow-x-hidden overflow-y-auto max-h-[500px] rounded-xl">
          <h2 className="text-2xl text-balance md:text-4xl pb-4 border-b">¿Qué es System SLP?</h2>
          <p className="text-pretty md:text-lg pt-4">Es una aplicación WEB que permite llevar el control de los productos que se tiene en dicho almacén, a su vez gestiona toda información relacionada con sus proveedores y proporciona gráficos estadísticos de las pérdidas mensuales.</p>
        </article>
      </section>
    </>
  );
}
