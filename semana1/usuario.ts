interface Usuario {
    nombre: string;
    email: string;
    rol: "admin" | "developer" | "viewer";
    edad?: number;
  }
  
  class GestorUsuarios {
    private usuarios: Usuario[] = [];
  
    agregarUsuario(usuario: Usuario): void {
      this.usuarios.push(usuario);
      console.log(`Usuario ${usuario.nombre} agregado correctamente`);
    }
  
    obtenerPorRol(rol: Usuario["rol"]): Usuario[] {
      return this.usuarios.filter(u => u.rol === rol);
    }
  }
  
  const gestor = new GestorUsuarios();
  
  gestor.agregarUsuario({
    nombre: "Ana García",
    email: "ana@startup.com",
    rol: "admin"
  });
  
  gestor.agregarUsuario({
    nombre: "Luis Pérez",
    email: "luis@startup.com",
    rol: "developer",
    edad: 28
  });
  
  console.log(gestor.obtenerPorRol("developer"));