export interface Statistics {
  mes: string;
  cantidad_inmuebles: number;
  total_ventas: number;
}
export interface RespStatistics {
  msg: string;
  statisticsData: Statistics[]
}
