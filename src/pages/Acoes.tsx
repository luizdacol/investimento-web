import Table from "../components/AcoesTable/Table"

export interface Acao {
    data: Date,
    ticker: string,
    precoUnitario: number,
    quantidade: number,
    precoTotal: number,
    operacao: string,
    tipo: 'BDR' | 'Ação'
}

function Acoes(){

    const data: Acao[] = [{
        data: new Date("2023-08-28"),
        ticker: "ITSA4",
        precoUnitario: 9.60,
        quantidade: 100,
        precoTotal: 960,
        operacao: "Compra",
        tipo: "Ação"
    },
    {
        data: new Date("2023-08-28"),
        ticker: "VALE3",
        precoUnitario: 62,
        quantidade: 100,
        precoTotal: 6200,
        operacao: "Compra",
        tipo: "Ação"
    }]

    return (
        <>
        <main className="h-full">
            
          {/* Main Content */}
          <div className="mainCard">
            <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
              <Table acoes={data}></Table>
            </div>
          </div>
        </main>
      </>
    )
}

export default Acoes