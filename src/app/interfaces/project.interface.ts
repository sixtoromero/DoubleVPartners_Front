export interface Project {
  id: number;
  descripcion: string;
  latitud: number;
  longitud: number;
}
export interface RespProject {
  msg: string;
  projectsData: Project[]
}
